import LoginButton from 'components/Buttons/LoginButton'
import { SkyAuthProvider } from 'context/AuthContext'
import { render, screen, fireEvent, act } from '@testing-library/react'
import LoginModal from '.'

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
        const items = await screen.findAllByText('Forgot Password?')
        expect(items).toHaveLength(1)
    })
})
