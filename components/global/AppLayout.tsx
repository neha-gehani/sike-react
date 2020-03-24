// import "../../assets/styles/index.scss";
import React, { ReactNode } from "react";
import Head from "next/dist/next-server/lib/head";
import Header from "./Header";

interface AppProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

const AppLayout: React.FC<AppProps> = ({ children, className, title }) => {
  return (
    <div className={className}>
      <Head>
        <title>{title ? title : `Sike`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
    </div>
  );
};

export default AppLayout;
