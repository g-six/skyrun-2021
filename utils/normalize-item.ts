import { UserModel } from 'components/Modals/types'
import { ServiceApiItem, ServiceItem, ServiceType } from 'types/service'

export function normalizeItem(s: ServiceApiItem): ServiceItem {
    const {
        id,
        accentColorHex: accent_color,
        primaryColorHex: primary_color,
        secondaryColorHex: secondary_color,
        duration,
        addons,
        blockTimeAfter: blocked_from,
        blockTimeBefore: blocked_to,
        category,
        name,
        price,
        maxCapacity: max_capacity,
        description,
        longDescription: long_description,
        customSlug: slug,
        imageUrl: image_src,
        staff,
    } = s

    return {
        id,
        accent_color,
        primary_color,
        secondary_color,
        duration,
        addons,
        is_public: s.public || false,
        max_participants: s.maxCapacity || 0,
        blocked_from,
        blocked_to,
        category,
        name,
        price,
        description,
        long_description,
        service_type: s.type as ServiceType,
        slug,
        staff:
            (staff &&
                staff.map(
                    ({ id, user }: { id: string; user: UserModel }) => ({
                        id,
                        user_id: user.id as string,
                        first_name: user.firstName,
                        last_name: user.lastName,
                    })
                )) ||
            [],
        image_src,
    }
}