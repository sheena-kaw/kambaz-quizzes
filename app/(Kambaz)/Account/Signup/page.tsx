// import Link from "next/link";
// import { FormControl } from "react-bootstrap";
// export default function Signup() {
//   return (
//     <div
//       id="wd-signup-screen"
//       className="d-flex flex-column align-items-center mt-5"
//     >
//       <br />
//       <br />

//       <h2>Sign up</h2>
//       <br />

//       <div style={{ width: "350px" }}>
//         <FormControl id="wd-username" placeholder="username" className="mb-2" />

//         <FormControl
//           id="wd-password"
//           placeholder="password"
//           type="password"
//           className="mb-2"
//         />

//         <FormControl
//           id="wd-password-verify"
//           placeholder="verify password"
//           type="password"
//           className="mb-2"
//         />
//         <br />

//         <Link
//           id="wd-signup-btn"
//           href="/Account/Profile"
//           className="btn btn-primary w-100 mb-2"
//         >
//           Sign up
//         </Link>
//         <br />
//         <Link id="wd-signin-link" href="/Account/Signin">
//           Sign in
//         </Link>
//       </div>
//     </div>
//   );
// }

"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const dispatch = useDispatch();
  const signup = async () => {
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    redirect("/Account/Profile");
  };
  return (
    <div
      className="wd-signup-screen d-flex flex-column align-items-center mt-5"
    >
      <br />
      <br />
      <h2>Sign up</h2>
      <br />
      <div style={{ width: "450px" }}>
        <FormControl
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="wd-username mb-2"
          placeholder="username"
        />
        <FormControl
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="wd-password mb-2"
          placeholder="password"
          type="password"
        />
        <br />
        <button
          onClick={signup}
          className="wd-signup-btn btn btn-primary mb-2 w-100"
        >
          {" "}
          Sign up{" "}
        </button>
        <br />
        <Link href="/Account/Signin" className="wd-signin-link">
          Sign in
        </Link>
      </div>
    </div>
  );
}
