import React, { useRef } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "styles";
import "antd/dist/antd.css";
import { QueryClient, QueryClientProvider } from "react-query";
import moment from "moment";
import "moment/locale/ko";

moment.locale("ko");

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

const App = ({ Component }: AppProps) => {
  const queryClientRef = useRef(createQueryClient());
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Head>
        <title>무신사 - 스타일쉐어</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        />
        <script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-BQ3F25MPVG'
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag("js", new Date());
              gtag("config", "G-BQ3F25MPVG");
            `,
          }}
        ></script>
      </Head>
      <QueryClientProvider client={queryClientRef.current}>
        <Component />
      </QueryClientProvider>
    </ThemeProvider>
  );
};
export default App;
