import { Provider } from "react-redux";

import { store } from "@/store";

import Registration from "@/pages/registration";

export default {
  title: "Pages/Registration",
  component: Registration,
};

export const RegistrationPage = () => (
  <Provider store={store}>
    <Registration />
  </Provider>
);
