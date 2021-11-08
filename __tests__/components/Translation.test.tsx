import { render, screen } from '@testing-library/react'
import * as React from 'react'
import Translation from '../../components/Translation'

describe('Translation Component', () => {
    const hello = 'hello earth!'

    it('should render text value', async () => {
        render(<Translation content_key="hello" translations={{ hello }} />)
        const results = await screen.getByText(hello)
        expect(results.textContent).toEqual(hello)
    })

    it('should render white space only values', () => {
        const results = render(
            <Translation
                render_as="p"
                content_key="white_space"
                translations={{ white_space: ' ' }}
            />
        )
        expect(results.container).toEqual(
            render(<p className=""> </p>).container
        )
    })

    it('should render key if undefined', () => {
        const results = render(
            <Translation
                render_as="p"
                content_key="white_space"
                translations={{}}
            />
        )
        expect(results.container).toEqual(
            render(<p className="">white_space</p>).container
        )
    })

    it('should enclose text with span on render_as "span"', async () => {
        render(
            <Translation
                content_key="hello"
                translations={{ hello }}
                render_as="span"
            />
        )
        const results = await screen.getByText(hello)
        expect(results.tagName).toEqual('SPAN')
    })

    it('should enclose text with p on render_as "p"', async () => {
        render(
            <Translation
                content_key="hello"
                translations={{ hello }}
                render_as="p"
            />
        )
        const results = await screen.getByText(hello)
        expect(results.tagName).toEqual('P')
    })

    it('should enclose text with div on render_as "div"', async () => {
        render(
            <Translation
                content_key="hello"
                translations={{ hello }}
                render_as="div"
            />
        )
        const results = await screen.getByText(hello)
        expect(results.tagName).toEqual('DIV')
    })

    it('should enclose text with label on render_as "label"', async () => {
        render(
            <Translation
                content_key="hello"
                translations={{ hello }}
                render_as="label"
            />
        )
        const results = await screen.getByText(hello)
        expect(results.tagName).toEqual('LABEL')
    })
})
