import Logo from "@/component/ui/Logo";
import { sidebarNavigation } from "../SidebarLinks";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuLogOut } from "react-icons/lu";
import { useBusinessBySlug } from "@/hooks/useBusinessBySlug";
import { CgClose } from "react-icons/cg";

const MobileSidebar = ({ onclick }: { onclick: () => void }) => {
  const pathname = usePathname();
  const { slug } = useParams();
  const { business } = useBusinessBySlug(slug);
  return (
    <section className="bg-background/70">
      <div className="bg-background-sidebar w-[65%] text-background md:hidden ">
        <div className="flex flex-col h-screen justify-between">
          <div className="mx-4 md:mx-7 my-5 md:my-7">
            <div className="flex items-center relative justify-between">
              <Logo isDark />
              <button
                className="absolute -right-10 py-2 px-1 top-0 "
                onClick={onclick}
              >
                <CgClose className="text-background-sidebar font-bold" />
              </button>
            </div>
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
                        <Icon
                          className={`${isActive ? "font-extrabold" : ""}`}
                        />
                        <span className="text-xs">{item.title}</span>
                      </Link>
                    );
                  })}
              </div>
            </nav>
          </div>
          <>
            <div className="flex flex-col gap-7 mt-10 mb-3">
          <hr className="text-muted-foreground"/>
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
                      className={`${isActive ? "active bg-icon-color text-background py-3 font-bold" : "text-muted-foreground"} px-3 rounded-lg font-xs flex items-center gap-2  `}
                    >
                      <Icon className={`${isActive ? "font-extrabold" : ""}`} />
                      <span className="text-xs">{item.title}</span>
                    </Link>
                  );
                })}
              <div className="text-muted-foreground px-3 rounded-lg font-xs flex items-center gap-2">
                <LuLogOut className="font-extrabold" />
                <span className="text-xs">
                  Logout {business?.business_name}
                </span>
              </div>
            </div>
          </>
        </div>
      </div>
    </section>
  );
};

export default MobileSidebar;
