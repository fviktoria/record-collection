import { getPrismaClient } from './prisma-client';

export type SetReservedParams = {
	id: string;
	email?: string;
};

export const getWishlistReserved = async (ids: string[]) => {
	const prismaClient = getPrismaClient();
	if (!prismaClient) return;

	// will return: [ { reserved: true }, null ]
	const reservedItems = await prismaClient.wishlistReservation.findMany({
		where: { recordId: { in: ids } },
	});

	return reservedItems.map((item) => item.recordId);
};

export const setItemAsReserved = async ({ id, email }: SetReservedParams) => {
	const prismaClient = getPrismaClient();

	if (!id || !email) throw new Error('wishlist.error.missing-id-or-email');

	await prismaClient.wishlistReservation.upsert({
		where: { recordId: id },
		create: { recordId: id, email },
		update: { email },
	});
};

export const undoSetItemAsReserved = async ({ id, email }: SetReservedParams) => {
	const prismaClient = getPrismaClient();
	const item = await prismaClient.wishlistReservation.findUnique({
		where: { recordId: id },
	});

	if (!item) {
		return { status: 'error', message: 'wishlist.error.item-not-found' };
	}

	// check email
	if (!email || item.email !== email) {
		return { status: 'error', message: 'wishlist.error.email-not-matching' };
	}

	try {
		await prismaClient.wishlistReservation.delete({ where: { recordId: id } });
		return { status: 'success' };
	} catch {
		return { status: 'error', message: 'wishlist.error.redis-error' };
	}
};
