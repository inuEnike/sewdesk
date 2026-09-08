import React from "react";

type TestimonialProps = {
  fullName: string;
  description: string;
  businessName: string;
};

const TestimonialCard = ({
  fullName,
  description,
  businessName,
}: TestimonialProps) => {
  return (
    <div className="w-full bg-white border border-border rounded-lg h-auto xl:h-51.25 p-4">
      <div className="flex flex-col gap-3">
        <p className="text-xs leading-6 italic font-light text-light-text">{description}</p>

        <div className="flex flex-col gap-2">
          <p className="font-bold text-sm">{fullName}</p>
          <small className="text-xs text-light-text">{businessName}</small>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
