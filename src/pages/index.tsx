import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@record-collection/styles/Home.module.css";
import { Box, Button } from "@chakra-ui/react";
import { AlbumOverview } from "@record-collection/components/album-overview/album-overview";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { getCollection } from "@record-collection/util/get-collection";
import { getWishlist } from "@record-collection/util/get-wishlist";
import {
  AlbumType,
  DiscogsReleasesResponseInterface,
  DiscogsWantsResponseInterface,
} from "@record-collection/types/discogs.types";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  collection,
  wishlist,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();

  return (
    <>
      <Box as="section">
        <AlbumOverview
          heading={t("collection.title")}
          albums={collection?.releases as AlbumType[]}
          showFooter={false}
          isTeaser
        />
        <Button as={Link} href="/collection">
          {t("collection.viewAll")}
        </Button>
      </Box>

      <Box as="section" mt={12}>
        <AlbumOverview
          heading={t("wishlist.title")}
          albums={wishlist?.wants as AlbumType[]}
          showFooter={false}
          isTeaser
        />
        <Button as={Link} href="/wishlist">
          {t("wishlist.viewAll")}
        </Button>
      </Box>
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  collection: DiscogsReleasesResponseInterface;
  wishlist: DiscogsWantsResponseInterface;
}> = async ({ locale = "en" }) => {
  const collection = await getCollection();
  const wishlist = await getWishlist();

  return {
    props: {
      collection,
      wishlist,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
