"use client";
import { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

interface QuizTakerProps {
  quiz: any;
  questions: any[];
  onSubmit: (answers: any) => void;
  onCancel: () => void;
}

export default function QuizTaker({
  quiz,
  questions,
  onSubmit,
  onCancel,
}: QuizTakerProps) {
  const [answers, setAnswers] = useState<any>({});

  const handleMultipleChoiceChange = (questionId: string, choiceId: string) => {
    setAnswers({
      ...answers,
      [questionId]: choiceId,
    });
  };

  const handleTrueFalseChange = (questionId: string, value: boolean) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const handleFillInTheBlankChange = (questionId: string, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  return (
    <Container className="p-0">
      {/* Quiz Title */}
      <Card className="mb-4 border-0 shadow-sm">
        <Card.Body>
          <h2 className="fw-bold mb-2">{quiz.title}</h2>
          <p className="text-muted mb-0">Points: {quiz.points}</p>
        </Card.Body>
      </Card>

      {/* Questions */}
      <div className="mb-4">
        {questions.length === 0 ? (
          <p className="text-muted text-center py-5">
            No questions in this quiz
          </p>
        ) : (
          questions.map((question, idx) => (
            <Card key={question._id} className="mb-4 border-0 shadow-sm">
              <Card.Body>
                <h5 className="fw-bold mb-3">
                  Question {idx + 1} ({question.points} points)
                </h5>
                <p className="mb-4">{question.questionText}</p>

                {/* Multiple Choice */}
                {question.questionType === "MULTIPLE_CHOICE" && (
                  <div>
                    <p className="fw-semibold mb-2">Choose one:</p>
                    {question.choices?.map((choice: any) => (
                      <Form.Check
                        key={choice._id}
                        type="radio"
                        id={`${question._id}-${choice._id}`}
                        name={question._id}
                        label={choice.text}
                        value={choice._id}
                        checked={answers[question._id] === choice._id}
                        onChange={() =>
                          handleMultipleChoiceChange(question._id, choice._id)
                        }
                        className="mb-2"
                      />
                    ))}
                  </div>
                )}

                {/* True/False */}
                {question.questionType === "TRUE_FALSE" && (
                  <div>
                    <p className="fw-semibold mb-2">Select your answer:</p>
                    <Form.Check
                      type="radio"
                      id={`${question._id}-true`}
                      name={question._id}
                      label="True"
                      value="true"
                      checked={answers[question._id] === true}
                      onChange={() => handleTrueFalseChange(question._id, true)}
                      className="mb-2"
                    />
                    <Form.Check
                      type="radio"
                      id={`${question._id}-false`}
                      name={question._id}
                      label="False"
                      value="false"
                      checked={answers[question._id] === false}
                      onChange={() =>
                        handleTrueFalseChange(question._id, false)
                      }
                      className="mb-2"
                    />
                  </div>
                )}

                {/* Fill in the Blank */}
                {question.questionType === "FILL_IN_THE_BLANK" && (
                  <div>
                    <p className="fw-semibold mb-2">Fill in the blank:</p>
                    <Form.Control
                      type="text"
                      placeholder="Type your answer here"
                      value={answers[question._id] || ""}
                      onChange={(e) =>
                        handleFillInTheBlankChange(question._id, e.target.value)
                      }
                    />
                  </div>
                )}
              </Card.Body>
            </Card>
          ))
        )}
      </div>

      {/* Action Buttons */}
      <div className="d-flex gap-2 mb-4">
        <Button onClick={onCancel} variant="secondary" className="flex-grow-1">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="danger" className="flex-grow-1">
          Submit Quiz
        </Button>
      </div>
    </Container>
  );
}
