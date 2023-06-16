import React, { FC } from "react";

export enum ButtonSize {
  SMALL = "py-2 px-3",
  DEFAULT = "py-3 px-4",
  LARGE = "py-3 px-4 sm:p-5",
}

interface ButtonProps {
  children?: React.ReactNode;
  btnColor: string;
  btnSize?: ButtonSize;
  btnLoading?: boolean;
  btnDisabled?: boolean;
  onClick?: () => void;
  className?: string;
  fontSize?: string;
  type?: "button" | "submit" | "reset";
}

const color = "green";

const Button: FC<ButtonProps> = ({
  children,
  btnColor,
  btnSize = ButtonSize.DEFAULT,
  btnLoading = false,
  btnDisabled = false,
  onClick,
  className,
  fontSize,
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${btnSize} inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-${btnColor}-500 text-white focus:outline-none focus:ring-4 focus:ring-${btnColor}-300 transition-all ${fontSize} ${className} hover:bg-${btnColor}-700 transition-all duration-300 ease-in-out focus:shadow-outline`}
    >
      {btnLoading && (
        <span
          className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
          role="status"
          aria-label="loading"
        ></span>
      )}
      {children}
    </button>
  );
};

export default Button;
