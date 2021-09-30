import { MouseEvent, useState } from 'react'
import { Switch, SwitchChangeEvent } from '@progress/kendo-react-inputs'
import { Button, ButtonGroup } from '@progress/kendo-react-buttons'

type SectionProps = {
    [key: string]: string
}

export default function LandingPricingSection(props: SectionProps) {
    const [checked, setChecked] = useState<boolean>(true)
    const [currency, setCurrency] = useState<string>('SGD')

    const handleToggleSwitch = () => {
        setChecked(!checked)
    }

    const handleCurrencySelection = (chosen_currency: string) => {
        setCurrency(chosen_currency)
    }

    return (
        <section className="py-20 pricing-plans bg-primary-lighter">
            <h3 className="text-center text-primary-dark drop-shadow text-5xl circular font-thin mb-8 mt-36">
                Pricing Plans
            </h3>
            <p className="text-gray-400 text-center leading-relaxed">
                Amet minim mollit non deserunt ullamco est sit aliqua
                dolor do amet sint.
                <br />
                Velit officia consequat duis enim velit mollit.
                Exercitation veniam <br />
                consequat sunt nostrud amet.
            </p>
            <div className="flex justify-center items-center w-auto my-5">
                <span className="text-gray-400 mr-4">Monthly</span>

                <Switch
                    onLabel={''}
                    offLabel={''}
                    onChange={handleToggleSwitch}
                    checked={checked}
                />

                <span className="text-gray-400 ml-3 mr-2">Yearly</span>
                <span className="text-white text-xs bg-primary-light rounded px-2 py-1">
                    Save 20%
                </span>
            </div>
            <div className="flex justify-center items-center w-auto my-5">
                <ButtonGroup className="bg-primary-light">
                    <Button togglable={true} selected={currency === 'USD'} onClick={() => handleCurrencySelection('USD')}>USD</Button>
                    <Button togglable={true} selected={currency === 'SGD'} onClick={() => handleCurrencySelection('SGD')}>SGD</Button>
                    <Button togglable={true} selected={currency === 'PHP'} onClick={() => handleCurrencySelection('PHP')}>PHP</Button>
                    <Button togglable={true} selected={currency === 'MYR'} onClick={() => handleCurrencySelection('MYR')}>MYR</Button>
                </ButtonGroup>
            </div>
        </section>
    )
}