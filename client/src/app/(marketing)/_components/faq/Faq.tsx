import Heading from "@/component/shared/Heading";
import React from "react";
import FaqCard from "./FaqCard";
import { faqQuestions } from "@/lib/utils/FaqQuestion";

const Faq = () => {
  return (
    <section className="bg-background-secondary">
      <div className="h-auto py-20 not-lg:px-5 w-full lg:w-[85%] xl:w-[70%] m-auto">
        <Heading
          eyebrow="Frequently Asked Questions"
          title="Got Questions? We have answers."
        />
        <section className="py-5 flex flex-col gap-4">
          {faqQuestions.map((faq, key) => (
            <FaqCard key={key} answer={faq.answer} question={faq.question} />
          ))}
        </section>
      </div>
    </section>
  );
};

export default Faq;
