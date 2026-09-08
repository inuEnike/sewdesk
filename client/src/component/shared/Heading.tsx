import React from "react";

type Heading = {
  eyebrow: string;
  title: string;
};

const Heading = ({ eyebrow, title }: Heading) => {
  return (
    <header className="flex flex-col items-start gap-4 w-full md:w-150 md:mx-auto text-left md:text-center my-5">
      <h4 className="uppercase font-bold text-primary text-sm w-full">
        {eyebrow}
      </h4>

      <h2 className="text-2xl md:text-3xl font-extrabold w-full">{title}</h2>
    </header>
  );
};
export default Heading;
