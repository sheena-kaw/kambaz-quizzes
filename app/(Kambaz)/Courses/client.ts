import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;

//COURSES
export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const fetchUsersForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/users`
  );
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: any) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

//MODULES
export const findModulesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

const MODULES_API = `${HTTP_SERVER}/api/modules`;

export const deleteModule = async (courseId: string, moduleId: string) => {
  const response = await axios.delete(
    `${COURSES_API}/${courseId}/modules/${moduleId}`
  );
  return response.data;
};

export const updateModule = async (courseId: string, module: any) => {
  const { data } = await axios.put(
    `${COURSES_API}/${courseId}/modules/${module._id}`,
    module
  );
  return data;
};

//ASSIGNMENTS
export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const createAssignmentForCourse = async (
  courseId: string,
  assignment: any
) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

export const deleteAssignment = async (
  courseId: string,
  assignmentId: string
) => {
  const response = await axios.delete(
    `${COURSES_API}/${courseId}/assignments/${assignmentId}`
  );
  return response.data;
};

export const updateAssignment = async (courseId: string, assignment: any) => {
  const { data } = await axios.put(
    `${COURSES_API}/${courseId}/assignments/${assignment._id}`,
    assignment
  );
  return data;
};

//ENROLLMENTS
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;
export const findAllEnrollments = async () => {
  const { data } = await axios.get(ENROLLMENTS_API);
  return data;
};

export const findEnrollmentsForUser = async (userId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/${userId}/enrollments`
  );
  return data;
};

export const enrollInCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/${userId}/enrollments/${courseId}`
  );
  return data;
};

export const enrollIntoCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return response.data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.delete(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return response.data;
};

export const findUsersForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/users`);
  return response.data;
};

//Quizzes
export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const createQuizForCourse = async (courseId: string, quiz: any) => {
  const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
  return response.data;
};

export const deleteQuiz = async (courseId: string, quizId: string) => {
  const response = await axios.delete(
    `${COURSES_API}/${courseId}/quizzes/${quizId}`
  );
  return response.data;
};

export const updateQuiz = async (courseId: string, quiz: any) => {
  const { data } = await axios.put(
    `${COURSES_API}/${courseId}/quizzes/${quiz._id}`,
    quiz
  );
  return data;
};

// QUIZ QUESTIONS ##################

export const findQuestionsForQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${HTTP_SERVER}/api/quizzes/${quizId}/questions`
  );
  return data;
};

export const createQuestion = async (quizId: string, question: any) => {
  const { data } = await axiosWithCredentials.post(
    `${HTTP_SERVER}/api/quizzes/${quizId}/questions`,
    question
  );
  return data;
};

export const updateQuestion = async (
  quizId: string,
  questionId: string,
  question: any
) => {
  const { data } = await axiosWithCredentials.put(
    `${HTTP_SERVER}/api/quizzes/${quizId}/questions/${questionId}`,
    question
  );
  return data;
};

export const deleteQuestion = async (quizId: string, questionId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${HTTP_SERVER}/api/quizzes/${quizId}/questions/${questionId}`
  );
  return data;
};

export const getQuizWithQuestions = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${HTTP_SERVER}/api/quizzes/${quizId}/full`
  );
  return data;
};

export const submitQuiz = async (
  quizId: string,
  studentId: string,
  courseId: string,
  answers: any,
  score: any,
  attemptNumber: number,
  results: any
) => {
  console.log("submitQuiz client called with:", {
    quizId,
    studentId,
    courseId,
    answers,
    score,
    attemptNumber,
    results,
  });
  const { data } = await axiosWithCredentials.post(
    `${HTTP_SERVER}/api/quizzes/${quizId}/submit`,
    {
      studentId,
      courseId,
      answers,
      score,
      attemptNumber,
      results,
    }
  );
  return data;
};

export const getStudentSubmissionsForQuiz = async (
  quizId: string,
  studentId: string
) => {
  const { data } = await axiosWithCredentials.get(
    `${HTTP_SERVER}/api/quizzes/${quizId}/submissions/student/${studentId}`
  );
  return data;
};

export const getLatestSubmission = async (
  quizId: string,
  studentId: string
) => {
  const { data } = await axiosWithCredentials.get(
    `${HTTP_SERVER}/api/quizzes/${quizId}/submissions/latest/${studentId}`
  );
  return data;
};

export const getAttemptCount = async (quizId: string, studentId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${HTTP_SERVER}/api/quizzes/${quizId}/attempts/${studentId}`
  );
  return data;
};

export const getAllSubmissionsForQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${HTTP_SERVER}/api/quizzes/${quizId}/submissions`
  );
  return data;
};

export const getSubmission = async (submissionId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${HTTP_SERVER}/api/submissions/${submissionId}`
  );
  return data;
};
