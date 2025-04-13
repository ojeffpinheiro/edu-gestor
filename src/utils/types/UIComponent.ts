import { StudentData } from "./BasicUser";
import { ExportOptions } from "./ExportReport";

// Button Variants
export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

// Student Modal Props Interface
export interface StudentModalProps {
    studentData?: StudentData; // Optional student data
    isLoading?: boolean; // Loading indicator
    onClose: () => void; // Callback to close the modal
    onExport?: (studentId: string, exportOptions: ExportOptions) => void; // Optional export callback
    onError?: (error: Error) => void; // Error handling callback
}

// Report Interface
export interface Report {
    checked: boolean;
    onChange: () => void;
    label: string;
    disabled?: boolean;
}

// Collapsible Props Interface
export interface CollapsibleProps {
    title: string;
    initiallyExpanded?: boolean;
    sectionColor: string;
    includeInReport: boolean;
    onToggleInclude: () => void;
    disableToggle?: boolean;
    children: React.ReactNode;
}