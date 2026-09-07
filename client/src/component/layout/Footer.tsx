import React from "react";
import Logo from "../ui/Logo";
import { FaFacebookF, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { LuLinkedin } from "react-icons/lu";
import { footerItems } from "@/lib/utils/footerItems";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-footer">
      <div className="h-auto py-20 not-lg:px-5 w-full lg:w-[85%] xl:w-[70%] m-auto text-background grid md:grid-cols-2 lg:grid-cols-4 gap-10 items-centser justify-between">
        <div className="flex flex-col">
          <Logo isDark />
          <p className="w-full md:dw-87.5 text-xs py-5 leading-6 text-light-text">
            The complete operating system for modern Nigerian fashion designers
            and tailors. Manage orders, clients, measurements, and payouts in
            one smart app.
          </p>
          <div className="flex items-center gap-3">
            <div className="bg-footer-icon-background p-3 rounded-full">
              <FaXTwitter />
            </div>
            <div className="bg-footer-icon-background p-3 rounded-full">
              <LuLinkedin />
            </div>
            <div className="bg-footer-icon-background p-3 rounded-full">
              <FaFacebookF />
            </div>
          </div>
        </div>
        <div className="">
          <h3 className="text-lg font-bold text-background uppercase">
            Product
          </h3>
          <ul className=" flex flex-col gap-4 pt-2">
            {footerItems.product.map((item, key) => (
              <li className="text-xs text-light-text" key={key}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <h3 className="text-lg font-bold text-background uppercase">
            Company
          </h3>
          <ul className=" flex flex-col gap-4 pt-2">
            {footerItems.company.map((item, key) => (
              <li className="text-xs text-light-text" key={key}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <h3 className="text-lg font-bold text-background uppercase">
            Contact Us
          </h3>
          <ul className="flex flex-col gap-4 pt-2">
            {footerItems.contactUs.map((item) => (
              <li
                key={item.type || item.value}
                className="text-xs text-light-text"
              >
                {item.href ? (
                  <Link href={item.href} className="hover:underline">
                    {item.value}
                  </Link>
                ) : (
                  <span>{item.value}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-light-text h-auto py-10 not-lg:px-5 w-full lg:w-[85%] xl:w-[70%] m-auto">
        <hr className="" />
        <div className="py-3 flex lg:items-center not-lg:flex-col justify-between">
          <p className="text-xs">
            © <span>{year}</span> SewDesk Technologies. All rights reserved.
          </p>

          <ul className="flex lg:items-center gap-4 pt-2">
            {footerItems.legal.map((item, key) => (
              <li key={key} className="text-xs text-light-text">
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
