import { redirect } from "next/navigation";

export default function CoursePage() {
 redirect("/Courses/{id}/Home");
}