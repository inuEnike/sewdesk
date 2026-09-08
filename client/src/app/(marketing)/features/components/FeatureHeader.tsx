import React from "react";

type FeatureHeader = {
  id: string;
  badge: string;
  title: string;
  align?: string;
  description: string;
};

const FeatureHeader = ({ id, badge, description, title }: FeatureHeader) => {
  return (
    <div className="md:w-184">
      <div className="bg-white w-fit shadow-xs px-4 py-1 rounded-full">
        <p className="text-xs font-semibold uppercase text-primary">{badge}</p>
      </div>

      <div className="flex flex-col gap-3 py-5">
        <h2 className="text-xl md:text-2xl lg:text-4xl font-extrabold ">
          {id}. {title}
        </h2>
        <p className="text-light-text font-light text-sm md:leading-6">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureHeader;
