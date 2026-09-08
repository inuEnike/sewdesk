import React from "react";

type FeaturePreviewCard = {
  title: string;
  details: {
    label: string;
    value: string;
  }[];
};

const FeaturePreviewCard = ({ title, details }: FeaturePreviewCard) => {
  return (
    <div className="bg-background md:w-120 px-3 py-3 shadow-xs rounded-md">
      <p className="font-extrabold text-ferra ">{title}</p>

      <hr className="my-3 border-background-secondary border" />

      <ul className="flex flex-col gap-2">
        {details?.map((detail, key) => (
          <li key={key} className="text-sm text-light-text">
            <span>{detail.label}</span>: {" "}
            {detail.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturePreviewCard;
