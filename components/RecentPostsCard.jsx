import React from "react";
import Image from "next/image";
import { useContext } from "react";
import { lightTheme } from "../styles/theme";
import { ThemeContext } from "../pages/_app";

export const RecentPostsCard = ({ post }) => {
  const { title, tag, date, description, img, _raw } = post;
  const { colorTheme } = useContext(ThemeContext);

  const year = date.slice(0, 4);
  let month = date.slice(5, 7);
  let day = date.slice(8, 10);

  return (
    <div
      className={`w-[24rem] h-[30rem] group bg-white mx-2 my-10 rounded-2xl flex flex-col overflow-hidden duration-200 ${
        colorTheme === lightTheme
          ? "hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
          : "hover:shadow-[0_4px_6px_-1px_rgba(256,256,256,0.2)]"
      }`}
    >
      <div className="w-full h-[20rem] flex flex-col overflow-hidden">
        <div className="overflow-hidden">
          <div
            className={`w-full h-[320px] ${
              colorTheme === lightTheme
                ? "bg-white text-black"
                : "bg-[#18181b] text-white"
            }  ease-in -translate-y-full group-hover:translate-y-0 duration-[220ms] flex flex-col justify-center items-center`}
          >
            <p className="text-xl">{year}</p>
            <p className="text-9xl">{month}</p>
            <p className="text-4xl">{day}</p>
          </div>
          <div className="w-full h-[320px] ease-in -translate-y-full group-hover:translate-y-0 duration-[220ms] bg-gray-300">
            <Image
              src={img}
              alt={"포스트 이미지"}
              width={30}
              height={30}
              sizes="100vh"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
      <div
        className={`h-[10rem] flex flex-col border-t-[1px] duration-200 ${
          colorTheme === lightTheme
            ? "group-hover:bg-gray-100 bg-white"
            : "group-hover:bg-gray-700 bg-[#18181b]"
        }`}
      >
        <p className="text-3xl font-bold m-2 mt-5 text-ellipsis">{title}</p>
        <p className="m-2 mt-0 text-ellipsis text-gray-400">{description}</p>
      </div>
    </div>
  );
};
