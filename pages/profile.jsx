import Container from "../components/Container";
import Image from "next/image";
import { useEffect } from "react";
const observerOption = { threshold: [0, 0.5, 1] };

const Blog = () => {
  useEffect(() => {
    let cloudBar1 = document.getElementById("cloudbar1");
    let cloudBar2 = document.getElementById("cloudbar2");
    let flare = document.getElementById("flare");
    let airplane = document.getElementById("airplane");
    let sun = document.getElementById("sun");
    let text = document.getElementById("text");
    const container = document.querySelector(".profile_section");

    const parallax = () => {
      let value = window.scrollY;
      cloudBar1.style.left = value * -0.05 + "%";
      cloudBar2.style.left = value * -0.05 + "%";
      sun.style.opacity = value * 0.8 + "%";
      sun.style.left = value * 0.05 + "%";
      sun.style.bottom = value * 0.05 + "%";
      flare.style.opacity = value * 0.3 + "%";
      flare.style.transform = `rotate(${value * 0.05}deg)`;
      airplane.style.left = value * -0.15 + "%";
      airplane.style.bottom = value * 0.3 + "%";
      text.style.bottom = value * -0.08 + "%";
    };

    window.addEventListener("scroll", parallax);
    const isView = (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio <= 0.1)
          window.removeEventListener("scroll", parallax);
      });
    };

    const observer = new IntersectionObserver(isView, observerOption);
    observer.observe(container);
  }, []);

  return (
    <>
      {/* <Container> */}
      <div className="min-h-screen w-full profile_container">
        <section className="profile_section">
          <Image
            src="/profile_img/sky_background.svg"
            width={2000}
            height={2000}
            alt={"pallax background"}
            id={"background"}
          />
          <h2 id="text" className="profile_text" style={{ opacity: 1 }}>
            It&apos;s Me
          </h2>
          <Image
            src="/profile_img/sky_flare.png"
            width={1920}
            height={775}
            alt={"pallax flare"}
            id={"flare"}
            style={{ opacity: 0 }}
          />
          <Image
            src="/profile_img/sky_cloud_bar2.svg"
            width={2000}
            height={200}
            alt={"pallax clouds"}
            id={"cloudbar1"}
            style={{ opacity: 0.9 }}
          />
          <Image
            src="/profile_img/sky_cloud_bar.svg"
            width={2000}
            height={200}
            alt={"pallax clouds"}
            id={"cloudbar2"}
            style={{ opacity: 0.9 }}
          />
          <Image
            src="/profile_img/sky_suns.png"
            width={4724}
            height={4724}
            alt={"pallax sun"}
            id={"sun"}
            style={{ opacity: 0 }}
          />
          <Image
            src="/profile_img/sky_paper.svg"
            width={100}
            height={100}
            alt={"pallax paper airplane"}
            id={"airplane"}
          />
        </section>

        <div className="profile_main">
          <h2>반가워요</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis
            maxime sapiente iure vitae possimus, molestias sunt fugiat rem quasi
            repellat dolores labore quidem quis, impedit vero illum non
            reprehenderit vel voluptatem. Culpa accusantium velit explicabo iste
            est magnam optio necessitatibus harum assumenda, ipsam quaerat
            minima rerum? Accusamus, assumenda architecto temporibus quos quas
            quisquam, dolorem atque velit nobis, veniam nihil ut inventore hic
            esse iusto! Delectus, nisi. Quasi voluptatum fugiat, a asperiores
            impedit reprehenderit inventore voluptas quisquam doloribus quo rem
            aliquam nam esse pariatur ipsam hic similique ipsum quis
            exercitationem illo sint, dolorem corrupti minima. Incidunt
            temporibus amet ut, cupiditate quam ad iusto fugit architecto nihil
            perspiciatis tempore? Iste dicta ea, fuga delectus consequuntur
            rerum! Eum ab suscipit impedit nemo expedita dolorem facilis velit
            earum nobis possimus nulla, illo autem quidem saepe atque. Quae
            animi, a possimus quos assumenda eum! Doloremque, explicabo
            temporibus quisquam, laudantium assumenda accusamus porro tenetur
            nihil amet reprehenderit nobis dolores adipisci atque corrupti non
            quaerat impedit quam, esse saepe. Enim molestiae nesciunt, velit
            incidunt iure quibusdam natus possimus ut aliquam quasi repellendus,
            consectetur animi voluptatibus hic cum vitae voluptates alias?
            Incidunt, nemo. Deserunt quaerat nihil voluptatibus nisi!
            Consequatur amet illo fuga, veritatis doloribus ullam labore aperiam
            numquam expedita, porro quasi accusamus! Distinctio dolores
            dignissimos facilis rem a at eligendi nisi ut ullam voluptatem,
            magni labore voluptatum alias qui reprehenderit quis accusamus
            exercitationem. Dolore aspernatur doloribus ut! Ratione placeat
            reiciendis eos perferendis dolores, molestiae amet repellat dicta
            debitis magnam eaque iure cupiditate quibusdam necessitatibus quis
            tenetur in iste culpa corrupti, laboriosam et laudantium qui
            quisquam soluta! Illo, recusandae dolor? Repellendus quae
            distinctio, temporibus obcaecati quam aspernatur explicabo eaque!
            Cum temporibus in nam voluptatem quidem provident quasi ipsa beatae
            nisi, quia, alias laborum consequatur veniam debitis exercitationem
            cumque odit ducimus dolorem. Fugiat necessitatibus fugit ex,
            architecto aliquid nam voluptate! Rem voluptatibus et velit quis
            repellendus nam quibusdam aperiam dignissimos exercitationem,
            adipisci, porro earum iure qui quos. Vitae harum voluptatum sed quas
            dolore atque placeat laboriosam quo! Tempora, deserunt! Animi
            molestiae quasi inventore debitis dolore laudantium autem dolorem,
            iure numquam necessitatibus culpa, repellat quam sequi! Nostrum
            harum error repellat impedit soluta earum omnis voluptatibus maiores
            veniam? Cum quam officia fuga exercitationem sunt quasi molestias
            eaque, illo optio commodi suscipit praesentium quia voluptatem vel
            soluta expedita nobis eum quo porro accusamus quod minima. Magnam
            cupiditate suscipit deserunt unde aliquam pariatur asperiores.
            Eligendi vero deserunt ipsum sequi rerum voluptatem possimus
            architecto expedita, dolores, quisquam distinctio ipsam, aliquam
            dicta aliquid omnis sint rem beatae? Quos error rerum ullam libero
            nemo, nam beatae voluptatem odio et itaque, aspernatur reiciendis
            quaerat ad. Esse quod soluta, earum voluptas numquam rem reiciendis
            reprehenderit. Enim veniam eaque accusantium vitae recusandae velit
            repellendus possimus, optio fuga placeat delectus modi suscipit
            porro magni tempora omnis nam distinctio sint minima deserunt nulla
            vel eveniet necessitatibus. Ipsa, reiciendis magnam. Recusandae enim
            nihil voluptas mollitia facere quam nemo natus quia vero nisi optio
            harum voluptate culpa voluptatem facilis autem, beatae odio
            repudiandae sequi perspiciatis, quas aut explicabo praesentium esse!
            Ipsam deleniti id nostrum, assumenda officia saepe? Eaque ratione ad
            eos dolorem esse explicabo consequatur quia, quam error possimus
            laborum suscipit ex eius ullam reprehenderit id itaque adipisci
            nesciunt maiores nihil quisquam quo libero hic! Qui eius at magnam
            rerum quod corporis quos debitis saepe, ut alias quaerat aperiam
            sapiente ab quis esse. Cum, sint. Veritatis rerum eos officiis,
            ratione maiores impedit assumenda nisi unde voluptas quod corrupti
            doloribus consequatur ipsam praesentium, laboriosam fuga aliquid
            accusantium quibusdam architecto expedita provident voluptates vero
            voluptate nemo. Nulla soluta placeat odio iste repudiandae, tenetur
            vero veritatis doloribus non molestiae voluptas culpa ipsa! Quas
            alias maiores ipsum deserunt natus beatae, assumenda adipisci
            placeat minus cumque eius provident voluptatibus voluptatem, non
            amet commodi? Fugit mollitia nesciunt dolorem aut nemo eaque
            accusantium hic non impedit cum velit dolorum dignissimos, sapiente
            officia molestias ea repellat nobis quas repellendus soluta itaque
            ut adipisci asperiores. Ad repellat sequi impedit hic nobis aut
            labore repudiandae doloribus, eius commodi non ab voluptatum vero
            magnam blanditiis nihil fuga, ratione eos aspernatur. Reiciendis
            dolor aperiam consequuntur totam cum neque accusamus voluptatem
            corrupti harum tempore, libero, labore ea magni ipsa ab molestias
            expedita! Error rem repellendus perferendis placeat eligendi,
            dolores quasi quam officia alias labore ipsa nostrum sapiente
            corporis temporibus eum. Odit odio, soluta asperiores repellat iure
            doloremque iste placeat quae debitis illum accusamus voluptate
            reprehenderit. Exercitationem numquam commodi iure. Distinctio eos
            excepturi aperiam? Architecto vel velit veritatis dolorem dolores
            exercitationem aliquid provident libero ea asperiores ab nobis nihil
            ipsum aut adipisci, error tenetur sequi quo sint illum numquam ipsa
            cum optio? Eum, dolor delectus itaque, molestiae ipsum sint
            exercitationem amet autem minima error, explicabo fugit adipisci
            eaque sed animi odit! Magnam dolore qui, recusandae animi eaque eum
            labore libero repellendus illo officiis possimus inventore
            distinctio quae laborum velit minima rem iure error quibusdam
            quaerat consectetur sint ducimus eius mollitia! Nobis, libero? Velit
            commodi delectus dignissimos magni voluptatum alias unde eos
            accusantium officia error quidem pariatur, dolorem architecto quod
            est cumque consequuntur voluptas quos necessitatibus animi
            laudantium soluta et! Ea ad maiores laborum quidem atque magni
            repudiandae! Quam praesentium quibusdam modi sint porro cupiditate
            ipsum ipsam totam harum iusto? Debitis saepe tempore animi,
            voluptatem possimus, ab repudiandae, exercitationem reiciendis
            numquam obcaecati rem optio modi amet provident rerum quidem error
            et eaque praesentium molestiae maxime molestias! Laborum dolorem
            nulla sint fugit architecto esse error veniam officiis tempora
            aperiam dolor impedit, ducimus quia quibusdam. Voluptatem obcaecati
            repellat dolor, accusamus aperiam assumenda impedit, amet, maxime
            nemo architecto iste? Beatae facilis quia consequuntur nisi harum
            dignissimos, tempore eum dolores recusandae aspernatur nam quaerat,
            est id ducimus laboriosam inventore aperiam quae vel necessitatibus
            tenetur enim! A porro, officiis corporis aperiam at iste nostrum
            deleniti! Voluptates, esse magni eligendi asperiores, mollitia ad,
            rerum qui quod minus eum nulla blanditiis maxime consectetur quas
            adipisci? Obcaecati repellendus recusandae magni labore quam
            deserunt officiis est! Asperiores modi ipsa quae enim vero tenetur
            itaque soluta magni laudantium dolor quasi voluptatum reiciendis
            voluptatibus accusantium repellat dignissimos aspernatur doloremque
            a illo fugiat quibusdam, architecto possimus! Vel molestias officia
            provident repellendus!
          </p>
        </div>
      </div>
      {/* </Container> */}
    </>
  );
};

export default Blog;
