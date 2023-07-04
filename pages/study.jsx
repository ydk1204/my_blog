import dynamic from "next/dynamic";

import { allPosts } from "contentlayer/generated";
const Container = dynamic(import("../components/Container"));
const NoteBook = dynamic(import("../components/NoteBook"));
import studyList from "../data/studyList";

// import Container from "../components/Container";
// import NoteBook from "../components/NoteBook";

const Blog = ({ posts }) => {
  let list = studyList;
  posts.forEach((a) => {
    list.forEach((b) => {
      b.title === a.note ? (b.count = b.count + 1) : 0;
    });
  });
  return (
    <>
      <Container>
        <div className="h-40 max-h-[12rem] bg-gray-500/40 flex flex-col justify-center items-center text-white rounded-md mb-10">
          <h1 className="text-4xl mb-4">Study Room</h1>
          <p className="text-lg">공부노트, 주제별 구분</p>
        </div>
        <h2 className="text-lg mb-4 border-b-white border-b-[1px]">카테고리</h2>
        <div className="flex justify-between">
          {posts?.length !== 0 ? (
            list?.map((list, idx) => (
              <NoteBook key={idx} title={list.title} count={list.count} />
            ))
          ) : (
            <div>아직 포스팅이 없습니다.</div>
          )}
        </div>
      </Container>
    </>
  );
};

export const getStaticProps = async () => {
  const posts = allPosts
    .filter((a) => a.tag === "study")
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  // let list = studyList;
  // posts.forEach((a) => {
  //   list.forEach((b) => {
  //     b.title === a.note ? (b.count = b.count + 1) : 0;
  //   });
  // });

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
