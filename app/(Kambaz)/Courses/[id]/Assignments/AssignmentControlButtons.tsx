"use client";

import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAssignment } from "../Assignments/reducer";

export default function AssignmentControlButtons({ assignmentId }: { assignmentId: string }) {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => setShowConfirm(true);

  const handleConfirmYes = () => {
    dispatch(deleteAssignment(assignmentId));
    setShowConfirm(false);
  };

  const handleConfirmNo = () => setShowConfirm(false);

  return (
    <div className="float-end position-relative">
      <FaTrash
        className="text-danger me-2 mb-1 ms-2"
        role="button"
        onClick={handleDeleteClick}
      />
      <span className="ms-2">
        <GreenCheckmark />
      </span>
      <IoEllipsisVertical className="fs-4 ms-3" />

      {showConfirm && (
        <div
          className="position-absolute bg-white border p-3 rounded shadow"
          style={{ zIndex: 100, right: 0, top: "100%" }}
        >
          <p className="mb-2">Delete this assignment?</p>
          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-secondary btn-sm" onClick={handleConfirmNo}>
              Cancel
            </button>
            <button className="btn btn-danger btn-sm" onClick={handleConfirmYes}>
              Yes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

