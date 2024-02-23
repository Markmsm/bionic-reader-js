import processText from '../core.js'
import { describe, it } from 'node:test'
import assert from 'assert'

describe('processText', () => {
    it('should throw error when percentage of word to bold is minor than 0', () => {
        // Given:
        const processOptions = {
            percentageOfWordToBold: -1
        }

        // Then:
        assert.throws(() => processText(processOptions),
            { message: `percentageOfWordToBold can't be minor than 0` }
        )
    })

    it('should throw error when words to skip is minor than 0', () => {
        // Given:
        const processOptions = {
            wordsToSkip: -1
        }

        // Then:
        assert.throws(() => processText(processOptions),
            { message: `wordsToSkip can't be minor than 0` })
    })

    it('should return bolded text properly', () => {
        // Given:
        const processOptions = {
            textToProcess: 'texto qualquer para teste'
        }
        const expectedResult = '\x1b[1mtex\x1b[0mto \x1b[1mqual\x1b[0mquer \x1b[1mpa\x1b[0mra \x1b[1mtes\x1b[0mte'

        // When:
        const result = processText(processOptions)

        // Then:
        assert.deepStrictEqual(result, expectedResult)
    })

    it('should return text with each half word bolded', () => {
        // Given:
        const processOptions = {
            textToProcess: 'boldWord'
        }
        const expectedResult = '\x1b[1mbold\x1b[0mWord'

        // When:
        const result = processText(processOptions)

        // Then:
        assert.deepStrictEqual(result, expectedResult)
    })

    it('should return bolded text regarding e-mail as word', () => {
        // Given:
        const processOptions = {
            textToProcess: 'email.teste@emailteste.com'
        }
        const expectedResult = '\x1b[1memail.teste@e\x1b[0mmailteste.com'

        // When:
        const result = processText(processOptions)

        // Then:
        assert.deepStrictEqual(result, expectedResult)
    })

    it('should return bolde text with penultimate punctuation when has two final ponctuaction', () => {
        // Given:
        const processOptions = {
            textToProcess: 'boldWord.:'
        }
        const expectedResult = '\x1b[1mboldW\x1b[0mord.:'

        // When:
        const result = processText(processOptions)

        // Then:
        assert.deepStrictEqual(result, expectedResult)
    })

    it('should return bolded text disregarding ellipses at init of phrase', () => {
        // Given:
        const processOptions = {
            textToProcess: '...boldWord teste'
        }
        const expectedResult = '...\x1b[1mbold\x1b[0mWord \x1b[1mtes\x1b[0mte'

        // When:
        const result = processText(processOptions)

        // Then:
        assert.deepStrictEqual(result, expectedResult)
    })

    it('should return bolded text disregarding ellipses at end of phrase', () => {
        // Given:
        const processOptions = {
            textToProcess: 'boldWord teste...'
        }
        const expectedResult = '\x1b[1mbold\x1b[0mWord \x1b[1mtes\x1b[0mte...'

        // When:
        const result = processText(processOptions)

        // Then:
        assert.deepStrictEqual(result, expectedResult)
    })

    it('should return bolded text disregarding ellipses at init and end of word', () => {
        // Given:
        const processOptions = {
            textToProcess: '...dos...'
        }
        const expectedResult = '...\x1b[1mdo\x1b[0ms...'

        // When:
        const result = processText(processOptions)

        // Then:
        assert.deepStrictEqual(result, expectedResult)
    })

    it('should return bolded text disregarding ellipses with wrappers', () => {
        // Given:
        const processOptions = {
            textToProcess: '...(...reticências dentro e fora dos parênteses...)...'
        }
        const expectedResult = '...(...\x1b[1mreticê\x1b[0mncias \x1b[1mden\x1b[0mtro \x1b[1me\x1b[0m \x1b[1mfo\x1b[0mra \x1b[1mdo\x1b[0ms \x1b[1mparên\x1b[0mteses...)...'

        // When:
        const result = processText(processOptions)

        // Then:
        assert.deepStrictEqual(result, expectedResult)
    })

    it('should return bolded text disregarding wrappers', () => {
        // Given:
        const processOptions = {
            textToProcess: '(1) [12] {123} (1234) [1234567890]'
        }
        const expectedResult = '(\x1b[1m1\x1b[0m) [\x1b[1m1\x1b[0m2] {\x1b[1m12\x1b[0m3} (\x1b[1m12\x1b[0m34) [\x1b[1m12345\x1b[0m67890]'

        // When:
        const result = processText(processOptions)

        // Then:
        assert.deepStrictEqual(result, expectedResult)
    })

    it('should return bolded text for txt file', () => {
        // Given:
        const processOptions = {
            textToProcess: '(1) [12] {123} (1234) [1234567890]',
            fileType: 'txt'
        }
        const expectedResult = '(<b>1</b>) [<b>1</b>2] {<b>12</b>3} (<b>12</b>34) [<b>12345</b>67890]'

        // When:
        const result = processText(processOptions)

        // Then:
        assert.deepStrictEqual(result, expectedResult)
    })

    it('should return text with one hundred percentage of each word bolded', () => {
        // Given:
        const processOptions = {
            textToProcess: 'texto qualquer para teste',
            percentageOfWordToBold: 100
        }
        const expectedResult = '\x1b[1mtexto\x1b[0m \x1b[1mqualquer\x1b[0m \x1b[1mpara\x1b[0m \x1b[1mteste\x1b[0m'

        // When:
        const result = processText(processOptions)

        // Then:
        assert.deepStrictEqual(result, expectedResult)
    })

    it('should return text with eighty percentage of each word bolded', () => {
        // Given:
        const processOptions = {
            textToProcess: 'texto qualquer para teste',
            percentageOfWordToBold: 80
        }
        const expectedResult = '\x1b[1mtext\x1b[0mo \x1b[1mqualqu\x1b[0mer \x1b[1mpar\x1b[0ma \x1b[1mtest\x1b[0me'

        // When:
        const result = processText(processOptions)

        // Then:
        assert.deepStrictEqual(result, expectedResult)
    })

    it('should return bolded text skipping two words', () => {
        // Given:
        const processOptions = {
            textToProcess: 'texto qualquer para teste que deve formatar uma palavra a cada 2 palavras',
            percentageOfWordToBold: 100,
            wordsToSkip: 2
        }
        const expectedResult = '\x1b[1mtexto\x1b[0m qualquer para \x1b[1mteste\x1b[0m que deve \x1b[1mformatar\x1b[0m uma palavra \x1b[1ma\x1b[0m cada 2 \x1b[1mpalavras\x1b[0m'

        // When:
        const result = processText(processOptions)

        // Then:
        assert.deepStrictEqual(result, expectedResult)
    })

    it('should return bolded text skipping four words', () => {
        // Given:
        const processOptions = {
            textToProcess: 'texto qualquer para teste que deve formatar uma palavra a cada 4 palavras',
            percentageOfWordToBold: 100,
            wordsToSkip: 4
        }
        const expectedResult = '\x1b[1mtexto\x1b[0m qualquer para teste que \x1b[1mdeve\x1b[0m formatar uma palavra a \x1b[1mcada\x1b[0m 4 palavras'

        // When:
        const result = processText(processOptions)

        // Then:
        assert.deepStrictEqual(result, expectedResult)
    })
})