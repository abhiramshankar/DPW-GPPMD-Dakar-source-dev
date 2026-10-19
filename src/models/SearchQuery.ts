import { ISort } from "@pnp/sp/search";

export type TSearchQuery = {
  queryText: string;
  refinementFilters: string[];
  sortList: ISort[];
};
