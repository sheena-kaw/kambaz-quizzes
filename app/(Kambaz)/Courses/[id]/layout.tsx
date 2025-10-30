// import { ReactNode } from "react";
// import CourseNavigation from "./Navigation";
// import { FaAlignJustify } from "react-icons/fa";
// import { courses } from "../../Database";
// import Breadcrumb from "./Breadcrumb";

// export default async function CoursesLayout({
//   children,
//   params,
// }: Readonly<{ children: ReactNode; params: Promise<{ id: string }> }>) {
//   const { id } = await params;
//   const course = courses.find((course) => course._id === id);

//   return (
//     <div id="wd-courses">
//       <h2 className="text-danger">
//         <FaAlignJustify className="me-4 fs-4 mb-1" />
//         {/* { course?.name } */}
//         <Breadcrumb course={course}/>
//       </h2>{" "}
//       <hr />
//       <div className="d-flex">
//         <div className="d-none d-md-block">
//           <CourseNavigation id={id} />
//         </div>
//         <div className="flex-fill">{children}</div>
//       </div>
//     </div>
//   );
// }

"use client";

import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa6";
import Breadcrumb from "./Breadcrumb";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { id } = useParams();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === id);

  const [barVisible, setBarVisible] = useState(true);
  const toggle = () => setBarVisible((prev) => !prev);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify 
          className="me-4 fs-4 mb-1"
          onClick={toggle} />
        <Breadcrumb course={course} />
      </h2>
      <hr />
      <div className="d-flex">
        {barVisible && (
          <div>
            <CourseNavigation id={id as string} />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
