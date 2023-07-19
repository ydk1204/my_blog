import { useContext } from "react";
import { lightTheme } from "../styles/theme";
import { ThemeContext } from "../pages/_app";
import Link from "next/link";

const RelatedPostCard = ({ division, post }) => {
  const { colorTheme } = useContext(ThemeContext);

  return (
    <Link
      href={`/study/${post.note}/${post._raw.flattenedPath}`}
      className={`
        w-full md:w-[45%] h-32 my-4 flex flex-col justify-center
        items-center font-bold uppercase rounded-xl
        cursor-pointer shadow relatedCard no-underline
        transition-all duration-150
        ${
          colorTheme === lightTheme
            ? "text-black bg-gray-100 hover:bg-orange-300"
            : "bg-white/10 text-white hover:bg-amber-600/90"
        }`}
    >
      <div className={`w-full px-10 flex flex-col items-center`}>
        <p className="m-0 text-teal-400">{division}</p>
        <h1 className="m-0 truncate">{post.title}</h1>
        <p className="m-0 truncate">{post.description}</p>
        <span></span>
      </div>
    </Link>
  );
};

export default RelatedPostCard;
