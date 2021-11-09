import Translation from 'components/Translation'
import { ModalDataAttributes } from '../types'

export function ServiceModalBooking({
    attributes,
    onChangeAttribute,
    translations,
}: {
    attributes: ModalDataAttributes
    onChangeAttribute(d: ModalDataAttributes): void
    translations: Record<string, string>
}) {
    return (
        <div
            className="relative flex flex-col"
            style={{ minHeight: '600px' }}
        >
            <div className="text-primary text-xl font-medium font-display">
                <Translation
                    content_key="privacy_title_1"
                    translations={translations}
                />
                <Translation
                    render_as="div"
                    className="text-base font-thin font-display text-gray-400 mt-2"
                    content_key="privacy_body"
                    translations={translations}
                />
            </div>
            <div className="flex gap-10 py-6">
                <div className="shadow-lg rounded flex py-5 px-6 gap-3 xl:w-96">
                    <input
                        id="privacy_1"
                        name="privacy"
                        value="false"
                        type="radio"
                        className="h-6 w-6 border-gray-300 rounded-full bg-primary-light text-primary-light focus:ring-primary-light"
                    />
                    <div className="flex-1">
                        <Translation
                            render_as="label"
                            htmlFor="privacy_1"
                            content_key="public_title"
                            className="text-primary font-display text-base"
                            translations={translations}
                        />
                        <Translation
                            render_as="div"
                            content_key="public_body"
                            translations={translations}
                            className="font-thin font-display text-gray-300"
                        />
                    </div>
                </div>

                <div className="shadow-lg rounded flex py-5 px-6 gap-3 xl:w-96">
                    <input
                        id="privacy_2"
                        name="privacy"
                        value="true"
                        type="radio"
                        className="h-6 w-6 border-gray-300 rounded-full bg-primary-light text-primary-light focus:ring-primary-light"
                    />
                    <div className="flex-1">
                        <Translation
                            render_as="label"
                            htmlFor="privacy_2"
                            content_key="public_title"
                            className="text-primary font-display text-base"
                            translations={translations}
                        />
                        <Translation
                            render_as="div"
                            content_key="public_body"
                            translations={translations}
                            className="font-thin font-display text-gray-300"
                        />
                    </div>
                </div>
            </div>
            <div className="text-primary text-xl font-medium font-display">
                <Translation
                    content_key="sharing_title_2"
                    translations={translations}
                />
                <Translation
                    render_as="div"
                    className="text-base font-thin font-display text-gray-400 mt-2"
                    content_key="sharing_body"
                    translations={translations}
                />
            </div>
            <div className="my-6 flex-1"></div>
        </div>
    )
}

export default ServiceModalBooking
