"use client";
import { navItems } from "@/lib/utils/navItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Button from "../ui/Button";
import { BsGrid3X2GapFill, BsList } from "react-icons/bs";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import Logo from "../ui/Logo";
import { useApp } from "@/context/AppContext";

const Nav = () => {
  const pathName = usePathname();
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const { me } = useApp();

  function handleToggleNav() {
    setNavOpen((prev) => !prev);
  }
  return (
    <>
      <nav
        className={`bg-background w-full lg:w-[85%] xl:w-[70%] py-7 flex items-center flex-col justify-between shadow-xs ${navOpen ? "rounded-b-xl" : "rounded-full"} px-7 my-3 m-auto sticky top-0`}
      >
        <div className="flex items-center justify-between w-full">
          <Logo />
          <ul className="navItems flex items-center gap-10 text-[15px] not-md:hidden">
            {navItems.map((item, key) => {
              const activeRoute = pathName === item.path;

              return (
                <li key={key}>
                  <Link
                    href={item.path}
                    className={`${activeRoute && "text-primary font-semibold"} text-light-text`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className="authActions gap-4 flex items-center not-md:hidden text-[15px]">
            {me === null ? (
              <>
                <Link href={"/login"} className="text-light-text">
                  Log In
                </Link>
                <Button children="Get Started" />
              </>
            ) : (
              <Button children="Dashboard" />
            )}
          </ul>

          <button className="md:hidden" onClick={handleToggleNav}>
            {navOpen ? (
              <IoClose className="text-xl" />
            ) : (
              <BsList className="text-xl" />
            )}
          </button>
        </div>
        {navOpen && (
          <>
            <ul className="navItems flex items-center flex-col my-10 gap-10 text-[15px] md:hidden">
              {navItems.map((item, key) => {
                const activeRoute = pathName === item.path;

                return (
                  <li key={key}>
                    <Link
                      href={item.path}
                      className={`${activeRoute && "text-primary font-semibold"} text-light-text`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <ul className="authActions gap-4 flex flex-col items-center pb-2 md:hidden text-[15px]">
              {me && me === null ? (
                <>
                  <Link href={"/login"} className="text-light-text">
                    Log In
                  </Link>
                  <Button children="Get Started" />
                </>
              ) : (
                <Button children="Dashboard" />
              )}
            </ul>
          </>
        )}
      </nav>
    </>
  );
};

export default Nav;
