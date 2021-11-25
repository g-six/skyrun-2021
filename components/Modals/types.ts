import { Tier } from 'context/AppContext'
import { CognitoErrorTypes } from 'services/CognitoErrorTypes'

export interface ModalDataAttributes {
    [key: string]:
        | string
        | number
        | boolean
        | Date
        | File
        | Tier
        | ModalDataAttributes
        | ModalDataAttributes[]
}
export interface ModalHook {
    is_open: boolean
    open(): void
    close(): void
    attributes?: ModalDataAttributes
    setAttributes(attributes: ModalDataAttributes): void
}

export type UserModel = {
    id?: string
    uuid?: string
    firstName: string
    lastName: string
    email: string
    phone?: string
}

export type SubmitError = {
    name: CognitoErrorTypes
    message: string
}

export enum RecurrenceSchedule {
    NONE,
    DAILY,
    WEEKLY,
    MONTHLY_ON_DAY,
    MONTHLY_ON_DATE,
}

export type GroupClassApi = {
    id?: string
    effectiveDate: Date | string,
    expiryDate?: Date | string,
    startTime: string,
    endTime: string,
    recurring: boolean,
    recurrenceSchedule?: string,
    dayOfWeek?: string,
    duration: number,
    serviceId: string,
    groupClassSetting: {
        locationId: string,
        staffId: string,
    },
}

export type GroupClass = {
    id?: string
    date: Date,
    time: string,
    is_recurring: boolean,
    location: string,
    staff: string,
}