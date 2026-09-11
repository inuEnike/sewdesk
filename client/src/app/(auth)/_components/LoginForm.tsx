"use client";
import ErrorState from "@/component/shared/ErrorState";
import Button from "@/component/ui/Button";
import Input from "@/component/ui/Input";
import { useAuth } from "@/hooks/authStore";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Heading from "./Heading";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await login({ email, password });
    console.log(result);

    if (result.success) {
      router.push("/dashboard/my-businesses");
    }
  };
  return (
    <form action="" className="" onSubmit={handleSubmit}>
      <Heading
        headingText="Welcome back!"
        headingBody="Log in to manage your workshop orders and client sheets."
      />
      <div className="flex flex-col gap-2 py-5">
        <Input
          htmlFor="email"
          label="Email Address"
          placeholder="jackjill@mail.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          inputType="email"
        />
        <Input
          htmlFor="password"
          label="Password"
          inputType="password"
          value={password}
          isLogin
          onChange={(e) => setPassword(e.target.value)}
          placeholder="**********"
        />
        {loading ? (
          <Button children="Loading..." variant="full" type="submit" disabled />
        ) : (
          <Button children="Login" variant="full" type="submit" />
        )}

        <p className="text-center py-3 text-xs text-light-text font-light">
          Don't have an account yet?{" "}
          <Link href={"/signup"} className="text-primary font-semibold ">
            Sign Up
          </Link>
        </p>
      </div>
      {error && <ErrorState title="Couldn't sign you in" message={error} />}
    </form>
  );
};

export default LoginForm;
