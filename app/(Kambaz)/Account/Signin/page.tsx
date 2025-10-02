import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Signin() {
  return (
    <div
      id="wd-signin-screen"
      className="d-flex flex-column align-items-center mt-5"
    >
      <br />
      <br />

      <h2>Sign in</h2>
      <br />

      <div style={{ width: "350px" }}>
        <FormControl id="wd-username" placeholder="username" className="mb-2" />
        <FormControl
          id="wd-password"
          placeholder="password"
          type="password"
          className="mb-2"
        />
        <br />

        <Link
          id="wd-signin-btn"
          href="/Dashboard"
          className="btn btn-primary w-100 mb-2"
        >
          Sign in{" "}
        </Link>
        <Link id="wd-signup-link" href="/Account/Signup">
          Sign up
        </Link>
      </div>
    </div>
  );
}
