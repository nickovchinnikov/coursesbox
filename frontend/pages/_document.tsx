import { Html, Head, Main, NextScript } from "next/document";
import { Global } from "@emotion/react";

import { GlobalStyles } from "@/styles/global";

export default function Document() {
  const setInitialTheme = `
    var isDarkInStorage = Boolean(localStorage.getItem("theme") === "dark");

    var isDark =
      window.matchMedia("prefers-color-scheme: dark").matches || isDarkInStorage;

    if (isDark) {
      document.documentElement.style.setProperty("--themeBackgroundColor", "#5e5c64");
      document.documentElement.style.setProperty("--themeColor", "#E4EBF5e6");
    } else {
      document.documentElement.style.setProperty("--themeBackgroundColor", "#e4ebf5");
      document.documentElement.style.setProperty("--themeColor", "#504e55e6");
    }
  `;
  return (
    <Html>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Poppins|Monoton&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
        <Global styles={GlobalStyles} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
