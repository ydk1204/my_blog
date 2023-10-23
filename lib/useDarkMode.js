import { useEffect, useState } from 'react';
import { lightTheme, darkTheme, ColorTheme } from "../styles/theme";
import { useRouter } from "next/router";

export const useDarkMode = () => {
  const [colorTheme, setColorTheme] = useState(lightTheme);
  const [imgTarget, setImageTarget] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  const setMode = (mode) => {
    mode === lightTheme
      ? window.localStorage.setItem('theme', 'light')
      : window.localStorage.setItem('theme', 'dark');
    setColorTheme(mode);
  };

  
  const interSectionScroll = (target) => {
    if (currentPath === "/" && target === false) setImageTarget(false);
    else setImageTarget(true);
  }

  const toggleColorTheme = () => {
    colorTheme === lightTheme ? setMode(darkTheme) : setMode(lightTheme);
  };

  const router = useRouter();

  useEffect(() => {
    const path = router.asPath;
    setCurrentPath(path);

    if (path !== "/") setImageTarget(true);
  }, [router.asPath])

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme !== null) {
      if (localTheme === 'dark') {
        setColorTheme(darkTheme);
      } else {
        setColorTheme(lightTheme);
      }
    }
  }, []);

  return { colorTheme, toggleColorTheme, imgTarget, interSectionScroll };
}