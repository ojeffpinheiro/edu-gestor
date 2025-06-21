
export interface ClassData {
  id: string;
  name: string;
  period: string;
  assessments: Assessment[];
  students: Student[];
}

export interface Assessment {
  id: string;
  title: string;
  type: string;
  date: string;
  maxScore: number;
  average?: number;
}

export interface Student {
  id: string;
  name: string;
  scores: Record<string, number>;
}