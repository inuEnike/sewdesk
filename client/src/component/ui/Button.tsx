import React from "react";
import { IconType } from "react-icons";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "sm" | "md" | "full";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  Icon: IconType;
  disabled?: boolean;
  showIcon?: boolean;
};

const Button = ({
  children,
  variant = "md",
  onClick,
  type = "button",
  disabled = false,
  showIcon = false,
  Icon,
}: ButtonProps) => {
  const variants = {
    sm: "w-fit px-4",
    md: "w-fit px-6",
    full: "w-full",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`h-11 rounded-lg bg-primary text-sm font-semibold flex items-center justify-center gap-2 text-white cursor-pointer ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {showIcon && <Icon className="text-xl" />}
      {children}
    </button>
  );
};

export default Button;
