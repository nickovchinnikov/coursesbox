import { Provider } from "react-redux";

import { store } from "@/store";

import Login from "@/pages/login";

export default {
  title: "Pages/Login",
  component: Login,
};

export const LoginPage = () => (
  <Provider store={store}>
    <Login />
  </Provider>
);
