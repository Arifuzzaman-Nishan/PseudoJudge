"use client";
import React, { useState } from "react";
import loginAnimation from "../../../public/lottiefiles/login.json";
import Link from "next/link";
import LoginSignup from "@/components/LoginSignup/LoginSignup";

export type LoginState = {
  email: string;
  password: string;
};

function Login() {
  const [input, setInput] = useState<LoginState>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handle submit...");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("name is ", name);
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const loginFooter = (
    <p className="mt-6 text-sm text-gray-600 text-center">
      Don&apos;t have an account?
      <Link className="" href="/signup">
        Sign up here
      </Link>
    </p>
  );

  const inputProperties = [
    {
      placeholder: "boss@gmail.com",
      type: "email",
      key: 1,
      name: "email",
      onChange: handleChange,
    },
    {
      placeholder: "********",
      type: "password",
      key: 2,
      name: "password",
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
      animationData={loginAnimation}
      inputProperties={inputProperties}
      btnName="Login"
    />
  );
}

export default Login;
