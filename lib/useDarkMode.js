import { useEffect, useState } from 'react';
import { lightTheme, darkTheme, ColorTheme } from "../styles/theme";

export const useDarkMode = () => {
  const [colorTheme, setColorTheme] = useState(lightTheme);
  const [imgTarget, setImageTarget] = useState(false);

  const setMode = (mode) => {
    mode === lightTheme
      ? window.localStorage.setItem('theme', 'light')
      : window.localStorage.setItem('theme', 'dark');
    setColorTheme(mode);
  };

  const interSectionScroll = (target) => {
    if (target === false) setImageTarget(false);
    else setImageTarget(true);
  }

  const toggleColorTheme = () => {
    colorTheme === lightTheme ? setMode(darkTheme) : setMode(lightTheme);
  };

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