"use client";

import { redirect } from "next/dist/client/components/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import Link from "next/link";
import { FormControl, Button } from "react-bootstrap";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchProfile = () => {
    if (!currentUser) return redirect("/Account/Signin");
    setProfile(currentUser);
  };
  const signout = () => {
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div
      id="wd-profile-screen"
      className="d-flex flex-column align-items-center mt-5"
    >
      <h2>Profile</h2>
      <br />

      {profile && (
        <div style={{ width: "350px" }}>
          <FormControl
            id="wd-username"
            placeholder="username"
            defaultValue={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
            className="mb-2"
          />

          <FormControl
            id="wd-password"
            placeholder="password"
            type="password"
            defaultValue={profile.password}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
            className="mb-2"
          />

          <FormControl
            id="wd-firstname"
            placeholder="First Name"
            defaultValue={profile.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
            className="mb-2"
          />

          <FormControl
            id="wd-lastname"
            placeholder="Last Name"
            defaultValue={profile.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
            className="mb-2"
          />

          <FormControl
            id="wd-dob"
            type="date"
            defaultValue={profile.dob}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            className="mb-2"
          />

          <FormControl
            id="wd-email"
            type="email"
            placeholder="Email"
            defaultValue={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="mb-2"
          />

          <select
            id="wd-role"
            defaultValue="FACULTY"
            className="mb-3"
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <br />

          {/* <Link
            id="wd-signout-btn"
            href="Signin"
            className="btn btn-danger w-100"
          >
            Sign out
          </Link> */}

          <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}
