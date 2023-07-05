import { useState, useEffect } from "react";
import getIntersectionObserver from "../lib/observer";
import Link from "next/link";
import { useRouter } from "next/router";

const SideBar = ({ post }) => {
  const [currentId, setCurrentId] = useState("");
  const [headingEls, setHeadingEls] = useState([]);
  const [headingContents, setHeadingContents] = useState([]);
  const [headerData, setHeaderData] = useState([]);

  // header에 id 값을 지정 후 Link 클릭 시 지정한 id값이 초기화 되어 route값이 변경될 때마다 useEffect로 id 할당
  const router = useRouter();

  useEffect(() => {
    let contents = [];
    const headingElements = Array.from(document.querySelectorAll("h2, h3"));

    const visibleHeaders = Array.from(
      { length: headingElements.length },
      () => false
    );

    headingElements.forEach((a) => {
      a.id = a.innerHTML;
      contents.push(a.id);
    });
    setHeadingContents(contents);

    setHeadingEls(headingElements);
  }, []);

  useEffect(() => {
    const observer = getIntersectionObserver(setCurrentId);
    headingEls.map((header) => {
      console.log(header);
      observer.observe(header);
    });
  }, [headingEls]);

  return (
    <>
      <aside className="w-52 bg-slate-600 border-white border-[1px] rounded-lg fixed inset-y-0 right-0 flex flex-col">
        <ul>
          {headingContents.map((content, idx) => (
            <li
              key={idx}
              className={`${
                content === currentId && "text-green-600 duration-150"
              } ${
                headingEls[idx]?.nodeName === "H2" ? "text-lg" : "ml-4 text-sm"
              }`}
            >
              <Link
                href={`/${post.tag}/${post.note}/${post._raw.flattenedPath}/#${content}`}
                legacyBehavior
              >
                <a>{content}</a>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default SideBar;
