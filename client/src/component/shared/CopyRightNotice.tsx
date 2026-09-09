import React from "react";

const CopyRightNotice = ({ color, boldness }: { color?: string, boldness?: string }) => {
  const year = new Date().getFullYear();
  return (
    <p className={`text-xs text-${color} font-${boldness}`}>
      © <span>{year}</span> SewDesk Technologies. All rights reserved.
    </p>
  );
};

export default CopyRightNotice;
