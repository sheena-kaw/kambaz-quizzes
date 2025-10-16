"use client";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams } from "next/navigation";
import Link from "next/link";
import * as db from "../../../../Database";

export default function AssignmentEditor() {
  const { id, aid } = useParams();
  const assignments = db.assignments;
  const assignment = assignments.find((a: any) => a._id === aid);


  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue={assignment?.title} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={assignment?.description}
          />
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-points">
          <Form.Label column sm={2}>
            Points
          </Form.Label>
          <Col sm={4}>
            <Form.Control type="number" defaultValue={assignment?.points} />
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
                <br />
                <Form.Label className="fw-bold">
                  Online Entry Options:
                </Form.Label>
                <br />
                <Form.Check
                  type="checkbox"
                  label="Text Entry"
                  id="wd-text-entry"
                />
                <Form.Check
                  type="checkbox"
                  label="Website URL"
                  id="wd-website-url"
                />
                <Form.Check
                  type="checkbox"
                  label="Media Recordings"
                  id="wd-media-recordings"
                />
                <Form.Check
                  type="checkbox"
                  label="Student Annotation"
                  id="wd-student-annotation"
                />
                <Form.Check
                  type="checkbox"
                  label="File Upload"
                  id="wd-file-upload"
                />
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
                <Form.Control type="date" defaultValue={assignment?.due_num} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="wd-available-from">
                <Form.Label className="fw-bold">Available From</Form.Label>
                <Form.Control type="date" defaultValue={assignment?.avail_from_num} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="wd-available-until">
                <Form.Label className="fw-bold">Available Until</Form.Label>
                <Form.Control type="date" defaultValue={assignment?.avail_to_num} />
              </Form.Group>
            </div>
          </Col>
        </Form.Group>

        <div className="d-flex justify-content-end gap-2">
          <Link href={`/Courses/${id}/Assignments`}>
            <Button variant="secondary" id="wd-cancel">
              Cancel
            </Button>
          </Link>
          <Link href={`/Courses/${id}/Assignments`}>
            <Button variant="danger" id="wd-save">
              Save
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
