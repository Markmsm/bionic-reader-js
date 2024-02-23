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
        const expecetResult = '\x1b[1mtex\x1b[0mto \x1b[1mqual\x1b[0mquer \x1b[1mpa\x1b[0mra \x1b[1mtes\x1b[0mte'

        // When:
        const result = processText(processOptions)

        // Then:
        assert.deepStrictEqual(result, expecetResult)
    })

    it('', () => {
        // Given:

        // When:

        // Then:
        
    })

    
})