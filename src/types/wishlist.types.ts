import type { AlbumType } from './discogs.types';

export interface WishlistItemInterface {
	email?: string;
}

export type AlbumTypeWithReserved = AlbumType & { reserved?: boolean };
