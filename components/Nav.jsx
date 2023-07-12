import navlinks from "../data/navlinks";
import Link from "next/link";
import { lightTheme, ColorTheme } from "../styles/theme";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../pages/_app";
import Image from "next/image";
import { useRouter } from "next/router";

let currentPath;
const lightNavSvgColor = `invert(15%) sepia(0%) saturate(1387%) hue-rotate(227deg) brightness(91%) contrast(87%)`;
const darkNavSvgColor = `invert(95%) sepia(0%) saturate(1%) hue-rotate(54deg) brightness(91%) contrast(94%)`;

const Nav = () => {
  const router = useRouter();
  const { colorTheme, toggleColorTheme } = useContext(ThemeContext);
  const [asPath, setAsPath] = useState(router.asPath.slice(1).toUpperCase());

  useEffect(() => {
    currentPath = router.asPath.slice(1).toUpperCase();

    setAsPath((prev) =>
      currentPath === "" ? "Home" : currentPath.toUpperCase()
    );
  }, []);

  const DarkModeToggle = () => {
    toggleColorTheme();
  };

  return (
    <nav className="navigation">
      <ul>
        {navlinks.map((nav, idx) => (
          <>
            <li
              key={idx}
              className={`list ${
                nav.title.slice(0, 3) === asPath.slice(0, 3) ? "active" : ""
              }`}
            >
              <Link href={nav.link} key={idx}>
                <Image
                  width={20}
                  height={20}
                  alt={"네이게이션바 버튼 이미지"}
                  src={nav.logo}
                  className={`svg-color-filter ${
                    colorTheme === lightTheme ? "lightSvgColor" : ""
                  }`}
                ></Image>
                <span className="nav-text">{nav.title}</span>
              </Link>
            </li>
          </>
        ))}
        <div className="indicator"></div>
      </ul>
      <button onClick={DarkModeToggle}>
        <Image
          src={`/${colorTheme === lightTheme ? "sun.png" : "moon.png"}`}
          className={`mx-0 sm:mx-4`}
          width={25}
          height={5}
          alt="theme icon"
        />
      </button>
    </nav>
  );
};

export default Nav;
