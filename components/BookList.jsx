import Link from "next/link";
import { useContext } from "react";
import { lightTheme } from "../styles/theme";
import { ThemeContext } from "../pages/_app";

const BookList = ({ posts, title }) => {
  const { colorTheme } = useContext(ThemeContext);
  return (
    <>
      <aside
        className={`flex xl:bock
      flex-col
      items-center 
      shadow-modal md:shadow-none
      md:pr-5
      md:border-r-2 md:border-r-orange-400
      justify-center 
      bg-black/70
      border-[1px] border-gray-500/40
      xl:bg-transparent
      rounded-t-2xl xl:rounded-none
      md:border-0
      w-full xl:w-fit
      h-96 xl:h-fit
      z-50`}
      >
        <ul
          className={`
          w-full xl:w-fit
          h-full xl:h-fit
          flex xl:block
          flex-col 
          items-center 
          justify-center
        `}
        >
          {posts?.map((post) => (
            <li
              key={post.title}
              className={`
              w-10/12 xl:w-fit
              text-center xl:text-left
              mb-2 xl:mb-0
              text-[1.1rem]
              font-semibold xl:font-normal
              border-b-2 xl:border-0
              border-orange-900
              cursor-pointer transition-all hover:text-amber-600
              select-none
              duration - 300
              `}
            >
              <Link
                href={`/study/${post.note}/${post._raw.flattenedPath}`}
                key={post.title}
                className={`${
                  title === post.title && "text-orange-400 scale-105"
                } `}
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default BookList;
