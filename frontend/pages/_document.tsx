import { Html, Head, Main, NextScript } from "next/document";
import { Global } from "@emotion/react";

import { GlobalStyles } from "@/styles/global";

export default function Document() {
  const setInitialTheme = `
    var theme = localStorage.getItem("theme");
    var themeExistsInStorage = Boolean(theme !== null);

    var isDark = themeExistsInStorage ?
      Boolean(theme === "dark") :
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    var backgroundColor = isDark ? "#5e5c64" : "#e4ebf5";
    var textColor = isDark ? "#E4EBF5e6" : "#504e55e6";

    document.documentElement.style.setProperty("--themeBackgroundColor", backgroundColor);
    document.documentElement.style.setProperty("--themeColor", textColor);
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
