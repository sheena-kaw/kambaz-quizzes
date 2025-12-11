"use client";

import { useParams, useRouter } from "next/navigation";
import { Button, Spinner, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setQuizzes } from "../../reducer";
import * as client from "../../../../client";

export default function QuizDetails() {
  const router = useRouter();
  const { id, qid } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: any) => state.accountReducer?.currentUser
  );

  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const quiz = quizzes.find((q: any) => q._id === qid);
  const [checkingSubmissions, setCheckingSubmissions] = useState(true);
  useEffect(() => {
    const checkForSubmissions = async () => {
      if (currentUser?.role === "FACULTY") {
        setCheckingSubmissions(false);
        return;
      }

      if (!currentUser?._id || !qid) {
        setCheckingSubmissions(false);
        return;
      }

      try {
        const submissions = await client.getStudentSubmissionsForQuiz(
          qid as string,
          currentUser._id
        );

        if (submissions && submissions.length > 0) {
          router.push(`/Courses/${id}/Quizzes/${qid}/AttemptHistory`);
          return;
        }

        setCheckingSubmissions(false);
      } catch (error) {
        console.error("Error checking submissions:", error);
        setCheckingSubmissions(false);
      }
    };

    checkForSubmissions();
  }, [currentUser?._id, qid, id, router, currentUser?.role]);
  if (checkingSubmissions && currentUser?.role !== "FACULTY") {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading your quiz information...</p>
      </Container>
    );
  }

  if (!quiz) {
    return <h2 className="text-center mt-5">Quiz not found</h2>;
  }

  if (currentUser?.role !== "FACULTY") {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <h3 className="mb-4">{quiz.title}</h3>

        <div className="d-flex gap-3">
          <Button
            variant="secondary"
            onClick={() => router.push(`/Courses/${id}/Quizzes`)}
          >
            Cancel
          </Button>

          <Button
            variant="success"
            onClick={() => router.push(`/Courses/${id}/Quizzes/${qid}/Preview`)}
          >
            Enter Quiz
          </Button>
        </div>
      </div>
    );
  }

  const handlePublish = async () => {
    const updatedQuiz = { ...quiz, published: !quiz.published };
    await client.updateQuiz(id as string, updatedQuiz);

    const updatedList = quizzes.map((q: any) =>
      q._id === qid ? updatedQuiz : q
    );
    dispatch(setQuizzes(updatedList));
  };

  const DetailRow = ({ label, value }: any) => (
    <div className="d-flex justify-content-between py-2 border-bottom">
      <strong>{label}</strong>
      <span>{String(value)}</span>
    </div>
  );

  return (
    <div
      className="d-flex flex-column justify-content-between align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div
        className="shadow p-4 rounded"
        style={{
          width: "60%",
          background: "white",
          border: "1px solid #ddd",
        }}
      >
        <h2 className="text-center mb-4">{quiz.title} Details</h2>

        <DetailRow label="Points" value={quiz.points} />
        <DetailRow label="Quiz Type" value={quiz.quiz_type} />
        <DetailRow label="Assignment Group" value={quiz.assignment_group} />

        <DetailRow
          label="Shuffle Questions"
          value={quiz.shuffle ? "Yes" : "No"}
        />
        <DetailRow label="Time Limit" value={`${quiz.time_limit} minutes`} />

        <DetailRow
          label="Multiple Attempts Allowed"
          value={quiz.attempts ? `Yes (${quiz.attempts_num})` : "No"}
        />

        <DetailRow
          label="Show Correct Answers"
          value={quiz.show_correct ? "Yes" : "No"}
        />

        <DetailRow
          label="One Question at a Time"
          value={quiz.one_question ? "Yes" : "No"}
        />

        <DetailRow label="Webcam Required" value={quiz.webcam ? "Yes" : "No"} />

        <DetailRow
          label="Lock Questions"
          value={quiz.lock_question ? "Yes" : "No"}
        />

        <DetailRow label="Access Code" value={quiz.access_code || "None"} />

        <DetailRow label="Assigned To" value={quiz.assigned_to || "Everyone"} />

        <DetailRow label="Due Date" value={quiz.due} />
        <DetailRow label="Available From" value={quiz.avail_from} />
        <DetailRow label="Available Until" value={quiz.avail_to} />

        <DetailRow
          label="Published?"
          value={quiz.published ? "Published" : "Not Published"}
        />
      </div>

      <div className="d-flex justify-content-center gap-3 mt-4 mb-4">
        <Button
          variant="secondary"
          id="wd-cancel"
          onClick={() => {
            router.push(`/Courses/${id}/Quizzes`);
          }}
        >
          Back
        </Button>

        <Button
          variant="danger"
          id="wd-edit"
          onClick={() => {
            router.push(`/Courses/${id}/Quizzes/${qid}`);
          }}
        >
          Edit
        </Button>

        <Button
          variant="danger"
          id="wd-preview"
          onClick={() => {
            router.push(`/Courses/${id}/Quizzes/${qid}/Preview`);
          }}
        >
          Preview
        </Button>

        <Button
          variant={quiz.published ? "secondary" : "success"}
          id="wd-publish"
          onClick={handlePublish}
        >
          {quiz.published ? "Unpublish" : "Publish"}
        </Button>
      </div>
    </div>
  );
}
