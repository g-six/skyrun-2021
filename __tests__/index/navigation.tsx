import { mount } from 'enzyme'
import * as React from 'react'
import Home, { HomePageProps } from '../../pages/index'

describe('Navbar', () => {
    const props: HomePageProps = {
        region: process.env.COGNITO_REGION as string,
        ClientId: '',
    }
    const wrapper = mount(<Home {...props} />)

    it('includes a link to /login', () => {
        const buttons = wrapper.findWhere(
            (e) => e.type() == 'a' && e.render().attr('href') === '/login'
        )
        expect(buttons).toHaveLength(1)
    })
})
