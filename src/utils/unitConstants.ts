// src/pages/UnitsManagement/constants.ts

/**
 * Lista de categorias de unidades de medida disponíveis no sistema
 */
export const UNIT_CATEGORIES = [
    "Comprimento",
    "Massa",
    "Tempo",
    "Temperatura",
    "Área",
    "Volume",
    "Velocidade",
    "Aceleração",
    "Força",
    "Energia",
    "Potência",
    "Pressão",
    "Ângulo"
];

/**
 * Mensagens de erro padrão utilizadas no sistema
 */
export const ERROR_MESSAGES = {
    REQUIRED_FIELDS: "Preencha todos os campos obrigatórios",
    UNIT_WITH_CONVERSIONS: "Esta unidade possui conversões relacionadas que precisam ser removidas primeiro",
    UNIT_IS_BASE: "Esta unidade base é utilizada por outras unidades. Altere-as primeiro",
    FACTOR_REQUIRED: "É necessário fornecer um fator de conversão para unidades não-base",
    DIFFERENT_TYPES: "Não é possível converter entre diferentes tipos de unidades",
    INVALID_FORMULA: "A fórmula de conversão é inválida",
    CONVERSION_EXISTS: "Já existe uma conversão entre essas unidades",
};

/**
 * Mensagens de sucesso padrão
 */
export const SUCCESS_MESSAGES = {
    UNIT_CREATED: "Unidade criada com sucesso",
    UNIT_UPDATED: "Unidade atualizada com sucesso",
    UNIT_DELETED: "Unidade excluída com sucesso",
    CONVERSION_CREATED: "Conversão criada com sucesso",
    CONVERSION_UPDATED: "Conversão atualizada com sucesso",
    CONVERSION_DELETED: "Conversão excluída com sucesso",
};

/**
 * Chaves para armazenamento local
 */
export const STORAGE_KEYS = {
    UNITS: 'unitsList',
    CONVERSIONS: 'conversionsList',
};