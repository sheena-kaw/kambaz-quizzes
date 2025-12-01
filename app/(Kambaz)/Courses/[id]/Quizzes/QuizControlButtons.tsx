"use client";

import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface QuizControlButtonsProps {
  id: string,
  quizId: string;
  deleteQuiz: (quizId: string) => void;
}

export default function QuizControlButtons({
  id,
  quizId,
  deleteQuiz,
}: QuizControlButtonsProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      deleteQuiz(quizId);
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="float-end d-flex align-items-center" ref={menuRef}>
      <FaTrash
        className="text-danger me-2 mb-1 ms-2"
        onClick={handleDelete}
        style={{ cursor: "pointer" }}
      />
      <span className="ms-2">
        <GreenCheckmark />
      </span>
      <IoEllipsisVertical
        className="fs-4 ms-2"
        style={{ cursor: "pointer" }}
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div
          className="position-absolute end-0 mt-2 bg-white shadow rounded p-2"
          style={{ zIndex: 10, minWidth: "140px" }}
        >
          <button
            className="dropdown-item text-start w-100"
            onClick={handleDelete}
          >
            Delete
          </button>
          <Link
            href={`/Courses/${id}/Quizzes/${quizId}`}
            className="text-decoration-none text-dark w-100"
          >
            <button className="dropdown-item text-start w-100 text-dark">Edit</button>
          </Link>
          <button className="dropdown-item text-start w-100">Publish</button>
          <button className="dropdown-item text-start w-100">Unpublish</button>
        </div>
      )}
    </div>
  );
}
