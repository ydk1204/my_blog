import Conainer from "../components/Container";
import Image from "next/image";
import RecentPosts from "../components/RecentPosts";
import metadata from "../data/metadata";
import TypeIt from "typeit-react";
import { useState, useEffect, useRef } from "react";

import { allPosts } from "contentlayer/generated";

const options = {
  threshold: [0, 0.5, 1],
};

const Home = ({ posts }) => {
  const [instance, setInstance] = useState(null);

  // 텍스트 이펙트를 주는 object가 뷰포트에서 대략 절반이상 안 보이면 정지(freeze),
  // 범위 내 들어오면 다시 실행(unfreeze)
  const callback = (entries) => {
    instance !== null &&
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0.4) {
          instance.unfreeze();
        } else {
          instance.freeze();
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
      <div className={`my-5 w-full`}>
        <div className={`relative main-box`}>
          <Image
            src={`/home.png`}
            alt="대표 이미지"
            width={100}
            height={45}
            layout={`responsive`}
            className={`rounded-3xl object-fill`}
          />
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
                    .move(null, { to: "END" })
                    .pause(1000);
                  setInstance(instance);
                  return instance;
                }}
                options={{
                  cursor: false,
                  waitUntilVisible: true,
                  loop: true,
                  speed: 100,
                }}
              >
                생각하고 살기
              </TypeIt>
            </p>
          </div>
        </div>
        <RecentPosts posts={posts} />
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
