import { useState, useEffect } from "react";
import getIntersectionObserver from "../lib/observer";
const SideBar = ({ post }) => {
  const [currentId, setCurrentId] = useState("");
  const [headingEls, setHeadingEls] = useState([]);
  const [headingContents, setHeadingContents] = useState([]);

  useEffect(() => {
    let contents = [];
    const observer = getIntersectionObserver(setCurrentId);
    const headingElements = Array.from(document.querySelectorAll("h2, h3"));
    headingElements.forEach((a) => {
      contents.push(a.innerHTML);
    });
    setHeadingContents(contents);

    setHeadingEls(headingElements);

    headingElements.map((header) => {
      observer.observe(header);
    });
  }, [post]);

  return (
    <>
      <aside className="w-52 bg-slate-600 border-white border-[1px] rounded-lg fixed inset-y-0 right-0 flex flex-col">
        {headingContents.map((content, idx) => (
          <li
            key={idx}
            className={`${content === currentId && "text-green-600"}`}
          >
            {content}
          </li>
        ))}
      </aside>
    </>
  );
};

export default SideBar;
