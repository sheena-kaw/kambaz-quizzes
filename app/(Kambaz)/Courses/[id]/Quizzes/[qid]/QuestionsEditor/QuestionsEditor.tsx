"use client";
import { useState, useEffect } from "react";
import { FaTrash, FaPlus, FaPencil } from "react-icons/fa6";
import { useParams } from "next/navigation";
import { Button, Form, Row, Col, Container, Badge } from "react-bootstrap";
import MultipleChoiceQuestionEditor from "./MultipleChoiseEditor";
import TrueFalseQuestionEditor from "./TrueFalseEditor";
import FillInTheBlankQuestionEditor from "./FillBlankEditor";
import * as client from "../../../../client";

export default function QuestionsEditor() {
  const { id, qid } = useParams();
  const [questionsList, setQuestionsList] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch questions when component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const quizId = Array.isArray(qid) ? qid[0] : qid;
        if (!quizId) {
          console.error("Quiz ID is missing");
          setLoading(false);
          return;
        }

        const questions = await client.findQuestionsForQuiz(quizId);
        setQuestionsList(questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (qid) {
      fetchQuestions();
    }
  }, [qid]);

  const addQuestion = async () => {
    const quizId = Array.isArray(qid) ? qid[0] : qid;
    if (!quizId) {
      console.error("Quiz ID is missing");
      setLoading(false);
      return;
    }
    const newQuestion = {
      questionType: "MULTIPLE_CHOICE",
      title: "",
      questionText: "",
      points: 1,
      choices: [
        { _id: "1", text: "", isCorrect: false },
        { _id: "2", text: "", isCorrect: true },
      ],
    };

    try {
      const createdQuestion = await client.createQuestion(quizId, newQuestion);
      // Add wasJustCreated flag to track this is a new unsaved question
      const questionWithFlag = { ...createdQuestion, wasJustCreated: true };
      setQuestionsList([...questionsList, questionWithFlag]);
      setEditingId(createdQuestion._id);
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  const deleteQuestion = async (questionId: string) => {
    const quizId = Array.isArray(qid) ? qid[0] : qid;
    if (!quizId) {
      console.error("Quiz ID is missing");
      return;
    }
    setQuestionsList(questionsList.filter((q: any) => q._id !== questionId));

    try {
      await client.deleteQuestion(quizId, questionId);
      setQuestionsList(questionsList.filter((q: any) => q._id !== questionId));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const updateQuestion = async (questionId: string, updatedQuestion: any) => {
    const quizId = Array.isArray(qid) ? qid[0] : qid;
    if (!quizId) {
      console.error("Quiz ID is missing");
      setLoading(false);
      return;
    }

    try {
      const savedQuestion = await client.updateQuestion(
        quizId,
        questionId,
        updatedQuestion
      );
      // Remove the wasJustCreated flag since the question has been edited
      const { wasJustCreated, ...cleanedQuestion } = savedQuestion;
      setQuestionsList(
        questionsList.map((q: any) =>
          q._id === questionId ? cleanedQuestion : q
        )
      );
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleCancelEdit = async (questionId: string) => {
    const question = questionsList.find((q) => q._id === questionId);

    // If this is a newly created question, delete it from the database
    if (question?.wasJustCreated) {
      const quizId = Array.isArray(qid) ? qid[0] : qid;
      if (!quizId) {
        setEditingId(null);
        return;
      }

      try {
        await client.deleteQuestion(quizId, questionId);
        setQuestionsList(questionsList.filter((q) => q._id !== questionId));
      } catch (error) {
        console.error("Error deleting question:", error);
      }
    }

    setEditingId(null);
  };

  if (loading) {
    return (
      <Container className="p-0 text-center py-5">
        Loading questions...
      </Container>
    );
  }

  return (
    <Container className="p-0">
      {/* New Question Button */}
      <Button
        onClick={addQuestion}
        variant="light"
        className="w-100 mb-4 d-flex align-items-center justify-content-center gap-2 border-2"
        size="lg"
      >
        <FaPlus size={18} />
        New Question
      </Button>

      {/* Questions List */}
      <div className="mb-4">
        {questionsList.length === 0 ? (
          <p className="text-muted text-center py-5">No questions added yet.</p>
        ) : (
          <div className="d-flex flex-column gap-3">
            {questionsList.map((q: any, idx: number) => (
              <div key={q._id}>
                {editingId === q._id ? (
                  <div className="bg-light border border-secondary rounded p-4">
                    <h5 className="fw-semibold mb-3">Question {idx + 1}</h5>
                    <Col md={1} className="m-3">
                      <Form.Group>
                        <Form.Label className="fw-semibold">Points</Form.Label>
                        <Form.Control
                          type="number"
                          value={q.points}
                          onChange={(e) =>
                            updateQuestion(q._id, {
                              ...q,
                              points: parseInt(e.target.value),
                            })
                          }
                          min="1"
                        />
                      </Form.Group>
                    </Col>

                    <Col md={3} className="m-3">
                      <Form.Group>
                        <Form.Label className="fw-semibold">
                          Question Type
                        </Form.Label>
                        <Form.Select
                          value={q.questionType}
                          onChange={(e) =>
                            updateQuestion(q._id, {
                              ...q,
                              questionType: e.target.value,
                            })
                          }
                        >
                          <option value="MULTIPLE_CHOICE">
                            Multiple Choice
                          </option>
                          <option value="TRUE_FALSE">True/False</option>
                          <option value="FILL_IN_THE_BLANK">
                            Fill in the Blank
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    {q.questionType === "MULTIPLE_CHOICE" && (
                      <Col md={10} className="m-3">
                        <MultipleChoiceQuestionEditor
                          question={q}
                          onCancel={() => handleCancelEdit(q._id)}
                          onUpdate={(updatedQuestion) => {
                            updateQuestion(q._id, updatedQuestion);
                            setEditingId(null);
                          }}
                        />
                      </Col>
                    )}
                    {q.questionType === "TRUE_FALSE" && (
                      <Col md={10} className="m-3">
                        <TrueFalseQuestionEditor
                          question={q}
                          onCancel={() => handleCancelEdit(q._id)}
                          onUpdate={(updatedQuestion) => {
                            updateQuestion(q._id, updatedQuestion);
                            setEditingId(null);
                          }}
                        />
                      </Col>
                    )}
                    {q.questionType === "FILL_IN_THE_BLANK" && (
                      <Col md={10} className="m-3">
                        <FillInTheBlankQuestionEditor
                          question={q}
                          onCancel={() => handleCancelEdit(q._id)}
                          onUpdate={(updatedQuestion) => {
                            updateQuestion(q._id, updatedQuestion);
                            setEditingId(null);
                          }}
                        />
                      </Col>
                    )}
                  </div>
                ) : (
                  <div className="bg-white border border-secondary rounded p-4 d-flex justify-content-between align-items-start gap-3">
                    <div className="flex-grow-1">
                      <div className="fw-semibold">Question {idx + 1}</div>
                      <div className="text-muted small mt-2">
                        {q.title || q.questionText || "(No text provided)"}
                      </div>
                      <div className="mt-3 d-flex gap-2">
                        <Badge bg="secondary">{q.questionType}</Badge>
                        <Badge bg="secondary">{q.points} pts</Badge>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <Button
                        variant="link"
                        className="text-secondary p-0"
                        onClick={() => setEditingId(q._id)}
                        title="Edit question"
                      >
                        <FaPencil size={18} />
                      </Button>
                      <Button
                        variant="link"
                        className="text-danger p-0"
                        onClick={() => deleteQuestion(q._id)}
                        title="Delete question"
                      >
                        <FaTrash size={18} />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
