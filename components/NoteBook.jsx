import dynamic from "next/dynamic";
const Link = dynamic(import("next/link"));

import { allPosts } from "contentlayer/generated";
// import Link from "next/link";
import { useState, useEffect } from "react";

const colors = [
  { key: "html", color: "red" },
  { key: "css", color: "sky" },
  { key: "js", color: "orange" },
  { key: "react", color: "cyan" },
];

const NoteBook = ({ title, count }) => {
  const getColor = colors.filter((a) => a.key === title)[0].color;
  const [slug, setSlug] = useState("");
  // const customColor = `bg-${getColor}-500`;

  // const slugs = allPosts
  //   .filter((a) => a.note === title)
  //   .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  // const slug = slugs[0]._raw.flattenedPath;
  useEffect(() => {
    const slugs = allPosts
      .filter((a) => a.note === title)
      .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

    setSlug(slugs[0]._raw.flattenedPath);
  }, []);

  return (
    <div className="w-60 h-80 bg-slate-700 rounded-md">
      <Link href={`/study/${title}/${slug}`} legacyBehavior key={title}>
        <a>
          <div
            className={`w-full h-5/6 rounded-t-md flex justify-center items-center`}
          >
            <p className="text-6xl">{title}</p>
          </div>
          <div className="w-full h-1/6 flex justify-center items-center ">
            <p>포스팅 : {count}</p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default NoteBook;
