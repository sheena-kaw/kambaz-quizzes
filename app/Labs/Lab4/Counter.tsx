import { useState } from "react";

export default function Counter() {

  const [count, setCount] = useState(7);
  console.log(count);

  return (
    <div id="wd-counter-use-state">
      <h3>Counter: {count}</h3>
      <button
        onClick={() => {
          setCount(count + 1);
          console.log(count);
        }}
        id="wd-counter-up-click"
      >
        Up
      </button>
      <button
        onClick={() => {
          setCount(count - 1);
          console.log(count);
        }}
        id="wd-counter-down-click"
      >
        Down
      </button>
      <hr />
    </div>
  );
}
