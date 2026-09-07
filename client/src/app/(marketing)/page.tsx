import Hero from "./components/Hero";
import Feature from "./components/feature/Feature";
import Testimonial from "./components/testimonial/Testimonial";
import Pricing from "./components/pricing/Pricing";
import Process from "./components/process/Process";
import Faq from "./components/faq/Faq";

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
