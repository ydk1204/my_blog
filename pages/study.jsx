import Container from "../components/Container";
import NoteBook from "../components/NoteBook";
import { allPosts } from "contentlayer/generated";
import studyList from "../data/studyList";
import { lightTheme, ColorTheme } from "../styles/theme";
import { useContext } from "react";
import { ThemeContext } from "../pages/_app";
import Link from "next/link";

const Blog = ({ posts, lists }) => {
  const { colorTheme } = useContext(ThemeContext);

  return (
    <>
      <Container>
        <div
          className={`h-40 max-h-[12rem] flex flex-col duration-300 justify-center items-center rounded-md mt-24 mb-10 ${
            colorTheme === lightTheme
              ? "text-black bg-gray-500"
              : "text-white bg-gray-500/40"
          }`}
        >
          <h1 className="text-4xl mb-4">Study Room</h1>
          <p className="text-lg">공부노트, 주제별 구분</p>
        </div>
        <h2
          className={`text-lg mb-4  border-b-[1px] ${
            colorTheme === lightTheme ? "border-b-black" : "border-b-white"
          }`}
        >
          카테고리
        </h2>
        <div className="grid gap-3 xl:grid-cols-3 md:grid-cols-2 place-items-center mb-24">
          {lists?.map((list, idx) => (
            <NoteBook
              key={idx}
              title={list.title}
              count={list.count}
              posts={posts}
            />
          ))}
        </div>

        <div className="text-gray-400 text-xs">
          <Link
            target="_blank"
            href={
              "https://kr.freepik.com/icon/html_1051277#position=1&page=1&term=html&fromView=search"
            }
          >
            이미지 제공 Freepik - Freepik | &nbsp;
          </Link>
          <Link
            target="_blank"
            href={
              "https://kr.freepik.com/icon/css-3_732190#position=0&page=1&term=css&fromView=search"
            }
          >
            이미지 제공 Freepik - Pixel perfect | &nbsp;
          </Link>
          <Link
            target="_blank"
            href={
              "https://kr.freepik.com/icon/js_5968292#position=0&page=1&term=javascript&fromView=search"
            }
          >
            이미지 제공 Freepik - Brands Color | &nbsp;
          </Link>
          <Link
            target="_blank"
            href={
              "https://kr.freepik.com/icon/%EB%AC%BC%EB%A6%AC%ED%95%99_1126012#position=1&page=1&term=react&fromView=search"
            }
          >
            이미지 제공 Freepik - Kiranshastry
          </Link>
          <Link
            target="_blank"
            href={
              "https://www.freepik.com/icon/neural_2103633#fromView=search&term=algorithm&page=1"
            }
          >
            이미지 제공 Freepik - Becris
          </Link>
        </div>
      </Container>
    </>
  );
};

// 포스팅 항목 중 tag === study 인 경우만 filter + study 항목 별 포스팅 수 계산
export const getStaticProps = async () => {
  const posts = allPosts
    .filter((a) => a.tag === "study")
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  let lists = studyList;
  posts.forEach((a) => {
    lists.forEach((b) => {
      b.title === a.note ? (b.count = b.count + 1) : 0;
    });
  });

  return {
    props: {
      posts,
      lists,
    },
  };
};

export default Blog;
