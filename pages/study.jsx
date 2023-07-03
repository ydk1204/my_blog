import Container from "../components/Container";
import BlogPost from "../components/BlogPost";
import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { InferGetStaticPropsType } from "next";
import { useState, useEffect } from "react";
import NoteBook from "../components/NoteBook";
import studyList from "../data/studyList";

const Blog = ({ posts, list }) => {
  const [notes, setNotes] = useState(studyList);

  // useEffect(() => {
  //   posts.forEach((post) =>
  //     setNotes((prev) => ({
  //       ...prev,
  //       [post.title]: prev[post.title] === undefined ? 1 : prev[post.title] + 1,
  //     }))
  //   );
  // }, []);

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

  let list = studyList;
  posts.forEach((a) => {
    list.forEach((b) => {
      console.log("a는 ", a.note);
      console.log("b는 ", b.title);
      b.title === a.note ? (b.count = b.count + 1) : 0;
    });
  });

  return {
    props: {
      posts,
      list,
    },
  };
};

export default Blog;
