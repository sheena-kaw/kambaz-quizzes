"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Nav, Alert, Container, Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setQuizzes } from "../../Quizzes/reducer";
import QuizEditor from "./QuizEditor";
import QuestionsEditor from "./QuestionsEditor/QuestionsEditor";
import QuizPreview from "./QuizView/QuizPreview";
import {
  canEditQuiz,
  canTakeQuiz,
  canSeePreview,
} from "./utils/quizPermissions";
import * as client from "../../../client";

export default function QuizEditorPage() {
  const [activeTab, setActiveTab] = useState("details");
  const router = useRouter();
  const dispatch = useDispatch();
  const { id, qid } = useParams();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const currentUser = useSelector(
    (state: any) => state.accountReducer?.currentUser
  );

  const userRole = currentUser?.role;
  const isFaculty = userRole === "FACULTY";
  const isStudent = userRole === "STUDENT";

  // Form state
  const [isLoading, setLoading] = useState(true);
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
  const [assignedTo, setAssign] = useState("Everyone");

  // Load quiz data on mount
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
            const fetchedQuizzes = await client.findQuizzesForCourse(
              courseId as string
            );
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

  // Check if user can access this page
  if (!canSeePreview(userRole) && !canEditQuiz(userRole)) {
    return (
      <Container className="p-3">
        <Alert variant="danger">
          You do not have permission to access this quiz.
        </Alert>
      </Container>
    );
  }

  // Set default tab based on role
  if (activeTab === "details" && !isFaculty) {
    setActiveTab("preview");
  }

  const toInputDate = (d: string) => {
    const date = new Date(d);
    return date.toISOString().split("T")[0];
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString();

  const populateQuiz = (quiz: any) => {
    setTitle(quiz.title || "");
    setDescription(quiz.description || "");
    setPoints(quiz.points || "100");
    setDue(toInputDate(quiz.due || ""));
    setAvailableFrom(toInputDate(quiz.avail_from || ""));
    setAvailableUntil(toInputDate(quiz.avail_to || ""));
    setQuizType(quiz.quiz_type || "GRADED_QUIZ");
    setGroup(quiz.assignment_group || "QUIZZES");
    setShuffle(quiz.shuffle || false);
    setTime(quiz.time_limit || "20");
    setAttempts(quiz.attempts || false);
    setAttemptsNum(quiz.attempts_num || "1");
    setShowCorrect(quiz.show_correct || false);
    setAccessCode(quiz.access_code || "");
    setOneQuestion(quiz.one_question || false);
    setWebcam(quiz.webcam || false);
    setLock(quiz.lock_question || false);
    setPublish(quiz.published || false);
    setAssign(quiz.assigned_to || "Everyone");
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
      assigned_to: assignedTo,
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

  const handleTabSelect = (tabKey: string | null) => {
    const tab = tabKey || "preview";

    // Check permissions for selected tab
    if ((tab === "details" || tab === "questions") && !isFaculty) {
      return; // Don't switch tab
    }

    setActiveTab(tab);
  };

  if (isLoading) {
    return <div className="p-3">Loading quiz...</div>;
  }

  return (
    <div className="p-3">
      <Nav variant="tabs" activeKey={activeTab} onSelect={handleTabSelect}>
        {/* Quiz Details Tab - Faculty Only */}
        {isFaculty && (
          <Nav.Item>
            <Nav.Link
              eventKey="details"
              className={
                activeTab === "details"
                  ? "border-2 border-black text-black"
                  : "text-danger"
              }
            >
              Quiz Details
            </Nav.Link>
          </Nav.Item>
        )}

        {/* Questions Tab - Faculty Only */}
        {isFaculty && (
          <Nav.Item>
            <Nav.Link
              eventKey="questions"
              className={
                activeTab === "questions"
                  ? "border-2 border-black text-black"
                  : "text-danger"
              }
            >
              Questions
            </Nav.Link>
          </Nav.Item>
        )}

        {/* Preview Tab - Faculty and Students */}
        <Nav.Item>
          <Nav.Link
            eventKey="preview"
            className={
              activeTab === "preview"
                ? "border-2 border-black text-black"
                : "text-danger"
            }
          >
            Preview
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Tab Content */}
      <div className="bg-white p-4 rounded-bottom">
        {/* Details Tab Content */}
        {activeTab === "details" && isFaculty && (
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
                        value={assignedTo}
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
                  router.push(`/Courses/${id}/Quizzes`);
                }}
              >
                Save
              </Button>
              <Button
                variant="danger"
                id="wd-save-publish"
                onClick={async () => {
                  await handleSave(true);
                  router.push(`/Courses/${id}/Quizzes`);
                }}
              >
                Save and Publish
              </Button>
            </div>
          </Form>
        )}

        {/* Questions Tab */}
        {activeTab === "questions" && isFaculty && <QuestionsEditor />}

        {/* Preview Tab */}
        {activeTab === "preview" && <QuizPreview userRole={userRole} />}

        {/* Unauthorized Access Messages */}
        {activeTab === "details" && !isFaculty && (
          <Alert variant="warning">
            You do not have permission to edit quiz details.
          </Alert>
        )}

        {activeTab === "questions" && !isFaculty && (
          <Alert variant="warning">
            You do not have permission to edit quiz questions.
          </Alert>
        )}
      </div>
    </div>
  );
}
