"use client";

import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useParams, useRouter } from "next/navigation";

export default function HeaderControlButtons() {

  const router = useRouter();
  const { id } = useParams();

  return (
    <div className="float-end">
      <FaPlus 
        className="ms-2"
        role="button"
        onClick={() => router.push(`/Courses/${id}/Assignments/New`)} />
      <IoEllipsisVertical className="fs-4 ms-3" />
    </div>
  );
}
