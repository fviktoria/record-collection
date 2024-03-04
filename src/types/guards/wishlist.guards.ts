import type { AlbumTypeWithReserved, WishlistItemInterface } from '../wishlist.types';

export const isUpstashWishlistItem = (value: unknown): value is WishlistItemInterface => {
	if (!value) return false;
	if (typeof value !== 'object') return false;
	return true;
};

export const isAlbumTypeWithReserved = (arg: unknown): arg is AlbumTypeWithReserved => {
	return (arg as AlbumTypeWithReserved).reserved !== undefined;
};
