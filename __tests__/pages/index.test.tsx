/* eslint-disable react/display-name */
import { act, render, screen, waitFor } from '@testing-library/react'
import Home from '../../pages'

jest.mock('components/Modals/Login', () => () => (
    <div data-testid="LoginModal" />
))

jest.mock('components/Modals/Signup', () => () => (
    <div data-testid="SignupModal" />
))

jest.mock('components/Navbar', () => () => <div data-testid="Navbar" />)

jest.mock('../../pages/Landing/hero', () => () => (
    <div data-testid="LandingHero" />
))

jest.mock('../../pages/Landing/section-features', () => () => (
    <div data-testid="LandingFeaturesSection" />
))

jest.mock('../../pages/Landing/section-pricing', () => () => (
    <div data-testid="LandingPricingSection" />
))

jest.mock('../../pages/Landing/section-testimonials', () => () => (
    <div data-testid="LandingSectionTestimonials" />
))

jest.mock('../../pages/Landing/section-try-cta', () => () => (
    <div data-testid="LandingSectionTryCTA" />
))

jest.mock('components/Footer', () => () => <div data-testid="Footer" />)

describe('Home', () => {
    beforeEach(async () => {
        await act(async () => {
            render(<Home />)
        })
    })

    it('should have a navigation bar', async () => {
        const navbar = screen.getByTestId('Navbar')
        expect(navbar).toBeDefined()
    })

    describe('landing', () => {
        it('should have a landing hero', async () => {
            const hero = screen.getByTestId('LandingHero')
            expect(hero).toBeDefined()
        })

        it('should have a landing features section', async () => {
            const features = screen.getByTestId('LandingFeaturesSection')
            expect(features).toBeDefined()
        })

        it('should have a testimonials section', async () => {
            const testimonials = screen.getByTestId(
                'LandingSectionTestimonials'
            )
            expect(testimonials).toBeDefined()
        })

        it('should have a pricing section', async () => {
            const pricing = screen.getByTestId('LandingPricingSection')
            expect(pricing).toBeDefined()
        })

        it('should have a Try section', async () => {
            const tryAot = screen.getByTestId('LandingSectionTryCTA')
            expect(tryAot).toBeDefined()
        })
    })

    it('should have a footer', async () => {
        const footer = screen.getByTestId('Footer')
        expect(footer).toBeDefined()
    })

    it('should have a Login modal', async () => {
        const loginModal = screen.getByTestId('LoginModal')
        expect(loginModal).toBeDefined()
    })

    it('should have a Signup modal', async () => {
        const signupModal = screen.getByTestId('SignupModal')
        expect(signupModal).toBeDefined()
    })
})
