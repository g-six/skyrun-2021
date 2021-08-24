import { classNames } from 'utils/dom-helpers'

describe('classNames dom helper', () => {
    it('should be able to append strings of css classes', () => {
        const expected = 'this is a test'
        const actual = classNames('this', 'is a', 'test')
        expect(actual).toEqual(expected)
    })
})
