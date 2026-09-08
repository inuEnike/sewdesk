import Hero from "./_components/Hero";
import Feature from "./_components/feature/Feature";
import Testimonial from "./_components/testimonial/Testimonial";
import Pricing from "./_components/pricing/Pricing";
import Process from "./_components/process/Process";
import Faq from "./_components/faq/Faq";

const Home = () => {
  return (
    <>
      <Hero />
      <Feature />
      <Testimonial />
      <Pricing />
      <Process />
      <Faq />
    </>
  );
};

export default Home;
