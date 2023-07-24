import Link from "next/link";
import { lightTheme, ColorTheme } from "../styles/theme";
import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../pages/_app";

const ProjectsPost = ({ title = "", count, date, description, posts = [] }) => {
  const { colorTheme } = useContext(ThemeContext);
  const [slug, setSlug] = useState("");

  const hasImg = "/postImg/defaultImg.png";
  const [color, setColor] = useState({
    "--color": "#18181b",
    "--img": `url("${hasImg}")`,
  });

  // 전체 포스트 중에서 같은 항목(ex_maple)의 포스트 선별
  useEffect(() => {
    getPath(title, posts).then((res) => setSlug(res));
  }, [title, posts]);

  useEffect(() => {
    if (colorTheme === lightTheme)
      setColor({ "--color": "#fff", "--img": `url(${hasImg})` });
    else setColor({ "--color": "#18181b", "--img": `url(${hasImg})` });
  }, [colorTheme]);

  return (
    <Link href={`/${slug}`}>
      <div className="projects_card">
        <div className="projects_imgBx" style={color}></div>
        <div className="projects_content">
          <span className="projects_date" style={color}>
            <p>{title}</p>
          </span>
          <div className="projects_textBx text-white">
            <span className="w-full text-lg truncate">{date}</span>
            <div className="w-full border-b-2 border-b-white/50 my-4"></div>
            <span className="w-full text-xl truncate">{description}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const getPath = async (title, posts) => {
  const slugs = await posts
    .filter((a) => a.note === title)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  const slug = slugs[0]._raw.flattenedPath;
  return slug;
};

export default ProjectsPost;
