import { Button, ButtonGroup } from '@progress/kendo-react-buttons'
import { Switch } from '@progress/kendo-react-inputs'
import { createModal } from 'components/Modals/ModalFactory'
import Translation from 'components/Translation'
import { useAppContext } from 'context/AppContext'
import { AuthContext } from 'context/AuthContext'
import { useState } from 'react'
import { isProdEnv } from 'utils/environment-helper'

enum CurrencyIso {
    USD = 'USD',
    SGD = 'SGD',
    MYR = 'MYR',
    PHP = 'PHP',
}
type Currency = {
    iso: CurrencyIso
    conversion_rate: number
    symbol: string
}
const currencies: Currency[] = [
    {
        iso: CurrencyIso.USD,
        conversion_rate: 1,
        symbol: '$',
    },
    {
        iso: CurrencyIso.SGD,
        conversion_rate: 1.35,
        symbol: '$',
    },
    {
        iso: CurrencyIso.MYR,
        conversion_rate: 4.15,
        symbol: 'RM',
    },
    {
        iso: CurrencyIso.PHP,
        conversion_rate: 49.98,
        symbol: '₱',
    },
]

function getPriceFromContent(
    translate_key: string,
    translations: Record<string, string>
) {
    let price = translations[translate_key]

    if (price == undefined) {
        price = '0'
    } else {
        price = price.substring(1)
    }

    return parseInt(price, 10)
}

function getTotalPrice(
    price: number,
    discount: number,
    conversion_rate: number
) {
    if (discount > 0) {
        return Math.round((price - price * discount) * conversion_rate)
    } else {
        return Math.round(price * conversion_rate)
    }
}

export default function LandingPricingSection(
    props: Record<string, string>
) {
    const { tiers } = useAppContext()
    const [currency, setCurrency] = useState<Currency>(currencies[0])

    const yearly_discount = props['pricing_promo_tag']
        ? parseInt(props['pricing_promo_tag'].substring(5).split('%')[0])
        : 0
    const yearly_discount_rate = yearly_discount / 100

    const [discountRate, setDiscountRate] = useState(yearly_discount_rate)

    const FreePlanModalProvider = createModal(
        AuthContext,
        'SignupModal',
        () => (
            <span data-plan="free">
                <Translation
                    content_key="pricing_tier_0_cta"
                    translations={props}
                />
            </span>
        ),
        () => (
            <span data-plan="free">
                <Translation content_key="cancel" translations={props} />
            </span>
        ),
        { tier: tiers[0] }
    )

    const SinglePlanModalProvider = createModal(
        AuthContext,
        'SignupModal',
        () => (
            <Translation
                content_key="pricing_tier_1_cta"
                render_as="span"
                translations={props}
            />
        ),
        undefined,
        { tier: tiers[1] }
    )

    const MultiLocModalProvider = createModal(
        AuthContext,
        'SignupModal',
        () => (
            <Translation
                content_key="pricing_tier_2_cta"
                render_as="span"
                translations={props}
            />
        ),
        undefined,
        { tier: tiers[2] }
    )

    const handleToggleSwitch = () => {
        setDiscountRate(
            discountRate == yearly_discount_rate ? 0 : yearly_discount_rate
        )
    }

    const handleCurrencySelection = (idx: number) => {
        setCurrency(currencies[idx])
    }

    const handleSignupOnClick = () => {
        window
            .open('https://aotplus.activehosted.com/f/5', '_blank')
            ?.focus()
    }

    return (
        <section className="pt-20 pb-40 pricing-plans bg-primary bg-opacity-10">
            <div className="container m-auto">
                <Translation
                    className="text-center text-primary-dark drop-shadow text-5xl circular font-thin mb-8"
                    content_key="pricing_title"
                    render_as="h3"
                    translations={props}
                />
                <Translation
                    className="text-center leading-relaxed"
                    content_key="pricing_body"
                    render_as="p"
                    translations={props}
                />
                <div className="flex justify-center items-center w-auto mt-8">
                    <Translation
                        className="mr-4"
                        content_key="pricing_monthly"
                        render_as="p"
                        translations={props}
                    />

                    <Switch
                        className="no-color-change"
                        onLabel={''}
                        offLabel={''}
                        onChange={handleToggleSwitch}
                        checked={discountRate == yearly_discount_rate}
                    />

                    <Translation
                        className="ml-3 mr-2"
                        content_key="pricing_yearly"
                        render_as="span"
                        translations={props}
                    />
                    <Translation
                        className="text-white text-xs bg-primary-light rounded px-2 py-1"
                        content_key="pricing_promo_tag"
                        render_as="span"
                        translations={props}
                    />
                </div>
                <div className="flex justify-center items-center w-auto mt-8">
                    <Translation
                        className="pr-6 circular"
                        content_key="pricing_currency_title"
                        render_as="div"
                        translations={props}
                    />
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
                            <Translation
                                className="ml-2 circular text-lg"
                                content_key="pricing_tier_0_name"
                                render_as="span"
                                translations={props}
                            />
                        </figure>
                        <Translation
                            className="text-6xl block text-center text-primary circular-light mt-5"
                            content_key="pricing_tier_0_price_usd"
                            render_as="div"
                            translations={props}
                        />
                        <Translation
                            className="text-sm block text-center text-gray-400 circular-light"
                            content_key="pricing_tier_0_subtitle_monthly"
                            render_as="div"
                            translations={props}
                        />
                        <Translation
                            className="block text-center mt-8"
                            content_key="pricing_tier_0_subtitle_yearly"
                            render_as="div"
                            translations={props}
                        />
                        <div className="divide-y divide-primary-lighter">
                            <div className="h-8"></div>
                            <div className="h-8"></div>
                        </div>
                        <div className="flex items-center mt-5">
                            <i className="feather feather-check px-6 text-primary-light w-auto text-2xl leading-none" />
                            <Translation
                                content_key="pricing_tier_0_feature_list_1"
                                render_as="span"
                                translations={props}
                            />
                        </div>
                        <div className="flex items-center mt-5">
                            <i className="feather feather-check px-6 text-primary-light w-auto text-2xl leading-none" />
                            <Translation
                                content_key="pricing_tier_0_feature_list_2"
                                render_as="span"
                                translations={props}
                            />
                        </div>
                        <div className="flex items-center mt-5">
                            <i className="feather feather-check px-6 text-primary-light w-auto text-2xl leading-none" />
                            <Translation
                                content_key="pricing_tier_0_feature_list_3"
                                render_as="span"
                                translations={props}
                            />
                        </div>
                        <div className="flex items-center mt-5 opacity-25">
                            <i className="feather feather-check px-6 text-primary-light w-auto text-2xl leading-none" />
                            <Translation
                                content_key="pricing_tier_0_disabled_feature_list_1"
                                render_as="span"
                                translations={props}
                            />
                        </div>
                        <div className="flex items-center mt-5 opacity-25">
                            <i className="feather feather-check px-6 text-primary-light w-auto text-2xl leading-none" />
                            <span>
                                <Translation
                                    content_key="pricing_tier_0_disabled_feature_list_2"
                                    translations={props}
                                />{' '}
                                <Translation
                                    className="bg-primary-light text-xs text-white p-1 rounded"
                                    content_key="pricing_coming_soon"
                                    render_as="small"
                                    translations={props}
                                />
                            </span>
                        </div>

                        <div className="rounded-2xl bg-primary-lighter bg-opacity-20 w-full mt-6 p-6">
                            <Translation
                                className="text-primary circular text-xl"
                                content_key="pricing_tier_0_subfeature_title"
                                render_as="span"
                                translations={props}
                            />
                            <ul className="list-disc ml-6 leading-loose text-sm mt-2 h-28">
                                <Translation
                                    content_key="pricing_tier_0_subfeature_checklist_1"
                                    render_as="li"
                                    translations={props}
                                />
                                <Translation
                                    content_key="pricing_tier_0_subfeature_checklist_2"
                                    render_as="li"
                                    translations={props}
                                />
                                <Translation
                                    content_key="pricing_tier_0_subfeature_checklist_3"
                                    render_as="li"
                                    translations={props}
                                />
                            </ul>
                        </div>

                        {isProdEnv() ? (
                            <div className="overflow-hidden ">
                                <button
                                    className="mt-8 shadow w-full flex items-center justify-center
                            px-6 py-4 text-base text-white font-bold
                            bg-primary-light rounded-full
                            transition duration-300 ease-in-out
                            hover:bg-opacity-80
                            md:text-xl md:px-10"
                                    type="button"
                                    onClick={() => handleSignupOnClick()}
                                >
                                    <Translation
                                        content_key="main_cta_button"
                                        translations={props}
                                    />
                                </button>
                            </div>
                        ) : (
                            <FreePlanModalProvider.Opener
                                className="mt-8 shadow w-full flex items-center justify-center
                            px-6 py-4 text-base text-white font-bold
                            bg-primary-light rounded-full
                            transition duration-300 ease-in-out
                            hover:bg-opacity-80
                            md:text-xl md:px-10"
                            />
                        )}
                    </div>

                    <div className="bg-white rounded-2xl shadow-2xl w-full py-10 px-8">
                        <figure className="w-60 text-center m-auto mt-2 text-primary flex items-center justify-center">
                            <i className="text-2xl feather feather-users flex items-center justify-center" />
                            <Translation
                                className="ml-2 circular text-lg flex items-center justify-center"
                                content_key="pricing_tier_1_name"
                                render_as="span"
                                translations={props}
                            />
                        </figure>
                        <div className="text-6xl block text-center text-primary-dark circular-light mt-5">
                            {currency.symbol}
                            {getTotalPrice(
                                getPriceFromContent(
                                    'pricing_tier_1_price_usd',
                                    props
                                ),
                                discountRate,
                                currency.conversion_rate
                            )}
                        </div>
                        <Translation
                            className="block text-center text-gray-400 circular-light"
                            content_key="pricing_subtitle_monthly"
                            render_as="div"
                            translations={props}
                        />
                        <div className="block text-center text-gray-400 circular-light">
                            {currency.symbol}
                            {getTotalPrice(
                                getPriceFromContent(
                                    'pricing_tier_1_price_usd',
                                    props
                                ),
                                discountRate,
                                currency.conversion_rate
                            ) * 12}{' '}
                            <Translation
                                content_key="pricing_subtitle_billed_annually"
                                translations={props}
                            />
                        </div>
                        <Translation
                            className="block text-center mt-8"
                            content_key="pricing_tier_1_subtitle"
                            render_as="div"
                            translations={props}
                        />
                        <div className="divide-y divide-primary-lighter">
                            <div className="h-8"></div>
                            <div className="h-8"></div>
                        </div>
                        <div className="flex items-center mt-5">
                            <i className="feather feather-check px-6 text-primary w-auto text-2xl leading-none" />
                            <Translation
                                content_key="pricing_tier_1_feature_list_1"
                                render_as="span"
                                translations={props}
                            />
                        </div>
                        <div className="flex items-center mt-5">
                            <i className="feather feather-check px-6 text-primary w-auto text-2xl leading-none" />
                            <Translation
                                content_key="pricing_tier_1_feature_list_2"
                                render_as="span"
                                translations={props}
                            />
                        </div>
                        <div className="flex items-center mt-5">
                            <i className="feather feather-check px-6 text-primary w-auto text-2xl leading-none" />
                            <Translation
                                content_key="pricing_tier_1_feature_list_3"
                                render_as="span"
                                translations={props}
                            />
                        </div>
                        <div className="flex items-center mt-5 opacity-25">
                            <i className="feather feather-check px-6 text-primary w-auto text-2xl leading-none" />
                            <Translation
                                content_key="pricing_tier_1_disabled_feature_list_1"
                                render_as="span"
                                translations={props}
                            />
                        </div>
                        <div className="flex items-center mt-5 opacity-25">
                            <i className="feather feather-check px-6 text-primary w-auto text-2xl leading-none" />
                            <span>
                                <Translation
                                    content_key="pricing_tier_1_disabled_feature_list_2"
                                    translations={props}
                                />{' '}
                                <Translation
                                    className="bg-primary text-xs text-white p-1 rounded"
                                    content_key="pricing_coming_soon"
                                    render_as="small"
                                    translations={props}
                                />
                            </span>
                        </div>

                        <div className="rounded-2xl bg-primary-light bg-opacity-10 w-full mt-6 p-6">
                            <Translation
                                className="text-primary circular text-xl"
                                content_key="pricing_tier_1_subfeature_title"
                                render_as="span"
                                translations={props}
                            />
                            <ul className="list-disc ml-6 leading-loose text-sm mt-2 h-28">
                                <Translation
                                    content_key="pricing_tier_2_subfeature_checklist_1"
                                    render_as="li"
                                    translations={props}
                                />
                                <Translation
                                    content_key="pricing_tier_2_subfeature_checklist_2"
                                    render_as="li"
                                    translations={props}
                                />
                                <Translation
                                    content_key="pricing_tier_2_subfeature_checklist_3"
                                    render_as="li"
                                    translations={props}
                                />
                            </ul>
                        </div>

                        {isProdEnv() ? (
                            <div className="overflow-hidden ">
                                <button
                                    className="mt-8 shadow w-full flex items-center justify-center
                            px-6 py-4 text-base text-white font-bold
                            bg-primary-dark rounded-full
                            transition duration-300 ease-in-out
                            hover:bg-opacity-80
                            md:text-xl md:px-10"
                                    type="button"
                                    onClick={() => handleSignupOnClick()}
                                >
                                    <Translation
                                        content_key="section_4_cta_button"
                                        translations={props}
                                    />
                                </button>
                            </div>
                        ) : (
                            <SinglePlanModalProvider.Opener
                                className="mt-8 shadow w-full flex items-center justify-center
                            px-6 py-4 text-base text-white font-bold
                            bg-primary-dark rounded-full
                            transition duration-300 ease-in-out
                            hover:bg-opacity-80
                            md:text-xl md:px-10"
                            />
                        )}
                    </div>

                    <div className="bg-white rounded-2xl shadow-2xl w-full py-10 px-8">
                        <figure className="w-60 text-center m-auto mt-2 text-secondary flex items-center justify-center">
                            <i className="text-2xl feather feather-map-pin flex items-center justify-center" />
                            <Translation
                                className="ml-2 circular text-lg flex items-center justify-center"
                                content_key="pricing_tier_2_name"
                                render_as="span"
                                translations={props}
                            />
                        </figure>
                        <div className="text-6xl block text-center text-primary-dark circular-light mt-5">
                            {currency.symbol}
                            {getTotalPrice(
                                getPriceFromContent(
                                    'pricing_tier_2_price_usd',
                                    props
                                ),
                                discountRate,
                                currency.conversion_rate
                            )}
                        </div>
                        <Translation
                            className="block text-center text-gray-400 circular-light"
                            content_key="pricing_subtitle_monthly"
                            render_as="div"
                            translations={props}
                        />
                        <div className="block text-center text-gray-400 circular-light">
                            {currency.symbol}
                            {getTotalPrice(
                                getPriceFromContent(
                                    'pricing_tier_1_price_usd',
                                    props
                                ),
                                discountRate,
                                currency.conversion_rate
                            ) * 12}{' '}
                            <Translation
                                content_key="pricing_subtitle_billed_annually"
                                translations={props}
                            />
                        </div>
                        <Translation
                            className="block text-center mt-8"
                            content_key="pricing_tier_2_subtitle"
                            render_as="div"
                            translations={props}
                        />
                        <div className="divide-y divide-primary-lighter">
                            <div className="h-8"></div>
                            <div className="h-8"></div>
                        </div>
                        <div className="flex items-center mt-5">
                            <i className="feather feather-check px-6 text-secondary w-auto text-2xl leading-none" />
                            <Translation
                                content_key="pricing_tier_2_feature_list_1"
                                render_as="span"
                                translations={props}
                            />
                        </div>
                        <div className="flex items-center mt-5">
                            <i className="feather feather-check px-6 text-secondary w-auto text-2xl leading-none" />
                            <Translation
                                content_key="pricing_tier_2_feature_list_2"
                                render_as="span"
                                translations={props}
                            />
                        </div>
                        <div className="flex items-center mt-5">
                            <i className="feather feather-check px-6 text-secondary w-auto text-2xl leading-none" />
                            <Translation
                                content_key="pricing_tier_2_feature_list_3"
                                render_as="span"
                                translations={props}
                            />
                        </div>
                        <div className="flex items-center mt-5">
                            <i className="feather feather-check px-6 text-secondary w-auto text-2xl leading-none" />
                            <Translation
                                content_key="pricing_tier_2_feature_list_4"
                                render_as="span"
                                translations={props}
                            />
                        </div>
                        <div className="flex items-center mt-5">
                            <i className="feather feather-check px-6 text-secondary w-auto text-2xl leading-none" />
                            <span>
                                <Translation
                                    content_key="pricing_tier_2_feature_list_5"
                                    translations={props}
                                />{' '}
                                <Translation
                                    className="bg-secondary text-xs text-white p-1 rounded"
                                    content_key="pricing_coming_soon"
                                    render_as="small"
                                    translations={props}
                                />
                            </span>
                        </div>

                        <div className="rounded-2xl bg-secondary bg-opacity-10 w-full mt-6 p-6">
                            <Translation
                                className="text-primary circular text-xl"
                                content_key="pricing_tier_2_subfeature_title"
                                render_as="span"
                                translations={props}
                            />
                            <ul className="list-disc ml-6 leading-loose text-sm mt-2 h-28">
                                <Translation
                                    content_key="pricing_tier_2_subfeature_checklist_1"
                                    render_as="li"
                                    translations={props}
                                />
                                <Translation
                                    content_key="pricing_tier_2_subfeature_checklist_2"
                                    render_as="li"
                                    translations={props}
                                />
                                <Translation
                                    content_key="pricing_tier_2_subfeature_checklist_3"
                                    render_as="li"
                                    translations={props}
                                />
                            </ul>
                        </div>

                        {isProdEnv() ? (
                            <div className="overflow-hidden ">
                                <button
                                    className="mt-8 shadow w-full flex items-center justify-center
                            px-6 py-4 text-base text-white font-bold
                            bg-secondary rounded-full
                            transition duration-300 ease-in-out
                            hover:bg-opacity-80
                            md:text-xl md:px-10"
                                    type="button"
                                    onClick={() => handleSignupOnClick()}
                                >
                                    <Translation
                                        content_key="main_cta_button"
                                        translations={props}
                                    />
                                </button>
                            </div>
                        ) : (
                            <MultiLocModalProvider.Opener
                                className="mt-8 shadow w-full flex items-center justify-center
                            px-6 py-4 text-base text-white font-bold
                            bg-secondary rounded-full
                            transition duration-300 ease-in-out
                            hover:bg-opacity-80
                            md:text-xl md:px-10"
                            />
                        )}
                    </div>
                </div>

                <div className="flex justify-end max-w-7xl mt-2 mx-auto">
                    <Translation
                        content_key="pricing_disclaimer"
                        render_as="i"
                        translations={props}
                    />
                </div>
            </div>
        </section>
    )
}
