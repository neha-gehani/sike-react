import "../assets/styles/index.scss";
import React from "react";
import { AppProps } from "next/app";
import Header from "../components/global/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="h-100">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

// import "../../assets/styles/index.scss";
// import React from "react";
// import { NextPage } from "next";
// import Header from "../components/global/Header";

// export interface PageProps {
//   className?: string;
// }

// interface IProps {
//   Component?: NextPage<PageProps>;
//   pageProps: PageProps;
// }

// const App: NextPage<IProps> = props => {
//   const { Component, pageProps } = props;
//   return (
//     <div>
//       <Header />
//       <Component {...pageProps} />
//     </div>
//   );
// };

// export default App;
