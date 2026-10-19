import { NewDocument } from "@src/models/CreateDocument";

export const getPrefix = (formData: NewDocument) => {
  let prefix = "";
  if (formData.site && formData.site.length > 0) {
    prefix += formData.site[0].title + "-";
  }
  if (formData.business && formData.business.length > 0) {
    prefix += formData.business[0].labels[0].name + "-";
  }
  if (formData.type && formData.type.length > 0) {
    prefix += formData.type[0].labels[0].name + "__";
  }
  const illegalCharacters = /[#%*:<>?/|]/g;
  return prefix.replace(illegalCharacters, "");
};

export const getSuffix = (formData: NewDocument) => {
    return formData.uploadedFile
      ? "." + formData.uploadedFile?.name.split(".").pop()
      : undefined;
  
};

