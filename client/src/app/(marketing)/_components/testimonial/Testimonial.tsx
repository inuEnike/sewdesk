import Heading from "@/component/shared/Heading";
import React from "react";
import TestimonialCard from "./TestimonialCard";

const Testimonial = () => {
  return (
    <section className="bg-background">
      <div className="h-auto xl:h-125 py-20 not-lg:px-5 w-full lg:w-[85%] xl:w-[70%] m-auto">
        <Heading
          eyebrow="Loved By Nigerian Tailors"
          title="See how SewDesk is changing fashion design"
        />
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 xl:gap-7 py-5">
          <TestimonialCard
            description={`"Before SewDesk, measurement books were constantly getting lost or smeared with chalk. Now, I pull up clients' cards on my tablet instantly. Highly recommended for any tailor in Lagos!"`}
            businessName="Kola Custom Suits, Surulere"
            fullName="Kola Adebayo"
          />
          <TestimonialCard
            description={`"Aso-Ebi orders used to be my biggest headache. Track payments and deliver on schedule? Chaos. SewDesk gave us order. Customers love the automatic SMS alerts."`}
            businessName="Bella Bride, Abuja"
            fullName="Amara Okoye"
          />
          <TestimonialCard
            description={`"SewDesk saved my workshop from huge losses. I can now track all my fabric inventory, monitor tailors' commissions, and know exactly which styles are profitable."`}
            businessName="Alhaji Musa & Sons, Kaduna"
            fullName="Alhaji Musa"
          />
        </section>
      </div>
    </section>
  );
};

export default Testimonial;
