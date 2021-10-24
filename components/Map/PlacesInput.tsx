import { useEffect, useRef, useState } from 'react'
import AutoPlaces from 'react-google-autocomplete'
import { classNames } from 'utils/dom-helpers'

interface Props {
    id?: string
    attributes?: Record<string, string>
    defaultValue?: string
    setAttributes?(p: Record<string, string>): void
}
type Place = {
    address_components: Record<string, string>[]
    formatted_address: string
}
export function PlacesInput(props: Props) {
    const { defaultValue } = props
    const [value, setValue] = useState<string>(
        (defaultValue as string) || ''
    )
    const [street_number, setStreetNumber] = useState<string>('')
    const [street_name, setStreetName] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [city_state_1, setCityState1] = useState<string>('')
    const [city_state_2, setCityState2] = useState<string>('')
    const [country, setCountry] = useState<string>('')
    const [zip, setZip] = useState<string>('')
    const [show_textfield, showTextField] = useState<boolean>(true)
    const [coordinates, setCoordinates] = useState<number[]>([])
    const [address, setAddress] = useState<Record<string, string>>({})

    function resetValues() {
        setStreetNumber('')
        setStreetName('')
        setCity('')
        setCityState1('')
        setCityState2('')
        setCountry('')
        setZip('')
        if (props.setAttributes)
            props.setAttributes({
                ...props.attributes,
                street_1: '',
                street_2: '',
                city: '',
                state: '',
                zip: '',
                country: '',
            })
    }

    useEffect(() => {
        if (props.setAttributes && props.attributes) {
            showTextField(true)
            if (coordinates) {
                props.setAttributes({
                    ...props.attributes,
                    coordinates: coordinates.join(','),
                })
            }
            if (
                street_number &&
                street_name &&
                (props.attributes.street_1 !=
                    [street_number, street_name].join(' ') ||
                    !props.attributes.street_1)
            ) {
                const [left, right] = value.split(`${street_name}, `)
                props.setAttributes({
                    ...props.attributes,
                    street_1: `${street_number} ${street_name}`,
                })

                props.setAttributes({
                    ...props.attributes,
                    street_2: (left || right).split(', ')[0],
                })
            }
            if (!street_number && street_name) {
                const [left, right] = value.split(`${street_name}, `)
                props.setAttributes({
                    ...props.attributes,
                    street_1: left ? left.split(',')[0] : right,
                    street_2: street_name,
                })
            }
            if (city && props.attributes.city != city) {
                props.setAttributes({
                    ...props.attributes,
                    city,
                })
            }
            if (
                city_state_1 &&
                (!city_state_2 ||
                    (city_state_2 &&
                        city_state_1.length < city_state_2.length))
            ) {
                if (props.attributes.state != city_state_1) {
                    props.setAttributes({
                        ...props.attributes,
                        state: city_state_1,
                    })
                }
            } else if (city_state_2) {
                if (props.attributes.state != city_state_2) {
                    props.setAttributes({
                        ...props.attributes,
                        state: city_state_2,
                    })
                }
            }
            if (country && props.attributes.country != country) {
                props.setAttributes({
                    ...props.attributes,
                    country,
                })
            }
            if (zip && props.attributes.zip != zip) {
                props.setAttributes({
                    ...props.attributes,
                    zip,
                })
            }
        }
    }, [
        value,
        address,
        city,
        city_state_1,
        city_state_2,
        street_number,
        street_name,
        country,
        zip,
    ])

    const input_ref = useRef<HTMLInputElement>(null)

    return (
        <div className="relative">
            <input
                type="text"
                className={classNames(
                    show_textfield ? '' : 'opacity-0',
                    'absolute top-0 left-0 px-6 py-3 mt-1 border focus:ring-primary-light focus:border-primary-light block w-full shadow-sm border-gray-300 rounded-md text-base'
                )}
                onFocus={() => {
                    showTextField(false)
                    input_ref.current?.focus()
                }}
                value={
                    (street_number &&
                        street_name &&
                        [street_number, street_name].join(' ')) ||
                    (props.attributes?.street_1 as string) ||
                    ''
                }
                readOnly
            />
            <AutoPlaces
                className={classNames(
                    show_textfield ? 'opacity-0' : '',
                    'absolute left-0 px-6 py-3 mt-1 border focus:ring-primary-light focus:border-primary-light block w-full shadow-sm border-gray-300 rounded-md text-base'
                )}
                ref={input_ref}
                defaultValue={value || (props.defaultValue as string)}
                onPlaceSelected={(place) => {
                    resetValues()
                    if (place.address_components) {
                        const address_components: Record<string, string> =
                            {}
                        place.address_components.forEach(
                            ({
                                long_name,
                                types,
                            }: {
                                long_name: string
                                types: string[]
                            }) => {
                                if (types[0] == 'street_number') {
                                    setStreetNumber(long_name)
                                }
                                if (types[0] == 'route') {
                                    setStreetName(long_name)
                                }
                                if (types[0] == 'locality') {
                                    setCity(long_name)
                                }
                                if (
                                    types[0] ==
                                    'administrative_area_level_1'
                                ) {
                                    setCityState1(long_name)
                                }
                                if (
                                    types[0] ==
                                    'administrative_area_level_2'
                                ) {
                                    setCityState2(long_name)
                                }
                                if (
                                    types[0] ==
                                    'administrative_area_level_1'
                                ) {
                                    setCityState1(long_name)
                                }
                                if (
                                    types[0] ==
                                    'administrative_area_level_2'
                                ) {
                                    setCityState2(long_name)
                                }
                                if (types[0] == 'country') {
                                    setCountry(long_name)
                                }
                                if (types[0] == 'postal_code') {
                                    setZip(long_name)
                                }
                                address_components[types[0]] = long_name
                            }
                        )

                        if (place.geometry?.location?.lat()) {
                            setCoordinates([
                                place.geometry?.location?.lat(),
                                place.geometry?.location?.lng(),
                            ])
                        }
                        setAddress(address_components)
                    }
                    showTextField(true)
                }}
                onFocus={() => {
                    showTextField(false)
                }}
                onBlur={(e) => {
                    showTextField(true)
                    setValue(e.currentTarget.value)
                }}
                onKeyDown={(e) => {
                    showTextField(false)
                    if (e.key.toLowerCase().indexOf('enter') >= 0) {
                        e.preventDefault()
                    }
                }}
                onKeyUp={(e) => {
                    if (e.key.toLowerCase().indexOf('enter') >= 0) {
                        setValue(e.currentTarget.value)
                    }
                }}
                options={{
                    types: ['establishment'],
                }}
            />
        </div>
    )
}

export default PlacesInput
