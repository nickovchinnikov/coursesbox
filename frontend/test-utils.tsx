import { FC, ReactElement } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";

import { rootReducer, RootState } from "./store";
import { Themes } from "./styles/themes";
import { Layout } from "./components/Layout";

type Options = { preloadedState?: RootState } & RenderOptions;

const customRender = (
  ui: ReactElement,
  { preloadedState, ...options }: Options = {}
) => {
  const store = configureStore({ reducer: rootReducer, preloadedState });

  const Wrapper: FC = ({ children }) => (
    <Provider store={store}>
      <ThemeProvider theme={Themes.light}>{children}</ThemeProvider>
    </Provider>
  );
  return render(ui, { wrapper: Wrapper, ...options });
};

const pageRender = (
  ui: ReactElement,
  { preloadedState, ...options }: Options = {}
) => {
  const store = configureStore({ reducer: rootReducer, preloadedState });

  const Wrapper: FC = ({ children }) => (
    <Provider store={store}>
      <Layout>{children}</Layout>
    </Provider>
  );
  return render(ui, { wrapper: Wrapper, ...options });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render, pageRender };
