import getConfig from 'next/config'
import { LocationMarkerIcon } from '@heroicons/react/solid'
import GoogleMapReact, { Coords, MapOptions } from 'google-map-react'
import { ReactElement } from 'react'

type MapProps = {
    lat: number
    lng: number
    center: Coords
    zoom: number
}

type InnerProps = {
    marker: string
    lat: number
    lng: number
}

const AnyReactComponent = ({ marker }: InnerProps) => (
    <div className="block w-8 h-8 font-sm text-white-700 -ml-4 -mt-6">
        <LocationMarkerIcon className="text-red-600 block" />
    </div>
)

export function Map(props: MapProps) {
    const { GOOGLE_API_KEY } = getConfig().publicRuntimeConfig
    const map_options: MapOptions = {
        backgroundColor: '#8cc3dd',
        controlSize: 20,
    }
    return (
        <GoogleMapReact
            bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
            defaultCenter={props.center}
            defaultZoom={props.zoom}
            options={map_options}
        >
            <AnyReactComponent
                lat={props.lat}
                lng={props.lng}
                marker="Text Mareke"
            />
        </GoogleMapReact>
    )
}
export default Map
