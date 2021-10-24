import getConfig from 'next/config'
import { LocationMarkerIcon } from '@heroicons/react/solid'
import GoogleMapReact, { Coords, MapOptions } from 'google-map-react'

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

export type Marker = {
    lat: number
    lng: number
    label: string
    icon?: string
}
export enum GMapType {
    ROADMAP = 'roadmap',
    SATELLITE = 'satellite',
    HYBRID = 'hybrid',
    TERRAIN = 'terrain'
}
export type GMapOptions = {
    zoom?: number
    maptype?: GMapType
    center: Marker
    markers?: Marker[]
    map_id?: string
    dimensions?: {
        height: number
        width?: number
    }
}
export function getStaticUrl(options: GMapOptions) {
    const { GOOGLE_API_KEY, MAP_PIN_ICON } = getConfig().publicRuntimeConfig
    const uri_segments: string[] = [
        `center=${[options.center.lat,options.center.lng].join(',')}`,
        `zoom=${options.zoom || 15}`,
        `size=${options.dimensions ? [options.dimensions.width, options.dimensions.height].join('x') : '463x256'}`,
        `maptype=${options.maptype || GMapType.ROADMAP}`,
        `key=${GOOGLE_API_KEY}`,
        `map_id=${options.map_id || '2e1a40c8e7e14e7c'}`
    ]
    options.markers && options.markers.forEach((m: Marker) => {
        uri_segments.push(`markers=icon:${m.icon || MAP_PIN_ICON}%7C${m.lat},${m.lng}${m.label ? '%7Clabel:' : ''}${m.label || ''}`)
    })
    return [
        'https://maps.googleapis.com/maps/api/staticmap',
        uri_segments.join('&'),
    ].join('?')
}
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
