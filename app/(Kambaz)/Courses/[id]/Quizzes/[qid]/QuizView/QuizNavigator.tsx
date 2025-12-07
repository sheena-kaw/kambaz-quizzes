"use client";
import { ListGroup, ListGroupItem } from "react-bootstrap";

interface QuestionNavigatorProps {
  questions: any[];
  currentQuestionIndex: number;
  onSelectQuestion: (index: number) => void;
  answers: any;
  scoringResult?: any;
  userRole?: string;
}

export default function QuestionNavigator({
  questions,
  currentQuestionIndex,
  onSelectQuestion,
  answers,
  scoringResult,
  userRole,
}: QuestionNavigatorProps) {
  return (
    <div
      className="p-3 rounded"
      style={{ maxHeight: "600px", overflowY: "auto" }}
    >
      <h6 className="fw-bold mb-3">Questions</h6>
      <ListGroup className="gap-2">
        {questions.map((question, idx) => {
          const isCurrent = idx === currentQuestionIndex;

          return (
            <ListGroupItem
              key={question._id}
              onClick={() => onSelectQuestion(idx)}
              className={`cursor-pointer transition-all ${
                isCurrent
                  ? "bg-danger text-white border-danger"
                  : "bg-white hover:bg-light"
              }`}
              style={{
                cursor: "pointer",
                backgroundColor: isCurrent ? "#dc3545" : "white",
                color: isCurrent ? "white" : "black",
              }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <span className="fw-semibold">Question {idx + 1}</span>
              </div>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
}
