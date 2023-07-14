import Container from "components/Container";
import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import BookList from "../../../components/BookList";
import Toc from "../../../components/Toc";
import { useContext } from "react";
import { lightTheme, ColorTheme } from "../../../styles/theme";
import { ThemeContext } from "../../_app";

const Post = ({ post, posts }) => {
  const { colorTheme } = useContext(ThemeContext);

  const MDXComponent = useMDXComponent(post.body.code);
  const customMeta = {
    title: post.title,
    description: post.description,
    date: new Date(post.date).toISOString(),
  };

  return (
    <Container customMeta={customMeta}>
      <div className="w-full min-h-[80rem] h-full flex flex-row justify-center md:justify-start">
        <div className="hidden xl:flex w-48 border-r-2 border-r-orange-400 flex-col items-center pl-7 z-10">
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
        </div>
        <div className="hidden xl:block sticky w-60 h-full top-52 ml-10 ">
          <Toc post={post} />
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
