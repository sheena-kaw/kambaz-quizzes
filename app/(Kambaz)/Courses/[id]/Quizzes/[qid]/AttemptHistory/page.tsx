"use client";

import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Container, Table, Button, Card, Spinner, Alert } from "react-bootstrap";
import * as client from "../../../../client";

interface Submission {
  _id: string;
  attemptNumber: number;
  score: {
    earnedPoints: number;
    totalPoints: number;
    percentage: number;
  };
  createdAt: string;
  answers: any;
}

export default function AttemptHistory() {
  const router = useRouter();
  const { id, qid } = useParams();
  
  const currentUser = useSelector(
    (state: any) => state.accountReducer?.currentUser
  );

  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const quiz = quizzes.find((q: any) => q._id === qid);

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!currentUser?._id) {
          setError("User not authenticated");
          return;
        }

        const data = await client.getStudentSubmissionsForQuiz(
          qid as string,
          currentUser._id
        );

        const sorted = data.sort(
          (a: Submission, b: Submission) => b.attemptNumber - a.attemptNumber
        );

        setSubmissions(sorted);
      } catch (err: any) {
        console.error("Error fetching submissions:", err);
        setError(err.message || "Failed to load attempt history");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [qid, currentUser?._id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const canRetake = () => {
    if (!quiz) return false;
    if (!quiz.attempts) return false; 
    const remainingAttempts = quiz.attempts_num - submissions.length;
    return remainingAttempts > 0;
  };

  const getRemainingAttempts = () => {
    if (!quiz) return 0;
    return quiz.attempts_num - submissions.length;
  };

  const handleViewDetails = (submissionId: string) => {
    router.push(
      `/Courses/${id}/Quizzes/${qid}/ViewAttempt/${submissionId}`
    );
  };

  const handleRetakeQuiz = () => {
    router.push(`/Courses/${id}/Quizzes/${qid}/Preview`);
  };

  const handleBackToCourse = () => {
    router.push(`/Courses/${id}/Quizzes`);
  };


  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading your attempt history...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
          <Button variant="primary" onClick={handleBackToCourse}>
            Back to Quizzes
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="mb-4">
        <h2 className="mb-2">{quiz?.title || "Quiz"} - Attempt History</h2>
        <p className="text-muted">
          View your previous attempts below. You can retake the quiz if attempts
          are remaining.
        </p>
      </div>

      {quiz?.attempts && (
        <Card className="mb-4 border-0 shadow-sm bg-light">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">Attempts</h5>
                <p className="mb-0 text-muted">
                  {submissions.length} of {quiz.attempts_num} attempts used
                </p>
              </div>
              <div className="text-end">
                <div className="display-6 fw-bold">
                  {getRemainingAttempts()}
                </div>
                <small className="text-muted">remaining</small>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}

    
      {submissions.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <Card.Body className="text-center py-5">
            <h4 className="mb-3">No Attempts Yet</h4>
            <p className="text-muted mb-4">
              You haven't taken this quiz yet. Click the button below to start.
            </p>
            <Button
              variant="danger"
              size="lg"
              onClick={handleRetakeQuiz}
              className="me-2"
            >
              Take Quiz
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleBackToCourse}
            >
              Back to Quizzes
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <>

          <Card className="mb-4 border-0 shadow-sm">
            <Card.Body className="p-0">
              <Table hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="ps-3">Attempt</th>
                    <th>Date & Time</th>
                    <th>Score</th>
                    <th>Points</th>
                    <th className="pe-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission) => (
                    <tr key={submission._id}>
                      <td className="ps-3 fw-bold">
                        Attempt {submission.attemptNumber}
                      </td>
                      <td>{formatDate(submission.createdAt)}</td>
                      <td>
                        <span
                          className={`fw-bold badge bg-${
                            submission.score.percentage >= 70
                              ? "success"
                              : submission.score.percentage >= 60
                              ? "warning"
                              : "danger"
                          }`}
                        >
                          {submission.score.percentage}%
                        </span>
                      </td>
                      <td>
                        {submission.score.earnedPoints}/
                        {submission.score.totalPoints}
                      </td>
                      <td className="pe-3">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleViewDetails(submission._id)}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>


          <div className="d-flex gap-2 justify-content-center mb-4">
            <Button
              variant="secondary"
              onClick={handleBackToCourse}
              className="px-4"
            >
              Back to Quizzes
            </Button>

            {canRetake() ? (
              <Button
                variant="danger"
                onClick={handleRetakeQuiz}
                className="px-4"
              >
                Retake Quiz ({getRemainingAttempts()} attempts remaining)
              </Button>
            ) : (
              <Button
                variant="danger"
                disabled
                className="px-4"
                title={`Maximum ${quiz?.attempts_num} attempts reached`}
              >
                No More Attempts Available
              </Button>
            )}
          </div>

          {!canRetake() && submissions.length > 0 && (
            <Alert variant="info" className="text-center">
              You have completed all available attempts for this quiz. Your best
              score is: <strong>{Math.max(...submissions.map(s => s.score.percentage))}%</strong>
            </Alert>
          )}
        </>
      )}
    </Container>
  );
}