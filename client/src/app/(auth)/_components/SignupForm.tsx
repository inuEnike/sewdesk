"use client";
import ErrorState from "@/component/shared/ErrorState";
import Button from "@/component/ui/Button";
import Input from "@/component/ui/Input";
import { useAuth } from "@/hooks/authStore";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import Heading from "./Heading";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    hashed_password: "",
    repeat_password: "",
  });
  const router = useRouter();

  const { signup, loading, error } = useAuth();

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signup(form);

    setForm({
      full_name: "",
      email: "",
      phone_number: "",
      hashed_password: "",
      repeat_password: "",
    });
    if (result.success) {
      router.push("/waiting-confirmation");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement, Element>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <form action="" className="" onSubmit={handleSubmit}>
      <Heading
        headingText="Start your 14-day free trial"
        headingBody="No credit card required. Setup your professional tailoring desk in minutes."
      />
      <div className="flex flex-col gap-2 py-5">
        <Input
          htmlFor="full_name"
          label="Full Name"
          placeholder="Chinedu Gafar"
          name="full_name"
          onChange={handleChange}
          value={form.full_name}
        />

        <div className="flex not-md:flex-col w-full gap-3">
          <Input
            htmlFor="email"
            label="Email Address"
            placeholder="jackjill@mail.com"
            onChange={handleChange}
            inputType="email"
            name="email"
            value={form.email}
          />
          <Input
            htmlFor="phone_number"
            label="Phone Number"
            placeholder="+234 901 2113 050"
            onChange={handleChange}
            value={form.phone_number}
            name="phone_number"
          />
        </div>

        <Input
          htmlFor="hashed_password"
          label="Password"
          inputType="password"
          value={form.hashed_password}
          onChange={handleChange}
          name="hashed_password"
          placeholder="**********"
        />

        <Input
          htmlFor="repeat_password"
          label="Repeat Password"
          inputType="password"
          value={form.repeat_password}
          onChange={handleChange}
          name="repeat_password"
          placeholder="**********"
        />
        {loading ? (
          <Button children="Loading..." variant="full" type="submit" disabled />
        ) : (
          <Button
            children="Create your SewDesk account"
            variant="full"
            type="submit"
          />
        )}

        <p className="text-center py-3 text-xs text-light-text font-light">
          Already have an account?{" "}
          <Link href={"/login"} className="text-primary font-semibold ">
            Log in
          </Link>
        </p>
      </div>
      {error && <ErrorState title="Couldn't sign you in" message={error} />}
    </form>
  );
};

export default SignupForm;
