// import { ListGroup, ListGroupItem } from "react-bootstrap";
// import ModulesControls from "./ModulesControls";
// import LessonControlButtons from "./LessonControlButtons";
// import { BsGripVertical } from "react-icons/bs";
// import ModuleControlButtons from "./ModuleControlButtons";

// export default function Modules() {
//   return (
//     <div>
//       <ModulesControls />
//       <br />
//       <br />
//       <br />
//       <br />

//       <ListGroup className="rounded-0" id="wd-modules">
//         <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
//           <div className="wd-title p-3 ps-2 bg-secondary">
//             <BsGripVertical className="me-2 fs-3" /> Week 1{" "}
//             <ModuleControlButtons />
//           </div>
//           <ListGroup className="wd-lessons rounded-0">
//             <ListGroupItem className="wd-lesson p-3 ps-1">
//               <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES{" "}
//               <LessonControlButtons />
//             </ListGroupItem>
//             <ListGroupItem className="wd-lesson p-3 ps-1">
//               <BsGripVertical className="me-2 fs-3" /> Introduction to the
//               course <LessonControlButtons />
//             </ListGroupItem>
//             <ListGroupItem className="wd-lesson p-3 ps-1">
//               <BsGripVertical className="me-2 fs-3" /> Learn what is Web
//               Development <LessonControlButtons />
//             </ListGroupItem>
//             <ListGroupItem className="wd-lesson p-3 ps-1">
//               <BsGripVertical className="me-2 fs-3" /> LESSON 1{" "}
//               <LessonControlButtons />
//             </ListGroupItem>
//             <ListGroupItem className="wd-lesson p-3 ps-1">
//               <BsGripVertical className="me-2 fs-3" /> LESSON 2{" "}
//               <LessonControlButtons />
//             </ListGroupItem>
//           </ListGroup>
//         </ListGroupItem>
//         <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
//           <div className="wd-title p-3 ps-2 bg-secondary">
//             <BsGripVertical className="me-2 fs-3" /> Week 2{" "}
//             <ModuleControlButtons />
//           </div>
//           <ListGroup className="wd-lessons rounded-0">
//             <ListGroupItem className="wd-lesson p-3 ps-1">
//               <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES{" "}
//               <LessonControlButtons />
//             </ListGroupItem>
//             <ListGroupItem className="wd-lesson p-3 ps-1">
//               <BsGripVertical className="me-2 fs-3" /> LESSON 1{" "}
//               <LessonControlButtons />
//             </ListGroupItem>
//             <ListGroupItem className="wd-lesson p-3 ps-1">
//               <BsGripVertical className="me-2 fs-3" /> LESSON 2{" "}
//               <LessonControlButtons />
//             </ListGroupItem>
//           </ListGroup>
//         </ListGroupItem>
//       </ListGroup>
//     </div>
//   );
// }

"use client";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "next/navigation";
import * as db from "../../../Database";

export default function Modules() {
  const { id } = useParams();
  const modules = db.modules;

  const courseModules = modules.filter((module: any) => module.course === id);

  return (
    <div>
      <ModulesControls />
      <br />
      <br />
      <br />
      <br />

      <ListGroup id="wd-modules" className="rounded-0">
        {courseModules.map((module: any) => (
          <ListGroupItem
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
              <div>
                <BsGripVertical className="me-2 fs-3" /> {module.name}
              </div>
              <ModuleControlButtons />
            </div>

            {module.lessons && module.lessons.length > 0 && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any) => (
                  <ListGroupItem
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between"
                  >
                    <div>
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                    </div>
                    <LessonControlButtons />
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
