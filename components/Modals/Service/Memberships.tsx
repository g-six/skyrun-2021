import Translation from 'components/Translation'
import { MouseEvent } from 'react'
import { classNames } from 'utils/dom-helpers'
import { ModalDataAttributes } from '../types'

function ServiceModalMemberships({
    translations,
    attributes,
    handleCloseModal,
    removeAll,
    removeMembership,
    onPrevious,
    onNext,
}: {
    translations: Record<string, string>
    attributes?: ModalDataAttributes
    handleCloseModal: (e: MouseEvent<HTMLButtonElement>) => void
    removeAll(): void
    removeMembership(idx: number): void
    onPrevious(): void
    onNext(): void
}) {
    const api_error =
        attributes && (attributes.api_error as Record<string, string>)
    const loading = (attributes && attributes.loading) || false

    return (
        <div
            className="relative flex flex-col"
            style={{ minHeight: '600px' }}
        >
            <div className="text-primary text-xl font-medium font-display">
                <Translation
                    content_key="eligible_memberships_title"
                    translations={translations}
                />
                <Translation
                    render_as="div"
                    className="text-base font-thin font-display text-gray-400 mt-2"
                    content_key="eligible_memberships_body"
                    translations={translations}
                />
            </div>

            <div className="text-center my-6 rounded-xl relative flex-1">
                <div className="flex mb-6">
                    <button
                        type="button"
                        className="text-primary-light text-center"
                        onClick={() => {
                            removeAll()
                        }}
                    >
                        <Translation
                            content_key="remove_all_button"
                            translations={translations}
                        />
                    </button>
                </div>
                <div
                    className={classNames(
                        'justify-center',
                        'overflow-auto max-h-96 h-96 flex-1 flex flex-col p-3'
                    )}
                >
                    <>
                        <div className="rounded-full bg-gray-200 w-20 h-20 inline-block leading-loose text-center self-center align-middle">
                            <i className="text-gray-400 feather feather-briefcase text-4xl leading-loose" />
                        </div>
                        <Translation
                            render_as="div"
                            className="text-gray-400 text-xl font-display block mt-4 mx-auto"
                            content_key="blank_memberships_title"
                            translations={translations}
                        />
                        <Translation
                            render_as="div"
                            className="text-gray-400 block mx-auto mb-3"
                            content_key="blank_memberships_body"
                            translations={translations}
                        />
                        <button
                            className="bg-primary w-auto mx-auto font-sans font-thin text-lg px-5 py-1 my-3 text-white rounded-lg"
                            type="button"
                        >
                            <Translation
                                content_key="edit_memberships_button"
                                translations={translations}
                            />
                        </button>
                        <button
                            className="border  border-gray-400 w-48 mx-auto font-sans font-thin text-lg px-5 py-1 rounded-lg"
                            type="button"
                            onClick={onNext}
                        >
                            <Translation
                                content_key="skip_button"
                                translations={translations}
                            />
                        </button>
                    </>
                </div>
            </div>

            <div>
                {api_error && api_error.message ? (
                    <div className="text-sm text-red-700">
                        {api_error.message}
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}

export default ServiceModalMemberships
