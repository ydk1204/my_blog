import Image from "next/image";
import { useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import ProfileCardSkill from "../components/ProfileCardSkill";
import profileTexts from "../data/profileTexts";

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
            style={{ opacity: 1 }}
          />
          <Image
            src="/profile_img/sky_cloud_bar.svg"
            width={2000}
            height={200}
            alt={"pallax clouds"}
            id={"cloudbar2"}
            style={{ opacity: 1 }}
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
          {profileTexts &&
            profileTexts.map((text) => (
              <ProfileCard
                key={text.header}
                header={text.header}
                imgName={text.imgName}
                textBox={text.textBox}
              />
            ))}
          <ProfileCardSkill />
        </div>
      </div>
    </>
  );
};

export default Blog;
