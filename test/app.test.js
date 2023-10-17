import { expect } from 'chai'
import { turnHalfInitWordBold, formatTextWordsToHalfBold, shouldSaveInFile } from '../app.js'

describe('turnHalfInitWordBold', () => {
    it('Should turn into bold 50% of word when number of letters is pair', () => {
        const result = turnHalfInitWordBold('PairWordTesteeeeeera')

        expect(result).to.be.eql('<b>PairWordTe</b>steeeeeera')
    })
    it('Should turn into bold 50% plus one letter of word when number of letters is odd', () => {
        const result = turnHalfInitWordBold('OddWordTesteeeeeera')

        expect(result).to.be.eql('<b>OddWordTes</b>teeeeeera')
    })
})

describe('formatTextWordsToHalfBold', () => {
    it('Should turn into bold every half word of text (when pair, 50% and when odd, 50% plus one letter)', () => {
        const result = formatTextWordsToHalfBold('This text is just for test and verify if every half bold word is correct')

        expect(result).to.be.eql('<b>Th</b>is <b>te</b>xt <b>i</b>s <b>ju</b>st <b>fo</b>r <b>te</b>st <b>an</b>d <b>ver</b>ify <b>i</b>f <b>eve</b>ry <b>ha</b>lf <b>bo</b>ld <b>wo</b>rd <b>i</b>s <b>corr</b>ect')
    })
})