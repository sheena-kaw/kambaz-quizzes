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
