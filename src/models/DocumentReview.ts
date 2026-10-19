export type DocumentReview = {
  id: number;
  document_id: string;
  document_name: string;
  document_url: string;
  document_revision_number: number;
  review_date: Date;
  type: string;
  region: string;
  site_name: string;
  site_url: string;
  owner_display_name: string;
  owner_upn: string;
  owner_id: string;
  review_outcome_id: number;
  review_outcome: string;
  owner_action_date: Date;
  owner_action_comment: string;
  controller_action_date: Date;
  review_months: number;
  document_id_alt: string;
  document_legacy_number: string;
  viewed_count: number;
  sent_count: number;
  cr_actioned_count: number;
  cr_total_count: number;
};

