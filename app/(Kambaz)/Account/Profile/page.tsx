import Link from "next/link";
import { FormControl, FormSelect } from "react-bootstrap";

export default function Profile() {
  return (
    <div
      id="wd-profile-screen"
      className="d-flex flex-column align-items-center mt-5"
    >
      <h2>Profile</h2>
      <br />

      <div style={{ width: "350px" }}>
        <FormControl
          id="wd-username"
          placeholder="username"
          defaultValue="alice"
          className="mb-2"
        />

        <FormControl
          id="wd-password"
          placeholder="password"
          type="password"
          defaultValue="verytired"
          className="mb-2"
        />

        <FormControl
          id="wd-firstname"
          placeholder="First Name"
          defaultValue="Alice"
          className="mb-2"
        />

        <FormControl
          id="wd-lastname"
          placeholder="Last Name"
          defaultValue="Wonderland"
          className="mb-2"
        />

        <FormControl
          id="wd-dob"
          type="date"
          defaultValue="2000-01-01"
          className="mb-2"
        />

        <FormControl
          id="wd-email"
          type="email"
          placeholder="Email"
          defaultValue="alice@wonderland.com"
          className="mb-2"
        />

        <FormSelect id="wd-role" defaultValue="FACULTY" className="mb-3">
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </FormSelect>
        <br />

        <Link
          id="wd-signout-btn"
          href="Signin"
          className="btn btn-danger w-100"
        >
          Sign out
        </Link>
      </div>
    </div>
  );
}
