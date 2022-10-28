export const inputLength = (input, length = 255) => {
    const value = input ? input.toString() : ''
    return value.length < length
}