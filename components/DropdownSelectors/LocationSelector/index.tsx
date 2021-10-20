import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { classNames } from '@progress/kendo-react-common'
import { DropPosition } from '../common'

type LocationSelectorProps = {
    className?: string
    position?: DropPosition
    items: Record<string, string>[]
    selected?: Record<string, string>
}
export function LocationSelector(props: LocationSelectorProps) {
    const [is_opened, openMenu] = useState(false)
    const [selected_items, setSelection] = useState<number[]>([])

    function handleSelectedItem(idx: number, is_selected: boolean) {
        const selection_idx = selected_items.indexOf(idx)
        const selections = selected_items
        if (selection_idx >= 0) {
            selections.splice(selection_idx, 1)
        } else {
            selections.push(idx)
        }
        setSelection(selections)
    }
    return (
        <Menu
            as="div"
            className={classNames(
                'relative inline-block text-left',
                props.className
            )}
        >
            {({ open }) => (
                <>
                    <Menu.Button
                        className={classNames(
                            'inline-flex justify-center items-center w-full',
                            'rounded-md border border-gray-150 shadow-sm px-4 py-2 bg-white',
                            'text-sm font-medium text-gray-700',
                            'hover:bg-gray-50 '
                        )}
                        onClickCapture={() => {
                            openMenu(!is_opened)
                        }}
                    >
                        <i className="feather-map-pin text-lg mr-2" />
                        <span>Location</span>
                        <ChevronDownIcon
                            className="-mr-1 ml-2 h-5 w-5 text-primary-light"
                            aria-hidden="true"
                        />
                    </Menu.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                        show={is_opened}
                    >
                        <Menu.Items
                            static
                            className={classNames(
                                props.position,
                                'absolute mt-2 w-56',
                                'rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5',
                                'focus:outline-none'
                            )}
                        >
                            <div className="py-1">
                                {props.items && props.items.length
                                    ? props.items.map(
                                          (
                                              i: Record<string, string>,
                                              idx
                                          ) => {
                                              return (
                                                  <Menu.Item key={idx}>
                                                      {({ active }) => (
                                                          <div
                                                              className={classNames(
                                                                  active
                                                                      ? 'bg-gray-100 text-gray-900'
                                                                      : 'text-gray-700',
                                                                  'block text-sm'
                                                              )}
                                                          >
                                                              <label
                                                                  htmlFor={`filter-${idx}`}
                                                                  className="block min-w-0 flex-1 text-gray-500 h-full px-3 py-2"
                                                              >
                                                                  <input
                                                                      id={`filter-${idx}`}
                                                                      name="filter_location[]"
                                                                      type="checkbox"
                                                                      value={
                                                                          idx
                                                                      }
                                                                      defaultChecked={
                                                                          selected_items.indexOf(
                                                                              idx
                                                                          ) >=
                                                                          0
                                                                      }
                                                                      onChange={(
                                                                          e
                                                                      ) => {
                                                                          handleSelectedItem(
                                                                              idx,
                                                                              e
                                                                                  .target
                                                                                  .checked
                                                                          )
                                                                      }}
                                                                      className="h-4 w-4 mr-2 border-gray-300 rounded text-primary focus:ring-primary-light"
                                                                  />
                                                                  {i.text}
                                                              </label>
                                                          </div>
                                                      )}
                                                  </Menu.Item>
                                              )
                                          }
                                      )
                                    : ''}
                            </div>
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    )
}

export default LocationSelector
