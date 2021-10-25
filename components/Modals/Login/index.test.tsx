import { act, fireEvent, render, screen } from '@testing-library/react'
import LoginButton from 'components/Buttons/LoginButton'
import { SkyAuthProvider } from 'context/AuthContext'
import LoginModal from '.'
import { mockGetTransalations } from './mock'

jest.mock('utils/fetch-helper', () => ({
    useFetch: jest.fn(() => mockGetTransalations),
}))

describe('LoginModal', () => {
    render(
        <SkyAuthProvider>
            <LoginButton />
            <LoginModal />
        </SkyAuthProvider>
    )
    it('should render a login button that would open modal', async () => {
        const btn = screen.getByText('Login')
        expect(btn).toBeDefined()
        act(() => {
            fireEvent.click(btn)
        })
        const items = await screen.findAllByText('Forgot password?')
        expect(items).toHaveLength(1)
    })
})
