import Container from "components/Container";
import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import BookList from "../../../components/BookList";
import Toc from "../../../components/Toc";
import { useState, useEffect, useContext, useRef } from "react";
import { lightTheme, ColorTheme } from "../../../styles/theme";
import { ThemeContext } from "../../_app";
import RelatedPostCard from "../../../components/RelatedPostCard";
import Giscus from "../../../components/Giscus";
import Link from "next/link";

const Post = ({ post, posts }) => {
  const { colorTheme } = useContext(ThemeContext);
  const [prevPost, setPrevPost] = useState({});
  const [nextPost, setNextPost] = useState({});
  const imgRef = useRef(null);

  const MDXComponent = useMDXComponent(post.body.code);
  const customMeta = {
    title: post.title,
    description: post.description,
    date: new Date(post.date).toISOString(),
  };
  const nullObj = { key: "value" };

  useEffect(() => {
    if (posts.length < 1) return;

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
      <div className="w-full min-h-[60rem] h-full flex flex-col justify-start items-center">
        <div className="flex w-full justify-center">
          <div className="hidden xl:flex w-48 sticky top-[8.5rem] left-0 h-full flex-col items-center pl-7 z-10">
            <BookList posts={posts} title={post.title} />
          </div>
          <div
            className={`mx-6 prose w-full max-w-3xl ${
              colorTheme === lightTheme ? "" : "dark:prose-invert"
            }`}
          >
            {post.img !== "" && (
              <div className="w-full h-[10rem] md:h-[20rem] xl:h-[25rem] overflow-hidden flex justify-center items-center rounded-xl xl:mt-10">
                <Image
                  src={post.img}
                  width={1000}
                  height={500}
                  alt={"대표 이미지"}
                  className="object-contain transition-all duration-300 hover:scale-105"
                  onLoadingComplete={() => imgRef.current.remove()}
                />
                <div className="img-animation" ref={imgRef}></div>
              </div>
            )}
            <h1 className="mt-10">{post.title}</h1>
            <div>
              <MDXComponent />
            </div>
          </div>

          <div className="hidden xl:block sticky right-0 w-60 h-fit top-[8.5rem] ml-10 ">
            <Toc prevPost={prevPost} />
          </div>
        </div>
        <div className="max-w-[52rem] w-full mb-20">
          <div
            className={`py-10 my-10 border-b-2 ${
              colorTheme === lightTheme ? "border-b-black" : "border-b-white"
            }`}
          ></div>
          <article className="flex flex-col md:flex-row justify-between">
            {prevPost && Object.keys(prevPost).length > 1 ? (
              <RelatedPostCard division={"이전 글"} post={prevPost} />
            ) : (
              <div className="w-full md:w-[45%]"></div>
            )}
            {nextPost && Object.keys(nextPost).length > 1 && (
              <RelatedPostCard division={"다음 글"} post={nextPost} />
            )}
          </article>
        </div>
        <div className="max-w-[52rem] w-full">
          <Giscus />
        </div>
      </div>
      <div className="copyright">
        <Link target="_blank" href={post.copyright}>
          이미지 제공
        </Link>
      </div>
    </Container>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: allPosts.map((p) => ({
      params: {
        slug: p._raw.flattenedPath.replace(p._raw.sourceFileDir + "/", ""),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const post = allPosts.find(
    (p) =>
      p._raw.flattenedPath.replace(p._raw.sourceFileDir + "/", "") ===
      params.slug
  );

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
