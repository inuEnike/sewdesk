"use client";
import React, { useEffect, useState } from "react";
import MobileSidebar from "../_components/navigation/MobileSideBar";
import Sidebar from "../_components/navigation/Sidebar";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useBusinessBySlug } from "@/hooks/useBusinessBySlug";
import ErrorState from "@/component/shared/ErrorState";
import TopBar from "../_components/navigation/TopBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { slug } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const { business } = useBusinessBySlug(slug);

  if (business?.status === "pending") {
    return (
      <ErrorState
        onClose={() => router.push("/dashboard/my-businesses")}
        message="Trial Expired, Please subscribe"
        title="Trial Expired"
      />
    );
  }

  const [toggleSideBar, setToggleSIdeBar] = useState<boolean>(false);

  useEffect(() => {
    setToggleSIdeBar(false);
  }, [pathname]);

  const handleToggleSideBar = () => {
    setToggleSIdeBar((prev) => !prev);
  };
  return (
    <section className="bg-background w-full h-auto flex">
      {toggleSideBar && (
        <div className="">
          <MobileSidebar onclick={handleToggleSideBar} />
        </div>
      )}
      <Sidebar />

      <div className="flex-1">
        <TopBar onclick={handleToggleSideBar} slug={slug} />
        {children}
      </div>
    </section>
  );
};

export default Layout;
