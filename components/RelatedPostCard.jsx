import { useContext, useState, useEffect } from "react";
import { lightTheme } from "../styles/theme";
import { ThemeContext } from "../pages/_app";
import Link from "next/link";
import defultImage from "../public/dice.jpg";

const RelatedPostCard = ({ division, post = "" }) => {
  const { colorTheme } = useContext(ThemeContext);

  const postImg = {
    "--src": `url("${post?.img}")`,
  };

  return (
    <Link
      href={`/${post?._raw?.flattenedPath}`}
      className={`related-card
        w-full md:w-[45%] h-36 my-4 flex flex-col justify-center
        items-center font-bold uppercase rounded-xl
        cursor-pointer shadow relatedCard no-underline
        transition-all duration-75
        outline outline-offset-2
        ${colorTheme === lightTheme ? "text-black" : " text-white"}
        hover:text-orange-400
      `}
      style={postImg}
    >
      <div className={`w-full px-10 flex flex-col items-center`}>
        <p className="m-0 mb-2 text-teal-400">{division}</p>
        <h1 className="m-0 text-3xl truncate w-full">{post.title}</h1>
        <p className="m-0 text-lg truncate w-full">{post.description}</p>
        <span></span>
      </div>
    </Link>
  );
};

export default RelatedPostCard;
