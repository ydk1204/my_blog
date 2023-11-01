import React, { ReactNode, useEffect, useState, useContext } from "react";
import Link from "next/link";
import { Transition, TransitionGroup } from "react-transition-group";
import { useRouter } from "next/router";
import Head from "next/head";
import Nav from "./Nav";
import Footer from "./Footer";
import metadata from "../data/metadata";
import { lightTheme } from "../styles/theme";
import { ThemeContext } from "../pages/_app";
import MenuBtn from "./MenuBtn";

const TIMEOUT = 100;
const getTransitionStyles = {
  entering: {
    position: `absolute`,
    opacity: 0,
    transform: `translateY(50px)`,
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 1,
    transform: `translateY(0px)`,
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
    transform: `translateY(-50px)`,
  },
};
const AppLayout = ({ children }, props) => {
  const { colorTheme, imgTarget } = useContext(ThemeContext);
  // const [isProfile, setIsProfile] = useState(false);
  const [noAnimPage, setNoAnimPage] = useState(false);

  const meta = {
    title: metadata.title,
    description: metadata.description,
    author: metadata.author,
    ...props.customMeta,
  };

  const router = useRouter();

  useEffect(() => {
    if (router.asPath === "/" || router.asPath === "/profile") {
      setNoAnimPage(true);
      document.body.style.overflow = "unset";
    } else if (
      router.asPath === "/study" ||
      router.asPath === "/projects" ||
      router.asPath === "/game"
    ) {
      document.body.style.overflow = "unset";
    } else setNoAnimPage(false);
  }, [router.asPath]);

  return (
    <>
      <div
        className={`w-full flex flex-col items-center duration-300 scroll-smooth ${
          colorTheme === lightTheme
            ? "bg-white text-black"
            : "bg-zinc-900 text-white"
        }`}
      >
        <Head>
          <title>{metadata.title}</title>
          <meta
            name="google-site-verification"
            content="-LzlU9UlbvLlY7QhvDtGywHwmgz7kppxi3hy9sW2QGE"
          />
          <meta
            name="naver-site-verification"
            content="6809e29010efe63bb641745db7453105c58ce312"
          />
          <meta content={meta.description} name="description" />
          <meta property="og:site_name" content={meta.author} />
        </Head>
        <header
          className={`w-full sm:w-full h-[4.5rem] bottom-0 md:top-0 xl:top-0 duration-300 flex justify-center items-center 
          fixed z-[999]
            ${
              imgTarget === true
                ? colorTheme === lightTheme
                  ? "bg-white p-[8px] shadow-headDwon md:shadow-headUp"
                  : "bg-zinc-900 p-[8px] shadow-headDwon md:shadow-headUp"
                : "p-[16px]"
            }`}
        >
          <div className="flex w-full max-w-6xl justify-center md:justify-between">
            <div className="hidden w-24 mx-2 text-4xl duration-75 text-orange-400 font-extrabold hover:text-3xl md:flex">
              <Link className={`group w-full flex items-center`} href={"/"}>
                <p className="w-full">
                  간
                  <span
                    className={`hidden nameLogo group-hover:inline-block group-hover:text-5xl`}
                  >
                    ?
                  </span>
                  편
                </p>
              </Link>
            </div>
            <Nav />
          </div>
        </header>
        {noAnimPage ? (
          <div className="w-full min-h-screen m-0 p-0">{children}</div>
        ) : (
          <TransitionGroup
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Transition
              key={router.pathname}
              timeout={{
                enter: TIMEOUT,
                exit: TIMEOUT,
              }}
            >
              {(status) => (
                <div
                  style={{
                    ...getTransitionStyles[status],
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {children}
                </div>
              )}
            </Transition>
          </TransitionGroup>
        )}
        {router.pathname.slice(-5, -1) === "slug" && (
          <>
            <MenuBtn data={children} />
          </>
        )}
        <div
          className={`w-full flex justify-center h-fit z-10 ${
            colorTheme === lightTheme ? "bg-white" : "bg-zinc-900"
          }`}
        >
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AppLayout;
