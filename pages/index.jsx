import Conainer from "../components/Container";
import Image from "next/image";
import RecentPosts from "../components/RecentPosts";
import metadata from "../data/metadata";

import { allPosts } from "contentlayer/generated";
import { InferGetStaticPropsType } from "next";

const Home = ({ posts }) => {
  return (
    <Conainer>
      <div className={`my-5 w-full`}>
        <div className={`relative`}>
          {/* <Image
            src={`/home.png`}
            alt="대표 이미지"
            width={100}
            height={45}
            layout={`responsive`}
            className={`rounded-3xl object-cover`}
          />
          <span
            className={`absolute top-12 font-extrabold text-white text-5xl md:text-9xl text flex justify-center w-full drop-shadow-lg`}
          >
            {metadata.title}
          </span> */}
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
