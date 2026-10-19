const GetShortDocumentName = (document_name: string) => {
  if (!document_name.includes("__")) return document_name;
  const noprefix = document_name.split("__")[1];
  const lastDotIndex = noprefix.lastIndexOf(".");
  if (lastDotIndex === -1) {
    return noprefix;
  }
  const noSuffix = noprefix.substring(0, lastDotIndex);
  return noSuffix;
};
export default GetShortDocumentName;

