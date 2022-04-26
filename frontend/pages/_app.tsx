import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@emotion/react";

import { Themes } from "@/styles/themes";
import { Layout } from "@/components/Layout";

import { store } from "@/store";

function App({ Component, pageProps }: AppProps) {
  const [isDark, setIsDark] = useState(false);

  const toggleDark = () => {
    localStorage.setItem("theme", isDark ? "light" : "dark");
    setIsDark(!isDark);
  };

  useEffect(() => {
    const isDark = Boolean(localStorage.getItem("theme") === "dark");
    setIsDark(
      window.matchMedia("prefers-color-scheme: dark").matches || isDark
    );
  }, []);

  const theme = Themes[isDark ? "dark" : "light"];

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout isDark={isDark} onThemeToggle={toggleDark}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
