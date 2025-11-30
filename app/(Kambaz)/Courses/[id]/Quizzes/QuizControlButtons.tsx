"use client";

import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import GreenCheckmark from "../Modules/GreenCheckmark";

interface QuizControlButtonsProps {
  quizId: string;
  deleteQuiz: (quizId: string) => void;
}

export default function QuizControlButtons({
  quizId,
  deleteQuiz,
}: QuizControlButtonsProps) {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      deleteQuiz(quizId);
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
