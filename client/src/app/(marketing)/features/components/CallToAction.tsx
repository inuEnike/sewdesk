import Button from "@/component/ui/Button";
import Link from "next/link";
import React from "react";

const CallToAction = () => {
  return (
    <section className="bg-footer text-background py-12 flex justify-center">
      <div className="flex flex-col text-center justify-center md:w-170 items-center gap-6 px-3">
        <h2 className="text-2xl md:text-4xl font-extrabold">
          Ready to run a structured, profitable tailoring business?
        </h2>
        <p className="text-sm">
          Join hundreds of premium Nigerian tailors who use SewDesk to power
          their operations.
        </p>
        <Link href={"/signup"}>
          <Button children="Start Your 14-Day Free Trial" />
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
