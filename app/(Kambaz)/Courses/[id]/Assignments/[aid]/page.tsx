"use client";

import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../../Assignments/reducer";
import { useEffect, useState } from "react";

export default function AssignmentEditor() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id, aid } = useParams();
  const assignments = useSelector(
    (state: any) => state.assignmentsReducer.assignments
  );
  const existing = assignments.find((a: any) => a._id === aid);

  // const [title, setTitle] = useState(existing?.title || "");
  // const [description, setDescription] = useState(existing?.description || "");
  // const [points, setPoints] = useState(existing?.points || "100");
  // const [due, setDue] = useState(existing?.due_num || "");
  // const [availableFrom, setAvailableFrom] = useState(existing?.avail_from_num || "");
  // const [availableUntil, setAvailableUntil] = useState(existing?.avail_to_num || "");

  // const handleSave = () => {
  //   if (!existing) {
  //     dispatch(
  //       addAssignment({
  //         _id: `A${Math.floor(Math.random() * 1000)}`,
  //         title,
  //         description,
  //         points,
  //         due_num: due,
  //         avail_from_num: availableFrom,
  //         avail_to_num: availableUntil,
  //         due: new Date(due).toLocaleDateString(),
  //         available: new Date(availableFrom).toLocaleDateString(),
  //         course: id,
  //       })
  //     );
  //   }
  //   router.push(`/Courses/${id}/Assignments`);
  // };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("100");
  const [due, setDue] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");

  // Populate state if editing
  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setDescription(existing.description);
      setPoints(existing.points);
      setDue(existing.due_num);
      setAvailableFrom(existing.avail_from_num);
      setAvailableUntil(existing.avail_to_num);
    }
  }, [existing]);

  // Save handler
  const handleSave = () => {
    if (existing) {
      // ✅ Update existing assignment
      dispatch(
        updateAssignment({
          ...existing,
          title,
          description,
          points,
          due_num: due,
          avail_from_num: availableFrom,
          avail_to_num: availableUntil,
          due: new Date(due).toLocaleDateString(),
          available: new Date(availableFrom).toLocaleDateString(),
        })
      );
    } else {
      // ✅ Create new assignment
      dispatch(
        addAssignment({
          _id: `A${Math.floor(Math.random() * 1000)}`,
          title,
          description,
          points,
          due_num: due,
          avail_from_num: availableFrom,
          avail_to_num: availableUntil,
          due: new Date(due).toLocaleDateString(),
          available: new Date(availableFrom).toLocaleDateString(),
          course: id,
        })
      );
    }
    router.push(`/Courses/${id}/Assignments`);
  };

  // Cancel handler
  const handleCancel = () => router.push(`/Courses/${id}/Assignments`);

  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-points">
          <Form.Label column sm={2}>
            Points
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-group">
          <Form.Label column sm={2}>
            Assignment Group
          </Form.Label>
          <Col sm={4}>
            <Form.Select defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECTS">PROJECTS</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-display-grade-as">
          <Form.Label column sm={2}>
            Display Grade as
          </Form.Label>
          <Col sm={4}>
            <Form.Select defaultValue="PERCENTAGE">
              <option value="PERCENTAGE">Percentage</option>
              <option value="LETTER">Letter</option>
              <option value="NUMBER">Number</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-submission-section">
          <Form.Label column sm={2}>
            Submission Type
          </Form.Label>
          <Col sm={6}>
            <div className="border p-3 rounded">
              <Form.Group className="mb-3" controlId="wd-submission-type">
                <Form.Select defaultValue="ONLINE">
                  <option value="ONLINE">Online</option>
                  <option value="PAPER">Paper</option>
                  <option value="EMAIL">Email</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="wd-online-entry-options">
                <Form.Label className="fw-bold">
                  Online Entry Options:
                </Form.Label>
                <br />
                <Form.Check type="checkbox" label="Text Entry" />
                <Form.Check type="checkbox" label="Website URL" />
                <Form.Check type="checkbox" label="Media Recordings" />
                <Form.Check type="checkbox" label="Student Annotation" />
                <Form.Check type="checkbox" label="File Upload" />
              </Form.Group>
            </div>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-assign-section">
          <Form.Label column sm={2}>
            Assign
          </Form.Label>
          <Col sm={6}>
            <div className="border p-3 rounded">
              <Form.Group className="mb-3" controlId="wd-assign-to">
                <Form.Label className="fw-bold">Assign To</Form.Label>
                <Form.Control type="text" defaultValue="Everyone" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="wd-due-date">
                <Form.Label className="fw-bold">Due</Form.Label>
                <Form.Control
                  type="date"
                  value={due}
                  onChange={(e) => setDue(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="wd-available-from">
                <Form.Label className="fw-bold">Available From</Form.Label>
                <Form.Control
                  type="date"
                  value={availableFrom}
                  onChange={(e) => setAvailableFrom(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="wd-available-until">
                <Form.Label className="fw-bold">Available Until</Form.Label>
                <Form.Control
                  type="date"
                  value={availableUntil}
                  onChange={(e) => setAvailableUntil(e.target.value)}
                />
              </Form.Group>
            </div>
          </Col>
        </Form.Group>

        <div className="d-flex justify-content-end gap-2">
          <Button
            variant="secondary"
            id="wd-cancel"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button variant="danger" id="wd-save" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
