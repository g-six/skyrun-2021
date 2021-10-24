export type PlaceDetail = {
    geometry: {
        location: {
            lat(): number
            lng(): number
        }
    }
    name: string
    utc_offset_minutes: number
}
