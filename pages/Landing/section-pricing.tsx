import { useState } from 'react'
import { Switch } from '@progress/kendo-react-inputs'
import { Button, ButtonGroup } from '@progress/kendo-react-buttons'
import { createModal } from 'components/Modals/ModalFactory'
import { AuthContext } from 'context/AuthContext'
import { useAppContext } from 'context/AppContext'

type SectionProps = {
    [key: string]: string
}

export default function LandingPricingSection(props: SectionProps) {
    const { tiers } = useAppContext()
    const [checked, setChecked] = useState<boolean>(true)
    const [currency, setCurrency] = useState<string>('SGD')

    const FreePlanModalProvider = createModal(
        AuthContext,
        'SignupModal',
        () => <span data-plan="free">Choose plan</span>,
        () => <span data-plan="free">Cancel</span>,
        { tier: tiers[0] }
    )

    const SinglePlanModalProvider = createModal(
        AuthContext,
        'SignupModal',
        () => <span>Try it for free</span>,
        undefined,
        { tier: tiers[1] }
    )

    const MultiLocModalProvider = createModal(
        AuthContext,
        'SignupModal',
        () => <span>Try it for free</span>,
        undefined,
        { tier: tiers[2] }
    )

    const handleToggleSwitch = () => {
        setChecked(!checked)
    }

    const handleCurrencySelection = (chosen_currency: string) => {
        setCurrency(chosen_currency)
    }

    return (
        <section className="pt-20 pb-40 pricing-plans bg-primary bg-opacity-10">
            <div className="container m-auto">
                <h3 className="text-center text-primary-dark drop-shadow text-5xl circular font-thin mb-8">
                    {props.pricing_plans_title}
                </h3>
                <p className="text-center leading-relaxed">
                    Amet minim mollit non deserunt ullamco est sit aliqua
                    dolor do amet sint.
                    <br />
                    Velit officia consequat duis enim velit mollit.
                    Exercitation veniam <br />
                    consequat sunt nostrud amet.
                </p>
                <div className="flex justify-center items-center w-auto mt-8">
                    <span className="mr-4">Monthly</span>

                    <Switch
                        onLabel={''}
                        offLabel={''}
                        onChange={handleToggleSwitch}
                        checked={checked}
                    />

                    <span className="ml-3 mr-2">Yearly</span>
                    <span className="text-white text-xs bg-primary-light rounded px-2 py-1">
                        Save 20%
                    </span>
                </div>
                <div className="flex justify-center items-center w-auto mt-8">
                    <div className="pr-6 circular">Pricing in</div>
                    <ButtonGroup className="bg-primary-light circular-light">
                        <Button
                            togglable={true}
                            selected={currency === 'USD'}
                            onClick={() => handleCurrencySelection('USD')}
                        >
                            USD
                        </Button>
                        <Button
                            togglable={true}
                            selected={currency === 'SGD'}
                            onClick={() => handleCurrencySelection('SGD')}
                        >
                            SGD
                        </Button>
                        <Button
                            togglable={true}
                            selected={currency === 'PHP'}
                            onClick={() => handleCurrencySelection('PHP')}
                        >
                            PHP
                        </Button>
                        <Button
                            togglable={true}
                            selected={currency === 'MYR'}
                            onClick={() => handleCurrencySelection('MYR')}
                        >
                            MYR
                        </Button>
                    </ButtonGroup>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 xl:gap-8 xl:max-w-7xl mx-auto mt-12">
                    <div className="bg-white rounded-2xl shadow-2xl w-full py-10 px-8">
                        <figure className="w-60 text-center m-auto mt-2 text-primary-light">
                            <span className="rounded-lg p-0.5 pt-1 w-8 inline-block border-2 border-primary-light">
                                <i className="feather feather-user" />
                            </span>
                            <span className="ml-2 circular text-lg">
                                Free
                            </span>
                        </figure>
                        <div className="text-6xl block text-center text-primary circular-light mt-5">
                            $0
                        </div>
                        <div className="text-sm block text-center text-gray-400 circular-light">
                            forever
                        </div>
                        <div className="block text-center mt-8">
                            For individuals, small businesses, and
                            entrepreneurs
                        </div>
                        <div className="divide-y divide-primary-lighter">
                            <div className="h-8"></div>
                            <div className="h-8"></div>
                        </div>
                        <div className="flex items-center mt-5">
                            <i className="feather feather-check px-6 text-primary-light w-auto text-2xl leading-none" />
                            <span>Up to 100 appointments / mo</span>
                        </div>
                        <div className="flex items-center mt-5">
                            <i className="feather feather-check px-6 text-primary-light w-auto text-2xl leading-none" />
                            <span>1 location</span>
                        </div>
                        <div className="flex items-center mt-5">
                            <i className="feather feather-check px-6 text-primary-light w-auto text-2xl leading-none" />
                            <span>Up to 2 staff</span>
                        </div>
                        <div className="flex items-center mt-5 opacity-25">
                            <i className="feather feather-check px-6 text-primary-light w-auto text-2xl leading-none" />
                            <span>Open API</span>
                        </div>
                        <div className="flex items-center mt-5 opacity-25">
                            <i className="feather feather-check px-6 text-primary-light w-auto text-2xl leading-none" />
                            <span>
                                Branded app{' '}
                                <small className="bg-primary-light text-xs text-white p-1 rounded">
                                    Coming soon
                                </small>
                            </span>
                        </div>

                        <div className="rounded-2xl bg-primary-lighter bg-opacity-20 w-full mt-6 p-6">
                            <span className="text-primary circular text-xl">
                                Free forever
                            </span>
                            <ul className="list-disc ml-6 leading-loose text-sm mt-2 h-28">
                                <li>No credit card required</li>
                                <li>No commitment</li>
                                <li>
                                    Includes free trial of our
                                    Multi-location plan for 21 days
                                </li>
                            </ul>
                        </div>

                        <FreePlanModalProvider.Opener
                            className="mt-8 shadow w-full flex items-center justify-center 
                            px-6 py-4 text-base text-white font-bold
                            bg-primary-light rounded-full
                            transition duration-300 ease-in-out
                            hover:bg-opacity-80
                            md:text-xl md:px-10"
                        />
                    </div>

                    <div className="bg-white rounded-2xl shadow-2xl w-full py-10 px-8">
                        <figure className="w-60 text-center m-auto mt-2 text-primary flex items-center justify-center">
                            <i className="text-2xl feather feather-users flex items-center justify-center" />
                            <span className="ml-2 circular text-lg flex items-center justify-center">
                                Single Studio
                            </span>
                        </figure>
                        <div className="text-6xl block text-center text-primary-dark circular-light mt-5">
                            $49
                        </div>
                        <div className="block text-center text-gray-400 circular-light">
                            / month
                        </div>
                        <div className="block text-center mt-8">
                            For small businesses with one or two locations
                        </div>
                        <div className="divide-y divide-primary-lighter">
                            <div className="h-8"></div>
                            <div className="h-8"></div>
                        </div>
                        <div className="flex items-center mt-5">
                            <i className="feather feather-check px-6 text-primary w-auto text-2xl leading-none" />
                            <span>Up to 1,000 appointments / mo</span>
                        </div>
                        <div className="flex items-center mt-5">
                            <i className="feather feather-check px-6 text-primary w-auto text-2xl leading-none" />
                            <span>1 location</span>
                        </div>
                        <div className="flex items-center mt-5">
                            <i className="feather feather-check px-6 text-primary w-auto text-2xl leading-none" />
                            <span>5 staff included</span>
                        </div>
                        <div className="flex items-center mt-5 opacity-25">
                            <i className="feather feather-check px-6 text-primary w-auto text-2xl leading-none" />
                            <span>Open API</span>
                        </div>
                        <div className="flex items-center mt-5 opacity-25">
                            <i className="feather feather-check px-6 text-primary w-auto text-2xl leading-none" />
                            <span>
                                Branded app{' '}
                                <small className="bg-primary text-xs text-white p-1 rounded">
                                    Coming soon
                                </small>
                            </span>
                        </div>

                        <div className="rounded-2xl bg-primary-light bg-opacity-10 w-full mt-6 p-6">
                            <span className="text-primary circular text-xl">
                                Bring your business online
                            </span>
                            <ul className="list-disc ml-6 leading-loose text-sm mt-2 h-28">
                                <li>$20 per additional location</li>
                                <li>$5 per additional staff</li>
                                <li>
                                    $5 per additional 1,000 appointments
                                </li>
                            </ul>
                        </div>

                        <SinglePlanModalProvider.Opener
                            className="mt-8 shadow w-full flex items-center justify-center 
                            px-6 py-4 text-base text-white font-bold
                            bg-primary-dark rounded-full
                            transition duration-300 ease-in-out
                            hover:bg-opacity-80 
                            md:text-xl md:px-10"
                        />
                    </div>

                    <div className="bg-white rounded-2xl shadow-2xl w-full py-10 px-8">
                        <figure className="w-60 text-center m-auto mt-2 text-secondary flex items-center justify-center">
                            <i className="text-2xl feather feather-map-pin flex items-center justify-center" />
                            <span className="ml-2 circular text-lg flex items-center justify-center">
                                Multi-location Business
                            </span>
                        </figure>
                        <div className="text-6xl block text-center text-primary circular-light mt-5">
                            $89
                        </div>
                        <div className="block text-center text-gray-400 circular-light">
                            / month
                        </div>
                        <div className="block text-center mt-8">
                            For growing businesses with multiple locations
                        </div>
                        <div className="divide-y divide-primary-lighter">
                            <div className="h-8"></div>
                            <div className="h-8"></div>
                        </div>
                        <div className="flex items-center mt-5">
                            <i className="feather feather-check px-6 text-secondary w-auto text-2xl leading-none" />
                            <span>Unlimited appointments</span>
                        </div>
                        <div className="flex items-center mt-5">
                            <i className="feather feather-check px-6 text-secondary w-auto text-2xl leading-none" />
                            <span>3 locations included</span>
                        </div>
                        <div className="flex items-center mt-5">
                            <i className="feather feather-check px-6 text-secondary w-auto text-2xl leading-none" />
                            <span>10 staff included</span>
                        </div>
                        <div className="flex items-center mt-5">
                            <i className="feather feather-check px-6 text-secondary w-auto text-2xl leading-none" />
                            <span>Open API</span>
                        </div>
                        <div className="flex items-center mt-5">
                            <i className="feather feather-check px-6 text-secondary w-auto text-2xl leading-none" />
                            <span>
                                Branded app{' '}
                                <small className="bg-secondary text-xs text-white p-1 rounded">
                                    Coming soon
                                </small>
                            </span>
                        </div>

                        <div className="rounded-2xl bg-secondary bg-opacity-10 w-full mt-6 p-6">
                            <span className="text-primary circular text-xl">
                                Everything you will need
                            </span>
                            <ul className="list-disc ml-6 leading-loose text-sm mt-2 h-28">
                                <li>$20 per additional location</li>
                                <li>$5 per additional staff</li>
                                <li>Unlimited appointments</li>
                            </ul>
                        </div>

                        <MultiLocModalProvider.Opener
                            className="mt-8 shadow w-full flex items-center justify-center 
                            px-6 py-4 text-base text-white font-bold
                            bg-secondary rounded-full
                            transition duration-300 ease-in-out
                            hover:bg-opacity-80 
                            md:text-xl md:px-10"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
