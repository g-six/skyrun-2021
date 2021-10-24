import { Dispatch, SetStateAction } from 'react'
import { classNames } from 'utils/dom-helpers'
type HeaderProps = {
    onSearch: Dispatch<SetStateAction<string>>
}

export function UniversalSearch({ selected_idx = 0 }) {
    return (
        <div className="relative rounded-md shadow-sm mx-4 divide-x divide-gray-200">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <span className="feather feather-search text-gray-500 text-lg" />
            </div>
            <input
                type="text"
                name="keyword"
                id="keyword"
                className={classNames(
                    'focus:ring-primary-dark focus:border-primary-dark rounded-md',
                    'block w-full py-2 pl-12 pr-28',
                    'border-gray-300 text-gray-500 placeholder-gray-300'
                )}
                placeholder="Search..."
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
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
                        selected_idx > 0 ? 'text-gray-500' : 'text-gray-300'
                    )}
                    defaultValue="Categpry"
                >
                    <option disabled>Category</option>
                    <option>Location</option>
                    <option>Package</option>
                </select>
            </div>
        </div>
    )
}

export default UniversalSearch
