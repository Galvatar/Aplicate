export function capitalize(word: string): string {
    const firstLetter = word.substring(0, 1).toUpperCase();
    const lastLetters = word.substring(1, word.length);
    return firstLetter.concat(lastLetters);
}