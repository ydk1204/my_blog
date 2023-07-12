import Link from "next/link";
import Image from "next/image";
import recentImg from "../data/recent-img";
import { useContext } from "react";
import { lightTheme } from "../styles/theme";
import { ThemeContext } from "../pages/_app";

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
      <div className={`recent-container`}>
        {posts?.slice(0, 4).map((post) => (
          <div key={post._id} className="recent-card">
            <div className="recent-imgBx" data-text={post.tag}>
              {recentImg
                .filter((a) => a.tag === post.tag)
                .map((b) => (
                  <Image
                    key={b.tag}
                    width={100}
                    height={100}
                    src={`${b.img}`}
                    alt={"최신 포스팅 글 태그 이미지"}
                    className="recent-img"
                  ></Image>
                ))}
            </div>
            <div className="recent-content">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <Link
                href={`/${post.tag}/${post.note}/${post._raw.flattenedPath}`}
              >
                Read More...
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentPosts;
