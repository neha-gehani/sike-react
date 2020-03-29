import "../assets/styles/index.scss";
import Header from "../components/global/Header";
import { NextPage } from "next";
import Head from "next/dist/next-server/lib/head";
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
  
  return (
    <Provider store={store}>
       <Head>
        <title>Sike</title>
        <link rel="icon" href="/favicon.ico" />
        <meta http-equiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
        <meta name='description' content='Sike game' />
        <meta name='keywords' content='sike, game, questions, friends' />

        <link rel="manifest" href="/manifest.json" />
        <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
        <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#6900ff"/>
      </Head>
      <div className="app-container"> 
        <Header />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default withRedux(store)(App);
