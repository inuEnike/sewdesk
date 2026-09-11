"use client";
import ErrorState from "@/component/shared/ErrorState";
import Button from "@/component/ui/Button";
import Link from "next/link";
import Heading from "./Heading";
import Input from "@/component/ui/Input";
import { useAuth } from "@/hooks/authStore";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const VerifyForm = () => {
  const { login, loading, error, clearError } = useAuth();
  const router = useRouter();

  return (
    <form action="" className="" onSubmit={() => {}}>
      <button
        className="flex items-center gap-3 cursor-pointer mt-7"
        onClick={router.back}
      >
        <IoIosArrowBack />
        <span className="text-light-text text-sm">Go back</span>
      </button>
      <Heading
        headingText="Verify your account!"
        headingBody="Check your email for the verification link to activate your account."
      />
      <div className="flex flex-col gap-2 md:py-5">
        <Input
          htmlFor="email"
          label="Email Address"
          placeholder="jackjill@mail.com"
          inputType="email"
        />

        {loading ? (
          <Button children="Loading..." variant="full" type="submit" disabled />
        ) : (
          <Button
            children="Request Verification link"
            variant="full"
            type="submit"
          />
        )}
      </div>

      {error && <ErrorState title="Couldn't sign you in" message={error} onClose={clearError}/>}
    </form>
  );
};

export default VerifyForm;
