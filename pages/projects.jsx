import Container from "../components/Container";
import BlogPost from "../components/BlogPost";

import { allPosts } from "contentlayer/generated";

const Blog = ({ posts }) => {
  return (
    <>
      <Container>
        <div>Study</div>
        <div className={`mt-10 flex flex-col`}>
          {posts.length !== 0 ? (
            posts.map((post) => (
              <BlogPost
                date={post.date}
                title={post.title}
                des={post.description}
                slug={post._raw.flattenedPath}
                key={post._id}
                path={post.tag}
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
    .filter((a) => a.tag === "projects")
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
