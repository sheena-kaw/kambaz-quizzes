"use client";

import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap";
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import * as client from "../../../../../client";

export default function ViewAttempt() {
  const router = useRouter();
  const { id, qid, submissionId } = useParams();

  const currentUser = useSelector(
    (state: any) => state.accountReducer?.currentUser
  );

  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const quiz = quizzes.find((q: any) => q._id === qid);

  const [submission, setSubmission] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching submission:", submissionId);

        // Fetch the specific submission
        const submissionData = await client.getSubmission(
          submissionId as string
        );
        console.log("Submission data:", submissionData);

        if (!submissionData) {
          setError("Submission not found");
          setLoading(false);
          return;
        }

        setSubmission(submissionData);

        // Fetch all questions for this quiz
        const questionsData = await client.findQuestionsForQuiz(qid as string);
        console.log("Questions data:", questionsData);
        setQuestions(questionsData);
      } catch (err: any) {
        console.error("Error fetching submission:", err);
        setError(err.message || "Failed to load attempt details");
      } finally {
        setLoading(false);
      }
    };

    if (submissionId) {
      fetchData();
    }
  }, [submissionId, qid]);

  // Helper function to get student's answer text
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

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading attempt...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
          <Button variant="primary" onClick={() => router.back()}>
            Go Back
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!submission || !questions.length) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          <Alert.Heading>No Data</Alert.Heading>
          <p>Could not load attempt data</p>
          <Button variant="primary" onClick={() => router.back()}>
            Go Back
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">{quiz?.title || "Quiz"}</h2>

      <Card className="mb-4 border-0 shadow-sm bg-light">
        <Card.Body>
          <h5>
            Score: {submission.score.earnedPoints}/
            {submission.score.totalPoints}
          </h5>
          <p className="mb-0">Percentage: {submission.score.percentage}%</p>
        </Card.Body>
      </Card>

      <div className="mb-4">
        <h5 className="mb-3">Questions Review:</h5>
        {questions.map((question, idx) => {
          // Find if this question was answered correctly
          const result = submission.results.find(
            (r: any) => r.questionId === question._id
          );
          const isCorrect = result?.isCorrect;
          const studentAnswer = submission.answers[question._id];

          return (
            <Card
              key={question._id}
              className={`mb-3 ${
                isCorrect ? "border-success border-3" : "border-danger border-3"
              }`}
            >
              <Card.Body>
                {/* Question Header with Status */}
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <p className="mb-2">
                      <strong>
                        Q{idx + 1}: {question.questionText}
                      </strong>
                    </p>
                  </div>
                  <div className="text-center">
                    {isCorrect ? (
                      <div>
                        <FaCheck className="text-success" size={24} />
                        <p className="text-success fw-bold mt-1">Correct</p>
                      </div>
                    ) : (
                      <div>
                        <FaTimes className="text-danger" size={24} />
                        <p className="text-danger fw-bold mt-1">Incorrect</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Your Answer */}
                <div className="mb-3 p-2 bg-light rounded">
                  <p className="fw-semibold mb-1">Your Answer:</p>
                  <p className="mb-0 text-muted">
                    {getStudentAnswerText(question, studentAnswer)}
                  </p>
                </div>

                {/* Points */}
                <div className="pt-3 border-top">
                  <p className="mb-0">
                    Points Earned:{" "}
                    <span className="fw-bold">
                      {result?.pointsEarned || 0}/{question.points}
                    </span>
                  </p>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>

      <div className="d-flex gap-2">
        <Button variant="secondary" onClick={() => router.back()}>
          Back to Attempt History
        </Button>
      </div>
    </Container>
  );
}
