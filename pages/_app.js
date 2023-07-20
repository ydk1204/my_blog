import '../styles/globals.css';
import { createContext, useEffect } from "react";
import { lightTheme, darkTheme, ColorTheme } from "../styles/theme";
import { useDarkMode } from '../lib/useDarkMode';
import AppLayout from '../components/AppLayout';
import { useClickIndex } from '../lib/useClickIndex';
import * as gtag from '../lib/gtag';
import Script from 'next/script';
import { useRouter } from 'next/router';

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

  // GA 설정 시작
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  // GA 설정 끝
  return (
    <>
    <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`} />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gtag.GA_TRACKING_ID}', {
          page_path: window.location.pathname,
        });
      `
        }}
      />
      {/* GA 설정 끝 */}

    <ThemeContext.Provider value={{ colorTheme, toggleColorTheme}} >
      <ModalContext.Provider value={{isClickIndex, isClickList, toggleModal }}>
        <AppLayout {...pageProps}>
          <Component {...pageProps} />
        </AppLayout>
      </ModalContext.Provider>
      </ThemeContext.Provider>
    </>
  )
}

export default MyApp
