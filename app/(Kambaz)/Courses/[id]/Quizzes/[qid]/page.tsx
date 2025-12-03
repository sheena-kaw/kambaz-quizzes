"use client";

import { Form, Button, Row, Col, Nav, NavItem, NavLink } from "react-bootstrap";
import { useParams, useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setQuizzes } from "../../Quizzes/reducer";
import { useEffect, useState } from "react";
import * as client from "../../../client";

export default function QuizEditor() {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { id, qid } = useParams();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);

  const detailsEditorPath = `/Courses/${id}/Quizzes/${qid}`;
  const questionsPath = `/Courses/${id}/Quizzes/${qid}/Questions`;

  const [title, setTitle] = useState("New quiz");
  const [description, setDescription] = useState("Quiz details...");
  const [points, setPoints] = useState("100");
  const [due, setDue] = useState("2015-12-18");
  const [availableFrom, setAvailableFrom] = useState("2015-12-11");
  const [availableUntil, setAvailableUntil] = useState("2015-12-20");

  const [quizType, setQuizType] = useState("GRADED_QUIZ");
  const [assignmentGroup, setGroup] = useState("QUIZZES");
  const [shuffle, setShuffle] = useState(true);
  const [timeLimit, setTime] = useState("20");
  const [attempts, setAttempts] = useState(false);
  const [attemptsNum, setAttemptsNum] = useState("1");
  const [showCorrect, setShowCorrect] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [oneQuestion, setOneQuestion] = useState(true);
  const [webcam, setWebcam] = useState(false);
  const [lockQuestion, setLock] = useState(false);
  const [published, setPublish] = useState(false);
  const [assigedTo, setAssign] = useState("Everyone");
  const [isLoading, setLoading] = useState(true);

  const currentUser = useSelector(
    (state: any) => state.accountReducer?.currentUser
  );

  const toInputDate = (d: string) => {
    const date = new Date(d);
    return date.toISOString().split("T")[0];
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString();

  useEffect(() => {
    const loadQuizData = async () => {
      setLoading(true);
      
      if (qid) {
        const existing = quizzes.find((q: any) => q._id === qid);
        
        if (existing) {
          populateQuiz(existing);
        } else {
          try {
            const courseId = Array.isArray(id) ? id[0] : id;
            const fetchedQuizzes = await client.findQuizzesForCourse(courseId as string);
            dispatch(setQuizzes(fetchedQuizzes));
            
            const quiz = fetchedQuizzes.find((q: any) => q._id === qid);
            if (quiz) {
              populateQuiz(quiz);
            }
          } catch (error) {
            console.error("Error fetching quiz:", error);
          }
        }
      }
      
      setLoading(false);
    };

    loadQuizData();
  }, [qid, id]);

  const populateQuiz = (quiz: any) => {
    setTitle(quiz.title);
    setDescription(quiz.description);
    setPoints(quiz.points);
    setDue(toInputDate(quiz.due));
    setAvailableFrom(toInputDate(quiz.avail_from));
    setAvailableUntil(toInputDate(quiz.avail_to));

    setQuizType(quiz.quiz_type);
    setGroup(quiz.assignment_group);
    setShuffle(quiz.shuffle);
    setTime(quiz.time_limit);
    setAttempts(quiz.attempts);
    setAttemptsNum(quiz.attempts_num);
    setShowCorrect(quiz.show_correct);
    setAccessCode(quiz.access_code);
    setOneQuestion(quiz.one_question);
    setWebcam(quiz.webcam);
    setLock(quiz.lock_question);
    setPublish(quiz.published);
    setAssign(quiz.assigned_to);
  };

  const handleSave = async (publishValue = published) => {
    if (currentUser?.role !== "FACULTY") {
      alert("Only faculty members can edit quizzes.");
      return;
    }

    const quizInfo = {
      title,
      description,
      points,
      avail_from: formatDate(availableFrom),
      avail_to: formatDate(availableUntil),
      due: formatDate(due),
      course: id,

      quiz_type: quizType,
      assignment_group: assignmentGroup,
      shuffle,
      time_limit: timeLimit,
      attempts,
      attempts_num: attemptsNum,
      show_correct: showCorrect,
      access_code: accessCode,
      one_question: oneQuestion,
      webcam,
      lock_question: lockQuestion,
      published: publishValue,
      assigned_to: assigedTo,
    };

    const existing = quizzes.find((q: any) => q._id === qid);

    if (existing) {
      const updatedQuiz = await client.updateQuiz(id as string, {
        ...existing,
        ...quizInfo,
      });

      dispatch(
        setQuizzes(
          quizzes.map((q: any) => (q._id === updatedQuiz._id ? updatedQuiz : q))
        )
      );

      return updatedQuiz;
    } else {
      const courseId = Array.isArray(id) ? id[0] : id;
      const newQuiz = await client.createQuizForCourse(
        courseId as string,
        quizInfo
      );
      dispatch(setQuizzes([...quizzes, newQuiz]));
      return newQuiz;
    }
  };

  const handleCancel = () => router.push(`/Courses/${id}/Quizzes`);

  if (isLoading) {
    return <div className="p-3">Loading quiz...</div>;
  }

  return (
    <div id="wd-quizzes-editor" className="p-3">
      <div id="wd-css-navigating-with-tabs">
        <Nav variant="tabs">
          <NavItem>
            <NavLink
              href={detailsEditorPath}
              active={pathname === detailsEditorPath}
            >
              Details
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href={questionsPath}
              active={pathname === questionsPath}
            >
              Questions
            </NavLink>
          </NavItem>
        </Nav>
      </div>
      <br />
      <br />

      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Quiz Name</Form.Label>
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

        <Form.Group as={Row} className="mb-3" controlId="wd-type">
          <Form.Label column sm={2}>
            Quiz Type
          </Form.Label>
          <Col sm={4}>
            <Form.Select
              value={quizType}
              onChange={(e) => setQuizType(e.target.value)}
            >
              <option value="GRADED_QUIZ">Graded Quiz</option>
              <option value="PRACTICE_QUIZ">Practice Quiz</option>
              <option value="GRADED_SURVEY">Graded Survey</option>
              <option value="UNGRADED_SURVEY">Ungraded Survey</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-group">
          <Form.Label column sm={2}>
            Assignment Group
          </Form.Label>
          <Col sm={4}>
            <Form.Select
              value={assignmentGroup}
              onChange={(e) => setGroup(e.target.value)}
            >
              <option value="ASSIGNMENTS">Assignments</option>
              <option value="QUIZZES">Quizzes</option>
              <option value="EXAMS">Exams</option>
              <option value="PROJECTS">Projects</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-options">
          <Form.Label column sm={2}>
            Options
          </Form.Label>
          <Col sm={6}>
            <div className="border p-3 rounded d-flex flex-column gap-3">
              <Form.Check
                type="checkbox"
                label="Shuffle Questions"
                checked={shuffle}
                onChange={(e) => setShuffle(e.target.checked)}
              />

              <Form.Group as={Row} controlId="wd-time-limit">
                <Form.Label column sm={6}>
                  Time Limit (minutes)
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    type="number"
                    value={timeLimit}
                    onChange={(e) => setTime(e.target.value)}
                    disabled={false}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="wd-attempts">
                <Col sm={6}>
                  <Form.Check
                    type="checkbox"
                    label="Allow Multiple Attempts"
                    checked={attempts}
                    onChange={(e) => setAttempts(e.target.checked)}
                  />
                </Col>
                <Col sm={6}>
                  <Form.Control
                    type="number"
                    min="1"
                    value={attemptsNum}
                    onChange={(e) => setAttemptsNum(e.target.value)}
                    disabled={!attempts}
                  />
                </Col>
              </Form.Group>

              <Form.Check
                type="checkbox"
                label="Show Correct Answers after Submission"
                checked={showCorrect}
                onChange={(e) => setShowCorrect(e.target.checked)}
              />

              <Form.Check
                type="checkbox"
                label="Show One Question at a Time"
                checked={oneQuestion}
                onChange={(e) => setOneQuestion(e.target.checked)}
              />

              <Form.Check
                type="checkbox"
                label="Require Webcam"
                checked={webcam}
                onChange={(e) => setWebcam(e.target.checked)}
              />

              <Form.Check
                type="checkbox"
                label="Lock Questions After Answering"
                checked={lockQuestion}
                onChange={(e) => setLock(e.target.checked)}
              />
            </div>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-access">
          <Form.Label column sm={2}>
            Access Code
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="string"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
            />
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
                <Col sm={4}>
                  <Form.Control
                    type="string"
                    value={assigedTo}
                    onChange={(e) => setAssign(e.target.value)}
                  />
                </Col>
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
          <Button variant="secondary" id="wd-cancel" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="danger"
            id="wd-save"
            onClick={async () => {
              const savedQuiz = await handleSave();
              router.push(`/Courses/${id}/Quizzes/${savedQuiz._id}/Details`);
            }}
          >
            Save
          </Button>
          <Button
            variant="danger"
            id="wd-save-publish"
            onClick={() => {
              handleSave(true);
              router.push(`/Courses/${id}/Quizzes`);
            }}
          >
            Save and Publish
          </Button>
        </div>
      </Form>
    </div>
  );
}
