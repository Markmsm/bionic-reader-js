const processText = (options) => {
    const textToProcess = options.textToProcess
    const percentageOfWordToBold = options.percentageOfWordToBold || 0
    const wordsToSkip = options.wordsToSkip || 0
    const fileType = options.fileType

    if (percentageOfWordToBold < 0) {
        throw new Error(`percentageOfWordToBold can't be minor than 0`)
    }

    if (wordsToSkip < 0) {
        throw new Error(`wordsToSkip can't be minor than 0`)
    }

    const boldWord = (word, prefix = '', suffix = '') => {
        const regexForPunctuationAtEnd = /[^\w]$/
    
        if (word.startsWith('...')) {
            prefix += '...'
            return boldWord(word.slice(3), prefix)
        }
        if (word.startsWith('(') || word.startsWith('[') || word.startsWith('{')) {
            prefix += word.slice(0, 1)
            return boldWord(word.slice(1), prefix)
        }
        if (word.endsWith('...')) {
            suffix = `...${suffix}`
            return boldWord(word.slice(0, word.length - 3), prefix, suffix)
        }
        if (word.endsWith(')') || word.endsWith(']') || word.endsWith('}')) {
            suffix = `${word.slice(word.length - 1)}${suffix}`
            return boldWord(word.slice(0, word.length - 1), prefix, suffix)
        }
        if (regexForPunctuationAtEnd.test(word)) {
            suffix = `${word.slice(word.length - 1)}${suffix}`
            word = word.slice(0, word.length - 1)
        }
    
        const boldLength = Math.round((word.length * percentageOfWordToBold) / 100)
        const partOfWordToBold = word.slice(0, boldLength)
        const partOfWordToNotBold = word.slice(boldLength)
    
        switch (fileType) {
            case 'txt':
                return `${prefix}<b>${partOfWordToBold}</b>${partOfWordToNotBold}${suffix}`
            default:
                return `${prefix}\x1b[1m${partOfWordToBold}\x1b[0m${partOfWordToNotBold}${suffix}`
        }
    }

    const splittedText = textToProcess.split(' ')
    
    for (let i = 0; i < splittedText.length; i += (wordsToSkip + 1)) {
        const word = splittedText[i]
    
        if (word.includes('\n')) {
            splittedText[i] = word
                .split('\n')
                .map(w => (w === '' || w === '...') ? w : boldWord(w))
                .join('\n')
        } else {
            splittedText[i] = (word === '' || word === '...') ? word : boldWord(word)
        }
    }
    
    const boldedText = splittedText.join(' ')

    return boldedText
}

export default processText