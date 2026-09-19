import Logo from "@/component/ui/Logo";
import React from "react";
import { sidebarNavigation } from "../SidebarLinks";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { LuLogOut } from "react-icons/lu";
import { useBusinessBySlug } from "@/hooks/useBusinessBySlug";

const Sidebar = () => {
  const pathname = usePathname();
  const { slug } = useParams();
  const { business } = useBusinessBySlug(slug);
  return (
    <section className="bg-background-sidebar w-[30%] xl:w-[16%] 2xl:w-[15%] text-background not-md:hidden ">
      <div className="flex flex-col h-screen justify-between">
        <div className="mx-5 md:mx-5 my-5 md:my-7">
          <Logo isDark />
          <nav>
            <div className="flex flex-col gap-7 mt-10">
              {sidebarNavigation
                .filter((items) => items.section !== "secondary")
                .map((item) => {
                  const Icon = item.icon;

                  const isActive =
                    pathname === item.path ||
                    pathname.startsWith(`${item.path}/`);

                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`${isActive ? "active bg-icon-color text-background py-3 font-bold" : "text-muted-foreground"} px-3 rounded-lg font-xs flex items-center gap-2  `}
                    >
                      <Icon className={`${isActive ? "font-extrabold" : ""}`} />
                      <span className="text-xs">{item.title}</span>
                    </Link>
                  );
                })}
            </div>
          </nav>
        </div>
        <>
          <div className="flex flex-col gap-7 mt-10 mb-3 mx-5 md:mx-5 ">
            {sidebarNavigation
              .filter((items) => items.section === "secondary")
              .map((item) => {
                const Icon = item.icon;

                const isActive =
                  pathname === item.path ||
                  pathname.startsWith(`${item.path}/`);

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`${isActive ? "active bg-icon-color text-background py-3 font-bold" : "text-muted-foreground"} rounded-lg font-xs flex items-center gap-2  `}
                  >
                    <Icon className={`${isActive ? "font-extrabold" : ""}`} />
                    <span className="text-xs">{item.title}</span>
                  </Link>
                );
              })}
            <div className="text-muted-foreground rounded-lg font-xs flex items-center gap-2">
              <LuLogOut className="font-extrabold" />
              <span className="text-xs">Logout {business?.business_name}</span>
            </div>
          </div>
        </>
      </div>
    </section>
  );
};

export default Sidebar;
