// Feedback State Interface
export interface FeedbackState {
    errorMessage: string;
    successMessage: string;
    isProcessing: boolean;
    showResults: boolean;
    hasUnsavedChanges: boolean;
}