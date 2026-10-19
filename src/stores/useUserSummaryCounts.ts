import { UserSummaryCounts } from "@src/models/SummaryCounts";
import { create } from "zustand";

interface IUserSummaryCountsContext {
  userSummaryCounts: UserSummaryCounts;
  setUserSummaryCounts: (userSummaryCounts: UserSummaryCounts) => void;
  decreaseApprovalsCount: () => void;
  setApprovalCounts: (count: number) => void;
  decreaseChangeRequestsCount: () => void;
  setChangeRequestCounts: (count: number) => void;
  decreaseDocumentViewsCount: () => void;
  setDocumentViewsCount: (count: number) => void;
  decreaseDocumentReviewsCount: () => void;
  setDocumentReviewsCount: (count: number) => void;
}

const useUserSummaryCountsContext = create<IUserSummaryCountsContext>()(
  (set) => ({
    userSummaryCounts: {} as UserSummaryCounts,
    setUserSummaryCounts: (userSummaryCounts) => set({ userSummaryCounts }),
    decreaseApprovalsCount: () =>
      set((state) => ({
        userSummaryCounts: {
          ...state.userSummaryCounts,
          outstanding_approvals:
            state.userSummaryCounts.outstanding_approvals - 1,
        },
      })),
    setApprovalCounts: (count) =>
      set((state) => ({
        userSummaryCounts: {
          ...state.userSummaryCounts,
          outstanding_approvals: count,
        },
      })),
    decreaseChangeRequestsCount: () =>
      set((state) => ({
        userSummaryCounts: {
          ...state.userSummaryCounts,
          outstanding_change_requests:
            state.userSummaryCounts.outstanding_change_requests - 1,
        },
      })),
    setChangeRequestCounts: (count) =>
      set((state) => ({
        userSummaryCounts: {
          ...state.userSummaryCounts,
          outstanding_change_requests: count,
        },
      })),
    decreaseDocumentViewsCount: () =>
      set((state) => ({
        userSummaryCounts: {
          ...state.userSummaryCounts,
          outstanding_document_views:
            state.userSummaryCounts.outstanding_document_views - 1,
        },
      })),
    setDocumentViewsCount: (count) =>
      set((state) => ({
        userSummaryCounts: {
          ...state.userSummaryCounts,
          outstanding_document_views: count,
        },
      })),
    decreaseDocumentReviewsCount: () =>
      set((state) => ({
        userSummaryCounts: {
          ...state.userSummaryCounts,
          outstanding_document_reviews:
            state.userSummaryCounts.outstanding_document_reviews - 1,
        },
      })),
    setDocumentReviewsCount: (count) =>
      set((state) => ({
        userSummaryCounts: {
          ...state.userSummaryCounts,
          outstanding_document_reviews: count,
        },
      })),
  })
);
export default useUserSummaryCountsContext;

