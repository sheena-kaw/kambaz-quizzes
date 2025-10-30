"use client";

import Link from "next/link";
import AssignmentsControls from "./AssignmentsControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import HeaderControlButtons from "./HeaderControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { GiNotebook } from "react-icons/gi";
import { FaCaretDown } from "react-icons/fa6";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";


export default function Assignments() {
  const { id } = useParams();
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);

  const courseAssignments = assignments.filter(
    (assignment: any) => assignment.course === id
  );

  return (
    <div>
      <AssignmentsControls />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-assignment-header p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaCaretDown className="me-3" />
              <span> ASSIGNMENTS </span>
            </div>

            <div className="d-flex align-items-center">
              <span className="badge rounded-pill bg-light text-dark px-3 py-2 me-3">
                40% of Total
              </span>
              <HeaderControlButtons />
            </div>
          </div>

          <ListGroup className="wd-assignments rounded-0">
            {courseAssignments.map((assignment: any) => (
              <ListGroupItem
                key={assignment._id}
                className="wd-assignment d-flex align-items-center justify-content-between px-3 py-2"
              >
                <div className="d-flex align-items-center gap-2">
                  <BsGripVertical className="text-muted me-2" />
                  <GiNotebook className="text-muted me-3" />
                  <div>
                    <Link
                      href={`/Courses/${id}/Assignments/${assignment._id}`}
                      className="wd-assignment-link"
                    >
                      {assignment._id} - {assignment.title}
                    </Link>
                    <br />
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <b>Not available until</b> {assignment.available} | <b>Due</b> {assignment.due} | {assignment.points} points
                  </div>
                </div>
                <AssignmentControlButtons assignmentId={assignment._id} />
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
