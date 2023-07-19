import { useEffect, useRef, useContext } from "react";
import { lightTheme } from "../styles/theme";
import { ThemeContext } from "../pages/_app";
import { useRouter } from "next/router";

const Giscus = () => {
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const scriptElem = document.createElement("script");
    scriptElem.src = "https://giscus.app/client.js";
    scriptElem.async = true;
    scriptElem.crossOrigin = "anonymous";
    scriptElem.setAttribute("data-repo", "ydk1204/my_blog");
    scriptElem.setAttribute("data-repo-id", "R_kgDOJ2CMEA");
    scriptElem.setAttribute("data-category", "General");
    scriptElem.setAttribute("data-category-id", "DIC_kwDOJ2CMEM4CX_DA");
    scriptElem.setAttribute("data-mapping", "pathname");
    scriptElem.setAttribute("data-strict", "0");
    scriptElem.setAttribute("data-reactions-enabled", "1");
    scriptElem.setAttribute("data-emit-metadata", "0");
    scriptElem.setAttribute("data-input-position", "top");
    scriptElem.setAttribute("data-theme", "preferred_color_scheme");
    scriptElem.setAttribute("data-lang", "ko");

    ref.current.appendChild(scriptElem);
  }, []);

  useEffect(() => {
    const iframe = document.querySelector("iframe.giscus-frame");
    iframe?.contentWindow?.postMessage({
      giscus: { setConfig: { term: router.asPath } },
    });
  }, [router.asPath]);

  return <section ref={ref} />;
};

export default Giscus;
