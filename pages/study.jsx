import Container from "../components/Container";
import NoteBook from "../components/NoteBook";
import { allPosts } from "contentlayer/generated";
import studyList from "../data/studyList";

const Blog = ({ posts, lists }) => {
  return (
    <>
      <Container>
        <div className="h-40 max-h-[12rem] bg-gray-500/40 flex flex-col justify-center items-center text-white rounded-md mb-10">
          <h1 className="text-4xl mb-4">Study Room</h1>
          <p className="text-lg">공부노트, 주제별 구분</p>
        </div>
        <h2 className="text-lg mb-4 border-b-white border-b-[1px]">카테고리</h2>
        <div className="flex justify-between">
          {lists?.map((list, idx) => (
            <NoteBook
              key={idx}
              title={list.title}
              count={list.count}
              posts={posts}
            />
          ))}
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
