import React, { FC } from "react";
import Input from "../Shared/Input";
import Button from "../Shared/Button";
import Lottie from "lottie-react";
import { LoginState } from "@/app/login/page";
import { SignupState } from "@/app/signup/page";

export interface InputProperties {
  placeholder: string;
  type: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  key: number;
}

interface Props<T> {
  title: string;
  inputProperties: Array<InputProperties>;
  state: {
    input: T;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  footer: React.ReactElement;
  animationData: any;
  btnName: string;
  errorMsg?: string;
}

const LoginSignup = <T,>({
  title,
  inputProperties,
  state,
  handleChange,
  handleSubmit,
  footer,
  animationData,
  btnName,
  errorMsg,
}: Props<T>) => {
  const { input } = state;

  return (
    <div className="prose prose-lg max-w-none">
      <div className="min-h-screen text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <h2 className="text-center">Welcome to PseudoJudge</h2>
            <div className="flex flex-col items-center">
              <div className="mb-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  {title}
                </div>
              </div>

              <div className="mx-auto max-w-xs">
                <form onSubmit={handleSubmit} action="">
                  {inputProperties.map((inputProperty) => {
                    const { placeholder, type, name, key } = inputProperty;
                    return (
                      <div
                        className={`inline-block w-full ${key > 1 && "mt-5"}`}
                        key={key}
                      >
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 capitalize">
                          {name}
                        </span>
                        <Input
                          placeholder={placeholder}
                          type={type}
                          name={name}
                          value={input[name as keyof T] as unknown as string}
                          onChange={handleChange}
                        />
                      </div>
                    );
                  })}

                  <Button
                    className="w-full mt-5 py-4 rounded-lg tracking-wide font-semibold"
                    type="submit"
                  >
                    <IconSvg />
                    <span className="ml-3">{btnName}</span>
                  </Button>
                </form>

                {errorMsg && <p className="text-red-500 text-xs">{errorMsg}</p>}

                {footer}
              </div>
            </div>
          </div>
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div className="m-12 xl:m-16 w-full">
              <Lottie animationData={animationData} loop={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;

const IconSvg = () => (
  <svg
    className="w-6 h-6 -ml-2"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <path d="M20 8v6M23 11h-6" />
  </svg>
);
