import Link from "next/link";

export default function Assignments({ id }: { id: string }) {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments"
             id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button> </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link href={`/Courses/${id}/Assignments/A1`}
             className="wd-assignment-link" >
            A1 - ENV + HTML
          </Link> 
          <br/>
            Multiple Modules | <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100 points
        </li>
        <li className="wd-assignment-list-item">
          <Link href={`/Courses/${id}/Assignments/A1`}
             className="wd-assignment-link" >
            A2 - CSS + BOOTSTRAP
          </Link>
          <br/>
            Multiple Modules | <b>Not available until</b> May 13 at 12:00am | <b>Due</b> May 20 at 11:59pm | 100 points
        </li>
        <li className="wd-assignment-list-item">
          <Link href={`/Courses/${id}/Assignments/A1`}
             className="wd-assignment-link" >
            A2 - JAVASCRIPT + REACT
          </Link>
          <br/>
            Multiple Modules | <b>Not available until</b> May 20 at 12:00am | <b>Due</b> May 27 at 11:59pm | 100 points
        </li>
      </ul>
    </div>
);}
