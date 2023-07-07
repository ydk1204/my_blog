import navlinks from "../data/navlinks";
import Link from "next/link";
import { lightTheme, ColorTheme } from "../styles/theme";
import { useContext } from "react";
import { ThemeContext } from "../pages/_app";
import Image from "next/image";

const Nav = () => {
  const { colorTheme, toggleColorTheme } = useContext(ThemeContext);

  const DarkModeToggle = () => {
    toggleColorTheme();
  };

  return (
    <nav className="flex items-center">
      {navlinks.map((nav) => (
        <Link href={nav.link} key={nav.title} legacyBehavior>
          <a
            className={`mr-5 transition-all duration-75 border-b-0 border-orange-600 hover:text-orange-600 hover:border-b-2
`}
          >
            {nav.title}
          </a>
        </Link>
      ))}
      <button onClick={DarkModeToggle}>
        {/* {colorTheme === lightTheme ? "라이트" : "다크"} */}
        <Image
          src={`/${colorTheme === lightTheme ? "sun.png" : "moon.png"}`}
          width={25}
          height={5}
          alt="theme icon"
        />
      </button>
    </nav>
  );
};

export default Nav;
