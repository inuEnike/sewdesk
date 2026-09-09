"use client";
import Logo from "@/component/ui/Logo";
import React from "react";
import LoginForm from "../_components/LoginForm";
import CopyRightNotice from "@/component/shared/CopyRightNotice";
import AuthHero from "../_components/AuthHero";
import VerifyForm from "../_components/VerifyForm";

const Page = () => {
  return (
    <section className="grid md:grid-cols-[1fr_1.2fr] w-full">
      <div className="py-10 px-5 lg:p-20 w-full flex flex-col justify-between not-md:my-20">
        <div className="not-md:flex justify-center items-center">
          <Logo />
        </div>
        <VerifyForm />

        <div className=" w-full flex flex-col justify-end py-7 md:hidden">
          <div className="bg-background rounded-md shadow px-5 flex flex-col gap-3 py-4">
            <h3 className="text-xl font-bold">{`We finally have everything in one place.`}</h3>
            <p className="text-xs font-light text-light-text leading-5">
              {`From customer measurements to payments and delivery dates, SewDesk keeps our entire workflow organized. It has made running the business much easier.`}
            </p>
            <p className="text-primary font-semibold text-xs">
              — {`Tolu A., Founder at Tolu Couture`}
            </p>
          </div>
        </div>
        <div className="not-md:text-center">
          <CopyRightNotice color="light-text" boldness="light" />
        </div>
      </div>
      <AuthHero
        title="We finally have everything in one place."
        body="From customer measurements to payments and delivery dates, SewDesk keeps our entire workflow organized. It has made running the business much easier."
        business="Tolu A., Founder at Tolu Couture"
        imageURL="./verify.webp"
      />
    </section>
  );
};

export default Page;
