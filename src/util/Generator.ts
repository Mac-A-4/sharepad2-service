
function generateNumericId(length: number): string {
    let alphabet = '0123456789'
    let result = ''
    for (let i = 0; i < length; ++i) {
        result += alphabet[Math.floor(Math.random() * alphabet.length)]
    }
    return result
}

export function generateSessionId(): string {
    return generateNumericId(6)
}

export function generateUserId(): string {
    return generateNumericId(6)
}

export function generateDocumentId(): string {
    return generateNumericId(6)
}

export function generateUserToken(): string {
    return generateNumericId(6)
}
