import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enrollments as dbEnrollments } from "../Database";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: dbEnrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
    },
    enrollInCourse: (
      state,
      action: PayloadAction<{ user: string; courseId: string }>
    ) => {
      const { user, courseId } = action.payload;
      state.enrollments.push({
        _id: Date.now().toString(),
        user,
        course: courseId,
      });
    },
    unenrollFromCourse: (
      state,
      action: PayloadAction<{ user: string; courseId: string }>
    ) => {
      const { user, courseId } = action.payload;
      state.enrollments = state.enrollments.filter(
        (enr) => !(enr.user === user && enr.course === courseId)
      );
    },
  },
});

export const { setEnrollments, enrollInCourse, unenrollFromCourse } =
  enrollmentsSlice.actions;

export default enrollmentsSlice.reducer;
