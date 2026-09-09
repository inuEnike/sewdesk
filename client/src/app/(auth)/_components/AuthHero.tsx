import React from "react";

type AuthHero = {
  imageURL: string;
  title: string;
  body: string;
  business: string;
};
const AuthHero = ({ imageURL, title, body, business }: AuthHero) => {
  return (
    <div
      className="not-md:hidden h-screen w-full bg-no-repeat bg-cover "
      style={{ backgroundImage: `url(${imageURL || "./login-bg.webp"})` }}
    >
      <div className="h-full w-120 flex flex-col justify-end px-10 py-20">
        <div className="bg-background rounded-md shadow px-5 flex flex-col gap-3 py-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-xs font-light text-light-text leading-5">{body}</p>
          <p className="text-primary font-semibold text-xs">— {business}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthHero;
