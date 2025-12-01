import { useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };

  const { todos } = useSelector((state: any) => state.todosReducer);

  return (
    <div id="wd-array-state-variables" className="container my-4">
      <h3>Array State Variable</h3>
      <br />
      <div className="d-flex mb-3">
        <button className="btn btn-success" onClick={addElement}>
          Add Element
        </button>
      </div>
      <ul className="list-group">
        {array.map((item, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {" "}
            <span>{item}</span>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteElement(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <ListGroup>
        {todos.map((todo: any) => (
          <ListGroupItem key={todo.id}>
            {todo.title}
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
      <hr className="mt-4" />
    </div>
  );
}
