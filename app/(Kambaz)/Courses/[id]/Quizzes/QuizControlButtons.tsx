"use client";

import { IoEllipsisVertical } from "react-icons/io5";
import { CiNoWaitingSign } from "react-icons/ci";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

interface QuizControlButtonsProps {
  id: string,
  quizId: string;
  published: boolean;
  deleteQuiz: (quizId: string) => void;
  togglePublish: (quizId: string, newValue: boolean) => void;
}

export default function QuizControlButtons({
  id,
  quizId,
  published,
  deleteQuiz,
  togglePublish,
}: QuizControlButtonsProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      deleteQuiz(quizId);
    }
  };

  const handlePublish = () => {
    togglePublish(quizId, !published);
    setOpen(false);
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentUser = useSelector((state: any) => state.accountReducer?.currentUser);

  if (currentUser?.role !== "FACULTY") return null;

  return (
    <div className="float-end d-flex align-items-center" ref={menuRef}>

      <span 
        className="ms-2"
        style={{ cursor: "pointer" }}
        onClick={ handlePublish }>
        {published ? (
          <GreenCheckmark />
        ) : (
          <CiNoWaitingSign className="text-muted fs-4" />
        )}
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
            href={`/Courses/${id}/Quizzes/${quizId}/Details`}
            className="text-decoration-none text-dark w-100"
          >
            <button className="dropdown-item text-start w-100 text-dark">Edit</button>
          </Link>

          <button
            className="dropdown-item text-start w-100"
            onClick={handlePublish}
          >
            {published ? "Unpublish" : "Publish"}
          </button>
        </div>
      )}
    </div>
  );
}
