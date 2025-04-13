import { Assessment } from "./AssessmentEvaluation";
import { AttendanceRecord } from "./Attendance";

// Student Interface
export interface Student {
    id: number;
    name: string;
    email: string;
}

// Student Data Interface
export interface StudentData {
    id: string; // Unique identifier for the student
    name: string;
    email: string;
    assessments: Assessment[];
    attendance: AttendanceRecord[];
    comments: string;
}

// Student Attendance Interface
export interface StudentAttendance {
    id: number;
    name: string;
    email: string;
    attendance: number;
}