import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/[id]/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/[id]/Assignments/reducer";
import enrollmentsReducer from "./Dashboard/reducer";
import quizzesReducer from "./Courses/[id]/Quizzes/reducer";

const store = configureStore({
  reducer: { 
    coursesReducer,
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer,
    quizzesReducer,
   },
});

export default store;
