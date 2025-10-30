"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  FormControl,
  Row,
} from "react-bootstrap";
import "../styles.css";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { enrollInCourse, unenrollFromCourse } from "./reducer";

export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const dispatch = useDispatch();

  const isFaculty = currentUser?.role === "FACULTY";

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/teslabot.jpg",
    description: "New Description",
  });

  const toggleEnrollmentsView = () => setShowAllCourses(!showAllCourses);

  const isUserEnrolled = (courseId: string) =>
    enrollments.some(
      (enr: any) => enr.user === currentUser._id && enr.course === courseId
    );

  const visibleCourses = showAllCourses
    ? courses
    : courses.filter((course: any) => isUserEnrolled(course._id));

  if (!currentUser) {
    return (
      <div className="text-center mt-5">
        <h3>Loading dashboard...</h3>
      </div>
    );
  }

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <Button
          variant="primary"
          className="float-end"
          onClick={toggleEnrollmentsView}
        >
          {showAllCourses ? "Show My Enrollments" : "Show All Courses"}
        </Button>
      </div>
      <hr />

      {isFaculty && (
        <>
          <h4>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addNewCourse(course))}
            >
              Add
            </button>
            <button
              className="btn btn-pink float-end me-2"
              onClick={() => dispatch(updateCourse(course))}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h4>
          <hr />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <br />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "My Enrolled Courses"} (
        {visibleCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((course: any) => {
            const enrolled = isUserEnrolled(course._id);

            return (
              <Col
                key={course._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  <CardImg
                    src="/images/teslabot.jpg"
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>

                    <div className="d-flex justify-content-between align-items-center">
                      {isFaculty && (
                        <>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(deleteCourse(course._id));
                            }}
                            className="btn btn-danger"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                          <button
                            id="wd-edit-course-click"
                            onClick={(e) => {
                              e.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-pink me-2"
                          >
                            Edit
                          </button>
                        </>
                      )}

                      {/* {!isFaculty && (
                        <> */}
                      {enrolled ? (
                        <Button
                          variant="danger"
                          onClick={() =>
                            dispatch(
                              unenrollFromCourse({
                                user: currentUser._id,
                                courseId: course._id,
                              })
                            )
                          }
                        >
                          Unenroll
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          onClick={() =>
                            dispatch(
                              enrollInCourse({
                                user: currentUser._id,
                                courseId: course._id,
                              })
                            )
                          }
                        >
                          Enroll
                        </Button>
                      )}
                      {/* </>
                      )} */}

                      {enrolled && (
                        <Link
                          href={`/Courses/${course._id}/Home`}
                          className="wd-dashboard-course-link text-decoration-none text-dark"
                        >
                          <Button variant="primary">Go</Button>
                        </Link>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
