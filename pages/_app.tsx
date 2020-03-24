import "../assets/styles/index.scss";
import React from "react";
import { AppProps } from "next/app";
import Header from "../components/global/Header";
import {isAuthenticated} from "../api/auth";
import { NextPage } from "next";
import Router from "next/router";

export interface LayoutPageProps {
  className?: string;
}

interface IProps {
  Component?: NextPage<LayoutPageProps>;
  pageProps: LayoutPageProps;
}

function App({ Component, pageProps }: IProps) {
  
  if(!isAuthenticated()){
    Router.push('/');
  }

  return (
    <div className="h-100">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default App;
