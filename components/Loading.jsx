import { lightTheme } from "../styles/theme";
import { ThemeContext } from "../pages/_app";
import { useState, useEffect, useContext } from "react";

const Loading = () => {
  const { colorTheme } = useContext(ThemeContext);
  const [textColor, setTextColor] = useState({
    "--baseText": "#222",
    "--beforeText": "#fff",
  });

  useEffect(() => {
    if (colorTheme === lightTheme) {
      setTextColor({ "--baseText": "#fff", "--beforeText": "#222" });
    } else {
      setTextColor({ "--baseText": "#222", "--beforeText": "#fff" });
    }
  }, []);

  return (
    <div className="loading_conteiner">
      <h2 data-text="Loading..." style={textColor}>
        Loading...
      </h2>
    </div>
  );
};

export default Loading;
