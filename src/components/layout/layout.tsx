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
				<Container
					maxWidth="90vw"
					marginTop={{ base: 16, md: 24 }}
					marginBottom={{ base: 12, md: 16 }}
				>
					<Flex
						alignItems="center"
						gap={{ base: 3, md: 6 }}
						marginBottom={{ base: 8, md: 16 }}
						as={Link}
						href="/"
					>
						<Avatar
							name={process.env.NEXT_PUBLIC_OWNER_NAME}
							src={process.env.NEXT_PUBLIC_OWNER_AVATAR}
						/>
						<Text as="h1" fontSize={{ base: '3xl', md: '6xl' }} fontWeight="bold">
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
