"use client";

import { useEffect, useState } from "react";
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
import * as client from "../Courses/client";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../Courses/reducer";
import { setEnrollments } from "./reducer";

export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const dispatch = useDispatch();

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

  const fetchCourses = async () => {
    try {
      const courses = await client.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const enrollments = await client.findEnrollmentsForUser("current");
      dispatch(setEnrollments(enrollments));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="text-center mt-5">
        <h3>Loading dashboard...</h3>
      </div>
    );
  }

  const isFaculty = currentUser?.role === "FACULTY";

  const toggleEnrollmentsView = async () => {
    if (!showAllCourses) {
      const allCourses = await client.fetchAllCourses();
      dispatch(setCourses(allCourses));
    } else {
      await fetchCourses();
    }
    setShowAllCourses(!showAllCourses);
  };

  // const isUserEnrolled = (courseId: string) =>
  //   enrollments.some((course: any) => String(course._id) === String(courseId));

  const isUserEnrolled = (courseId: string) =>
  enrollments.some((course: any) => course && String(course._id) === String(courseId));

  const visibleCourses = showAllCourses
    ? courses
    : courses.filter((course: any) => isUserEnrolled(course._id));

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(
      setCourses(
        courses.filter((course: { _id: string }) => course._id !== courseId)
      )
    );
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(
      setCourses(
        courses.map((c: { _id: any }) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        })
      )
    );
  };

  //   const handleEnroll = async (courseId: string) => {
  //   try {
  //     const enrollment = await client.enrollInCourse("current", courseId);
  //     const updatedEnrollments = await client.findEnrollmentsForUser("current");
  //     dispatch(setEnrollments(updatedEnrollments));

  //     const allCourses = await client.fetchAllCourses();
  //     dispatch(setCourses(allCourses));
  //   } catch (error) {
  //     console.error("Error enrolling:", error);
  //   }
  // };

  const handleEnroll = async (courseId: string) => {
    try {
      await client.enrollInCourse("current", courseId);
      const updatedEnrollments = await client.findEnrollmentsForUser("current");
      dispatch(setEnrollments(updatedEnrollments));

      const allCourses = await client.fetchAllCourses();
      dispatch(setCourses(allCourses));
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };

  const handleUnenroll = async (courseId: string) => {
    try {
      await client.unenrollFromCourse("current", courseId);
      dispatch(
        setEnrollments(
          enrollments.filter(
            (course: any) => String(course._id) !== String(courseId)
          )
        )
      );
    } catch (error) {
      console.error("Error unenrolling:", error);
    }
  };

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title" className="mb-0">
          Dashboard
        </h1>
        <div className="d-flex gap-2">
          <Button
            variant="primary"
            className="float-end"
            onClick={toggleEnrollmentsView}
          >
            {showAllCourses ? "Show My Enrollments" : "Show All Courses"}
          </Button>
        </div>
      </div>
      <hr />

      {isFaculty && (
        <>
          <h4>
            New Course
            <button
              onClick={onAddNewCourse}
              className="btn btn-success float-end"
              id="wd-add-new-course-click"
            >
              Add
            </button>
            <button
              className="btn btn-pink float-end me-2"
              onClick={onUpdateCourse}
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
                              onDeleteCourse(course._id);
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

                      {enrolled ? (
                        <Button
                          variant="danger"
                          onClick={() => handleUnenroll(course._id)}
                        >
                          Unenroll
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          onClick={() => handleEnroll(course._id)}
                        >
                          Enroll
                        </Button>
                      )}

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
