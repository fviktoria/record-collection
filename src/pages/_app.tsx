import { appWithTranslation } from "next-i18next";

import { ChakraProvider } from "@chakra-ui/react";
import { PageContextProvider } from "@record-collection/context/page-context";
import "@record-collection/styles/globals.css";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <PageContextProvider>
        <Component {...pageProps} />
      </PageContextProvider>
    </ChakraProvider>
  );
}

export default appWithTranslation(App);
