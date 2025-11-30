"use client";

import { useEffect, useState } from "react";
import PeopleTable from "./Table/page";
import { useParams } from "next/navigation";
import { fetchUsersForCourse } from "../../client";

export default function People() {
  const { id } = useParams();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    if (!id) {
      return null;
    }
    const data = await fetchUsersForCourse(id as string);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [id]);

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
