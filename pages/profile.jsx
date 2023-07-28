import Image from "next/image";
import { useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import ProfileCardSkill from "../components/ProfileCardSkill";
import profileTexts from "../data/profileTexts";
import Link from "next/link";

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
      <div className="copyright">
        <Link
          target="_blank"
          href={
            "https://pixabay.com/ko/illustrations/%EB%A0%8C%EC%A6%88-%ED%94%8C%EB%A0%88%EC%96%B4-%EC%82%AC%EC%A7%84-%ED%9A%A8%EA%B3%BC-3254468/"
          }
        >
          &#91; Pixabay - 렌즈 플레어 | &nbsp;
        </Link>
        <Link
          target="_blank"
          href={
            "https://pixabay.com/ko/vectors/%ED%95%98%EB%8A%98-%EA%B5%AC%EB%A6%84-%EC%82%B0-%ED%8C%8C%EB%9E%80%EC%83%89-34536/"
          }
        >
          하늘 | &nbsp;
        </Link>
        <Link
          target="_blank"
          href={
            "https://pixabay.com/ko/vectors/%EA%B7%B8%EB%9E%98%ED%94%BD-%EC%A2%85%EC%9D%B4-%EB%B9%84%ED%96%89%EA%B8%B0-%EC%A2%85%EC%9D%B4-4141628/"
          }
        >
          종이 비행기 | &nbsp;
        </Link>
        <Link
          target="_blank"
          href={
            "https://pixabay.com/de/illustrations/sonne-sonnenlicht-sonnenuntergang-7115270/"
          }
        >
          태양 &#93; | &nbsp;
        </Link>
        <Link
          target="_blank"
          href={
            "https://kr.freepik.com/free-vector/beautiful-cartoon-cloud-collection_18094033.htm#page=7&query=%EA%B5%AC%EB%A6%84&position=25&from_view=search&track=sph#position=25&page=7&query=%EA%B5%AC%EB%A6%84"
          }
        >
          Freepik - 구름 | &nbsp;
        </Link>
        <Link
          target="_blank"
          href={"https://www.flaticon.com/free-icon/cursor_770477"}
        >
          &#91; flaticon - 커서 | &nbsp;
        </Link>
        <Link
          target="_blank"
          href={
            "https://www.flaticon.com/free-icon/puzzle_227704?term=puzzle&page=1&position=28&origin=search&related_id=227704"
          }
        >
          flaticon - 퍼즐 | &nbsp;
        </Link>
        <Link
          target="_blank"
          href={
            "https://www.flaticon.com/kr/free-icon/edit_747825?term=%EC%97%B0%ED%95%84&page=1&position=84&origin=search&related_id=747825"
          }
        >
          flaticon - 연필 &#93;
        </Link>
      </div>
    </>
  );
};

export default Blog;
