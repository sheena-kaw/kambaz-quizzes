import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

export default function HeaderControlButtons() {
  return (
    <div className="float-end">
      <FaPlus className="ms-2" />
      <IoEllipsisVertical className="fs-4 ms-3" />
    </div>
  );
}
