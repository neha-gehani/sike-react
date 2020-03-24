import "../assets/styles/index.scss";
import Header from "../components/global/Header";
import { isAuthenticated } from "../api/auth";
import { NextPage } from "next";
import Router from "next/router";
import withRedux from "next-redux-wrapper";
import { store } from "../store";
import { Provider } from "react-redux";

export interface LayoutPageProps {
  className?: string;
}

interface IProps {
  Component?: NextPage<LayoutPageProps>;
  pageProps: LayoutPageProps;
  store: any;
}

function App({ Component, pageProps, store }: IProps) {
  if (!isAuthenticated()) {
    // TODO: change to /login and uncomment after splitting the page
    // Router.push('/');
  }
  return (
    <Provider store={store}>
      <div className="h-100">
        <Header />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default withRedux(store)(App);
