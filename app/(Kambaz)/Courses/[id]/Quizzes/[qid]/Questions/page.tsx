"use client";

import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useParams, usePathname } from "next/navigation";

export default function QuizQuestions() {
  const pathname = usePathname();
  const { id, qid } = useParams();

  const detailsEditorPath = `/Courses/${id}/Quizzes/${qid}`;
  const questionsPath = `/Courses/${id}/Quizzes/${qid}/Questions`;

  return (
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
          <NavLink href={questionsPath} active={pathname === questionsPath}>
            Questions
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}
