"use client";

import PassingFunctions from "./PassingFunctions";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import ReduxExamples from "./ReduxExamples/page";
import store from "./store";
import { Provider } from "react-redux";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }

  return (
    <Provider store={store}>
      <div id="wd-passing-functions">
        <h2>Lab 4</h2>
        <br />
        <br />

        <ClickEvent />
        <br />
        <PassingDataOnEvent />
        <br />
        <PassingFunctions theFunction={sayHello} />
        <br />
        <EventObject />
        <br />
        <Counter />
        <br />
        <BooleanStateVariables />
        <br />
        <StringStateVariables />
        <br />
        <DateStateVariable />
        <br />
        <ObjectStateVariable />
        <br />
        <ArrayStateVariable />
        <br />
        <ParentStateComponent />
        <br />
        <ReduxExamples />
      </div>
    </Provider>
  );
}
