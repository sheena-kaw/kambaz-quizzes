import Link from "next/link";
import { FormControl } from "react-bootstrap";
export default function Signup() {
  return (
    <div
      id="wd-signup-screen"
      className="d-flex flex-column align-items-center mt-5"
    >
      <br />
      <br />

      <h2>Sign up</h2>
      <br />

      <div style={{ width: "350px" }}>
        <FormControl id="wd-username" placeholder="username" className="mb-2" />

        <FormControl
          id="wd-password"
          placeholder="password"
          type="password"
          className="mb-2"
        />

        <FormControl
          id="wd-password-verify"
          placeholder="verify password"
          type="password"
          className="mb-2"
        />
        <br />

        <Link
          id="wd-signup-btn"
          href="/Account/Profile"
          className="btn btn-primary w-100 mb-2"
        >
          Sign up
        </Link>
        <br />
        <Link id="wd-signin-link" href="/Account/Signin">
          Sign in
        </Link>
      </div>
    </div>
  );
}
