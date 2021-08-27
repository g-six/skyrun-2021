import { mount } from 'enzyme'
import * as React from 'react'
import DialogBox from '../../components/DialogBox'

describe('DialogBox Component', () => {
    const mockCloseFn = jest.fn()
    it('includes a close button', () => {
        const wrapper = mount(
            <DialogBox onClose={mockCloseFn}>test</DialogBox>
        )
        expect(wrapper.findWhere((e) => e.type() == 'button')).toHaveLength(
            1
        )
    })
    it('closes the dialog when the close button is clicked', () => {
        const wrapper = mount(
            <DialogBox onClose={mockCloseFn}>test</DialogBox>
        )
        const close_button = wrapper
            .findWhere((e) => e.type() == 'button')
            .at(0)
        close_button.simulate('click')
        expect(mockCloseFn).toHaveBeenCalledTimes(1)
    })
})
