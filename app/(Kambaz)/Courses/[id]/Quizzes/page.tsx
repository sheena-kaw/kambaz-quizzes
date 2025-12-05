"use client";

import Link from "next/link";
import QuizzesControls from "./QuizzesControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import HeaderControlButtons from "./HeaderControlButtons";
import QuizControlButtons from "./QuizControlButtons";
import { LuNotebookPen } from "react-icons/lu";
import { FaCaretDown } from "react-icons/fa6";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setQuizzes } from "./reducer";
import * as client from "../../client";
import { useEffect } from "react";

export default function Quizzes() {
  const { id } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: any) => state.accountReducer?.currentUser
  );
  const isFaculty = currentUser?.role === "FACULTY";

  const rawId = useParams().id;
  const courseId = Array.isArray(rawId) ? rawId[0] : (rawId ?? "");

  const fetchQuizzes = async () => {
    const quizzes = await client.findQuizzesForCourse(id as string);
    dispatch(setQuizzes(quizzes));
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const onRemoveQuiz = async (quizId: string) => {
    if (!id) return;
    const courseId = Array.isArray(id) ? id[0] : id;
    await client.deleteQuiz(courseId, quizId);
    dispatch(setQuizzes(quizzes.filter((q: any) => q._id !== quizId)));
  };

  const getAvailabilityStatus = (quiz: any) => {
    const now = new Date();
    const availFrom = new Date(quiz.avail_from);
    const availTo = new Date(quiz.avail_to);

    if (now > availTo) {
      return <b>Closed</b>;
    }
    if (now >= availFrom && now <= availTo) {
      return <b>Available</b>;
    }
    if (now < availFrom) {
      return (
        <>
          <b>Not available until</b> {quiz.avail_from}
        </>
      );
    }

    return "";
  };

  const isQuizAvailable = (quiz: any) => {
    const now = new Date();
    const availFrom = new Date(quiz.avail_from);
    const availTo = new Date(quiz.avail_to);
    return now >= availFrom && now <= availTo;
  };

  return (
    <div>
      <QuizzesControls />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-quizzes">
        <ListGroupItem className="wd-quiz-header p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaCaretDown className="me-3" />
              <span> QUIZZES </span>
            </div>

            <div className="d-flex align-items-center">
              <span className="badge rounded-pill bg-light text-dark px-3 py-2 me-3">
                20% of Total
              </span>
              <HeaderControlButtons />
            </div>
          </div>

          <ListGroup className="wd-quizzes rounded-0">
            {quizzes.length === 0 ? (
              <ListGroupItem className="text-center text-muted py-5">
                {isFaculty
                  ? "To add a quiz, please click the red + Quiz button on the upper right"
                  : "No quizzes added yet. Woohoo!"}
              </ListGroupItem>
            ) : (
              [...quizzes]
                .sort(
                  (a: any, b: any) =>
                    new Date(b.avail_from).getTime() -
                    new Date(a.avail_from).getTime()
                )
                .map((quiz: any) => (
                  <ListGroupItem
                    key={quiz._id}
                    className="wd-quiz d-flex align-items-center justify-content-between px-3 py-2"
                  >
                    <div className="d-flex align-items-center gap-2">
                      <BsGripVertical className="text-muted me-2" />
                      <LuNotebookPen className="text-danger me-3" />
                      <div>
                        {isFaculty ||
                        (isQuizAvailable(quiz) && quiz.published) ? (
                          <Link
                            href={`/Courses/${id}/Quizzes/${quiz._id}/Details`}
                            className="wd-quiz-link"
                          >
                            {quiz.title}
                          </Link>
                        ) : (
                          <span
                            className="text-muted"
                            style={{ cursor: "not-allowed" }}
                          >
                            {quiz.title}
                          </span>
                        )}
                        <br />
                        {getAvailabilityStatus(quiz)} | <b>Due</b> {quiz.due} |{" "}
                        {quiz.points} points
                      </div>
                    </div>
                    <QuizControlButtons
                      id={courseId}
                      quizId={quiz._id}
                      published={quiz.published}
                      deleteQuiz={onRemoveQuiz}
                      togglePublish={async (qid, newValue) => {
                        const updated = await client.updateQuiz(courseId, {
                          ...quiz,
                          published: newValue,
                        });
                        dispatch(
                          setQuizzes(
                            quizzes.map((q: any) =>
                              q._id === qid ? updated : q
                            )
                          )
                        );
                      }}
                    />
                  </ListGroupItem>
                ))
            )}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
