import { sortBy } from './array-helper';

describe('array-helper', () => {
    it('should sort by key', () => {
        const items = [{ name: 'Zulu' }, { name: 'Golf' }]
        const expected = [{ name: 'Golf' }, { name: 'Zulu' }]
        const actual = items.sort(sortBy('name'))
        expect(actual).toEqual(expected)
    })
})