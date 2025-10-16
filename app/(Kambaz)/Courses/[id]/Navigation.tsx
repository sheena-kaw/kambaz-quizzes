// import Link from "next/link";
// export default function CourseNavigation({ id }: { id: string }) {
//   return (
//     <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
//       <Link
//         href={`/Courses/${id}/Home`}
//         id="wd-course-home-link"
//         className="list-group-item active border-0"
//       >
//         Home
//       </Link>
//       <Link
//         href={`/Courses/${id}/Modules`}
//         id="wd-course-modules-link"
//         className="list-group-item text-danger border-0"
//       >
//         Modules
//       </Link>
//       <Link
//         href={`/Courses/${id}/Piazza`}
//         id="wd-course-piazza-link"
//         className="list-group-item text-danger border-0"
//       >
//         Piazza
//       </Link>
//       <Link
//         href={`/Courses/${id}/Zoom`}
//         id="wd-course-zoom-link"
//         className="list-group-item text-danger border-0"
//       >
//         Zoom
//       </Link>
//       <Link
//         href={`/Courses/${id}/Assignments`}
//         id="wd-course-quizzes-link"
//         className="list-group-item text-danger border-0"
//       >
//         Assignments
//       </Link>
//       <Link
//         href={`/Courses/${id}/Quizzes`}
//         id="wd-course-assignments-link"
//         className="list-group-item text-danger border-0"
//       >
//         Quizzes
//       </Link>
//       <Link
//         href={`/Courses/${id}/Grades`}
//         id="wd-course-grades-link"
//         className="list-group-item text-danger border-0"
//       >
//         Grades
//       </Link>
//       <Link
//         href={`/Courses/${id}/People`}
//         id="wd-course-people-link"
//         className="list-group-item text-danger border-0"
//       >
//         People
//       </Link>
//     </div>
//   );
// }


"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation({ id }: { id: string }) {
  const pathname = usePathname();

  const links = [
    { label: "Home", path: `/Courses/${id}/Home`, id: "wd-course-home-link" },
    { label: "Modules", path: `/Courses/${id}/Modules`, id: "wd-course-modules-link" },
    { label: "Piazza", path: `/Courses/${id}/Piazza`, id: "wd-course-piazza-link" },
    { label: "Zoom", path: `/Courses/${id}/Zoom`, id: "wd-course-zoom-link" },
    { label: "Assignments", path: `/Courses/${id}/Assignments`, id: "wd-course-assignments-link" },
    { label: "Quizzes", path: `/Courses/${id}/Quizzes`, id: "wd-course-quizzes-link" },
    { label: "Grades", path: `/Courses/${id}/Grades`, id: "wd-course-grades-link" },
    { label: "People", path: `/Courses/${id}/People`, id: "wd-course-people-link" },
  ];

  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
      {links.map((link) => {
        const isActive = pathname === link.path;
        return (
          <Link
            key={link.path}
            href={link.path}
            id={link.id}
            className={`list-group-item border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
