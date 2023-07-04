import dynamic from "next/dynamic";
const NoteBook = dynamic(import("../components/NoteBook"));
const Container = dynamic(import("../components/Container"));

import { allPosts } from "contentlayer/generated";
import { useState, useEffect } from "react";
// import studyList from "../data/studyList";
// import Container from "../components/Container";

const studyList = [
  { title: "html", count: 0 },
  { title: "css", count: 0 },
  { title: "js", count: 0 },
  { title: "react", count: 0 },
];

const Blog = ({ posts }) => {
  const [list, setList] = useState(studyList);
  useEffect(() => {
    let lists = list;
    posts.forEach((a) => {
      lists.forEach((b) => {
        b.title === a.note ? (b.count = b.count + 1) : 0;
      });
    });
    setList((prev) => lists);
  }, []);
  // let list = studyList;
  // posts.forEach((a) => {
  //   list.forEach((b) => {
  //     b.title === a.note ? (b.count = b.count + 1) : 0;
  //   });
  // });

  console.log("notebook 컴포넌트", NoteBook);
  console.log("posts", posts);
  console.log("list", list);
  return (
    <>
      <Container>
        <div className="h-40 max-h-[12rem] bg-gray-500/40 flex flex-col justify-center items-center text-white rounded-md mb-10">
          <h1 className="text-4xl mb-4">Study Room</h1>
          <p className="text-lg">공부노트, 주제별 구분</p>
        </div>
        <h2 className="text-lg mb-4 border-b-white border-b-[1px]">카테고리</h2>
        <div className="flex justify-between">
          {list.map((list, idx) => (
            <NoteBook key={list.title} title={list.title} count={list.count} />
          ))}
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
