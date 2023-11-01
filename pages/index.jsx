import Image from "next/image";
import Conainer from "../components/Container";
import RecentPosts from "../components/RecentPosts";
import metadata from "../data/metadata";
import TypeIt from "typeit-react";
import { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";
import { ThemeContext } from "./_app";
import dice from "../public/dice.jpg";
import arrow from "../public/downArrow.webp";
import { lightTheme, ColorTheme } from "../styles/theme";

import { allPosts } from "contentlayer/generated";

const options = {
  threshold: [0, 0.3, 0.5],
};

const Home = ({ posts }) => {
  const imgRef = useRef(null);
  const [instance, setInstance] = useState(null);
  const { colorTheme, interSectionScroll } = useContext(ThemeContext);

  // 텍스트 이펙트를 주는 object가 뷰포트에서 대략 절반이상 안 보이면 정지(freeze),
  // 범위 내 들어오면 다시 실행(unfreeze)
  const callback = (entries) => {
    instance !== null &&
      entries.forEach((entry) => {
        if (entry.intersectionRatio < 0.3) {
          instance.unfreeze();
          interSectionScroll(false);
        } else {
          instance.freeze();
          interSectionScroll(true);
        }
      });
  };

  // IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    const box = document.querySelector(".post-box");
    observer.observe(box);
  }, [instance]);

  const bgImg = {
    "--img": `url("${dice.src}")`,
  };

  return (
    <Conainer>
      <div className={`w-full flex flex-col items-center homepage`}>
        <div className="block relative w-full h-screen">
          <div className="main-box" style={bgImg}></div>
          <div
            className={`absolute top-[20rem] md:top-[15rem] lg:top-[20rem] font-extrabold text-white text-[3rem] md:text-[4rem] lg:text-[5rem] text flex justify-center w-full drop-shadow-lg`}
          >
            <p aria-label={metadata.description}>
              <TypeIt
                getBeforeInit={(instance) => {
                  instance
                    .pause(300)
                    .move(-7)
                    .type("간단하게 ")
                    .move(4)
                    .pause(300)
                    .type(", 편하게")
                    .move(null, { to: "END" }) // 간단하게 생각하고, 편하게 살기|
                    .pause(1000)
                    .delete(5) // 간단하게 생각하고, 편
                    .move(-1) // 간단하게 생각하고, |편
                    .delete(10); // 간편
                  setInstance(instance);
                  return instance;
                }}
                options={{
                  cursor: false,
                  waitUntilVisible: true,
                  // loop: true,
                  speed: 100,
                }}
              >
                생각하고 살기
              </TypeIt>
            </p>
          </div>
          <div className="absolute bottom-[14rem] text-white sm:bottom-20 flex flex-col items-center w-full">
            <Image
              src={arrow}
              width={50}
              height={50}
              alt={"down arrow"}
              className="arrowDown w-20"
            />
            <div className="w-20 h-[1px] spread-div"></div>
          </div>
        </div>
        <div
          className={`post-box overflow-x-hidden w-full flex flex-col justify-center items-center z-10 ${
            colorTheme === lightTheme ? "bg-white" : "bg-zinc-900"
          }`}
        >
          <div className="max-w-6xl h-full">
            <RecentPosts posts={posts} />
          </div>
          <div className="max-w-6xl w-full relative h-10 mt-10">
            <div className="text-gray-400">
              <Link
                target="_blank"
                href={
                  "https://pixabay.com/ko/users/cromaconceptovisual-4595909/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6022003"
                }
              >
                이미지 제공 Pixabay - cromaconceptovisual
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Conainer>
  );
};

export const getStaticProps = async () => {
  const posts = allPosts.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );

  return {
    props: {
      posts,
    },
  };
};

export default Home;
