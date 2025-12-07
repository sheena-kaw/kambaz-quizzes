"use client";
import { Container, Card, Badge, Button, Row, Col } from "react-bootstrap";
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

interface QuizResultsProps {
  quiz: any;
  questions: any[];
  answers: any;
  scoringResult: {
    results: Array<{
      questionId: string;
      isCorrect: boolean;
      pointsEarned: number;
    }>;
    earnedPoints: number;
    totalPoints: number;
    percentage: number;
  };
  onRetakeQuiz: () => void;
  onExit: () => void;
  userRole?: string;
  currentAttempt?: number;
  totalAttempts?: number;
}

export default function QuizResults({
  quiz,
  questions,
  answers,
  scoringResult,
  onRetakeQuiz,
  onExit,
  userRole,
  currentAttempt = 1,
  totalAttempts = 1,
}: QuizResultsProps) {
  const hasAttemptsRemaining = currentAttempt < totalAttempts;
  const isStudent = userRole === "STUDENT";

  const getCorrectAnswerText = (question: any): string => {
    if (question.questionType === "MULTIPLE_CHOICE") {
      const correctChoice = question.choices?.find((c: any) => c.isCorrect);
      return correctChoice?.text || "N/A";
    } else if (question.questionType === "TRUE_FALSE") {
      return question.correctAnswer ? "True" : "False";
    } else if (question.questionType === "FILL_IN_THE_BLANK") {
      const correctAnswers = question.possibleAnswers
        ?.filter((a: any) => a.isCorrect)
        .map((a: any) => a.text)
        .join(" or ");
      return correctAnswers || "N/A";
    }
    return "N/A";
  };

  const getStudentAnswerText = (question: any, studentAnswer: any): string => {
    if (question.questionType === "MULTIPLE_CHOICE") {
      const choice = question.choices?.find(
        (c: any) => c._id === studentAnswer
      );
      return choice?.text || "Not answered";
    } else if (question.questionType === "TRUE_FALSE") {
      return studentAnswer === true
        ? "True"
        : studentAnswer === false
          ? "False"
          : "Not answered";
    } else if (question.questionType === "FILL_IN_THE_BLANK") {
      return studentAnswer || "Not answered";
    }
    return "Not answered";
  };

  return (
    <Container className="p-0">
      {/* Score Summary */}
      <Card className="mb-4 border-0 shadow-sm bg-light">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={8}>
              <h2 className="fw-bold mb-2">Quiz Submitted</h2>
              {isStudent && currentAttempt && totalAttempts && (
                <p className="text-muted mb-2">
                  Attempt{" "}
                  <Badge bg="secondary">
                    {currentAttempt} of {totalAttempts}
                  </Badge>
                </p>
              )}
              <h4 className="text-muted mb-0">
                Score:{" "}
                <span className="fw-bold text-dark">
                  {scoringResult.earnedPoints}/{scoringResult.totalPoints}
                </span>
              </h4>
            </Col>
            <Col md={4} className="text-center">
              <div className="display-4 fw-bold mb-2">
                {scoringResult.percentage}%
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Results for Each Question */}
      <div className="mb-4">
        {questions.map((question, idx) => {
          const questionResult = scoringResult.results.find(
            (r) => r.questionId === question._id
          );
          const studentAnswer = answers[question._id];
          const isCorrect = questionResult?.isCorrect;

          return (
            <Card
              key={question._id}
              className={`mb-3 border-0 shadow-sm ${
                isCorrect ? "border-success border-3" : "border-danger border-3"
              }`}
            >
              <Card.Body>
                {/* Question Header */}
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h5 className="fw-bold mb-2">
                      Question {idx + 1} ({question.points} points)
                    </h5>
                    <p className="mb-0">{question.questionText}</p>
                  </div>
                  <div className="text-center">
                    {isCorrect ? (
                      <div>
                        <FaCheck className="text-success" size={24} />
                        <p className="text-success fw-bold mt-2">Correct</p>
                      </div>
                    ) : (
                      <div>
                        <FaTimes className="text-danger" size={24} />
                        <p className="text-danger fw-bold mt-2">Incorrect</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Student Answer */}
                <div className="mb-3">
                  <p className="fw-semibold mb-1">Your Answer:</p>
                  <p className="text-muted mb-0">
                    {getStudentAnswerText(question, studentAnswer)}
                  </p>
                </div>

                {/* Correct Answer (Show if incorrect) */}
                {!isCorrect && (
                  <div>
                    <p className="fw-semibold mb-1">Correct Answer:</p>
                    <p className="text-success mb-0">
                      {getCorrectAnswerText(question)}
                    </p>
                  </div>
                )}

                {/* Points Earned */}
                <div className="mt-3 pt-3 border-top">
                  <p className="mb-0">
                    Points Earned:{" "}
                    <span className="fw-bold">
                      {questionResult?.pointsEarned || 0}/{question.points}
                    </span>
                  </p>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="d-flex gap-2 mb-4">
        <Button onClick={onExit} variant="secondary" className="flex-grow-1">
          Exit Quiz
        </Button>

        {/* Show Retake button only if attempts remain */}
        {hasAttemptsRemaining ? (
          <Button
            onClick={onRetakeQuiz}
            variant="danger"
            className="flex-grow-1"
          >
            Retake Quiz
          </Button>
        ) : (
          isStudent && (
            <Button
              disabled
              variant="danger"
              className="flex-grow-1"
              title="No attempts remaining"
            >
              No More Attempts
            </Button>
          )
        )}
      </div>
    </Container>
  );
}
