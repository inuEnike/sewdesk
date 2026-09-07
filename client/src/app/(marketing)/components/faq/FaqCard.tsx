import React from "react";

type FaqCard = {
  question: string;
  answer: string;
};

const FaqCard = ({ question, answer }: FaqCard) => {
  return (
    <div className=" w-full xl:w-[80%] 2xl:w-[70%] m-auto bg-white border border-border rounded-lg h-auto p-3 ">
      <div className="py-4 flex flex-col gap-3">
        <h3 className="font-bold">{question}</h3>
        <p className="text-xs text-light-text font-light">{answer}</p>
      </div>
    </div>
  );
};

export default FaqCard;
