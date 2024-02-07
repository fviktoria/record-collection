import { Box } from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { getWishlist } from '@record-collection/util/get-wishlist';
import { AlbumOverview } from '@record-collection/components/album-overview/album-overview';
import { Layout } from '@record-collection/components/layout/layout';

import type {
	AlbumType,
	DiscogsWantsResponseInterface,
} from '@record-collection/types/discogs.types';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';

export default function Wishlist({
	wishlist,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const { t } = useTranslation();

	return (
		<Layout>
			<Box as="section" mt={12}>
				<AlbumOverview
					heading={t('wishlist.title')}
					albums={wishlist?.wants as AlbumType[]}
					showCount
				/>
			</Box>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps<{
	wishlist: DiscogsWantsResponseInterface;
}> = async ({ locale = 'en' }) => {
	const wishlist = await getWishlist();

	return {
		props: {
			wishlist,
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
};
