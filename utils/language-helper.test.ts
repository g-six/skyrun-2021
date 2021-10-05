import { getTranslation } from './language-helper'

describe('getTranslation', () => {
    const mock = {
        field_en_us: [
            {
              "key": "login_button",
              "value": "Login",
            }
        ],
        field_zh_cn: [
            {
              "key": "login_button",
              "value": "登录",
            }
        ]
    }
    it('should provide translation for specified key', () => {
        const expected = 'Login'
        const actual = getTranslation('login_button', mock.field_en_us)
        expect(actual).toEqual(expected)
    })
})
