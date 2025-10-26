import HelloRedux from "./HelloRedux/page";
import CounterRedux from "./CounterRedux/page";
import AddRedux from "./AddRedux/page";
import TodoList from "./todos/TodoList";

export default function ReduxExamples() {
  return(
    <div>
      <h3>Redux Examples</h3>

      <br />
      <HelloRedux />
      <br />
      <CounterRedux />
      <br />
      <AddRedux />
      <br />
      <TodoList />
    </div>
  );
};
