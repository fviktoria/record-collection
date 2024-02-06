import { DiscogsClientPaginationInterface } from "@record-collection/types/discogs-client.types";
import { discogsClient } from "./discogs-client";
import {
  DiscogsReleasesResponseInterface,
  DiscogsWantsResponseInterface,
} from "@record-collection/types/discogs.types";

const url = `/users/${process.env.DISCOGS_USER_NAME}/wants`;

export const getWishlist = (params: DiscogsClientPaginationInterface = {}) => {
  return discogsClient.get<DiscogsWantsResponseInterface>(url, {
    params,
    next: { tags: ["wishlist"] },
  });
};
