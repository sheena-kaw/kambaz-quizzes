"use client";
import { useState, useEffect } from "react";
import {
  Container,
  Card,
  Badge,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import * as client from "../../../../client";
import QuizTaker from "./QuizTaker";
import QuizResults from "./QuizResults";
import calculateQuizScore from "../utils/quizScoring";

interface QuizPreviewProps {
  userRole?: string;
}

export default function QuizPreview({ userRole }: QuizPreviewProps) {
  const { id, qid } = useParams();
  const currentUser = useSelector(
    (state: any) => state.accountReducer?.currentUser
  );

  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isTakingQuiz, setIsTakingQuiz] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<any>(null);
  const [scoringResult, setScoringResult] = useState<any>(null);
  const [currentAttempt, setCurrentAttempt] = useState(1);
  const [totalAttempts, setTotalAttempts] = useState(1);
  const [attemptCount, setAttemptCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const isStudent = userRole === "STUDENT";
  const isFaculty = userRole === "FACULTY";

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        const quizId = Array.isArray(qid) ? qid[0] : qid;
        if (!quizId) {
          console.error("Quiz ID is missing");
          setLoading(false);
          return;
        }

        // Fetch quiz with all its questions
        const quizData = await client.getQuizWithQuestions(quizId);
        setQuiz(quizData);

        // For students: Get attempt count and load previous attempt if exists
        if (isStudent && currentUser?.id) {
          try {
            const { attemptCount: count } = await client.getAttemptCount(
              quizId,
              currentUser.id
            );
            setAttemptCount(count);
            setCurrentAttempt(count + 1);
            setTotalAttempts(quizData.attempts_num || 1);

            // If student has previous attempts, load the latest one
            if (count > 0) {
              const latestSubmission = await client.getLatestSubmission(
                quizId,
                currentUser.id
              );
              if (latestSubmission) {
                setAnswers(latestSubmission.answers);
                setScoringResult({
                  results: latestSubmission.results || [],
                  earnedPoints: latestSubmission.score.earnedPoints,
                  totalPoints: latestSubmission.score.totalPoints,
                  percentage: latestSubmission.score.percentage,
                });
                setShowResults(true);
              }
            }
          } catch (error) {
            console.error("Error fetching attempt count:", error);
          }
        } else if (isFaculty) {
          // Faculty: Set default values (attempts don't matter)
          setCurrentAttempt(1);
          setTotalAttempts(1);
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    if (qid) {
      fetchQuizData();
    }
  }, [qid, isStudent, isFaculty, currentUser?.id]);

  const handleStartQuiz = () => {
    setIsTakingQuiz(true);
    setShowResults(false);
  };

  const handleSubmitQuiz = async (studentAnswers: any) => {
    try {
      setSubmitting(true);
      const quizId = Array.isArray(qid) ? qid[0] : qid;
      const courseId = Array.isArray(id) ? id[0] : id;

      // Calculate score
      const result = calculateQuizScore(quiz.questions || [], studentAnswers);

      setAnswers(studentAnswers);
      setScoringResult(result);
      setShowResults(true);
      setIsTakingQuiz(false);

      // Save submission to database (for students only)
      if (isStudent && currentUser?.id && quizId && courseId) {
        try {
          await client.submitQuiz(
            quizId,
            currentUser.id,
            courseId,
            studentAnswers,
            {
              earnedPoints: result.earnedPoints,
              totalPoints: result.totalPoints,
              percentage: result.percentage,
            },
            currentAttempt,
            result.results
          );
          // Update attempt count
          setAttemptCount((prev) => prev + 1);
        } catch (error) {
          console.error("Error saving submission:", error);
        }
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    } finally {
      setSubmitting(false);
    }
  };
  const handleRetakeQuiz = () => {
    setAnswers(null);
    setScoringResult(null);
    setShowResults(false);
    setIsTakingQuiz(true);
  };

  const handleExitQuiz = () => {
    setAnswers(null);
    setScoringResult(null);
    setShowResults(false);
    setIsTakingQuiz(false);
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!quiz) {
    return (
      <Container className="text-center py-5">
        <p className="text-muted">Quiz not found</p>
      </Container>
    );
  }

  // Show quiz results if submitted or previous attempt exists
  if (showResults && scoringResult && answers) {
    return (
      <QuizResults
        quiz={quiz}
        questions={quiz.questions || []}
        answers={answers}
        scoringResult={scoringResult}
        onRetakeQuiz={handleRetakeQuiz}
        onExit={handleExitQuiz}
        userRole={userRole}
        currentAttempt={currentAttempt}
        totalAttempts={isFaculty ? 1 : totalAttempts}
      />
    );
  }

  // Show quiz taker if taking quiz
  if (isTakingQuiz) {
    return (
      <QuizTaker
        quiz={quiz}
        questions={quiz.questions || []}
        onSubmit={handleSubmitQuiz}
        onCancel={handleExitQuiz}
      />
    );
  }

  // Show quiz preview
  return (
    <Container className="p-0">
      {/* Quiz Header */}
      <Card className="mb-4 border-0 shadow-sm">
        <Card.Body>
          <h2 className="fw-bold mb-3">{quiz.title}</h2>

          {quiz.description && (
            <p className="text-muted mb-4">{quiz.description}</p>
          )}

          {/* Quiz Metadata */}
          <Row className="mb-3">
            <Col md={3}>
              <div className="mb-2">
                <span className="fw-semibold">Points Possible:</span>
                <p className="text-muted">{quiz.points}</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="mb-2">
                <span className="fw-semibold">Available:</span>
                <p className="text-muted">{quiz.available || "Not set"}</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="mb-2">
                <span className="fw-semibold">Due:</span>
                <p className="text-muted">{quiz.due || "Not set"}</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="mb-2">
                <span className="fw-semibold">Status:</span>
                <p className="text-muted">
                  <Badge bg={quiz.published ? "success" : "secondary"}>
                    {quiz.published ? "Published" : "Unpublished"}
                  </Badge>
                </p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Questions Summary */}
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <h5 className="fw-bold mb-3">
            Questions ({quiz.questions?.length || 0})
          </h5>
          {quiz.questions && quiz.questions.length > 0 ? (
            <p className="text-muted">Questions will be displayed below</p>
          ) : (
            <p className="text-muted">No questions in this quiz yet</p>
          )}
        </Card.Body>
      </Card>

      {/* Start Quiz Button */}
      <div className="mt-4 d-flex justify-content-center">
        {isStudent && currentAttempt > totalAttempts ? (
          <Alert variant="warning" className="w-100">
            You have exhausted all attempts for this quiz.
          </Alert>
        ) : (
          <button
            className="btn btn-danger btn-lg"
            onClick={handleStartQuiz}
            disabled={submitting}
          >
            {isFaculty
              ? "Preview Quiz as Student"
              : `Start Quiz (Attempt ${currentAttempt} of ${totalAttempts})`}
          </button>
        )}
      </div>
    </Container>
  );
}
