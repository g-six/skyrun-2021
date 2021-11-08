import { getTranslation } from './language-helper'

describe('getTranslation', () => {
    const translations = {
        'company_name': "always on time",
        'company_name_1': "always ",
        'company_name_2': "on ",
        'company_name_3': "time"
    }

    it('should provide translation for specified key', () => {
        const expected = 'Login'
        const actual = getTranslation('login_button', translations)
        expect(actual).toEqual(expected)
    })
})
