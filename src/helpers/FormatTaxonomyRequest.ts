import { ITermInfo } from "@pnp/spfx-controls-react/node_modules/@pnp/sp/taxonomy/types";

export function fmtTaxonomyRequest(terms: ITermInfo[]): string {
  let termString = "";
  terms.forEach((term) => {
    termString += `${term.labels[0].name}|${term.id};`;
  });
  return termString;
}
