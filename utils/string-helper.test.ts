import { toTitleCase } from './string-helper'

describe('string-helper', () => {
    describe('toTitleCase', () => {
        it('should convert first character of each word to upper case', () => {
            const expected = 'This Is Title Cased'
            const actual = toTitleCase('this is title cased')
            expect(actual).toEqual(expected)
        })
    })
})