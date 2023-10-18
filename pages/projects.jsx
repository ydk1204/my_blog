import Container from "../components/Container";
import ProjectsPost from "../components/ProjectsPost";
import { allPosts } from "contentlayer/generated";
import { lightTheme } from "../styles/theme";
import { useContext } from "react";
import { ThemeContext } from "../pages/_app";
import projectList from "../data/projectList";

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
          <h1 className="text-4xl mb-4">Projects Room</h1>
          <p className="text-lg">제작한 프로젝트 포스팅</p>
        </div>
        <div
          className={`grid gap-3 xl:grid-cols-3 lg:grid-cols-2 place-items-center`}
        >
          {lists.length !== 0 ? (
            lists.map((list, idx) => (
              <div key={idx} className="w-fit">
                <ProjectsPost
                  title={list.title}
                  count={list.count}
                  date={list.date}
                  description={list.description}
                  posts={posts}
                />
              </div>
            ))
          ) : (
            <div className="text-center mt-10 text-3xl">
              포스팅을 준비 중입니다.
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export const getStaticProps = async () => {
  const posts = allPosts
    .filter((a) => a.tag === "projects")
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  let lists = projectList;
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
