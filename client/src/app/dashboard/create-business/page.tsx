"use client";
import Logo from "@/component/ui/Logo";
import AddBusinessForm from "./components/AddBusinessForm";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  return (
    <>
      <div className="mx-10 mt-5">
        <button
          className="flex items-center gap-3 cursor-pointer mt-7"
          onClick={router.back}
        >
          <IoIosArrowBack />
          <span className="text-light-text text-sm">Go back</span>
        </button>
      </div>
      <section className="flex justify-center items-center h-auto not-md:my-10">
        <div className="md:bg-white w-full md:w-170 md:shadow-xs md:px-5 md:rounded-xl py-7 not-md:mx-3">
          <Logo />
          <div className="py-3">
            <p className="text-sm text-primary font-semibold">
              Create your business profile
            </p>
            {/* <hr className="border-2 my-2 border-primary rounded-xl" /> */}
          </div>
          <div className="">
            <h3 className="text-[18px] md:text-[22px] font-bold">
              Tell us about your business
            </h3>
            <p className="text-light-text text-[13px] md:text-sm pt">
              Set up your sewing studio profile to personalize measurements and
              invoices.
            </p>
          </div>
          <AddBusinessForm />
        </div>
      </section>
    </>
  );
};

export default page;
