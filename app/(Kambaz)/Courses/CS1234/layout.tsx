import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
export default function CoursesLayout(
  { children, params }: { children: ReactNode; params: { CS1234: string } }) {
 const { CS1234 } = params;
 return (
   <div id="wd-courses">
     <h2>Course CS1234 {CS1234}</h2> 
     <hr />
     <table>
       <tbody>
         <tr>
           <td valign="top" width="200"> <CourseNavigation /> </td>
           <td valign="top" width="100%"> {children} </td>
         </tr>
       </tbody>
     </table>
   </div>
);}
