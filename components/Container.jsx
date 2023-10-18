import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Container = (props) => {
  const router = useRouter();
  const [isMain, setIsMain] = useState(false);

  useEffect(() => {
    const pagePath = router.asPath;
    if (pagePath === "/") setIsMain(true);
    else setIsMain(false);
  }, [router.asPath]);

  return (
    <main
      className={`w-full min-h-screen md:-z-10 ${
        isMain ? "w-full" : "max-w-6xl"
      }`}
    >
      {props.children}
    </main>
  );
};

export default Container;
