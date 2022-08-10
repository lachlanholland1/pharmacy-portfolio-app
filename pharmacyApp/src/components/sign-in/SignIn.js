import React, { useEffect, useState } from "react";
import SignInForm from "./SignInForm";
import { Link } from "react-router-dom";

function SignIn(props) {
  return (
    <div>
      <SignInForm />
      <br />
      <Link to="/sign-up">
        <button>Sign up</button>
      </Link>
      <br />
    </div>
  );
}

export default SignIn;
