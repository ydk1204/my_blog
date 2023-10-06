import Image from "next/image";
import Conainer from "../components/Container";
import RecentPosts from "../components/RecentPosts";
import metadata from "../data/metadata";
import TypeIt from "typeit-react";
import { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";
import { ThemeContext } from "./_app";

import { allPosts } from "contentlayer/generated";

const options = {
  threshold: [0, 0.5, 1],
};

const Home = ({ posts }) => {
  const imgRef = useRef(null);
  const [instance, setInstance] = useState(null);
  const { interSectionScroll } = useContext(ThemeContext);

  // 텍스트 이펙트를 주는 object가 뷰포트에서 대략 절반이상 안 보이면 정지(freeze),
  // 범위 내 들어오면 다시 실행(unfreeze)
  const callback = (entries) => {
    instance !== null &&
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0.4) {
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
    const box = document.querySelector(".main-box");
    observer.observe(box);
  }, [instance]);

  return (
    <Conainer>
      <div className={`w-full flex flex-col items-center`}>
        <div className={`relative main-box w-screen top-0 left-0`}>
          <Image
            src={`/home.png`}
            alt="대표 이미지"
            width={100}
            height={45}
            layout={`responsive`}
            onLoadingComplete={() => imgRef.current.remove()}
            className={`object-fill`}
          />
          <div className="img-animation" ref={imgRef}></div>
          <div
            className={`absolute top-[3rem] md:top-[7rem] lg:top-[10rem] font-extrabold text-white text-2xl md:text-[4rem] lg:text-[5rem] text flex justify-center w-full drop-shadow-lg`}
          >
            {/* <TypeIt>{metadata.description}</TypeIt> */}
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
        </div>
        <div className="max-w-6xl">
          <RecentPosts posts={posts} />
        </div>
        <div className="max-w-6xl w-full relative h-20">
          <div className="copyright ">
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
