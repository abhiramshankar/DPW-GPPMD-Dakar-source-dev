export function fmtTaxonomy(term: string): string {
  if (!term) return "";

  let regex = /\|([^#][^;]*)/g;

  // splitting method for remapped properties (includes \n)
  if (term.includes("\n")) {
    regex = /\|([^#|\n][^|\n]*)/g;
  }

  // Find any terms between a pipe and a newline or semicolon
  const terms = term.match(regex);
  if (!terms) return "";

  // Remove the leading |
  const cleanedTerms = terms.map((term) => term.slice(1));

  const formattedTerms = cleanedTerms.join(", ");
  return formattedTerms;
}
