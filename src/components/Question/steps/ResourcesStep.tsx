import React, { useEffect, useRef, useState } from "react";
import { StepProps } from "../../../types/evaluation/Question";
import { ImagePreview, ImagePreviewContainer, ImageUploadContainer, RemoveImageButton, SectionTitle, StepContent, ValidationError } from "../../modals/QuestionModal/styles";
import { FaExclamationTriangle, FaImage, FaLink, FaTrashAlt, FaUpload } from "react-icons/fa";
import { FormCard } from "../../../styles/containers";

// Componente para o passo 4: Recursos
const ResourcesStep: React.FC<StepProps> = ({
    formData,
    updateFormData,
    validationErrors,
    setValidationErrors
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string>(formData.imageUrl || '');

    useEffect(() => {
        // Atualizar preview se a imageUrl mudar
        setImagePreview(formData.imageUrl || '');
    }, [formData.imageUrl]);

    const handleImageUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            const file = files[0];

            // Verificar tipo da imagem
            if (!file.type.match('image.*')) {
                setValidationErrors(prev => ({
                    ...prev,
                    image: 'O arquivo selecionado não é uma imagem válida'
                }));
                return;
            }

            // Limite de tamanho (5MB)
            if (file.size > 5 * 1024 * 1024) {
                setValidationErrors(prev => ({
                    ...prev,
                    image: 'A imagem deve ter no máximo 5MB'
                }));
                return;
            }

            // Criar preview da imagem
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target && typeof e.target.result === 'string') {
                    setImagePreview(e.target.result);

                    // Atualizar formData com a URL da imagem
                    updateFormData({
                        imageUrl: e.target.result
                    });
                }
            };
            reader.readAsDataURL(file);

            // Remover erro de validação
            if (validationErrors.image) {
                setValidationErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.image;
                    return newErrors;
                });
            }
        }
    };

    const handleRemoveImage = () => {
        setImagePreview('');

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        updateFormData({
            imageUrl: ''
        });
    };

    return (
        <StepContent>
            <FormCard>
                <SectionTitle>
                    <FaImage style={{ marginRight: '8px' }} />
                    Imagem da Questão
                </SectionTitle>

                < input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                />

                {!imagePreview ? (
                        <ImageUploadContainer onClick={handleImageUploadClick} >
                            <FaUpload size={24} />
                            < p > Clique para adicionar uma imagem </p>
                            < small > Formatos aceitos: JPG, PNG, GIF(máx. 5MB) </small>
                        </ImageUploadContainer>
                    ) : (
                        <ImagePreviewContainer>
                            <ImagePreview src={imagePreview} alt="Preview da imagem" />
                            <RemoveImageButton onClick={handleRemoveImage}>
                                <FaTrashAlt /> Remover imagem
                            </RemoveImageButton>
                        </ImagePreviewContainer>
                    )}

                {validationErrors.image && (
                        <ValidationError>
                            <FaExclamationTriangle /> {validationErrors.image}
                        </ValidationError>
                    )}
            </FormCard>

            {/* Aqui poderiam ser adicionados outros recursos como links, vídeos, etc. */}
            <FormCard>
                <SectionTitle>
                    <FaLink style={{ marginRight: '8px' }} />
                    Recursos Adicionais
                </SectionTitle>

                <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', padding: 'var(--space-md) 0' }}>
                    Recursos adicionais como links ou vídeos serão implementados em uma versão futura.
                </p>
            </FormCard>
        </StepContent>
    );
};

export default ResourcesStep;