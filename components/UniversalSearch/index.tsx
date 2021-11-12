import { ForwardedRef, forwardRef, useState } from 'react'
import { classNames } from 'utils/dom-helpers'

const defaultHandler = (e: { target: { value: string } }) => {}

export type UniversalSearchProps = {
    selected_idx?: number
    categories?: string[]
    className?: string
    onChange?(e: { target: { value: string } }): void
    onClose?(): void
    scrollUp?(): void
    scrollDown?(): void
    chooseItem?(): void
}

export function UniversalSearch(
    {
        selected_idx = 0,
        categories = [] as string[],
        className,
        onChange = defaultHandler,
        onClose = () => {},
        scrollUp = () => {},
        scrollDown = () => {},
        chooseItem = () => {},
    }: UniversalSearchProps,
    ref: unknown
) {
    const [is_dropped, setDropdown] = useState<boolean>(false)
    const [keyword, setKeyword] = useState<string>('')
    function clearResults() {
        setDropdown(false)
        onClose()
    }

    function doSearch(e: { target: { value: string } }) {
        setDropdown(true)
        onChange(e)
    }

    return (
        <div
            className={classNames(
                'relative rounded-md shadow-sm',
                className || '',
                categories.length == 1 ? '' : 'divide-x divide-gray-200'
            )}
        >
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <span className="feather feather-search text-gray-500 text-lg" />
            </div>
            <input
                type="text"
                name="keyword"
                id="keyword"
                ref={ref as ForwardedRef<HTMLInputElement>}
                className={classNames(
                    'focus:ring-primary-dark focus:border-primary-dark rounded-md',
                    'block w-full py-2 pl-12',
                    categories.length == 1
                        ? 'pr-12 border-r-transparent'
                        : 'pr-28',
                    'border-gray-300 text-gray-500 placeholder-gray-300'
                )}
                onChange={(e) => {
                    e.preventDefault()
                    setKeyword(e.target.value)
                    doSearch(e)
                }}
                onKeyDown={(e) => {
                    if (e.key.toUpperCase() == 'ARROWDOWN') {
                        e.preventDefault()
                        scrollDown()
                    }
                    if (e.key.toUpperCase() == 'ARROWUP') {
                        e.preventDefault()
                        scrollUp()
                    }
                    if (e.key.toUpperCase().indexOf('ENTER') >= 0) {
                        e.preventDefault()
                        chooseItem()
                        setKeyword('')
                        setDropdown(false)
                    }
                }}
                value={keyword}
                placeholder="Search..."
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
                {categories.length == 1 ? (
                    <i
                        className={classNames(
                            'px-4 text-2xl cursor-pointer',
                            is_dropped
                                ? 'feather-chevron-down'
                                : 'feather-chevron-up'
                        )}
                        onClick={clearResults}
                    />
                ) : (
                    <>
                        <label htmlFor="Category" className="sr-only">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            className={classNames(
                                'h-full py-0 pl-2 pr-8 bg-transparent',
                                'focus:ring-primary-dark focus:border-primary-dark ',
                                'border-transparent rounded-r-md',
                                selected_idx > 0
                                    ? 'text-gray-500'
                                    : 'text-gray-300'
                            )}
                            defaultValue="Category"
                        >
                            <option disabled>Category</option>
                            <option>Location</option>
                            <option>Package</option>
                        </select>
                    </>
                )}
            </div>
        </div>
    )
}

export default forwardRef(UniversalSearch)
