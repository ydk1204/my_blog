import { useState, useEffect, useContext } from "react";
import Toc from "./Toc";
import { ModalContext } from "../pages/_app";
import { lightTheme } from "../styles/theme";
import { ThemeContext } from "../pages/_app";
import { useRouter } from "next/router";

const MenuBtn = ({ data }) => {
  const { isClickIndex, toggleModal } = useContext(ModalContext);
  const { colorTheme } = useContext(ThemeContext);
  const postData = data && data[1];
  const { props } = postData;

  const [currentPath, setCurrentPath] = useState("");
  const [toggleBtnPath, setToggleBtnPath] = useState("");

  const toggleBtn = () => {
    toggleModal("mobile");
  };

  const router = useRouter();

  useEffect(() => {
    if (isClickIndex) setToggleBtnPath(router.asPath);
  }, [isClickIndex, router.asPath]);

  useEffect(() => {
    const pathEqual = toggleBtnPath === router.asPath;
    if (isClickIndex && pathEqual) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [toggleBtnPath, isClickIndex, router.asPath]);

  return (
    <>
      <div
        className={`
          flex xl:invisible fixed w-full justify-center items-center 
          font-bold
          ${colorTheme === lightTheme ? "text-black" : "text-white"}`}
      >
        {!isClickIndex && (
          <button
            className={`
            fixed
            right-5
            w-14 h-14 tracking-widest
            bg-orange-500/60 rounded-full
            z-0
            bottom-24
            `}
            onClick={() => toggleBtn()}
          >
            목차
          </button>
        )}

        {isClickIndex && (
          <div>
            <div
              className={`
            fixed bottom-16 md:bottom-0 left-0 z-20 w-full modal_obj
            ${colorTheme === lightTheme ? "text-white" : "text-white"}
            `}
            >
              <Toc posts={props?.posts} title={props?.post.title} />
            </div>
            <div
              onClick={() => toggleBtn()}
              className={`
              fixed bottom-0 left-0 flex w-full h-screen
              justify-center items-end bg-[black]/40
              z-0
              `}
            ></div>
          </div>
        )}
      </div>
    </>
  );
};

export default MenuBtn;
