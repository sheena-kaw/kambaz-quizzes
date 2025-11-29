"use client";

import { useEffect, useState } from "react";
import PeopleTable from "./Table/page";
import { useParams } from "next/navigation";

export default function People() {
  const { courseId } = useParams();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch(`/api/courses/${courseId}/users`);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [courseId]);

  console.log("hello");

  return (
    <>
      <h2>People</h2>
      <PeopleTable
        users={users}
        fetchUsers={fetchUsers}
      />
    </>
  );
}
