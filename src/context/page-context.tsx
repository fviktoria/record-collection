"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import type { FC } from "react";

type PageContextProps = {
  labelReserved?: boolean;
  setLabelReserved: (value?: boolean) => void;
};

export const PageContext = createContext<PageContextProps | null>(null);

export const PageContextProvider: FC<
  React.PropsWithChildren<Partial<PageContextProps>>
> = ({ children }) => {
  const [labelReserved, setLabelReserved] = useState<boolean>();

  const ownerHandle = process.env.NEXT_PUBLIC_OWNER_HANDLE;

  useEffect(() => {
    const value = localStorage.getItem(`${ownerHandle}:label_reserved`);
    if (value) {
      setLabelReserved(JSON.parse(value));
    } else {
      setLabelReserved(true);
    }
  }, [ownerHandle]);

  useEffect(() => {
    if (labelReserved !== undefined) {
      localStorage.setItem(
        `${ownerHandle}:label_reserved`,
        JSON.stringify(labelReserved)
      );
    }
  }, [labelReserved, ownerHandle]);

  const value = useMemo(
    () => ({
      labelReserved,
      setLabelReserved,
    }),
    [labelReserved, setLabelReserved]
  );

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export function usePageContext(): PageContextProps {
  const context = useContext(PageContext);

  if (!context)
    throw new Error(
      "page context must be used inside an page context provider."
    );

  return context;
}