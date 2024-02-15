import { Avatar, Box, Container, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Link from 'next/link';

import { Settings } from '../settings/settings';

import type { FC, PropsWithChildren } from 'react';

export const Layout: FC<PropsWithChildren<object>> = ({ children }) => {
	const { t } = useTranslation();
	return (
		<>
			<Head>
				<title>{t('page.title', { name: process.env.NEXT_PUBLIC_OWNER_NAME })}</title>
			</Head>

			<Box overflowX="hidden">
				<Container maxWidth="90vw" marginTop={24} marginBottom={16}>
					<Flex alignItems="center" gap={6} marginBottom={16} as={Link} href="/">
						<Avatar
							name={process.env.NEXT_PUBLIC_OWNER_NAME}
							src={process.env.NEXT_PUBLIC_OWNER_AVATAR}
						/>
						<Text as="h1" fontSize="6xl" fontWeight="bold">
							{t('page.title', { name: process.env.NEXT_PUBLIC_OWNER_NAME })}
						</Text>
					</Flex>
					{children}
				</Container>
			</Box>

			<Settings />
		</>
	);
};
