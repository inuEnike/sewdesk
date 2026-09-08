import Button from "@/component/ui/Button";
import OutlineButton from "@/component/ui/OutlineButton";
import Image from "next/image";
import React from "react";
import { AiFillYoutube } from "react-icons/ai";
import { GiNigeria } from "react-icons/gi";

const Hero = () => {
  return (
    <section className="m-auto my-10 md:my-20 flex flex-col items-center gap-7 px-5 md:text-center">
      <div className="bg-white shadow-xs px-7 py-2 rounded-full">
        <p className="text-xs text-light-text font-semibold flex items-center gap-2">
          The operating system for modern tailors
            <GiNigeria className="text-lg"/>
        </p>
      </div>
      <h1 className="text-foreground text-4xl md:4xl lg:text-6xl font-black lg:leading-15 md:w-180 lg:w-250">
        Manage your tailoring business without the hassle.
      </h1>
      <p className="text-light-text text-sm lg:w-160 font-light not-md:leading-6">
        SewDesk is built specifically for modern Nigerian tailors and designers.
        Track active customer orders, record precise measurements, manage
        expensive fabrics, and monitor payments in one clean platform.
      </p>
      <div className="flex items-center gap-3 not-md:w-full">
        <Button children="Get Started " variant="md" />
        <OutlineButton children={`Watch a Demo`} variant="md" showIcon={true} />
      </div>

      <div className="w-full max-w-5xl mt-4">
        <Image
          src="/dashboard.webp"
          alt="SewDesk dashboard"
          width={1200}
          height={900}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          className="w-full h-auto object-cover rounded-lg shadow-sm"
          priority
        />
      </div>
    </section>
  );
};

export default Hero;
