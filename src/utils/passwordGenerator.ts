/**
 * Gera uma senha aleatória com base nos critérios especificados
 * 
 * @param length Comprimento da senha
 * @param includeUppercase Incluir letras maiúsculas
 * @param includeNumbers Incluir números
 * @param includeSymbols Incluir símbolos especiais
 * @returns Uma senha aleatória
 */
export function generatePassword(
    length: number = 8,
    includeUppercase: boolean = true,
    includeNumbers: boolean = true,
    includeSymbols: boolean = true
): string {
    // Conjuntos de caracteres
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '@#$%&*()_+[]{}|;:,.<>?';

    // Inicializa com letras minúsculas (sempre incluídas)
    let allChars = lowercaseChars;

    // Adiciona outros conjuntos de caracteres conforme solicitado
    if (includeUppercase) allChars += uppercaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSymbols) allChars += symbolChars;

    // Gera a senha
    let password = '';

    // Garante pelo menos um caractere de cada tipo solicitado
    if (includeUppercase) password += getRandomChar(uppercaseChars);
    if (includeNumbers) password += getRandomChar(numberChars);
    if (includeSymbols) password += getRandomChar(symbolChars);

    // Adiciona caracteres aleatórios para completar o comprimento
    const remainingLength = length - password.length;
    for (let i = 0; i < remainingLength; i++) {
        password += getRandomChar(allChars);
    }

    // Embaralha a senha para evitar que os caracteres obrigatórios fiquem sempre nas mesmas posições
    return shuffleString(password);
}

/**
 * Retorna um caractere aleatório de uma string
 */
function getRandomChar(chars: string): string {
    const randomIndex = Math.floor(Math.random() * chars.length);
    return chars[randomIndex];
}

/**
 * Embaralha os caracteres de uma string
 */
function shuffleString(str: string): string {
    const array = str.split('');

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
    }

    return array.join('');
}