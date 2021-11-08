import { UserModel } from 'components/Modals/types'

export type ServiceApiType = 'APPOINTMENT' | 'GROUP' | 'SERIES'

export type ServiceApiItem = {
    id?: string,
    accentColorHex?: string,
    primaryColorHex: string,
    secondaryColorHex?: string,
    duration: number,
    addons?: string[],
    blockTimeAfter?: string,
    blockTimeBefore?: string,
    public: boolean,
    category: {
        id: string,
        name?: string,
    },
    name: string,
    tenant: {
        id: string,
    },
    staff: {
        id: string,
        user: UserModel,
    }[],
    price: number,
    maxCapacity: number,
    description: string,
    longDescription?: string,
    customSlug?: string,
    imageUrl?: string,
    type: ServiceApiType,
    series: boolean | false,
}

export interface ServiceBase {
    accent_color?: string,
    primary_color?: string,
    secondary_color?: string,
    duration?: number,
    is_public: boolean,
    blocked_from?: string,
    blocked_to?: string,
    name: string,
    price?: number,
    max_participants?: number,
    description?: string,
    long_description?: string,
    service_type: string,
    slug?: string,
    image_src?: string,
}

export interface ServiceFormModel extends ServiceBase {
    id?: string,
    category: {
        id: string,
        name?: string,
    },
}

export interface ServiceItem extends ServiceBase {
    id?: string,
    addons?: string[],
    is_public: boolean,
    category: {
        id: string,
        name?: string,
    },
    staff: {
        id: string,
        user_id: string,
        first_name: string,
        last_name: string,
    }[],
    memberships?: Record<string, string>[],
}

