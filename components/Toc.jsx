import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import getObserver from "../lib/observer";
import { ThemeContext } from "../pages/_app";
import { useContext } from "react";
import { lightTheme } from "../styles/theme";
import { ModalContext } from "../pages/_app";
import categoryBtn from "../public/category_btn.png";
import tocBtn from "../public/toc_btn.png";

const TOC = ({ posts, title }) => {
  const { colorTheme } = useContext(ThemeContext);
  const { isClickIndex, toggleModal } = useContext(ModalContext);

  posts.map((post) => {
    console.log(`/${post._raw.flattenedPath}`);
  });

  const router = useRouter();
  // 목차 리스트 ( index: 목차, size: 목차의 크기 ( h1~h6는 크기를 다르게 렌더링해주기 위함 ) )
  const [indexList, setIndexList] = useState([]);

  // toc에 버튼 누르면 같은 카테고리 포스트로 전환되게 만들기
  const [isToggle, setIsToggle] = useState(true);

  const clickToggle = () => {
    setIsToggle((prev) => !prev);
  };

  // 현재 보이는 목차 ( 강조 표시 해주기 위함 )
  const [currentIndex, setCurrentIndex] = useState("");

  useEffect(() => {
    setIndexList([]);
    const observer = getObserver(setCurrentIndex);
    // 1. <main> 내부에서만 목차를 만들거라서 <main> 선택
    // 2. <h1>, <h2>, <h3> 찾기 ( h4~h6는 없기도 하고 안쓸거라서 생략 )
    const hNodeList = document
      .querySelector("main")
      ?.querySelectorAll("h2, h3");

    // IntersectionObserver들이 들어갈 배열 ( 이벤트 해제를 위해 )
    const observerList = [];

    hNodeList &&
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

        observer.observe(node);

        // 이벤트 해제를 위해 등록
        observerList.push(observer);
      });

    // 이벤트 해제
    return () => observerList.forEach((observer) => observer.disconnect());
  }, [router.asPath, colorTheme, isClickIndex]);

  return (
    <aside
      className={`flex xl:bock
      flex-col
      items-center 
      shadow-modal md:shadow-none
      justify-center 
      bg-transparent
      border-[1px] border-gray-500/40
      xl:bg-transparent
      rounded-t-2xl xl:rounded-xl
      w-full xl:w-fit
      pb-4
      h-96 xl:h-full
      
      xl:top-10 xl:right-10 xl:border-4 xl:border-orange-400 xl:px-2 xl:py-2 z-10
      `}
    >
      <ul
        className="
        w-full xl:w-56
        h-full xl:h-64
        flex xl:block
        flex-col 
        items-center
        py-4
        overflow-y-scroll
        toc-scroll
        xl:pl-2
        "
      >
        {isToggle &&
          indexList.map(({ index, size }) => (
            <li
              onClick={() => isScrollView(index, toggleModal)}
              key={index}
              className={`
              w-10/12 xl:w-fit
              text-center xl:text-left
              mb-3 xl:mb-0
              text-[1.1rem]
              font-semibold xl:font-normal
              border-b-2 xl:border-0
              border-orange-900
              cursor-pointer transition-all hover:text-amber-600
              select-none
              ${
                currentIndex === index
                  ? "text-orange-400 scale-110 xl:scale-105"
                  : ""
              }
              ${size === 20 ? "xl:pl-0 xl:text-base" : "xl:pl-4 xl:text-sm"}
              `}
            >
              {index}
            </li>
          ))}
        {!isToggle &&
          posts?.map((post) => (
            <li
              key={post._raw.flattenedPath}
              className={`
              w-10/12 xl:w-fit
              text-center xl:text-left
              mb-3 xl:mb-0
              text-[1.1rem]
              font-semibold xl:font-normal
              border-b-2 xl:border-0
              border-orange-900
              cursor-pointer transition-all hover:text-amber-600
              select-none
              `}
            >
              <Link
                href={`/${post._raw.flattenedPath}`}
                key={post.title}
                className={`
                ${title === post.title && "text-orange-400 scale-105"} `}
              >
                {post.title}
              </Link>
            </li>
          ))}
      </ul>
      <div className="my-2 border-[1px] w-full border-gray-300"></div>
      <button
        className="relative bottom-0 p-1 text-sm border-orange-400 border-[1px] rounded-lg w-9 h-9"
        onClick={() => clickToggle()}
        title={isToggle ? "같은 카테고리" : "현재 페이지 목차"}
      >
        {isToggle && (
          <Image
            src={categoryBtn}
            alt={"같은 카테고리"}
            width={30}
            height={30}
            sizes="h-full"
          />
        )}
        {!isToggle && (
          <Image
            src={tocBtn}
            alt={"목차"}
            width={30}
            height={30}
            sizes="h-full"
          />
        )}
      </button>
    </aside>
  );
};

export const isScrollView = (index, toggleModal) => {
  var getMeTo = document.getElementById(index);
  var getWidt = document.body?.offsetWidth;
  getMeTo.scrollIntoView({ behavior: "smooth" }, true);
  if (getWidt >= 1280) return;
  setTimeout(() => toggleModal("mobile"), 900);
};

export default TOC;
