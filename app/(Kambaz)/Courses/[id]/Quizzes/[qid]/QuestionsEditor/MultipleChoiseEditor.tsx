"use client";
import { useState } from "react";
import { Button, Form, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaTrash, FaPlus } from "react-icons/fa6";

interface MultipleChoiceQuestion {
  _id: string;
  title: string;
  questionText: string;
  questionType: "MULTIPLE_CHOICE";
  points: number;
  choices: Array<{
    _id: string;
    text: string;
    isCorrect: boolean;
  }>;
}

interface MultipleChoiceQuestionEditorProps {
  question: MultipleChoiceQuestion;
  onUpdate: (updatedQuestion: MultipleChoiceQuestion) => void;
  onCancel: () => void;
}

export default function MultipleChoiceQuestionEditor({
  question,
  onUpdate,
  onCancel,
}: MultipleChoiceQuestionEditorProps) {
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

  const handleChoiceTextChange = (choiceId: string, text: string) => {
    setFormData({
      ...formData,
      choices: formData.choices.map((choice) =>
        choice._id === choiceId ? { ...choice, text } : choice
      ),
    });
  };

  const handleSetCorrectAnswer = (choiceId: string) => {
    setFormData({
      ...formData,
      choices: formData.choices.map((choice) => ({
        ...choice,
        isCorrect: choice._id === choiceId,
      })),
    });
  };

  const handleAddChoice = () => {
    const newChoice = {
      _id: Date.now().toString(),
      text: "",
      isCorrect: false,
    };
    setFormData({
      ...formData,
      choices: [...formData.choices, newChoice],
    });
  };

  const handleDeleteChoice = (choiceId: string) => {
    setFormData({
      ...formData,
      choices: formData.choices.filter((choice) => choice._id !== choiceId),
    });
  };

  const handleSave = () => {
    onUpdate(formData);
  };

  return (
    <div className="bg-light border border-secondary rounded p-4">
      <h5 className="fw-semibold mb-4">Edit Multiple Choice Question</h5>
     
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold">Question</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={formData.questionText}
          onChange={(e) => handleQuestionTextChange(e.target.value)}
          placeholder="Enter your question here"
        />
      </Form.Group>

    
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold mb-3">Answers</Form.Label>
        <ListGroup>
          {formData.choices.map((choice, idx) => (
            <ListGroupItem
              key={choice._id}
              className="d-flex gap-3 align-items-start py-3"
            >
              <Form.Check
                type="radio"
                name="correctAnswer"
                checked={choice.isCorrect}
                onChange={() => handleSetCorrectAnswer(choice._id)}
                className="mt-2"
              />
              <div className="flex-grow-1">
                <Form.Control
                  type="text"
                  value={choice.text}
                  onChange={(e) =>
                    handleChoiceTextChange(choice._id, e.target.value)
                  }
                  placeholder={`Possible Answer ${idx + 1}`}
                />
              </div>
              <Button
                variant="link"
                className="text-danger p-0 mt-2"
                onClick={() => handleDeleteChoice(choice._id)}
                title="Delete choice"
              >
                <FaTrash size={16} />
              </Button>
            </ListGroupItem>
          ))}
        </ListGroup>

       
        <Button
          variant="link"
          className="text-danger p-0 mt-3"
          onClick={handleAddChoice}
        >
          <FaPlus size={16} className="me-2" />
          Add Another Answer
        </Button>
      </Form.Group>

    
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
