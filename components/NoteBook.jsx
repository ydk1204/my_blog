import Link from "next/link";
import bookColor from "../data/bookColor";
import { useState, useEffect } from "react";

const NoteBook = ({ title = "", count, posts = [] }) => {
  // slug = 경로(post 파일이름)
  const [slug, setSlug] = useState("");

  // 전체 포스트 중에서 같은 항목(ex_html)의 포스트 선별
  useEffect(() => {
    getPath(title, posts).then((res) => setSlug(res));
  }, [title, posts]);

  // 해당 컴포넌트의 항목 별 색상코드 부여
  const getColor = bookColor.filter((a) => a.key === title)[0];
  const customColor = getColor.color;

  return (
    <div className="w-60 h-80 bg-slate-700 rounded-md">
      <Link href={`/study/${title}/${slug}`} legacyBehavior key={title}>
        <a>
          <div
            style={{ background: customColor }}
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

export const getPath = async (title, posts) => {
  const slugs = await posts
    .filter((a) => a.note === title)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  const slug = slugs[0]._raw.flattenedPath;
  return slug;
};

export default NoteBook;
