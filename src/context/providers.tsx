"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { PageContextProvider } from "./page-context";

export const Providers: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <ChakraProvider>
      <PageContextProvider>{children}</PageContextProvider>
    </ChakraProvider>
  );
};
