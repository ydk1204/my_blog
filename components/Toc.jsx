import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import getObserver from "../lib/observer";

const TOC = ({ post }) => {
  const router = useRouter();
  // 목차 리스트 ( index: 목차, size: 목차의 크기 ( h1~h6는 크기를 다르게 렌더링해주기 위함 ) )
  const [indexList, setIndexList] = useState([]);
  // 현재 보이는 목차 ( 강조 표시 해주기 위함 )
  const [currentIndex, setCurrentIndex] = useState("");

  useEffect(() => {
    setIndexList((prev) => []);
    const observer = getObserver(setCurrentIndex);
    // 1. <main> 내부에서만 목차를 만들거라서 <main> 선택
    // 2. <h1>, <h2>, <h3> 찾기 ( h4~h6는 없기도 하고 안쓸거라서 생략 )
    const hNodeList = document
      .querySelector("main")
      ?.querySelectorAll("h1, h2, h3");

    // IntersectionObserver들이 들어갈 배열 ( 이벤트 해제를 위해 )
    const IOList = [];

    // 만약 여기서 오류가 난다면 "spread opeartor"는 es6부터 지원되는 문법이라서 그 이전에 사용하기 위해서는 "downlevelIteration"에 대해서 찾아보면 된다.
    [...hNodeList].forEach((node) => {
      // 목차 내용이랑 사이즈 구해서 저장
      const index = node.textContent;
      const size = (+node.nodeName[1] - 1) * 20;
      setIndexList((prev) => {
        if (prev.map((v) => v.index).includes(index)) return prev;
        return [...prev, { index, size }];
      });

      // 3. 각 <h*>에 id로 현재 컨텐츠 내용 추가
      node.id = index;

      // 5. 화면에 보이면 강조되도록 "IntersectionObserver" 등록

      observer.observe(node);

      // 이벤트 해제를 위해 등록
      IOList.push(observer);
    });

    // 이벤트 해제
    return () => IOList.forEach((observer) => observer.disconnect());
  }, [router.asPath]);

  return (
    <aside className="fixed w-60 top-52 right-14 border-l-4 border-orange-400 px-4 py-2 z-10">
      <ul>
        {indexList.map(({ index, size }) => (
          <li
            key={index}
            onClick={() => isScrollView(index)}
            className={`cursor-pointer transition-all ${`hover:text-amber-600`}
              ${
                size === 0
                  ? "text-xl"
                  : size === 20
                  ? "text-base ml-4"
                  : "text-sm ml-8"
              }
              ${currentIndex === index && "text-orange-400 scale-105 ml-0"}
            `}
          >
            {index}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export const isScrollView = (index) => {
  var getMeTo = document.getElementById(index);
  getMeTo.scrollIntoView({ behavior: "smooth" }, true);
};

export default TOC;
