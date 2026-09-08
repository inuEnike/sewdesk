import React from "react";

type Hero = {
  eyebrow: string;
  title: string;
  body: string;
};

const Hero = ({ eyebrow, title, body }: Hero) => {
  return (
    <section className="m-auto my-10 md:my-20 flex flex-col items-center gap-6 px-5 md:text-center">
      <div className="not-md:flex justify-start items-center not-md:w-full">
        <h4 className="uppercase text-left font-bold text-primary text-sm w-full">
          {eyebrow}
        </h4>
      </div>
      <h1 className="text-foreground text-3xl md:3xl lg:text-5xl font-black lg:leading-15 md:w-180 lg:w-250">
        {title}
      </h1>
      <p className="text-light-text text-sm lg:w-160 font-light not-md:leading-6">
        {body}
      </p>
    </section>
  );
};

export default Hero;
