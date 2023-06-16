import React, { FC } from "react";

interface Props {
  type: string;
  placeholder: string;
  className?: string;
  value: string;
  size?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

const Input: FC<Props> = ({
  type = "text",
  placeholder,
  className,
  value,
  size = "px-8 py-4",
  required = true,
  onChange,
  name,
}) => {
  return (
    <input
      className={`w-full ${size} rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 focus:bg-white ${className}`}
      type={type}
      placeholder={placeholder}
      value={value}
      required={required}
      onChange={onChange}
      name={name}
    />
  );
};

export default Input;
