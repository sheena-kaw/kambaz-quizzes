"use client";

import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function QuizzesControls() {
  const router = useRouter();
  const { id } = useParams();
  const currentUser = useSelector(
    (state: any) => state.accountReducer?.currentUser
  );

  return (
    <div
      id="wd-modules-controls"
      className="d-flex align-items-center text-nowrap gap-2"
    >
      <div className="input-group" style={{ width: "350px" }}>
        <span className="input-group-text bg-white">
          <IoSearchOutline />
        </span>
        <input
          type="text"
          placeholder="Search..."
          id="wd-search-quiz"
          className="form-control"
        />
      </div>

      {currentUser?.role === "FACULTY" && (
        <div className="d-flex gap-2 ms-auto">
          <Button
            variant="secondary"
            size="lg"
            className="me-1 float-end"
            id="wd-add-group-btn"
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Group
          </Button>
          <Button
            variant="danger"
            size="lg"
            className="me-1 float-end"
            id="wd-add-quiz-btn"
            onClick={() => router.push(`/Courses/${id}/Quizzes/New`)}
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Quiz
          </Button>
        </div>
      )}
    </div>
  );
}
