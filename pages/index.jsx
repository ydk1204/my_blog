import Conainer from "../components/Container";
import Image from "next/image";
import RecentPosts from "../components/RecentPosts";
import metadata from "../data/metadata";
import TypeIt from "typeit-react";

import { allPosts } from "contentlayer/generated";
import { InferGetStaticPropsType } from "next";

const Home = ({ posts }) => {
  return (
    <Conainer>
      <div className={`my-5 w-full`}>
        <div className={`relative`}>
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
                    .type("간단하게 ") // 간단하게 생각하고| 살기
                    .move(4)
                    .pause(300)
                    .type(", 편하게")
                    .move(null, { to: "END" })
                    .pause(1000)
                    .delete()
                    .go();
                  return instance;
                }}
                options={{
                  loop: true,
                  speed: 50,
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
