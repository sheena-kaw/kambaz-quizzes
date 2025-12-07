"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Nav, Alert, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import QuizEditor from "./QuizEditor";
import QuestionsEditor from "./QuestionsEditor/QuestionsEditor";
import QuizPreview from "./QuizView/QuizPreview";
import {
  canEditQuiz,
  canTakeQuiz,
  canSeePreview,
} from "./utils/quizPermissions";

export default function QuizEditorPage( {}) {
  const [activeTab, setActiveTab] = useState("details");
  const router = useRouter();
  const { id, qid } = useParams();
  const currentUser = useSelector(
    (state: any) => state.accountReducer?.currentUser
  );

  const userRole = currentUser?.role;
  const isFaculty = userRole === "FACULTY";
  const isStudent = userRole === "STUDENT";

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

  const handleTabSelect = (tabKey: string | null) => {
    const tab = tabKey || "preview";

    // Check permissions for selected tab
    if ((tab === "details" || tab === "questions") && !isFaculty) {
      return; // Don't switch tab
    }

    setActiveTab(tab);
  };

  const handleClose = () => {
    router.push(`/Courses/${id}/Quizzes`);
  };

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
        {activeTab === "details" && isFaculty && <QuizEditor />}

        {activeTab === "questions" && isFaculty && <QuestionsEditor />}

        {activeTab === "preview" && <QuizPreview userRole={userRole} />}

        {/* Unauthorized Access Message */}
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
