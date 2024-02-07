import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	Input,
	useDisclosure,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { isAlbumTypeWithReserved } from '@record-collection/types/guards/wishlist.guards';

import type { ComponentProps, FC, PropsWithChildren } from 'react';
import type { AlbumGridCard } from '../album-grid-card/album-grid-card';

type AlbumCardActionsProps = Pick<
	ComponentProps<typeof AlbumGridCard>,
	'album' | 'link' | 'isReserved'
>;

export const AlbumCardActions: FC<PropsWithChildren<AlbumCardActionsProps>> = ({
	album,
	link,
	isReserved,
}) => {
	const { t } = useTranslation();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef(null);

	const [email, setEmail] = useState('');
	const [error] = useState<string>();

	//   const setReserved = useSubmit();
	//   const isSubmitting = useMemo(
	//     () => navigation.state === "loading" || navigation.state === "submitting",
	//     [navigation]
	//   );

	//   const handleReserve = useCallback(() => {
	//     if (!email || email.length === 0) {
	//       setError(t("albumCard.reserve.error"));
	//       return;
	//     } else {
	//       setError(undefined);
	//     }

	//     setReserved({ albumId: album.id, email }, { method: "post" });
	//   }, [email, setReserved, album.id, t]);

	//   const handleUndoReserve = useCallback(() => {
	//     if (!email || email.length === 0) {
	//       setError(t("albumCard.reserve.error"));
	//       return;
	//     } else {
	//       setError(undefined);
	//     }

	//     setReserved({ albumId: album.id, email }, { method: "delete" });
	//   }, [email, setReserved, album.id, t]);

	//   useEffect(() => {
	//     if (!isSubmitting) {
	//       onClose();
	//     }
	//   }, [onClose, navigation.state, isSubmitting]);

	const title = isReserved
		? t('albumCard.undoReserve.title')
		: t('albumCard.reserve.title');

	const helperText = isReserved
		? t('albumCard.undoReserve.helperText')
		: t('albumCard.reserve.helperText');

	return (
		<>
			<Flex
				gap={1}
				flexDirection={{
					base: 'column',
					md: 'row',
				}}
				width="100%"
			>
				{link && (
					<Button
						{...(link && !isReserved && { as: Link, href: link, target: '_blank' })}
						disabled={isReserved}
						colorScheme="gray"
					>
						{t('albumCard.viewOnline')}
					</Button>
				)}
				{isAlbumTypeWithReserved(album) && (
					<Button onClick={onOpen} colorScheme="gray">
						{isReserved ? t('labels.undoReserve') : t('labels.reserve')}
					</Button>
				)}
			</Flex>

			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							{title}
						</AlertDialogHeader>

						<AlertDialogBody>
							{helperText}
							<FormControl isInvalid={!!error} mt={3}>
								<Input
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder={t('labels.email')}
									aria-label={t('labels.email')}
								/>
								<FormErrorMessage>{error}</FormErrorMessage>
							</FormControl>
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} colorScheme="gray" onClick={onClose}>
								{t('labels.cancel')}
							</Button>
							<Button
								// onClick={isReserved ? handleUndoReserve : handleReserve}
								ml={3}
								// isLoading={isSubmitting}
							>
								{isReserved ? t('labels.undoReserve') : t('labels.reserve')}
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};
