import Link from "next/link";
import Image from "next/image";
import recentImg from "../data/recent-img";
import { useContext } from "react";
import { lightTheme } from "../styles/theme";
import { ThemeContext } from "../pages/_app";
import { RecentPostsCard } from "./RecentPostsCard";

const RecentPosts = ({ posts }) => {
  const { colorTheme } = useContext(ThemeContext);
  return (
    <section className={`mt-20`}>
      <h1 className={`text-center sm:text-left text-3xl font-extrabold`}>
        최근 게시물
      </h1>
      <div
        className={`w-full border-t-[1px] my-4 ${
          colorTheme === lightTheme ? "border-black" : "border-white"
        }`}
      ></div>
      <div className={`w-full flex justify-between flex-wrap`}>
        {posts?.slice(0, 4).map((post) => (
          <RecentPostsCard key={post._raw.flattenedPath} post={post} />
        ))}
      </div>
    </section>
  );
};

export default RecentPosts;
