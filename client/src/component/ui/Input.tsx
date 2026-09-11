"use client";

import React, { useState } from "react";
import { LuEye } from "react-icons/lu";
import { PiEyeClosedLight } from "react-icons/pi";

type InputProps = {
  htmlFor: string;
  label: string;
  inputType?: React.HTMLInputTypeAttribute;
  placeholder: string;
  isLogin?: boolean;
  name?: string;
  isTextArea?: boolean;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

const Input = ({
  htmlFor,
  label,
  inputType = "text",
  placeholder,
  isLogin,
  isTextArea = false,
  name,
  onChange,
  value,
}: InputProps) => {
  const [password, setPassword] = useState(false);

  const handleTogglePassword = () => {
    setPassword((prev) => !prev);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <label htmlFor={htmlFor} className="text-sm py-1 text-light-text">
          {label}
        </label>

        {label === "Password" && isLogin && (
          <small className="text-xs font-semibold text-right text-primary">
            Forget Password?
          </small>
        )}
      </div>

      {isTextArea ? (
        <div className="bg-icon-background border-border border flex w-full my-2 items-center gap-2">
          <textarea
            name={name || ""}
            id={htmlFor}
            required
            value={value}
            cols={70}
            rows={6}
            placeholder={placeholder}
            onChange={onChange}
            className="w-full py-3 px-2 outline-0 text-sm text-light-text bg-transparent"
          />
        </div>
      ) : (
        <div className="bg-icon-background border-border border flex w-full my-2 items-center gap-2">
          <input
            id={htmlFor}
            type={inputType === "password" && password ? "text" : inputType}
            className="w-full py-3 px-2 outline-0 text-sm text-light-text bg-transparent"
            onChange={onChange}
            name={name}
            required
            value={value}
            placeholder={placeholder}
          />

          {inputType === "password" && (
            <button
              type="button"
              onClick={handleTogglePassword}
              className="mr-2 cursor-pointer"
            >
              {password ? <LuEye /> : <PiEyeClosedLight />}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
