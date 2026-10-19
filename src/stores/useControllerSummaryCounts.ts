import { ControllerSummaryCounts } from "@src/models/SummaryCounts";
import { create } from "zustand";

interface IControllerSummaryCountsContext {
  controllerSummaryCounts: ControllerSummaryCounts;
  setControllerSummaryCounts: (
    controllerSummaryCounts: ControllerSummaryCounts
  ) => void;
  decreaseApprovalsCount: () => void;
  setApprovalCounts: (count: number) => void;
  decreaseDocumentReviewsCount: () => void;
  setDocumentReviewsCount: (count: number) => void;
}

const useControllerSummaryCountsContext =
  create<IControllerSummaryCountsContext>()((set) => ({
    controllerSummaryCounts: {} as ControllerSummaryCounts,
    setControllerSummaryCounts: (controllerSummaryCounts) =>
      set({ controllerSummaryCounts }),
    decreaseApprovalsCount: () =>
      set((state) => ({
        controllerSummaryCounts: {
          ...state.controllerSummaryCounts,
          outstanding_approvals:
            state.controllerSummaryCounts.outstanding_approvals - 1,
        },
      })),
    setApprovalCounts: (count) =>
      set((state) => ({
        controllerSummaryCounts: {
          ...state.controllerSummaryCounts,
          outstanding_approvals: count,
        },
      })),
    decreaseDocumentReviewsCount: () =>
      set((state) => ({
        controllerSummaryCounts: {
          ...state.controllerSummaryCounts,
          outstanding_document_reviews:
            state.controllerSummaryCounts.outstanding_document_reviews - 1,
        },
      })),
    setDocumentReviewsCount: (count) =>
      set((state) => ({
        controllerSummaryCounts: {
          ...state.controllerSummaryCounts,
          outstanding_document_reviews: count,
        },
      })),
  }));
export default useControllerSummaryCountsContext;

