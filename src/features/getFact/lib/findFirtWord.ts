export const findFirtsWord = (fact: string) => {
    const matches = fact.match(/^\s*\w+(-\w+)?\b(?:,)?/);
    if(matches) {
        return matches[0].length;
    }
    return 0;
}