"use client";

import Logo from "@/component/ui/Logo";
import SideNavLinks from "../SidebarLinks";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

import { LuLogOut } from "react-icons/lu";
import { CgClose } from "react-icons/cg";

import { useBusinessBySlug } from "@/hooks/useBusinessBySlug";

const MobileSidebar = ({ onclick }: { onclick: () => void }) => {
  const pathname = usePathname();
  const { slug } = useParams();

  const { business } = useBusinessBySlug(slug);

  const sidebarNavigation = SideNavLinks();

  return (
    <section className="fixed inset-0 z-50 bg-background/70">
      <div className="relative h-screen w-[65%] bg-background-sidebar text-background md:hidden">
        {/* Close button */}
        <button
          className="absolute -right-10 top-5 z-50 px-1 py-2"
          onClick={onclick}
        >
          <CgClose className="font-bold text-background-sidebar" />
        </button>

        {/* Scrollable content */}
        <div className="h-full overflow-y-auto scrollbar-hidden flex flex-col justify-between">
          {/* Main navigation */}
          <div className="mx-4 my-5 md:mx-7 md:my-7">
            <Logo isDark />

            <nav>
              <div className="mt-10 flex flex-col gap-7">
                {sidebarNavigation
                  .filter((item) => item.section !== "secondary")
                  .map((item) => {
                    const Icon = item.icon;

                    const isActive =
                      pathname === item.path ||
                      pathname.startsWith(`${item.path}/`);

                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`${
                          isActive
                            ? "bg-icon-color py-3 font-bold text-background"
                            : "text-muted-foreground"
                        } flex items-center gap-2 rounded-lg px-3 font-xs`}
                      >
                        <Icon className={isActive ? "font-extrabold" : ""} />

                        <span className="text-xs">{item.title}</span>
                      </Link>
                    );
                  })}
              </div>
            </nav>
          </div>

          {/* Secondary navigation */}
          <div className="mx-4 mb-3 mt-10 flex flex-col gap-7">
            <hr className="text-muted-foreground" />

            {sidebarNavigation
              .filter((item) => item.section === "secondary")
              .map((item) => {
                const Icon = item.icon;

                const isActive =
                  pathname === item.path ||
                  pathname.startsWith(`${item.path}/`);

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`${
                      isActive
                        ? "bg-icon-color py-3 font-bold text-background"
                        : "text-muted-foreground"
                    } flex items-center gap-2 rounded-lg px-3 font-xs`}
                  >
                    <Icon className={isActive ? "font-extrabold" : ""} />

                    <span className="text-xs">{item.title}</span>
                  </Link>
                );
              })}

            {/* Logout */}
            <div className="flex items-center gap-2 rounded-lg px-3 font-xs text-muted-foreground">
              <LuLogOut className="font-extrabold" />

              <span className="text-xs">Logout {business?.business_name}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileSidebar;
