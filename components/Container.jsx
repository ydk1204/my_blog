import Head from "next/head";
import Nav from "./Nav";
import metadata from "../data/metadata";
import Image from "next/image";
import Footer from "./Footer";
import { useContext } from "react";
import { lightTheme } from "../styles/theme";
import { ThemeContext } from "../pages/_app";
import Link from "next/link";
import AppLayout from "./AppLayout";

const Container = (props) => {
  const { colorTheme } = useContext(ThemeContext);

  const meta = {
    title: metadata.title,
    description: metadata.description,
    author: metadata.author,
    ...props.customMeta,
  };
  return (
    <>
      <main className={`w-full mt-20`}>{props.children}</main>
      <Footer />
    </>
  );
};

export default Container;
