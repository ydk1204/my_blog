import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { lightTheme } from "../styles/theme";
import { ThemeContext } from "../pages/_app";

const Footer = () => {
  const { colorTheme } = useContext(ThemeContext);
  return (
    <footer
      className={`flex flex-col justify-center w-full max-w-6xl h-fit bg-transparent relative inset-x-0 bottom-0 ${
        colorTheme === lightTheme ? "text-black" : "text-white"
      }`}
    >
      <div
        className={`w-full border-t-[1px] mb-4 ${
          colorTheme === lightTheme ? "border-black" : "border-white"
        }`}
      ></div>
      <nav className="flex w-full py-2 flex-col justify-between items-center md:flex-row md:items-start">
        <div className="md:mr-16 md:w-fit m-0 w-full hidden md:block">
          <Image src="/mainLogo.png" alt="logo Image" width={80} height={80} />
        </div>
        <div className="flex">
          <div className="md:mr-16 md:w-fit m-0 w-full flex flex-col items-center md:items-end">
            <h3 className="font-bold text-base mb-3">블로그 제작</h3>
            <p className="text-sm mb-2">YDK</p>
            <p className="text-sm">
              © 2022-2023 YDK blog Powered by{" "}
              <Link className="text-rose-200" href={"https://nextjs.org/"}>
                Next.js
              </Link>
              ,{" "}
              <Link className="text-rose-200" href={"https://vercel.com/"}>
                Vercel
              </Link>
            </p>
          </div>

          <div className="md:w-fit w-full flex flex-col items-center md:items-end">
            <h3 className="font-bold text-base mb-3">연락</h3>
            <p className="text-sm mb-2">ejrbdi@gmail.com</p>
            <ul className="flex justify-start">
              <li key={"github icon"} className="mr-4">
                <a target="_blank" href={"https://github.com/ydk1204"}>
                  <Image
                    src={"/logo-github.svg"}
                    width={20}
                    height={20}
                    alt={"github 아이콘"}
                    className={`${
                      colorTheme !== lightTheme ? "footer-icons" : ""
                    }`}
                  ></Image>
                </a>
              </li>
              <li key={"gmail icon"}>
                <a href={"mailto:ejrbdi@gmail.com"}>
                  <Image
                    src={"/mail.svg"}
                    width={20}
                    height={20}
                    alt={"gmail 아이콘"}
                    className={`${
                      colorTheme !== lightTheme ? "footer-icons" : ""
                    }`}
                  ></Image>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
