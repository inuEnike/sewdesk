"use client";

import { useApp } from "@/context/AppContext";
import { useBusinessBySlug } from "@/hooks/useBusinessBySlug";
import { useGreet } from "@/hooks/useGreet";
import { getTodaysDate } from "@/lib/utils/getTodaysDate";
import { useParams } from "next/navigation";
import Kpi from "../../_components/kpi/Kpi";

const Page = () => {
  const { getDayOfTheWeek, getMonthOfTheYear, getToday } = getTodaysDate();
  const { slug } = useParams();
  const { me } = useApp();
  const { business } = useBusinessBySlug(slug);
  const { greet } = useGreet();

  const getName = me?.full_name.split(" ");
  console.log(getName);

  return (
    <main className="px-5 lg:px-12 py-7 lg:py-10">
      <div className="">
        <h1 className="text-2xl font-bold">
          {greet}, {getName ? `${getName[0]} ${getName[1]}` : "User"}
        </h1>
        <p className="text-light-text text-xs not-mdfont-light md:text-sm py-2">
          Your {business ? business?.business_name : "business"} workspace is
          fully synchronized • <span>{getDayOfTheWeek}</span>,{" "}
          <span>{getMonthOfTheYear}</span> <span>{getToday}</span>
        </p>
      </div>
      <section>
        <Kpi />
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis fugiat
        molestias incidunt quibusdam fuga sed ab labore, libero rerum,
        repellendus commodi doloremque doloribus enim dignissimos distinctio.
        Harum placeat odit, eaque quidem maiores voluptatum sint omnis. Ab eius
        nihil debitis. Inventore maiores sint obcaecati facilis mollitia
        suscipit, vitae quos expedita optio pariatur placeat quasi quas
        repellendus repellat voluptatibus fugit in cumque. Consequatur quaerat
        odit eveniet sapiente consectetur, eaque doloribus magnam architecto
        omnis ducimus maxime numquam. Quisquam, laudantium asperiores mollitia
        quas unde enim! Sit blanditiis et iure sapiente quia fugiat deleniti
        consequuntur labore, provident vel distinctio, iusto minima quasi
        perferendis? Sit, voluptate et. Numquam nihil sint, asperiores deleniti
        dicta repellat, adipisci impedit labore sunt molestiae consequuntur
        libero earum, atque deserunt eaque. Rerum, doloribus exercitationem!
        Voluptate illum reiciendis repellat nobis quam illo, eveniet quod
        adipisci ipsam. Dolores, dolorum dolore. Odit alias quibusdam hic
        exercitationem inventore, reprehenderit modi voluptatibus molestias
        laboriosam consequatur excepturi asperiores eum voluptates numquam
        perspiciatis minus quas eius eveniet at. Aut molestiae magnam, odit nisi
        saepe in accusamus numquam natus voluptate sunt eos. Natus aut itaque
        minus officiis inventore doloremque. Numquam sed, ipsum excepturi
        facilis eius vel magni quas, nostrum qui distinctio, eligendi tempore
        harum neque. Velit sed molestias veritatis eligendi facere voluptatum
        esse eaque odit dolores earum eveniet tenetur excepturi, labore deserunt
        iste ut aliquid aperiam provident sapiente? Quis consequuntur hic
        tempora voluptatem repudiandae excepturi ipsam! Rem odio ab reiciendis
        saepe atque nemo! Sit architecto repellendus facere dolorem dolores
        totam reprehenderit quas, tempora dicta iste assumenda debitis minus
        blanditiis atque incidunt nihil eos laborum in aperiam? Qui ut eos ea
        tenetur nisi dolorem nesciunt, veritatis quas delectus, fugit eaque
        odio? Iusto doloribus ut repellat perspiciatis amet quos ratione laborum
        magnam laboriosam voluptatum cumque quis maiores id, nemo quisquam
        praesentium nulla ipsa sunt maxime iste assumenda repellendus. Deserunt,
        esse sapiente. Quidem ipsa harum nulla perspiciatis eveniet iste
        molestiae fugiat dolore aliquid obcaecati minima, debitis blanditiis
        ipsam doloremque, consequuntur ratione, est odio? Voluptatibus quas eum
        natus reprehenderit labore pariatur odit quis numquam recusandae dicta.
      </section>
    </main>
  );
};

export default Page;
