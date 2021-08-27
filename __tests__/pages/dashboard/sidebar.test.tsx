import { mount } from 'enzyme'
import Sidebar from '../../../pages/dashboard/Sidebar'

const mockedPush = jest.fn()
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
useRouter.mockImplementation(() => ({
    pathname: '/dashboard',
    push: mockedPush,
}))

describe('Sidebar', () => {
    const wrapper = mount(
        <Sidebar region="some-region" ClientId="some-client-id" />
    )

    it('includes a side drawer component', () => {
        expect(wrapper.render().hasClass('k-drawer-container')).toBe(true)
    })
    it('includes a button to expand sidebar', () => {
        const mEvent = { preventDefault: jest.fn() }
        wrapper.find('#BtnExpandSidebar').simulate('click', mEvent)
        expect(mEvent.preventDefault).toHaveBeenCalledTimes(1)
    })
    it('includes navigation button', () => {
        const mEvent = { preventDefault: jest.fn() }
        wrapper
            .find('.k-drawer-item[route="/dashboard"]')
            .simulate('click', mEvent)
        expect(mockedPush).toHaveBeenCalledWith('/dashboard')
    })
})
