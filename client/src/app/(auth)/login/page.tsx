import Logo from "@/component/ui/Logo";
import AuthHero from "../_components/AuthHero";
import CopyRightNotice from "@/component/shared/CopyRightNotice";
import LoginForm from "../_components/LoginForm";

const Page = () => {
  return (
    <section className="grid md:grid-cols-[1.3fr_1fr] xl:grid-cols-[1fr_1.2fr] w-full">
      <div className="py-10 px-5 lg:px-7 xl:p-20 w-full flex flex-col justify-between">
        <div className="not-md:flex justify-center items-center">
          <Logo />
        </div>
        <LoginForm />

        <div className=" w-full flex flex-col justify-end py-7 md:hidden">
          <div className="bg-background rounded-md shadow px-5 flex flex-col gap-3 py-4">
            <h3 className="text-xl font-bold">{`We reclaimed our studio floor.`}</h3>
            <p className="text-xs font-light text-light-text leading-5">
              {`Using SewDesk, we tracked 250 Aso Ebi outfits for a single ceremony without a single fit measurement error. Highly recommended for Lagos designers.`}
            </p>
            <p className="text-primary font-semibold text-xs">
              — {`Fadekemi O., Lead Creative at House of Fad`}
            </p>
          </div>
        </div>
        <div className="not-md:text-center">
          <CopyRightNotice color="light-text" boldness="light" />
        </div>
      </div>
      <AuthHero
        title="We reclaimed our studio floor."
        body="Using SewDesk, we tracked 250 Aso Ebi outfits for a single ceremony
            without a single fit measurement error. Highly recommended for Lagos
            designers."
        business="Fadekemi O., Lead Creative at House of Fad"
        imageURL="./login-bg.webp"
      />
    </section>
  );
};

export default Page;
