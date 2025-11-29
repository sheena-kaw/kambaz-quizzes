"use client";

import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "next/navigation";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { editModule, updateModule, setModules } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as client from "../../client";

export default function Modules() {
  const { id } = useParams();

  const [moduleName, setModuleName] = useState("");

  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  const fetchModules = async () => {
    const modules = await client.findModulesForCourse(id as string);
    dispatch(setModules(modules));
  };
  useEffect(() => {
    fetchModules();
  }, []);

  const onCreateModuleForCourse = async () => {
    if (!id) return;
    const courseId = Array.isArray(id) ? id[0] : id;
    const newModule = { name: moduleName, course: courseId };
    const moduleItem = await client.createModuleForCourse(courseId, newModule);
    dispatch(setModules([...modules, moduleItem]));
  };

  const onRemoveModule = async (moduleId: string) => {
    if (!id) return;
    const courseId = Array.isArray(id) ? id[0] : id;
    await client.deleteModule(courseId, moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

  const onUpdateModule = async (moduleItem: any) => {
    if (!id) return;
    const courseId = Array.isArray(id) ? id[0] : id;
    await client.updateModule(courseId, moduleItem);
    const newModules = modules.map((m: any) => m._id === moduleItem._id ? moduleItem : m );
    dispatch(setModules(newModules));
  };


  return (
    <div>
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={onCreateModuleForCourse}
      />
      <br />
      <br />
      <br />
      <br />

      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .map((moduleItem: any) => (
            <ListGroupItem
              key={moduleItem._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
                <div>
                  <BsGripVertical className="me-2 fs-3" />
                  {!moduleItem.editing && moduleItem.name}
                  {moduleItem.editing && (
                    <FormControl
                      className="w-50 d-inline-block"
                      onChange={(e) =>
                        dispatch(
                          updateModule({ ...moduleItem, name: e.target.value })
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          onUpdateModule({ ...moduleItem, editing: false });
                        }
                      }}
                      defaultValue={moduleItem.name}
                    />
                  )}
                </div>
                <ModuleControlButtons
                  moduleId={moduleItem._id}
                  deleteModule={(moduleId) => onRemoveModule(moduleId)}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              </div>

              {moduleItem.lessons && moduleItem.lessons.length > 0 && (
                <ListGroup className="wd-lessons rounded-0">
                  {moduleItem.lessons.map(
                    (lesson: {
                      _id: Key | null | undefined;
                      name:
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactElement<
                            unknown,
                            string | JSXElementConstructor<any>
                          >
                        | Iterable<ReactNode>
                        | ReactPortal
                        | Promise<
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactPortal
                            | ReactElement<
                                unknown,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                    }) => (
                      <ListGroupItem
                        key={lesson._id}
                        className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between"
                      >
                        <div>
                          <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                        </div>
                        <LessonControlButtons />
                      </ListGroupItem>
                    )
                  )}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
