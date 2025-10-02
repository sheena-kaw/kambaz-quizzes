import Link from "next/link";
export default function CourseNavigation({ id }: { id: string }) {
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <Link
        href={`/Courses/${id}/Home`}
        id="wd-course-home-link"
        className="list-group-item active border-0"
      >
        Home
      </Link>
      <Link
        href={`/Courses/${id}/Modules`}
        id="wd-course-modules-link"
        className="list-group-item text-danger border-0"
      >
        Modules
      </Link>
      <Link
        href={`/Courses/${id}/Piazza`}
        id="wd-course-piazza-link"
        className="list-group-item text-danger border-0"
      >
        Piazza
      </Link>
      <Link
        href={`/Courses/${id}/Zoom`}
        id="wd-course-zoom-link"
        className="list-group-item text-danger border-0"
      >
        Zoom
      </Link>
      <Link
        href={`/Courses/${id}/Assignments`}
        id="wd-course-quizzes-link"
        className="list-group-item text-danger border-0"
      >
        Assignments
      </Link>
      <Link
        href={`/Courses/${id}/Quizzes`}
        id="wd-course-assignments-link"
        className="list-group-item text-danger border-0"
      >
        Quizzes
      </Link>
      <Link
        href={`/Courses/${id}/Grades`}
        id="wd-course-grades-link"
        className="list-group-item text-danger border-0"
      >
        Grades
      </Link>
      <Link
        href={`/Courses/${id}/People`}
        id="wd-course-people-link"
        className="list-group-item text-danger border-0"
      >
        People
      </Link>
    </div>
  );
}
