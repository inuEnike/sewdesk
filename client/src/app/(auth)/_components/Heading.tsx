import React from "react";

type Heading = {
  headingText: string;
  headingBody: string;
};

const Heading = ({ headingBody, headingText }: Heading) => {
  return (
    <div className="py-7">
      <h3 className="text-2xl md:text-3xl font-extrabold ">{headingText}</h3>
      <p className="text-sm text-muted-foreground py-2">
        {headingBody}
      </p>
    </div>
  );
};

export default Heading;
