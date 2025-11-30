// export default function Quizzes() {
//     return(
//         <h2> Quizzes </h2>
//     );
// }


"use client";

import Link from "next/link";
import QuizzesControls from "./QuizzesControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import HeaderControlButtons from "./HeaderControlButtons";
import QuizControlButtons from "./QuizControlButtons";
import { GiNotebook } from "react-icons/gi";
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
                40% of Total
              </span>
              <HeaderControlButtons />
            </div>
          </div>

          <ListGroup className="wd-quizzes rounded-0">
            {quizzes.map((quiz: any) => (
              <ListGroupItem
                key={quiz._id}
                className="wd-quiz d-flex align-items-center justify-content-between px-3 py-2"
              >
                <div className="d-flex align-items-center gap-2">
                  <BsGripVertical className="text-muted me-2" />
                  <GiNotebook className="text-muted me-3" />
                  <div>
                    <Link
                      href={`/Courses/${id}/Quizzes/${quiz._id}`}
                      className="wd-quiz-link"
                    >
                      {quiz._id} - {quiz.title}
                    </Link>
                    <br />
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <b>Not available until</b> {quiz.available} |{" "}
                    <b>Due</b> {quiz.due} | {quiz.points} points
                  </div>
                </div>
                <QuizControlButtons 
                quizId={quiz._id}
                deleteQuiz={onRemoveQuiz} />
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
