import { classNames } from 'utils/dom-helpers'

export function SearchBox({ selected_idx = 0 }) {
    return (
        <div className="relative rounded-md shadow-sm">
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
                    'border-gray-100 text-gray-500 placeholder-gray-300'
                )}
                style={{ minWidth: '500px' }}
                placeholder="Search..."
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
                <button type="reset" className="text-primary-light w-12">
                    <i className="feather-x" />
                </button>
            </div>
        </div>
    )
}

export default SearchBox
