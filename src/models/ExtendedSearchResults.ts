import { ISearchResult } from "@pnp/sp/search";

export type ExtendedSearchResults = ISearchResult & {
  FileName: string;
  ListItemID: number;
  owstaxIdDMSDocumentUsage: string;
  owstaxIdDMSStatus: string;
  owstaxIdDocCountry: string;
  owstaxIdDocBusiness: string;
  owstaxIdDocScope: string;
  DocRegion: string;
  owstaxIdDocType: string;
  SiteTitle: string;
  Created: string
  Author: string;
  Modified: string;
  EditorOWSUSER: string;
};
