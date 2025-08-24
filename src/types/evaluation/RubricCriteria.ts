export interface RubricOrConcept {
    id: string;
    name: string;
    description: string;
}

export interface CriterionOption {
    id: string;
    description: string;
}

export interface EvaluationCriterion {
    id: string;
    name: string;
    weight: number;
    options: CriterionOption[];
    comment: string;
    isExpanded: boolean;
}

export interface EvaluationCriteria {
    id: string;
    name: string;
    description: string;
    weight: number;
}