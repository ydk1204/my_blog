import Link from "next/link";
import { useContext } from "react";
import { lightTheme } from "../styles/theme";
import { ThemeContext } from "../pages/_app";

const BookList = ({ posts, title }) => {
  const { colorTheme } = useContext(ThemeContext);
  return (
    <>
      <aside
        className={`hidden xl:flex w-48 border-r-2 border-r-orange-400 flex-col items-center pl-7`}
      >
        <ul>
          {posts?.map((post) => (
            <li key={post.title} className="duration-300 transition-all ">
              <Link
                href={`/study/${post.note}/${post._raw.flattenedPath}`}
                legacyBehavior
                key={post.title}
              >
                <a
                  className={`${
                    title === post.title && "text-orange-400 scale-105"
                  } `}
                >
                  {post.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default BookList;
