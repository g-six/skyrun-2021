import { Button, ButtonGroup } from '@progress/kendo-react-buttons'
import { Switch } from '@progress/kendo-react-inputs'
import { createModal } from 'components/Modals/ModalFactory'
import { useAppContext } from 'context/AppContext'
import { AuthContext } from 'context/AuthContext'
import { useState } from 'react'
import { SectionProps } from '../../types/landing'

enum CurrencyIso {
    SGD = 'SGD',
    USD = 'USD',
    MYR = 'MYR',
    PHP = 'PHP',
}
type Currency = {
    iso: CurrencyIso
    rate: number
    symbol: string
}
const currencies: Currency[] = [
    {
        iso: CurrencyIso.SGD,
        rate: 1.0,
        symbol: '$',
    },
    {
        iso: CurrencyIso.USD,
        rate: 0.75,
        symbol: '$',
    },
    {
        iso: CurrencyIso.MYR,
        rate: 3.09,
        symbol: 'RM',
    },
    {
        iso: CurrencyIso.PHP,
        rate: 37.8,
        symbol: '₱',
    },
]
export default function LandingPricingSection(props: SectionProps) {
    const { tiers } = useAppContext()
    const [currency, setCurrency] = useState<Currency>(currencies[0])
    const [discount, setDiscount] = useState(1)

    const FreePlanModalProvider = createModal(
        AuthContext,
        'SignupModal',
        () => <span data-plan="free">{props.pricing_tier_0_cta}</span>,
        () => <span data-plan="free">Cancel</span>,
        { tier: tiers[0] }
    )

    const SinglePlanModalProvider = createModal(
        AuthContext,
        'SignupModal',
        () => <span>{props.pricing_tier_1_cta}</span>,
        undefined,
        { tier: tiers[1] }
    )

    const MultiLocModalProvider = createModal(
        AuthContext,
        'SignupModal',
        () => <span>{props.pricing_tier_2_cta}</span>,
        undefined,
        { tier: tiers[2] }
    )

    const handleToggleSwitch = () => {
        setDiscount(discount == 1 ? 0.8 : 1)
    }

    const handleCurrencySelection = (idx: number) => {
        setCurrency(currencies[idx])
    }

    return (
        <section className="pt-20 pb-40 pricing-plans bg-primary bg-opacity-10">
            <div className="container m-auto">
                <h3 className="text-center text-primary-dark drop-shadow text-5xl circular font-thin mb-8">
                    {props.pricing_title}
                </h3>
                <p className="text-center leading-relaxed">
                    {props.pricing_body}
                </p>
                <div className="flex justify-center items-center w-auto mt-8">
                    <span className="mr-4">{props.pricing_monthly}</span>

                    <Switch
                        onLabel={''}
                        offLabel={''}
                        onChange={handleToggleSwitch}
                        checked={discount != 1}
                    />

                    <span className="ml-3 mr-2">
                        {props.pricing_yearly}
                    </span>
                    <span className="text-white text-xs bg-primary-light rounded px-2 py-1">
                        {props.pricing_promo_tag}
                    </span>
                </div>
                <div className="flex justify-center items-center w-auto mt-8">
                    <div className="pr-6 circular">
                        {props.pricing_currency_title}
                    </div>
                    <ButtonGroup className="bg-primary-light circular-light">
                        {currencies.map(
                            ({ iso, symbol }: Currency, idx) => (
                                <Button
                                    key={iso}
                                    togglable={true}
                                    selected={currency.iso === iso}
                                    onClick={() =>
                                        handleCurrencySelection(idx)
                                    }
                                >
                                    {iso}
                                </Button>
                            )
                        )}
                    </ButtonGroup>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 xl:gap-8 xl:max-w-7xl mx-auto mt-12">
                    <div className="bg-white rounded-2xl shadow-2xl w-full py-10 px-8">
                        <figure className="w-60 text-center m-auto mt-2 text-primary-light">
                            <span className="rounded-lg p-0.5 pt-1 w-8 inline-block border-2 border-primary-light">
                                <i className="feather feather-user" />
                            </span>
                            <span className="ml-2 circular text-lg">
                                {props.pricing_tier_0_name}
                            </span>
                        </figure>
                        <div className="text-6xl block text-center text-primary circular-light mt-5">
                            {props.pricing_tier_0_price_usd}
                        </div>
                        <div className="text-sm block text-center text-gray-400 circular-light">
                            {props.pricing_tier_0_subtitle_monthly}
                        </div>
                        <div className="block text-center mt-8">
                            {props.pricing_tier_0_subtitle_yearly}
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
                                {props.pricing_tier_0_subfeature_title}
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
                                {props.pricing_tier_1_name}
                            </span>
                        </figure>
                        <div className="text-6xl block text-center text-primary-dark circular-light mt-5">
                            {currency.symbol}
                            {Math.ceil(
                                parseInt(
                                    props.pricing_tier_1_price_usd.substring(
                                        1
                                    ),
                                    10
                                ) *
                                    discount *
                                    currency.rate
                            )}
                        </div>
                        <div className="block text-center text-gray-400 circular-light">
                            {props.pricing_subtitle_monthly}
                        </div>
                        <div className="block text-center mt-8">
                            {props.pricing_tier_1_subtitle}
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
                                {props.pricing_tier_1_subfeature_title}
                            </span>
                            <ul className="list-disc ml-6 leading-loose text-sm mt-2 h-28">
                                <li>
                                    {currency.symbol}
                                    {Math.ceil(20 * currency.rate)} per
                                    additional location
                                </li>
                                <li>
                                    {currency.symbol}
                                    {Math.ceil(5 * currency.rate)} per
                                    additional staff
                                </li>
                                <li>
                                    {currency.symbol}
                                    {Math.ceil(5 * currency.rate)} per
                                    additional 1,000 appointments
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
                                {props.pricing_tier_2_name}
                            </span>
                        </figure>
                        <div className="text-6xl block text-center text-primary circular-light mt-5">
                            {currency.symbol}
                            {Math.ceil(
                                parseInt(
                                    props.pricing_tier_2_price_usd.substring(
                                        1
                                    ),
                                    10
                                ) *
                                    discount *
                                    currency.rate
                            )}
                        </div>
                        <div className="block text-center text-gray-400 circular-light">
                            {props.pricing_subtitle_monthly}
                        </div>
                        <div className="block text-center mt-8">
                            {props.pricing_tier_2_subtitle}
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
                                {props.pricing_tier_2_subfeature_title}
                            </span>
                            <ul className="list-disc ml-6 leading-loose text-sm mt-2 h-28">
                                <li>
                                    {currency.symbol}
                                    {Math.ceil(20 * currency.rate)} per
                                    additional location
                                </li>
                                <li>
                                    {currency.symbol}
                                    {Math.ceil(5 * currency.rate)} per
                                    additional staff
                                </li>
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
