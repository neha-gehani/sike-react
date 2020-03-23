import "../assets/styles/index.scss";
import React from "react";
import { AppProps } from "next/app";
import Header from "../components/global/Header";

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="h-100">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default App;
