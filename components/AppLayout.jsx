import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { Transition, TransitionGroup } from "react-transition-group";
import { useRouter } from "next/router";
import Head from "next/head";
import Nav from "./Nav";
import Footer from "./Footer";
import metadata from "../data/metadata";
import Image from "next/image";
import { useContext } from "react";
import { lightTheme } from "../styles/theme";
import { ThemeContext } from "../pages/_app";
import MenuBtn from "./MenuBtn";

const TIMEOUT = 100;
const getTransitionStyles = {
  entering: {
    // position: `absolute`,
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
  const { colorTheme } = useContext(ThemeContext);

  const meta = {
    title: metadata.title,
    description: metadata.description,
    author: metadata.author,
    ...props.customMeta,
  };

  const router = useRouter();

  return (
    <>
      <div
        className={`w-full flex flex-col items-center duration-300 p-3 scroll-smooth ${
          colorTheme === lightTheme
            ? "bg-white text-black"
            : "bg-zinc-900 text-white"
        }`}
      >
        <Head>
          <title>{metadata.title}</title>
          <meta
            name="google-site-verification"
            content="k3WhGUd5TJQD8RpSLh0VSvnQ3a03cHD5PnpPZ73aWzE"
          />
          <meta
            name="naver-site-verification"
            content="6809e29010efe63bb641745db7453105c58ce312"
          />
          <meta content={meta.description} name="description" />
          <meta property="og:site_name" content={meta.author} />
        </Head>
        <header
          className={`w-full sm:w-full h-[4.5rem] bottom-0 md:top-0 xl:top-0 duration-300 max-w-6xl flex flex-row justify-center items-center md:justify-between md:items-center 
          shadow-headDwon md:shadow-headUp fixed z-10 ${
            colorTheme === lightTheme
              ? "bg-white text-black"
              : "bg-zinc-900 text-white"
          }`}
        >
          <Link
            className={`hidden flex-row items-center md:flex mx-2`}
            href={"/"}
          >
            <Image
              src={"/mainLogo.png"}
              alt="로고"
              width={40}
              height={40}
              className={`object-cover`}
            />
          </Link>
          <Nav />
        </header>
        <TransitionGroup
          style={{ position: "relative", width: "100%", maxWidth: "72rem" }}
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
                }}
              >
                {children}
              </div>
            )}
          </Transition>
        </TransitionGroup>
        {router.pathname.slice(-5, -1) === "slug" && (
          <>
            <MenuBtn data={children} title={"list"} />
            <MenuBtn data={children} title={"index"} />
          </>
        )}
        <Footer />
      </div>
    </>
  );
};

export default AppLayout;
