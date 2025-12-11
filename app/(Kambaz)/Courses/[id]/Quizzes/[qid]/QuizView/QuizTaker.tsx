"use client";
import { useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import QuestionNavigator from "./QuizNavigator";

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

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

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSelectQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmit = () => {
    console.log("handleSubmit in QuizTaker called!");
    console.log("answers:", answers);
    console.log("onSubmit function:", onSubmit);
    onSubmit(answers);
  };

  if (questions.length === 0) {
    return (
      <Container className="p-0">
        <p className="text-muted text-center py-5">No questions in this quiz</p>
      </Container>
    );
  }

  return (
    <Container className="p-0">
      <Row className="g-3">
        {/* Question Navigator Sidebar */}
        <Col md={3}>
          <QuestionNavigator
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            onSelectQuestion={handleSelectQuestion}
            answers={answers}
            userRole="STUDENT"
          />
        </Col>

        {/* Main Quiz Content */}
        <Col md={9}>
          {/* Quiz Header */}
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Body>
              <h2 className="fw-bold mb-2">{quiz.title}</h2>
              <p className="text-muted mb-0">
                Question {currentQuestionIndex + 1} of {questions.length} |
                Total Points: {quiz.points}
              </p>
            </Card.Body>
          </Card>

          {/* Current Question */}
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Body>
              <h5 className="fw-bold mb-3">
                Question {currentQuestionIndex + 1} ({currentQuestion.points}{" "}
                points)
              </h5>
              <p className="mb-4">{currentQuestion.questionText}</p>

              {currentQuestion.questionType === "MULTIPLE_CHOICE" && (
                <div>
                  <p className="fw-semibold mb-2">Choose one:</p>
                  {currentQuestion.choices?.map((choice: any) => (
                    <Form.Check
                      key={choice._id}
                      type="radio"
                      id={`${currentQuestion._id}-${choice._id}`}
                      name={currentQuestion._id}
                      label={choice.text}
                      value={choice._id}
                      checked={answers[currentQuestion._id] === choice._id}
                      onChange={() =>
                        handleMultipleChoiceChange(
                          currentQuestion._id,
                          choice._id
                        )
                      }
                      className="mb-2"
                    />
                  ))}
                </div>
              )}

              {currentQuestion.questionType === "TRUE_FALSE" && (
                <div>
                  <p className="fw-semibold mb-2">Select your answer:</p>
                  <Form.Check
                    type="radio"
                    id={`${currentQuestion._id}-true`}
                    name={currentQuestion._id}
                    label="True"
                    value="true"
                    checked={answers[currentQuestion._id] === true}
                    onChange={() =>
                      handleTrueFalseChange(currentQuestion._id, true)
                    }
                    className="mb-2"
                  />
                  <Form.Check
                    type="radio"
                    id={`${currentQuestion._id}-false`}
                    name={currentQuestion._id}
                    label="False"
                    value="false"
                    checked={answers[currentQuestion._id] === false}
                    onChange={() =>
                      handleTrueFalseChange(currentQuestion._id, false)
                    }
                    className="mb-2"
                  />
                </div>
              )}

              {/* Fill in the Blank */}
              {currentQuestion.questionType === "FILL_IN_THE_BLANK" && (
                <div>
                  <p className="fw-semibold mb-2">Fill in the blank:</p>
                  <Form.Control
                    type="text"
                    placeholder="Type your answer here"
                    value={answers[currentQuestion._id] || ""}
                    onChange={(e) =>
                      handleFillInTheBlankChange(
                        currentQuestion._id,
                        e.target.value
                      )
                    }
                  />
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Navigation Controls */}
          <div className="d-flex gap-2 mb-4">
            <Button
              onClick={handlePreviousQuestion}
              variant="outline-secondary"
              disabled={currentQuestionIndex === 0}
            >
              <FaChevronLeft className="me-2" />
              Previous
            </Button>

            <Button
              onClick={handleNextQuestion}
              variant="outline-secondary"
              disabled={currentQuestionIndex === questions.length - 1}
              className="flex-grow-1"
            >
              Next
              <FaChevronRight className="ms-2" />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="d-flex gap-2 mb-4">
            <Button
              onClick={onCancel}
              variant="secondary"
              className="flex-grow-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="danger"
              className="flex-grow-1"
            >
              Submit Quiz
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
