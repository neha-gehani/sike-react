import "../assets/styles/index.scss";
import Header from "../components/global/Header";
import { NextPage } from "next";
import Router from "next/router";
import withRedux from "next-redux-wrapper";
import { store } from "../store";
import { Provider } from "react-redux";
import { useEffect } from "react";

export interface LayoutPageProps {
  className?: string;
}

interface IProps {
  Component?: NextPage<LayoutPageProps>;
  pageProps: LayoutPageProps;
  store: any;
}

function App({ Component, pageProps, store }: IProps) {
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
