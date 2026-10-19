export type DMSDocument = {
  DocName: string;
  Id: number;
  SiteURL: string;
  SiteName?: string;
  DocumentName: string;
  DocType: {
    TermGuid: string;
    Label: string;
  };
  DMSDocumentUsage: {
    TermGuid: string;
    Label: string;
  }[];
  // DMSStatus: {
  //   TermGuid: string;
  //   Label: string;
  // };
  DocumentID: string;
  DocCountry: {
    TermGuid: string;
    Label: string;
  };
  DocBusiness: {
    TermGuid: string;
    Label: string;
  }[];
  DocScope: {
    TermGuid: string;
    Label: string;
  };
};
