import "../assets/styles/index.scss";
import React from "react";
import { AppProps } from "next/app";
import Header from "../components/global/Header";
import { NextPage } from "next";

export interface LayoutPageProps {
  className?: string;
}

interface IProps {
  Component?: NextPage<LayoutPageProps>;
  pageProps: LayoutPageProps;
}

function App({ Component, pageProps }: IProps) {
  return (
    <div className="h-100">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default App;
