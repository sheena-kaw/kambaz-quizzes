import { ListGroupItem, Button } from "react-bootstrap";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({
  todo
}: {
  todo: { id: string; title: string };
}) {

  const dispatch = useDispatch();

  return (
    <ListGroupItem
      className="d-flex align-items-center justify-content-between"
      key={todo.id}
    >
      <span>{todo.title}</span>
      <div className="d-flex align-items-center gap-2">
        <Button 
          variant="danger"
          size="sm"
          onClick={() => dispatch(deleteTodo(todo.id))} 
          id="wd-delete-todo-click">
          {" "}
          Delete{" "}
        </Button>
        <Button 
          variant="primary"
          size="sm"
          onClick={() => dispatch(setTodo(todo))} 
          id="wd-set-todo-click">
          {" "}
          Edit{" "}
        </Button>
      </div>
    </ListGroupItem>
  );
}
