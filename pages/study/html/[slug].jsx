import Container from "components/Container";
import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import BookList from "../../../components/BookList";
import Toc from "../../../components/Toc";

const Post = ({ post, posts }) => {
  const MDXComponent = useMDXComponent(post.body.code);
  const customMeta = {
    title: post.title,
    description: post.description,
    date: new Date(post.date).toISOString(),
  };

  return (
    <Container customMeta={customMeta}>
      <div className="w-full min-h-[80rem] h-full bg-slate-400 flex flex-row justify-between">
        <BookList posts={posts} title={post.title} />
        <div className="prose bg-white w-full">
          <h1 className="text-white">{post.title}</h1>
          <MDXComponent />
        </div>
        <Toc post={post} />
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
