"use client";

import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function HeaderControlButtons() {

  const router = useRouter();
  const { id } = useParams();
  const currentUser = useSelector((state: any) => state.accountReducer?.currentUser);

  if (currentUser?.role !== "FACULTY") return null;

  return (
    <div className="float-end">
      <FaPlus 
        className="ms-2"
        role="button"
        onClick={() => router.push(`/Courses/${id}/Quizzes/New`)} />
      <IoEllipsisVertical className="fs-4 ms-3" />
    </div>
  );
}
