import Container from "../components/Container";
import { allPosts } from "contentlayer/generated";
import { lightTheme } from "../styles/theme";
import { useContext } from "react";
import { ThemeContext } from "../pages/_app";
import GamePost from "../components/GamePost";
import gameList from "../data/gameList";

const Blog = ({ posts, lists }) => {
  const { colorTheme } = useContext(ThemeContext);

  return (
    <>
      <Container>
        <div
          className={`h-40 max-h-[12rem] flex flex-col duration-300 justify-center items-center rounded-md mb-10 ${
            colorTheme === lightTheme
              ? "text-black bg-gray-500"
              : "text-white bg-gray-500/40"
          }`}
        >
          <h1 className="text-4xl mb-4">Game Room</h1>
          <p className="text-lg">게임 포스팅</p>
        </div>
        <div className={`game_container h-[28rem]`}>
          {lists?.map !== 0 ? (
            lists.map((list, idx) => (
              <GamePost
                key={idx}
                title={list.title}
                count={list.count}
                posts={posts}
              />
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
    .filter((a) => a.tag === "game")
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  let lists = gameList;
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
