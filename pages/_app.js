import '../styles/globals.css';
import { createContext } from "react";
import { lightTheme, darkTheme, ColorTheme } from "../styles/theme";
import { useDarkMode } from '../lib/useDarkMode';
import AppLayout from '../components/AppLayout';

export const ThemeContext = createContext({
  colorTheme: lightTheme,
  toggleColorTheme: () => {
    return null
  },
});


function MyApp({ Component, pageProps }) {
  const { colorTheme, toggleColorTheme } = useDarkMode();
  return (
    <ThemeContext.Provider value={{ colorTheme, toggleColorTheme}} >
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ThemeContext.Provider>
  )
}

export default MyApp
