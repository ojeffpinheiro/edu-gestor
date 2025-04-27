import { useState } from "react";
import { Exam } from "../utils/types/Assessment";

interface UseExamSecurityProps {
  examConfig: any;
  selectedQuestions: any[];
  createExam: (exam: Omit<Exam, 'id' | 'createdAt'>) => Promise<Exam>;
  onExamCreated: (exam: Exam) => void;
  setCurrentStep: (step: number) => void;
}

const useExamSecurity = ({
  examConfig,
  selectedQuestions,
  createExam,
  onExamCreated,
  setCurrentStep
}: UseExamSecurityProps) => {
    const [generatedExamId, setGeneratedExamId] = useState<string | null>(null);
    const [currentExam, setCurrentExam] = useState<Exam | null>(null);
    const [error, setError] = useState<string>('');

    // Mock functions - replace with actual implementations
    const createQRCodeComponent = async (text: string) => {
        return `qr_code_${text}`;
    };

    const generateExamBarCode = async (text: string) => {
        return `barcode_${text}`;
    };

    const handlePrepareExam = async () => {
        try {
            // Generate QR code and barcode
            const qrCode = await createQRCodeComponent(`exam_${Date.now()}`);
            const barCode = await generateExamBarCode(`exam_${Date.now()}`);

            // Generate random password for exam if not specified
            const password = examConfig.password || Math.random().toString(36).substring(2, 8).toUpperCase();

            // Calculate total points (1 point per question for simplicity)
            const totalPoints = selectedQuestions.length;

            // Prepare the exam object but don't save it yet
            const preparedExam: Exam = {
                id: `temp_${Date.now().toString()}`,
                title: examConfig.title,
                description: examConfig.description,
                questions: selectedQuestions.map(q => q.id),
                classIds: examConfig.classIds,
                totalPoints,
                qrCode,
                barCode,
                password,
                createdBy: 'current_user_id',
                questionDistribution: examConfig.questionDistribution,
                useBarCode: examConfig.useBarCode,
                useQRCode: examConfig.useQRCode,
                requirePassword: examConfig.requirePassword,
                startTime: examConfig.startTime,
                endTime: examConfig.endTime,
                timeLimit: examConfig.timeLimit,
                createdAt: new Date(),
                variants: [],
            };

            setCurrentExam(preparedExam);
            setCurrentStep(3);
        } catch (err) {
            setError('Failed to prepare exam');
            console.error('Error preparing exam:', err);
        }
    };

    const handleGenerateExam = async () => {
        try {
            if (!currentExam) return;

            // Create exam
            const newExam = await createExam({
                ...currentExam
            });

            // Set the generated exam ID for confirmation message
            setGeneratedExamId(newExam.id ?? null);
            setCurrentStep(4);

            // Notify parent component
            onExamCreated(newExam);

        } catch (err) {
            setError('Failed to generate exam');
            console.error('Error generating exam:', err);
        }
    };

    const handleUpdateExam = (updatedExam: Exam) => {
        setCurrentExam(updatedExam);
    };

    const resetSecurity = () => {
        setCurrentExam(null);
        setCurrentStep(1);
        setGeneratedExamId(null);
    }

    return {
        handlePrepareExam,
        handleGenerateExam,
        handleUpdateExam,
        resetSecurity,
        currentExam,
        generatedExamId,
        error
    };
};

export default useExamSecurity;