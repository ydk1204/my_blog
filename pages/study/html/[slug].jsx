import Container from "components/Container";
import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import BookList from "../../../components/BookList";
import Toc from "../../../components/Toc";
import { useState, useEffect, useContext } from "react";
import { lightTheme, ColorTheme } from "../../../styles/theme";
import { ThemeContext } from "../../_app";
import RelatedPostCard from "../../../components/RelatedPostCard";

const Post = ({ post, posts }) => {
  const { colorTheme } = useContext(ThemeContext);
  const [prevPost, setPrevPost] = useState({});
  const [nextPost, setNextPost] = useState({});

  const MDXComponent = useMDXComponent(post.body.code);
  const customMeta = {
    title: post.title,
    description: post.description,
    date: new Date(post.date).toISOString(),
  };

  useEffect(() => {
    if (posts.length < 1) return;
    const nullObj = {};

    const findIndex = posts.findIndex((e) => e.title === customMeta.title);

    if (findIndex === 0) {
      setPrevPost(posts[findIndex + 1]);
      setNextPost(nullObj);
    } else if (findIndex === posts.length - 1) {
      setPrevPost(nullObj);
      setNextPost(posts[findIndex - 1]);
    } else {
      setPrevPost(posts[findIndex + 1]);
      setNextPost(posts[findIndex - 1]);
    }
  }, [posts]);

  return (
    <Container customMeta={customMeta}>
      <div className="w-full min-h-[80rem] h-full flex flex-row justify-center xl:justify-start">
        <div className="hidden xl:flex w-48 flex-col items-center pl-7 z-10">
          <BookList posts={posts} title={post.title} />
        </div>
        <div
          className={`mx-6 prose w-full md:ml-6 ${
            colorTheme === lightTheme ? "" : "dark:prose-invert"
          }`}
        >
          <h1 className="">{post.title}</h1>
          <div>
            <MDXComponent />
          </div>
          <div
            className={`py-10 my-10 border-b-2 ${
              colorTheme === lightTheme ? "border-b-black" : "border-b-white"
            }`}
          ></div>
          <article className="flex flex-col md:flex-row justify-between">
            {Object.keys(prevPost).length >= 1 ? (
              <RelatedPostCard division={"이전 글"} post={prevPost} />
            ) : (
              <div className="w-full md:w-[45%]"></div>
            )}
            {Object.keys(nextPost).length >= 1 && (
              <RelatedPostCard division={"다음 글"} post={nextPost} />
            )}
          </article>
        </div>
        <div className="hidden xl:block sticky w-60 h-full top-52 ml-10 ">
          <Toc prevPost={prevPost} />
        </div>
      </div>
    </Container>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: allPosts.map((p) => ({ params: { slug: p._raw.flattenedPath } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const post = allPosts.find((p) => p._raw.flattenedPath === params.slug);

  const posts = allPosts
    .filter((a) => a.note === post.note)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  return {
    props: {
      post,
      posts,
    },
  };
};

export default Post;
