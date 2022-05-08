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
        <title>스타일쉐어 - 그룹웨어</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        />
        <meta content='https://www.ss-groupware.com' property='og:url' />
        <meta content='website' property='og:type' />
        <meta content='스타일쉐어 그룹웨어' property='og:title' />
        <meta
          content={
            "https://doriri-shared.s3.ap-northeast-2.amazonaws.com/ss-groupware-preview.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aDmFwLW5vcnRoZWFzdC0yIkcwRQIgBNZvkEiQv2PkqbN0jbwxNp3HzwhWnaXEKFATk3JqIvICIQDZ2U3GT8D0aDYyI9HSD8NkmmnZboLYGAbodL6KxvDNciqeAgjX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAMaDDcwODE4MjIyNzM3MyIMDaLbRvDPftHuhxQoKvIB6D9%2BCvYzHutdX8vcZJTxkXIpCOf3fKr3l4PK7NCMPyhWnpPVk1cBfW3oZzCnrZ3YLDmelex5sYAJLgQUGlWp7FvMDqTUkSsY%2B8H%2BNt%2F5sXgZHlVsmAJ0VAnbwtMrP9ASYIYEiNGjM73Vzi7xURAgzKAz3O%2BqBEq5ngXNwmX%2F840QIlCd1MF5ikAUGQoBrsJ73kZ2ttL1aCsKe2el0dlGiA7EPzKmGBo5nlyN9s3JcRatH3UTVe%2FwJ%2BXy0bj%2Fz4zftM%2BabZOFXEoX59xsBwPptR8nAnZuMx9gcRcAN7GH1Mii4qr058zA1Iu5QlWJOOVeTT0wx63ekwY63wEw%2FiDS5nkRUvGKg6MSVc9mH6PEKOi31fGKF%2F5mEu3ab7sZNXT8hlbzxgxn2keCGhhj1hNv2spXmOb%2Fx%2BQ0OYSPgH8FfapvOwJ5ZoWnzGq7xrF9HB0m93PbtVUBxIkJ1G8%2FRfxK%2FEAdRPI38BD0TG4RmwGfnBL0DAk%2Fib59%2BoL42FPLApGZzLxn5ioc5ibhhvbPjC5r5dsxwf6Gumcgn8k7%2FZFEqBtz5TJTJpwH7qKYyRGoAK515GQkD9XnK7QOrnRyeiwkxq76yciee5u8j4qbD3jkDHy%2Fzl%2BKKYOIzXlk&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220508T141112Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA2JYXTHGWQALKHPMS%2F20220508%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=4ce7fd1f02db2480c5ea8155adb2d3e5a677eeb2c5dce285dae7e5b65f21a937"
          }
          property='og:image'
        />
        <meta content='출퇴근 관리' property='description' />
        <meta content='출퇴근 관리' property='og:description' />
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
