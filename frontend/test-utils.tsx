import { FC, ReactElement } from "react";
import { Provider } from "react-redux";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";

import { Layout } from "./components/Layout";
import { Themes } from "./styles/themes";
import { rootReducer, RootState } from "./store";

type Props = {
  store: EnhancedStore<RootState>;
};

const ReduxAndThemesProviders: FC<Props> = ({ children, store }) => (
  <Provider store={store}>
    <ThemeProvider theme={Themes.light}>{children}</ThemeProvider>
  </Provider>
);

const componentRender = (
  ui: ReactElement,
  { preloadedState, ...options }: Options = {}
) => {
  const store = configureStore({ reducer: rootReducer, preloadedState });
  const Wrapper: FC = ({ children }) => (
    <ReduxAndThemesProviders store={store}>{children}</ReduxAndThemesProviders>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

type Options = { preloadedState?: RootState } & RenderOptions;

const pageRender = (
  ui: ReactElement,
  { preloadedState, ...options }: Options = {}
) => {
  const store = configureStore({ reducer: rootReducer, preloadedState });
  const Wrapper: FC = ({ children }) => (
    <ReduxAndThemesProviders store={store}>
      <Layout isDark={false} onThemeToggle={() => undefined}>
        {children}
      </Layout>
    </ReduxAndThemesProviders>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { componentRender as render, pageRender };
