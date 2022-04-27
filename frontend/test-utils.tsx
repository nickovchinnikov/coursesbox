import { FC, ReactElement } from "react";
import { Provider } from "react-redux";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";

import { Themes } from "./styles/themes";
import { store } from "./store";

const Wrapper: FC = ({ children }) => (
  <Provider store={store}>
    <ThemeProvider theme={Themes.light}>{children}</ThemeProvider>
  </Provider>
);

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: Wrapper, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
