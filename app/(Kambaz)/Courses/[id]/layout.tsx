import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
export default async function CoursesLayout(
  { children, params }: Readonly<{ children: ReactNode; params: Promise<{ id: string }> }>) {
 const { id } = await params;
 return (
   <div id="wd-courses">
     <h2>Course CS1234</h2>
     <hr />
     <table>
       <tbody>
         <tr>
           <td valign="top" width="200"> <CourseNavigation id ={id} /> </td>
           <td valign="top" width="100%"> {children} </td>
         </tr>
       </tbody>
     </table>
   </div>
);}
