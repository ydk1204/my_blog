import { allPosts } from "contentlayer/generated";
import Link from "next/link";
import { useState, useEffect } from "react";

const colors = [
  { key: "html", color: "red" },
  { key: "css", color: "sky" },
  { key: "js", color: "orange" },
  { key: "react", color: "cyan" },
];

const NoteBook = ({ title = "html", count = 0 }) => {
  const getColor = colors.filter((a) => a.key === title)[0].color;
  const [slug, setSlug] = useState("html이란");
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
  }, [title]);

  return (
    <div className="w-60 h-80 bg-slate-700 rounded-md">
      <Link href={`/study/${title}/${slug}`} legacyBehavior key={title}>
        <a>{title}</a>
      </Link>
    </div>
  );
};

export default NoteBook;
