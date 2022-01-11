import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "styles";

const App = ({ Component }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Head>
        <title>무신사 - 스타일쉐어</title>
      </Head>
      <Component />
    </ThemeProvider>
  );
};
export default App;
