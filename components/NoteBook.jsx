import Link from "next/link";
import { useState, useEffect } from "react";

const NoteBook = ({ title = "", count = 0, posts = [] }) => {
  const [slug, setSlug] = useState("html이란");

  useEffect(() => {
    const slugs = posts
      .filter((a) => a.note === title)
      .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

    setSlug(slugs[0]._raw.flattenedPath);
  }, [posts, title]);

  return (
    <div className="w-60 h-80 bg-slate-700 rounded-md">
      <Link href={`/study/${title}/${slug}`} legacyBehavior key={title}>
        <a>
          <div
            className={`w-full h-5/6 rounded-t-md flex justify-center items-center`}
          >
            <div className="text-6xl">{title}</div>
          </div>
          <div className="w-full h-1/6 flex justify-center items-center ">
            <div>포스팅 : {count}</div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default NoteBook;
