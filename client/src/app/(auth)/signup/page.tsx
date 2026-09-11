import Logo from "@/component/ui/Logo";
import React from "react";
import SignupForm from "../_components/SignupForm";
import CopyRightNotice from "@/component/shared/CopyRightNotice";
import AuthHero from "../_components/AuthHero";

const Page = () => {
  return (
    <section className="grid md:grid-cols-[1.3fr_1fr] xl:grid-cols-[1fr_1.2fr] w-full">
      <div className="py-10 px-5 lg:px-7 xl:p-20 w-full flex flex-col justify-between">
        <div className="not-md:flex justify-center items-center">
          <Logo />
        </div>
        <SignupForm />

        <div className=" w-full flex flex-col justify-end py-7 md:hidden">
          <div className="bg-background rounded-md shadow px-5 flex flex-col gap-3 py-4">
            <h3 className="text-xl font-bold">{`Join 2000+ fashion owners`}</h3>
            <p className="text-xs font-light text-light-text leading-5">
              {`Using SewDesk is like adding a professional workshop coordinator to your team. No more tracking down notebooks.`}
            </p>
            <p className="text-primary font-semibold text-xs">
              — {`Chioma N., Founder of Chic Apparels, Lagos`}
            </p>
          </div>
        </div>
        <div className="not-md:text-center">
          <CopyRightNotice color="light-text" boldness="light" />
        </div>
      </div>
      <AuthHero
        title="Join 2000+ fashion owners."
        body="Using SewDesk is like adding a professional workshop coordinator to your team. No more tracking down notebooks."
        business="Chioma N., Founder of Chic Apparels, Lagos"
        imageURL="./signup.webp"
      />
    </section>
  );
};

export default Page;
