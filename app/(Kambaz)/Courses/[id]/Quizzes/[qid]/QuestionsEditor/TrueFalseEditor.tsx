"use client";
import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

interface TrueFalseQuestion {
  _id: string;
  title: string;
  questionText: string;
  questionType: "TRUE_FALSE";
  points: number;
  correctAnswer: boolean;
}

interface TrueFalseQuestionEditorProps {
  question: TrueFalseQuestion;
  onUpdate: (updatedQuestion: TrueFalseQuestion) => void;
  onCancel: () => void;
}

export default function TrueFalseQuestionEditor({
  question,
  onUpdate,
  onCancel,
}: TrueFalseQuestionEditorProps) {
  const [formData, setFormData] = useState(question);

  const handleTitleChange = (title: string) => {
    setFormData({ ...formData, title });
  };

  const handlePointsChange = (points: number) => {
    setFormData({ ...formData, points });
  };

  const handleQuestionTextChange = (questionText: string) => {
    setFormData({ ...formData, questionText });
  };

  const handleCorrectAnswerChange = (correctAnswer: boolean) => {
    setFormData({ ...formData, correctAnswer });
  };

  const handleSave = () => {
    onUpdate(formData);
  };

  return (
    <div className="bg-light border border-secondary rounded p-4">
      <h5 className="fw-semibold mb-4">Edit True/False Question</h5>
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold">Question</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={formData.questionText}
          onChange={(e) => handleQuestionTextChange(e.target.value)}
          placeholder="Enter your true/false question here"
        />
      </Form.Group>

      {/* Correct Answer Selection */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold mb-3">Correct Answer</Form.Label>
        <div className="d-flex gap-4">
          <Form.Check
            type="radio"
            id="answer-true"
            name="correctAnswer"
            label="True"
            checked={formData.correctAnswer === true}
            onChange={() => handleCorrectAnswerChange(true)}
          />
          <Form.Check
            type="radio"
            id="answer-false"
            name="correctAnswer"
            label="False"
            checked={formData.correctAnswer === false}
            onChange={() => handleCorrectAnswerChange(false)}
          />
        </div>
      </Form.Group>

      {/* Action Buttons */}
      <div className="d-flex gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSave}>
          Update Question
        </Button>
      </div>
    </div>
  );
}
