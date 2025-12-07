"use client";
import { useState } from "react";
import { Button, Form, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaTrash, FaPlus } from "react-icons/fa6";

interface FillInTheBlankQuestion {
  _id: string;
  questionText: string;
  questionType: "FILL_IN_THE_BLANK";
  points: number;
  possibleAnswers: Array<{
    _id: string;
    text: string;
    caseInsensitive: boolean;
  }>;
}

interface FillInTheBlankQuestionEditorProps {
  question: FillInTheBlankQuestion;
  onUpdate: (updatedQuestion: FillInTheBlankQuestion) => void;
  onCancel: () => void;
}

export default function FillInTheBlankQuestionEditor({
  question,
  onUpdate,
  onCancel,
}: FillInTheBlankQuestionEditorProps) {
  const [formData, setFormData] = useState(question);

  const handleQuestionTextChange = (questionText: string) => {
    setFormData({ ...formData, questionText });
  };

  const handlePointsChange = (points: number) => {
    setFormData({ ...formData, points });
  };

  const handleAnswerTextChange = (answerId: string, text: string) => {
    setFormData({
      ...formData,
      possibleAnswers: formData.possibleAnswers.map((answer) =>
        answer._id === answerId ? { ...answer, text } : answer
      ),
    });
  };

  const handleCaseInsensitiveChange = (answerId: string) => {
    setFormData({
      ...formData,
      possibleAnswers: formData.possibleAnswers.map((answer) =>
        answer._id === answerId
          ? { ...answer, caseInsensitive: !answer.caseInsensitive }
          : answer
      ),
    });
  };

  const handleAddAnswer = () => {
    const newAnswer = {
      _id: Date.now().toString(),
      text: "",
      caseInsensitive: true,
    };
    setFormData({
      ...formData,
      possibleAnswers: [...formData.possibleAnswers, newAnswer],
    });
  };

  const handleDeleteAnswer = (answerId: string) => {
    setFormData({
      ...formData,
      possibleAnswers: formData.possibleAnswers.filter(
        (answer) => answer._id !== answerId
      ),
    });
  };

  const handleSave = () => {
    onUpdate(formData);
  };

  return (
    <div className="bg-light border border-secondary rounded p-4">
      <h5 className="fw-semibold mb-4">Edit Fill in the Blank Question</h5>

      {/* Points */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold">Points</Form.Label>
        <Form.Control
          type="number"
          value={formData.points}
          onChange={(e) => handlePointsChange(parseInt(e.target.value))}
          min="1"
          style={{ maxWidth: "150px" }}
        />
      </Form.Group>

      {/* Question Text */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold">Question</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={formData.questionText}
          onChange={(e) => handleQuestionTextChange(e.target.value)}
          placeholder="Enter your question here. Use _____ to indicate where the blank should be."
        />
        <Form.Text className="text-muted mt-2 d-block">
          Use _____ in your question to show where the blank should be.
        </Form.Text>
      </Form.Group>

      {/* Possible Answers */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold mb-3">Possible Answers</Form.Label>
        <ListGroup>
          {formData.possibleAnswers.map((answer, idx) => (
            <ListGroupItem
              key={answer._id}
              className="d-flex gap-3 align-items-start py-3"
            >
              <div className="flex-grow-1">
                <Form.Control
                  type="text"
                  value={answer.text}
                  onChange={(e) =>
                    handleAnswerTextChange(answer._id, e.target.value)
                  }
                  placeholder={`Possible Answer ${idx + 1}`}
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  label="Case insensitive"
                  checked={answer.caseInsensitive}
                  onChange={() => handleCaseInsensitiveChange(answer._id)}
                />
              </div>
              <Button
                variant="link"
                className="text-danger p-0 mt-2"
                onClick={() => handleDeleteAnswer(answer._id)}
                title="Delete answer"
              >
                <FaTrash size={16} />
              </Button>
            </ListGroupItem>
          ))}
        </ListGroup>

        {/* Add Another Answer */}
        <Button
          variant="link"
          className="text-danger p-0 mt-3"
          onClick={handleAddAnswer}
        >
          <FaPlus size={16} className="me-2" />
          Add Another Answer
        </Button>
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
