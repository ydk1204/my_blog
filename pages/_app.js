import '../styles/globals.css';
import { createContext } from "react";
import { lightTheme, darkTheme, ColorTheme } from "../styles/theme";
import { useDarkMode } from '../lib/useDarkMode';
import AppLayout from '../components/AppLayout';
import { useClickIndex } from '../lib/useClickIndex';

export const ThemeContext = createContext({
  colorTheme: lightTheme,
  toggleColorTheme: () => {
    return null
  },
});

export const ModalContext = createContext({
  isClickIndex: false,
  isClickList: false,
  toggleModal: () => {
    return null
  }
})


function MyApp({ Component, pageProps }) {
  const { colorTheme, toggleColorTheme } = useDarkMode();
  const { isClickIndex, isClickList, toggleModal } = useClickIndex();
  return (
    <ThemeContext.Provider value={{ colorTheme, toggleColorTheme}} >
      <ModalContext.Provider value={{isClickIndex, isClickList, toggleModal }}>
        <AppLayout {...pageProps}>
          <Component {...pageProps} />
        </AppLayout>
      </ModalContext.Provider>
    </ThemeContext.Provider>
  )
}

export default MyApp
