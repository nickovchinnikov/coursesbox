import { FC, ReactElement } from "react";
import { Provider } from "react-redux";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { configureStore } from "@reduxjs/toolkit";

import { Layout } from "./components/Layout";
import { Themes } from "./styles/themes";
import { rootReducer, RootState } from "./store";

type Options = { preloadedState?: RootState } & RenderOptions;

const customRender = (
  ui: ReactElement,
  { preloadedState, ...options }: Options = {}
) => {
  const store = configureStore({ reducer: rootReducer, preloadedState });
  const Wrapper: FC = ({ children }) => (
    <Provider store={store}>
      <ThemeProvider theme={Themes.light}>
        <Layout isDark={false} onThemeToggle={() => undefined}>
          {children}
        </Layout>
      </ThemeProvider>
    </Provider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
