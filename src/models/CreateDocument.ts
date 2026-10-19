import { ISite } from "@pnp/spfx-controls-react/lib/services/SPSitesService";
import { ITermInfo } from "@pnp/spfx-controls-react/node_modules/@pnp/sp/taxonomy/types";

export type NewDocument = {
  method: "upload";
  uploadedFile?: File;
  type: ITermInfo[];
  name: string;
  country: ITermInfo[];
  site: ISite[];
  business: ITermInfo[];
  scope: ITermInfo[];
  documentId: string;
};

export const initialNewDocument: NewDocument = {
  method: "upload",
  uploadedFile: undefined,
  type: [],
  name: "",
  country: [],
  site: [],
  documentId: "",
  business: [],
  scope: [],
};

