import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "sm" | "md" | "full";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  showIcon?: boolean;
};

const OutlineButton = ({
  children,
  variant = "md",
  onClick,
  type = "button",
  disabled = false,
  showIcon = false,
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
      className={`h-11 rounded-md bg-transparent text-sm font-semibold text-light-text shadow-sm cursor-pointer ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
