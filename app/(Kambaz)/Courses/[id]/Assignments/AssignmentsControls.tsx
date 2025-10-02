import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";

export default function AssignmentsControls() {
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
          id="wd-search-assignment"
          className="form-control"
        />
      </div>
      <div className="d-flex gap-2 ms-auto">
        <Button
          variant="secondary"
          size="lg"
          className="me-1 float-end"
          id="wd-add-module-btn"
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
          id="wd-add-module-btn"
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Assignment
        </Button>
      </div>
    </div>
  );
}
