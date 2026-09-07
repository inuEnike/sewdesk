import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ isDark = false }: { isDark?: boolean }) => {
  return (
    <Link href={"/"}>
      <div className="logo">
        <Image
          src={isDark ? "/logo-dark.png" : "/logo.png"}
          width={137}
          height={36}
          alt="Sewdesk Logo"
          className="w-34.25 h-9 not-md:w-auto"
        />
      </div>
    </Link>
  );
};

export default Logo;
