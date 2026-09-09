"use client";

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { LuCircleAlert } from "react-icons/lu";
import Button from "../ui/Button";
import Link from "next/link";
import { useAuth } from "@/hooks/authStore";

type ErrorStateProps = {
  title?: string;
  message?: string;
};

const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't complete your request. Please try again.",
}: ErrorStateProps) => {
  // const [close, setHandleClose] = useState(false);

  const { clearError } = useAuth();
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background-secondary/60 px-5 animate-modal-backdrop`}
    >
      <div className="w-full max-w-120 rounded-md bg-background px-6 py-6 shadow-sm          animate-modal-in">
        {/* Close */}
        <button
          type="button"
          onClick={clearError}
          className="ml-auto block cursor-pointer text-light-text"
          aria-label="Close"
        >
          <IoClose className="text-xl" />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <LuCircleAlert className="text-3xl text-red-500" />
          </div>

          <h2 className="text-lg font-semibold">{title}</h2>

          <p className="mt-3 max-w-sm text-sm text-light-text">{message}</p>

          {message && message === "Please verify your account" ? (
            <Link href={"/verify"} className="my-3 w-full">
              <Button variant="full" children="Verify your account" />
            </Link>
          ) : (
            <div className="my-3 w-full" onClick={clearError}>
              <Button variant="full" children="Try again" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
