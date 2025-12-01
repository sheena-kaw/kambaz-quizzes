"use client";

import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import GreenCheckmark from "../Modules/GreenCheckmark";

interface AssignmentControlButtonsProps {
  assignmentId: string;
  deleteAssignment: (assignmentId: string) => void;
}

export default function AssignmentControlButtons({
  assignmentId,
  deleteAssignment,
}: AssignmentControlButtonsProps) {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      deleteAssignment(assignmentId);
    }
  };

  return (
    <div className="float-end d-flex align-items-center">
      <FaTrash
        className="text-danger me-2 mb-1 ms-2"
        onClick={handleDelete}
        style={{ cursor: "pointer" }}
      />
      <span className="ms-2">
        <GreenCheckmark />
      </span>
      <IoEllipsisVertical className="fs-4 ms-2" />
    </div>
  );
}
