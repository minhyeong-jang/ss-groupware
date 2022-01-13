import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "styles";
import "antd/dist/antd.css";

const App = ({ Component }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Head>
        <title>무신사 - 스타일쉐어</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        />
      </Head>
      <Component />
    </ThemeProvider>
  );
};
export default App;
