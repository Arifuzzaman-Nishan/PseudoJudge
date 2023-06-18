"use client";

import LoginSignup from "@/components/LoginSignup/LoginSignup";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import signupAmination from "../../../public/lottiefiles/signup.json";
import { useSignupMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { loginResult } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";

export type SignupState = {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

function Signup() {
  const router = useRouter();

  const [input, setInput] = useState<SignupState>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [signup] = useSignupMutation();

  const dispatch = useAppDispatch();

  const checkPasswords = useCallback(() => {
    if (input.password !== input.confirmPassword) {
      setErrorMessage("The passwords do not match.");
    } else {
      setErrorMessage("");
    }
  }, [input.confirmPassword, input.password]);

  useEffect(() => {
    checkPasswords();
  }, [checkPasswords]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handle submit...");
    const data = await signup({
      username: input.username,
      email: input.email,
      password: input.password,
    }).unwrap();

    localStorage.setItem("auth", JSON.stringify(data));

    dispatch(loginResult(data));

    router.push("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const loginFooter = (
    <p className="mt-6 text-sm text-gray-600 text-center">
      Already have an account?
      <Link className="" href="/login">
        Login here
      </Link>
    </p>
  );

  const inputProperties = [
    {
      placeholder: "enter your username",
      type: "text",
      key: 1,
      name: "username",
      onChange: handleChange,
    },
    {
      placeholder: "boss@gmail.com",
      type: "email",
      key: 2,
      name: "email",
      onChange: handleChange,
    },
    {
      placeholder: "********",
      type: "password",
      key: 3,
      name: "password",
      onChange: handleChange,
    },
    {
      placeholder: "********",
      type: "password",
      key: 4,
      name: "confirmPassword",
      onChange: handleChange,
    },
  ];

  return (
    <LoginSignup
      state={{
        input,
      }}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      title="Login with e-mail"
      footer={loginFooter}
      animationData={signupAmination}
      inputProperties={inputProperties}
      btnName="Sign up"
      errorMsg={errorMessage}
    />
  );
}

export default Signup;
