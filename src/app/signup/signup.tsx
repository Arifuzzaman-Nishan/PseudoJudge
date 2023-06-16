import React from "react";

export type SignupState = {
  username: string;
  email: string;
  password: string;
};

function signup() {
  return (
    <div>
      <h1>From signup page...</h1>
    </div>
  );
}

export default signup;
