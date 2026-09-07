import React from "react";
import { IconType } from "react-icons";

type FeatureCardProps = {
  icon: IconType;
  title: string;
  description: string;
};

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="w-full bg-white border border-border rounded-lg h-auto xl:h-51.25 p-4">
      <div className="bg-icon-background w-[10%] flex items-center justify-center py-2 rounded-lg">
        <Icon className="text-icon-color text-xl" />
      </div>
      <div className="py-4 flex flex-col gap-3">
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm text-light-text font-light">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
