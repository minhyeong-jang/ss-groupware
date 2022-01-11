import React from "react";
import Document, { DocumentContext } from "next/document";
import { ServerStyleSheet } from "styled-components";

interface Props {
  headers: Record<string, string>;
}

export default class ActivationDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => {
            const SheetComponent = sheet.collectStyles(<App {...props} />);
            return SheetComponent;
          },
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
