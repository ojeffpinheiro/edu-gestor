import { StudentFormData } from "./BasicUser";

// Group Formation Types Enum
export enum GroupFormationType {
    BY_SIZE = 'bySize',
    BY_NUMBER = 'byNumber'
}

// Formation Configuration Constants
export const FORMATION_CONFIG = {
    MIN_GROUP_SIZE: 2,
    MIN_GROUPS: 1,
    DEFAULT_PROCESSING_DELAY: 600
};

// Group Formation Modal Props Interface
export interface GroupFormationModalProps {
    students: StudentFormData[]; // List of available students
    onClose: () => void; // Callback when the modal is closed
    onSave?: (groups: StudentFormData[][]) => void; // Optional save function for formed groups
    processingDelay?: number; // Simulation processing time in ms
}

// Group Formation State Interface
export interface GroupFormationState {
    groupSize: number;
    numberOfGroups: number;
    formationType: GroupFormationType;
}