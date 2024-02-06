import { DiscogsClientPaginationInterface } from "@record-collection/types/discogs-client.types";
import { discogsClient } from "./discogs-client";
import { DiscogsReleasesResponseInterface } from "@record-collection/types/discogs.types";

const url = `/users/${process.env.DISCOGS_USER_NAME}/collection/folders/0/releases`;

export const getCollection = (
  params: DiscogsClientPaginationInterface = {}
) => {
  return discogsClient.get<DiscogsReleasesResponseInterface>(url, {
    params,
    next: { tags: ["collection"] },
  });
};
