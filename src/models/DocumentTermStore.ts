export type DocumentTermStore = {
  DMS_DocumentUsage: TermSet | null;
  DMS_Status: TermSet | null;
  DocBusiness: TermSet | null;
  DocScope: TermSet | null;
  DocType: TermSet | null;
  DocCountry: TermSet | null;
  DocDepartment: TermSet | null;
  DocLanguage: TermSet | null;
  DocLocation: TermSet | null;
  DocProcess: TermSet | null;
  ReviewPeriod: TermSet | null;
};

export type Term = {
  name: string;
  id: string;
};

export type TermSet = {
  name: string;
  id: string;
  terms: Term[];
};

