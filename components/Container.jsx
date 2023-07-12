import Head from "next/head";
import Nav from "./Nav";
import metadata from "../data/metadata";
import Image from "next/image";
import Footer from "./Footer";
import { useContext } from "react";
import { lightTheme } from "../styles/theme";
import { ThemeContext } from "../pages/_app";
import Link from "next/link";

const Container = (props) => {
  const { colorTheme } = useContext(ThemeContext);

  const meta = {
    title: metadata.title,
    description: metadata.description,
    author: metadata.author,
    ...props.customMeta,
  };
  return (
    <div
      className={`w-full flex flex-col items-center duration-300 p-3 scroll-smooth ${
        colorTheme === lightTheme
          ? "bg-white text-black"
          : "bg-zinc-900 text-white"
      }`}
    >
      <Head>
        <title>{metadata.title}</title>
        <meta content={meta.description} name="description" />
        <meta property="og:site_name" content={meta.author} />
      </Head>
      <header
        className={`w-full sm:w-full h-[4.5rem] top-0 duration-300 max-w-6xl flex flex-row justify-center items-center md:justify-between md:items-center 
        shadow-head fixed z-[999] ${
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
      <main className={`w-full max-w-6xl mt-20`}>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Container;
