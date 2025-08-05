import React, { useState } from 'react';
import { FaGraduationCap, FaBookOpen, FaCheckCircle, FaTimes, FaStar, FaExclamationTriangle } from 'react-icons/fa';
import {
    Badge,
    Button,
    CardDescription, CardIcon, CardProps, CardsGrid, CardTitle,
    Container, FeatureCard, FileInfo, GradientOverlay, GradientText, HeaderContainer,
    HeaderContent, HeaderSubtitle, HeaderTitle,
    HeroContainer, HeroDescription, HeroGrid, HeroImage, HeroSection, HeroTitle, IconCircle,
    ImageContainer, ImagePreviewContainer, PageContainer, PreviewHeader, PreviewImage, ProgressCircle, ProgressConnector, ProgressContainer, ProgressItem, ProgressText, RemoveButton, Section, SectionTitle, SpaceY4, SpaceY8, StyledCard, VerticalStack
} from './styles';
import { CorrectionCard, ImageDropzone, TextExtractionCard } from '../../components/ImageDropzone';

// Tipos
export interface CorrectionResult {
    score: number;
    grade: 'A' | 'B' | 'C' | 'D' | 'F';
    feedback: string[];
    strengths: string[];
    improvements: string[];
    grammarErrors: string[];
    suggestions: string[];
}

interface ProgressIconProps {
    active?: boolean;
    step: number;
}

interface ImagePreviewProps {
    image: File;
    onRemove: () => void;
}

interface ProgressIndicatorProps {
    steps: {
        id: number;
        label: string;
        completed: boolean;
    }[];
}

interface CustomCardProps extends CardProps {
    children: React.ReactNode;
    className?: string;
}

interface IconProps {
    icon: React.ReactNode;
    size?: number;
    className?: string;
}

export const ProgressIcon = ({ active, step }: ProgressIconProps) => (
    <ProgressCircle $active={active}>
        {active ? <FaCheckCircle size={20} /> : step}
    </ProgressCircle>
);

const ProgressIndicator = ({ steps }: ProgressIndicatorProps) => (
    <ProgressContainer>
        {steps.map((step, index) => (
            <React.Fragment key={step.id}>
                <ProgressItem $active={step.completed}>
                    <ProgressIcon active={step.completed} step={step.id} />
                    <ProgressText>{step.label}</ProgressText>
                </ProgressItem>

                {index < steps.length - 1 && (
                    <ProgressConnector $active={step.completed} />
                )}
            </React.Fragment>
        ))}
    </ProgressContainer>
);

export const CustomCard = ({
    $variant = 'default',
    $padding = 'md',
    $hoverEffect = true,
    children,
    className
}: CustomCardProps) => (
    <StyledCard
        $variant={$variant}
        $padding={$padding}
        $hoverEffect={$hoverEffect}
        className={className}
    >
        {children}
    </StyledCard>
);

export const Icon = ({ icon, size = 16, className }: IconProps) => (
    <div className={className} style={{ width: size, height: size }}>
        {icon}
    </div>
);


// Página principal
const EducationCorrectorPage = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [extractedText, setExtractedText] = useState('');
    const [correctionResult, setCorrectionResult] = useState<CorrectionResult | null>(null);
    const [isExtracting, setIsExtracting] = useState(false);
    const [isCorrecting, setIsCorrecting] = useState(false);

    const steps = [
        { id: 1, label: 'Upload', completed: !!selectedImage },
        { id: 2, label: 'Extração', completed: !!extractedText },
        { id: 3, label: 'Correção', completed: !!correctionResult },
    ];

    const handleImageSelect = (file: File) => {
        setSelectedImage(file);
        setExtractedText('');
        setCorrectionResult(null);
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        setExtractedText('');
        setCorrectionResult(null);
    };

    const handleTextExtracted = (text: string) => {
        setExtractedText(text);
        setCorrectionResult(null);
    };

    const handleCorrectionComplete = (result: CorrectionResult) => {
        setCorrectionResult(result);
    };

    const extractText = async () => {
        if (!selectedImage) return;

        setIsExtracting(true);
        try {
            // Simulação de extração de texto (em um app real, usaria OCR)
            await new Promise(resolve => setTimeout(resolve, 2000));
            const mockText = "Texto extraído da imagem simulada.\n\nEsta é uma simulação de texto extraído de uma atividade escolar.\n\nO sistema de correção automática irá analisar este conteúdo e fornecer feedback detalhado.";
            handleTextExtracted(mockText);
        } catch (error) {
            console.error('Error extracting text:', error);
        } finally {
            setIsExtracting(false);
        }
    };

    const correctActivity = async () => {
        if (!extractedText.trim()) return;

        setIsCorrecting(true);
        try {
            // Simulação de correção (em um app real, usaria IA)
            await new Promise(resolve => setTimeout(resolve, 3000));

            const mockResult: CorrectionResult = {
                score: 85,
                grade: 'B',
                feedback: [
                    "Boa estrutura textual e organização das ideias",
                    "Argumentação consistente ao longo do texto",
                    "Uso adequado de conectivos e elementos coesivos"
                ],
                strengths: [
                    "Clareza na expressão das ideias",
                    "Vocabulário adequado ao tema",
                    "Boa introdução e desenvolvimento"
                ],
                improvements: [
                    "Atenção à concordância verbal em algumas passagens",
                    "Maior variação no uso de conectivos",
                    "Aprofundamento de alguns argumentos"
                ],
                grammarErrors: [
                    "Linha 3: 'havia' deveria ser 'haviam'",
                    "Linha 7: Falta vírgula após 'portanto'"
                ],
                suggestions: [
                    "Revisar regras de concordância",
                    "Utilizar mais exemplos práticos",
                    "Elaborar melhor a conclusão"
                ]
            };

            handleCorrectionComplete(mockResult);
        } catch (error) {
            console.error('Error correcting activity:', error);
        } finally {
            setIsCorrecting(false);
        }
    };


    const getGradeColor = (grade: string) => {
        switch (grade) {
            case 'A': return 'success';
            case 'B': return 'primary';
            case 'C': return 'warning';
            case 'D': return 'warning';
            case 'F': return 'destructive';
            default: return 'primary';
        }
    };

    const Header = () => (
        <HeaderContainer>
            <HeaderContent>
                <IconCircle>
                    <FaGraduationCap style={{
                        width: '1.5rem',
                        height: '1.5rem',
                        color: 'var(--color-primary-foreground)'
                    }} />
                </IconCircle>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <HeaderTitle>EduCorretor IA</HeaderTitle>
                    <HeaderSubtitle>Correção inteligente de atividades</HeaderSubtitle>
                </div>
            </HeaderContent>
        </HeaderContainer>
    );

    const HeroSectionComponent = () => (
        <HeroSection>
            <HeroContainer>
                <HeroGrid>
                    <div>
                        <SpaceY8>
                            <SpaceY4>
                                <HeroTitle>
                                    Corrija atividades com
                                    <GradientText> Inteligência Artificial</GradientText>
                                </HeroTitle>

                                <HeroDescription>
                                    Transforme sua correção de atividades em um processo rápido e eficiente.
                                    Upload de imagem, extração automática de texto e correção com feedback detalhado.
                                </HeroDescription>
                            </SpaceY4>

                            <CardsGrid>
                                <FeatureCard hoverEffect>
                                    <CardIcon>
                                        <FaBookOpen size={32} />
                                    </CardIcon>
                                    <CardTitle>Upload Simples</CardTitle>
                                    <CardDescription>Faça upload da imagem da atividade</CardDescription>
                                </FeatureCard>

                                <FeatureCard hoverEffect>
                                    <CardIcon>
                                        <FaGraduationCap size={32} />
                                    </CardIcon>
                                    <CardTitle>OCR Avançado</CardTitle>
                                    <CardDescription>Extração automática de texto</CardDescription>
                                </FeatureCard>

                                <FeatureCard hoverEffect>
                                    <CardIcon>
                                        <FaCheckCircle size={32} />
                                    </CardIcon>
                                    <CardTitle>Correção IA</CardTitle>
                                    <CardDescription>Feedback detalhado e nota</CardDescription>
                                </FeatureCard>
                            </CardsGrid>
                        </SpaceY8>
                    </div>

                    <ImageContainer>
                        <HeroImage
                            src="/education-hero.jpg"
                            alt="Professor usando tecnologia educacional"
                        />
                        <GradientOverlay />
                    </ImageContainer>
                </HeroGrid>
            </HeroContainer>
        </HeroSection>
    );

    const ImagePreview = ({ image, onRemove }: ImagePreviewProps) => (
        <ImagePreviewContainer>
            <PreviewHeader>
                <SectionTitle>Imagem Selecionada</SectionTitle>
                <RemoveButton onClick={onRemove}>
                    <Icon icon={<FaTimes />} />
                    <span>Remover</span>
                </RemoveButton>
            </PreviewHeader>

            <ImageContainer>
                <PreviewImage
                    src={URL.createObjectURL(image)}
                    alt="Atividade selecionada"
                />
            </ImageContainer>

            <FileInfo>
                <p><strong>Nome:</strong> {image.name}</p>
                <p><strong>Tamanho:</strong> {(image.size / 1024 / 1024).toFixed(2)} MB</p>
            </FileInfo>
        </ImagePreviewContainer>
    );

    return (
        <PageContainer>
            {/* Header */}
            <Header />

            <HeroSectionComponent />

            {/* Main Content */}
            <Section>
                <Container size="lg">
                    <VerticalStack>
                        {/* Progress Indicator */}
                        <ProgressIndicator steps={steps} />

                        {/* Step 1: Image Upload */}
                        <CustomCard $padding="md" $hoverEffect>
                            {selectedImage
                                ? <ImagePreview image={selectedImage} onRemove={handleRemoveImage} />
                                : <ImageDropzone onFileSelect={handleImageSelect} />
                            }
                        </CustomCard>

                        {/* Step 2: Text Extraction */}
                        {selectedImage && <TextExtractionCard
                            extractedText={extractedText}
                            isExtracting={isExtracting}
                            onExtractText={extractText}
                            onTextChange={handleTextExtracted}
                        />}

                        {/* Step 3: Activity Correction */}
                        {extractedText && (
                            <CustomCard $padding="md" $hoverEffect>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-success rounded-full flex items-center justify-center">
                                            <FaGraduationCap className="h-5 w-5 text-secondary-foreground" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground">Correção Automática</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Análise inteligente da atividade com feedback detalhado
                                            </p>
                                        </div>
                                    </div>

                                    {!correctionResult && (
                                        <Button
                                            onClick={correctActivity}
                                            disabled={isCorrecting || !extractedText.trim()}
                                            variant="secondary"
                                            size="lg"
                                        >
                                            {isCorrecting ? (
                                                <>
                                                    <FaGraduationCap className="h-4 w-4 mr-2 animate-spin" />
                                                    Corrigindo...
                                                </>
                                            ) : (
                                                <>
                                                    <FaGraduationCap className="h-4 w-4 mr-2" />
                                                    Corrigir Atividade
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </div>

                                {correctionResult && (
                                    <div className="space-y-6">
                                        {/* Score and Grade */}
                                        <div className="flex items-center justify-center space-x-6 p-6 bg-gradient-hero rounded-lg shadow-soft">
                                            <div className="text-center">
                                                <div className="text-4xl font-bold text-primary mb-2">
                                                    {correctionResult.score}
                                                </div>
                                                <div className="text-sm text-muted-foreground">Pontuação</div>
                                            </div>
                                            <div className="text-center">
                                                <Badge className={`text-2xl font-bold px-4 py-2`} data-variant={getGradeColor(correctionResult.grade)}>
                                                    {correctionResult.grade}
                                                </Badge>
                                                <div className="text-sm text-muted-foreground mt-2">Conceito</div>
                                            </div>
                                        </div>

                                        {/* Feedback Sections */}
                                        <div className="grid gap-4 md:grid-cols-2">
                                            {/* Strengths */}
                                            <CustomCard $variant="success" $padding="sm">
                                                <div className="flex items-center space-x-2 mb-3">
                                                    <FaCheckCircle className="h-5 w-5 text-success" />
                                                    <h4 className="font-semibold text-success">Pontos Fortes</h4>
                                                </div>
                                                <ul className="space-y-2">
                                                    {correctionResult.strengths.map((strength, index) => (
                                                        <li key={index} className="text-sm text-foreground flex items-start space-x-2">
                                                            <FaStar className="h-3 w-3 text-success mt-0.5 flex-shrink-0" />
                                                            <span>{strength}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CustomCard>

                                            {/* Improvements */}
                                            <CustomCard $variant="warning" $padding="sm">
                                                <div className="flex items-center space-x-2 mb-3">
                                                    <FaExclamationTriangle className="h-5 w-5 text-warning" />
                                                    <h4 className="font-semibold text-warning">Pontos a Melhorar</h4>
                                                </div>
                                                <ul className="space-y-2">
                                                    {correctionResult.improvements.map((improvement, index) => (
                                                        <li key={index} className="text-sm text-foreground flex items-start space-x-2">
                                                            <FaExclamationTriangle className="h-3 w-3 text-warning mt-0.5 flex-shrink-0" />
                                                            <span>{improvement}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CustomCard>
                                        </div>

                                        {/* Grammar Errors */}
                                        {correctionResult.grammarErrors.length > 0 && (
                                            <CustomCard $variant="destructive" $padding="sm">
                                                <div className="flex items-center space-x-2 mb-3">
                                                    <FaTimes className="h-5 w-5 text-destructive" />
                                                    <h4 className="font-semibold text-destructive">Correções Gramaticais</h4>
                                                </div>
                                                <ul className="space-y-2">
                                                    {correctionResult.grammarErrors.map((error, index) => (
                                                        <li key={index} className="text-sm text-foreground flex items-start space-x-2">
                                                            <FaTimes className="h-3 w-3 text-destructive mt-0.5 flex-shrink-0" />
                                                            <span>{error}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CustomCard>
                                        )}

                                        {/* General Feedback */}
                                        <CustomCard $padding="sm" $hoverEffect={false}>
                                            <h4 className="font-semibold text-foreground mb-3">Feedback Geral</h4>
                                            <div className="space-y-2">
                                                {correctionResult.feedback.map((feedback, index) => (
                                                    <p key={index} className="text-sm text-muted-foreground">
                                                        • {feedback}
                                                    </p>
                                                ))}
                                            </div>
                                        </CustomCard>

                                        {/* Suggestions */}
                                        <CustomCard $padding="sm" $hoverEffect={false}>
                                            <h4 className="font-semibold text-foreground mb-3">Sugestões de Estudo</h4>
                                            <div className="space-y-2">
                                                {correctionResult.suggestions.map((suggestion, index) => (
                                                    <p key={index} className="text-sm text-muted-foreground">
                                                        • {suggestion}
                                                    </p>
                                                ))}
                                            </div>
                                        </CustomCard>

                                        <div className="flex justify-center pt-4">
                                            <Button
                                                variant="outline"
                                                onClick={correctActivity}
                                                disabled={isCorrecting}
                                            >
                                                Corrigir Novamente
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CustomCard>
                        )}

                        {/* Reset Button */}
                        {(selectedImage || extractedText || correctionResult) && (
                            <CorrectionCard
                                correctionResult={correctionResult}
                                isCorrecting={isCorrecting}
                                hasText={!!extractedText.trim()}
                                onCorrect={correctActivity}
                            />
                        )}
                    </VerticalStack>
                </Container>
            </Section>
        </PageContainer>
    );
};

export default EducationCorrectorPage;