import React from "react";

type ProcessCardProp = {
  listNumber: string;
  title: string;
  description: string;
};

const ProcessCard = ({ listNumber, title, description }: ProcessCardProp) => {
  return (
    <div className="w-full h-auto my-5">
      <div className="">
        <h2 className="text-6xl font-black bg-clip-text text-transparent bg-linear-to-b from-digit-color to-background">
          {listNumber}
        </h2>
      </div>
      <div className="py-4 flex flex-col gap-3">
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm text-light-text font-light">{description}</p>
      </div>
    </div>
  );
};

export default ProcessCard;
