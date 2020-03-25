import "../assets/styles/index.scss";
import Header from "../components/global/Header";
import { isAuthenticated } from "../api/auth";
import { NextPage } from "next";
import Router from "next/router";
import withRedux from "next-redux-wrapper";
import { store } from "../store";
import { Provider } from "react-redux";
import AuthenticatedRoute from "../components/global/AuthenticatedRoute";
import { useEffect } from "react";

export interface LayoutPageProps {
  className?: string;
  isAuthenticatedRoute?: boolean;
}

interface IProps {
  Component?: NextPage<LayoutPageProps>;
  pageProps: LayoutPageProps;
  store: any;
}

function App({ Component, pageProps, store }: IProps) {
  const isLoggedIn = isAuthenticated();
  useEffect(() => {
    if (!isLoggedIn) {
      Router.push("/login");
    }
  }, [isLoggedIn]);
  return (
    <Provider store={store}>
      <div className="app-container">
        <Header />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default withRedux(store)(App);
