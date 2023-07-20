import Link from "next/link";
import bookColor from "../data/bookColor";
import { useState, useEffect } from "react";
import { lightTheme, ColorTheme } from "../styles/theme";
import { useContext } from "react";
import { ThemeContext } from "../pages/_app";
import Image from "next/image";

const NoteBook = ({ title = "", count, posts = [] }) => {
  const { colorTheme } = useContext(ThemeContext);
  // slug = 경로(post 파일이름)
  const [slug, setSlug] = useState("");

  // 전체 포스트 중에서 같은 항목(ex_html)의 포스트 선별
  useEffect(() => {
    getPath(title, posts).then((res) => setSlug(res));
  }, [title, posts]);

  // 해당 컴포넌트의 항목 별 색상코드 부여
  const getColor = bookColor.filter((a) => a.key === title)[0];
  const customColor = getColor.color;

  const noteColor = {
    "--clr": customColor,
  };

  return (
    <div className="note-container">
      <div className={`note-card`} style={noteColor}>
        <div
          className="note-box"
          style={{ background: colorTheme === lightTheme ? "#fff" : "#18181b" }}
        >
          <div className={`note-icon`} style={noteColor}>
            <div className={`note-iconBox`}>
              <Image
                src={`/${title}.png`}
                alt="로고 이미지"
                width={40}
                height={40}
              ></Image>
            </div>
          </div>
          <div className="note-content" style={noteColor}>
            <h3>{title}</h3>
            <p>총 {count} 개의 포스팅</p>
            <Link href={`/${slug}`} style={{ background: customColor }}>
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getPath = async (title, posts) => {
  const slugs = await posts
    .filter((a) => a.note === title)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  console.log(posts);

  // const slug = null;
  const slug = slugs[0]._raw.flattenedPath;
  return slug;
};

export default NoteBook;
