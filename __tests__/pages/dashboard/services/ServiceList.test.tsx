import { getServiceBg } from 'pages/dashboard/services/ServiceList'

describe('Dashboard Panel: Services', () => {
    describe('Helpers', () => {
        it('should provide blue bg for group type service', () => {
            const actual = getServiceBg('GROUP')
            const expected = 'bg-blue-100 text-grey-600'
            expect(actual).toEqual(expected)
        })

        it('should provide green bg for appointment type service', () => {
            const actual = getServiceBg('APPOINTMENT')
            const expected = 'bg-green-100 text-green-900'
            expect(actual).toEqual(expected)
        })

        it('should provide red bg for series type service', () => {
            const actual = getServiceBg('SERIES')
            const expected = 'bg-red-100 text-grey-600'
            expect(actual).toEqual(expected)
        })
    })
})
