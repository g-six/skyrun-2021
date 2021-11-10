import DateInput from 'components/DateInput'
import DropdownComponent from 'components/DropdownSelectors'
import OptionList, { OptionListItem } from 'components/OptionList'
import Translation from 'components/Translation'
import { MouseEvent, useEffect, useState } from 'react'
import { classNames } from 'utils/dom-helpers'
import { useFetch } from 'utils/fetch-helper'
import { FetchMethods } from 'utils/types'
import { ModalDataAttributes } from '../types'

export function BlankOffer({
    attributes,
    translations,
    onNext,
    showOfferListForm,
}: {
    attributes?: ModalDataAttributes
    translations: Record<string, string>
    onNext(): void
    showOfferListForm(): void
}) {
    return (
        <div className="text-center my-6 rounded-xl relative flex-1">
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
                    <div className="text-gray-400 text-xl font-display block mt-4 mx-auto">
                        <Translation
                            content_key="blank_offers_title_start"
                            translations={translations}
                        />
                        {attributes && attributes.name}
                        <Translation
                            content_key="blank_offers_title_end"
                            translations={translations}
                        />
                    </div>
                    <Translation
                        render_as="div"
                        className="text-gray-400 block mx-auto mb-3"
                        content_key="blank_offers_body"
                        translations={translations}
                    />
                    <button
                        className="bg-primary w-auto mx-auto font-sans font-thin text-lg px-5 py-1 my-3 text-white rounded-lg"
                        type="button"
                        onClick={showOfferListForm}
                    >
                        <Translation
                            content_key="offer_classes_button"
                            translations={translations}
                        />
                    </button>
                    <button
                        className="border border-gray-400 w-48 mx-auto font-sans font-thin text-lg px-5 py-1 rounded-lg"
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
    )
}

function ServiceModalOfferClasses({
    translations,
    attributes,
    onAttributesChanged,
    tenant_id,
    handleCloseModal,
    removeAll,
    onPrevious,
    onNext,
}: {
    translations: Record<string, string>
    attributes?: ModalDataAttributes
    tenant_id: string
    handleCloseModal: (e: MouseEvent<HTMLButtonElement>) => void
    removeAll(): void
    onPrevious(): void
    onNext(): void
    onAttributesChanged(u: ModalDataAttributes, idx: number): void
}) {
    const api_error =
        attributes && (attributes.api_error as Record<string, string>)
    const loading = (attributes && attributes.loading) || false
    const [times, setTimes] = useState<{ text: string; value: string }[]>(
        getTimes()
    )

    const { data } = useFetch(
        `/v1/locations/tenant-id/?tenantId=${tenant_id}`,
        FetchMethods.GET,
        true
    )
    const locations =
        data && data.content && data.numberOfElements > 0
            ? data.content.map((loc: Record<string, string>) => ({
                  value: loc.id,
                  text: loc.name,
              }))
            : []

    const { data: staff_api_response } = useFetch(
        `/v1/staff/?tenantId=${tenant_id}`,
        FetchMethods.GET,
        true
    )
    const staff =
        staff_api_response &&
        staff_api_response.content &&
        staff_api_response.numberOfElements > 0
            ? staff_api_response.content.map(
                  (loc: { id: string; user: Record<string, string> }) => ({
                      value: loc.id,
                      text: [
                          (loc.user as unknown as Record<string, string>)
                              .firstName,
                          (loc.user as unknown as Record<string, string>)
                              .lastName,
                      ].join(' '),
                  })
              )
            : []

    function duplicateRow(idx: number) {}

    const offerings =
        attributes && (attributes.offerings as ModalDataAttributes[])

    useEffect(() => {
        console.log(offerings)
    }, [offerings])
    return (
        <div
            className="relative flex flex-col"
            style={{ minHeight: '600px' }}
        >
            <div className="text-primary text-xl font-medium font-display">
                <Translation
                    content_key="offer_class_title_1"
                    translations={translations}
                />{' '}
                <span className="text-primary-light font-thin">
                    {attributes && attributes.name}
                </span>{' '}
                <Translation
                    content_key="offer_class_title_2"
                    translations={translations}
                />
                <Translation
                    render_as="div"
                    className="text-base font-thin font-display text-gray-400 mt-2"
                    content_key="offer_class_body"
                    translations={translations}
                />
            </div>
            <div className="my-6 flex-1">
                <div
                    className={classNames(
                        'justify-start',
                        'overflow-auto max-h-96 h-96 flex-1 flex flex-col p-3 gap-3'
                    )}
                >
                    <div className="flex gap-2">
                        <Translation
                            render_as="span"
                            className="font-semibold tracking-wider font-display text-gray-500 text-xs uppercase w-48"
                            content_key="location_col_header"
                            translations={translations}
                        />

                        <Translation
                            render_as="span"
                            className="font-semibold tracking-wider font-display text-gray-500 text-xs uppercase w-56"
                            content_key="instructor_col_header"
                            translations={translations}
                        />

                        <Translation
                            render_as="span"
                            className="font-semibold tracking-wider font-display text-gray-500 text-xs uppercase w-28"
                            content_key="time_col_header"
                            translations={translations}
                        />

                        <Translation
                            render_as="span"
                            className="font-semibold tracking-wider font-display text-gray-500 text-xs uppercase w-28"
                            content_key="date_col_header"
                            translations={translations}
                        />

                        <Translation
                            render_as="span"
                            className="font-semibold tracking-wider font-display text-gray-500 text-xs uppercase"
                            content_key="recurrence_col_header"
                            translations={translations}
                        />
                    </div>

                    <div className="bg-primary-lighter bg-opacity-40 py-2">
                        {offerings
                            ? offerings.map(
                                  (o: ModalDataAttributes, idx: number) => {
                                      console.log(offerings[idx].date)
                                      return (
                                          <div
                                              key={idx}
                                              className={classNames(
                                                  'flex gap-2 px-2'
                                              )}
                                          >
                                              <div className="w-44 px-1">
                                                  <OptionList
                                                      id="location"
                                                      className="text-xs"
                                                      onChange={(
                                                          t: OptionListItem
                                                      ) => {
                                                          ;(o.location =
                                                              t.value as string),
                                                              onAttributesChanged(
                                                                  o,
                                                                  idx
                                                              )
                                                      }}
                                                      options={locations}
                                                      listboxCss="h-auto"
                                                  />
                                              </div>

                                              <div className="w-56 place-items-stretch  px-1">
                                                  <OptionList
                                                      id="staff"
                                                      className="text-xs"
                                                      onChange={(
                                                          t: OptionListItem
                                                      ) => {
                                                          ;(o.staff =
                                                              t.value as string),
                                                              onAttributesChanged(
                                                                  o,
                                                                  idx
                                                              )
                                                      }}
                                                      options={staff}
                                                      listboxCss="h-auto"
                                                  />
                                              </div>

                                              <div className="w-28 px-1">
                                                  <OptionList
                                                      id="time"
                                                      className="font-mono text-xs"
                                                      onChange={(
                                                          t: OptionListItem
                                                      ) => {
                                                          o.time =
                                                              t.value as string
                                                          onAttributesChanged(
                                                              o,
                                                              idx
                                                          )
                                                      }}
                                                      options={times}
                                                  />
                                              </div>
                                              <div className="w-28 place-items-stretch px-1">
                                                  <DateInput
                                                      className="focus:ring-primary-light focus:border-primary-light block w-full shadow-sm border-gray-300 rounded-md calendar"
                                                      onChange={(
                                                          date: Date
                                                      ) => {
                                                          o.date = date
                                                          onAttributesChanged(
                                                              o,
                                                              idx
                                                          )
                                                      }}
                                                      dateFormat="dd/MM/yyyy"
                                                      selected={
                                                          offerings[idx]
                                                              .date as Date
                                                      }
                                                  />
                                              </div>
                                              <div className="flex-1 items-center flex px-1 gap-2">
                                                  <input
                                                      id="check_1"
                                                      className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary-light"
                                                      type="checkbox"
                                                  />
                                                  <Translation
                                                      render_as="label"
                                                      htmlFor="check_1"
                                                      content_key="recurring_label"
                                                      translations={
                                                          translations
                                                      }
                                                  />
                                                  <div className="flex-1" />
                                                  <button
                                                      type="button"
                                                      className="text-primary bg-primary-light bg-opacity-30 h-10 w-10 rounded-lg text-xl feather-copy"
                                                      onClick={() => {
                                                          duplicateRow(idx)
                                                      }}
                                                  />
                                                  <button
                                                      type="button"
                                                      className="text-red-500 bg-red-100 h-10 w-10 rounded-lg text-xl feather-trash-2"
                                                  />
                                              </div>
                                          </div>
                                      )
                                  }
                              )
                            : ''}
                    </div>
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

            <div className="flex justify-end">
                <button
                    type="button"
                    className="border border-gray-300 rounded-lg py-3 inline-block mr-3 px-10"
                    onClick={() => {
                        onPrevious()
                    }}
                >
                    Previous
                </button>
                <button
                    type="button"
                    onClick={() => {
                        onNext()
                    }}
                    className={classNames(
                        'group relative flex justify-center',
                        'py-3 px-12 border border-transparent',
                        'rounded-md text-white',
                        'focus:outline-none',
                        loading
                            ? 'bg-primary-light'
                            : api_error && api_error.message
                            ? 'bg-red-700 hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary-light'
                            : 'bg-primary hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary-light'
                    )}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

function getTimes() {
    let i = 0
    const times = []
    do {
        let j = 0
        do {
            const text = [`0${i}`.substr(-2), `0${j}`.substr(-2)].join(':')
            times.push({
                text,
                value: text,
            })
            j = j + 5
        } while (j < 60)
        i++
    } while (i < 24)
    return times
}
export default ServiceModalOfferClasses