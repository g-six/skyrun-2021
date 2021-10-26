import { classNames } from 'utils/dom-helpers'
import { ViewMode } from './types'

interface Props {
    setViewMode(v: ViewMode): void
    view_mode: ViewMode
}
export function ViewModeSelector({ setViewMode, view_mode }: Props) {
    return (<>
        <button
            onClick={() => {
                setViewMode(ViewMode.GRID)
            }}
            className={classNames(
                view_mode == ViewMode.GRID
                    ? 'text-primary'
                    : 'text-gray-300',
                'flex items-center hover:text-primary-dark font-thin rounded-lg w-10'
            )}
        >
            <i className="feather-grid text-3xl mx-auto" />
        </button>
        <button
            onClick={() => {
                setViewMode(ViewMode.LIST)
            }}
            className={classNames(
                view_mode == ViewMode.LIST
                    ? 'text-primary'
                    : 'text-gray-300',
                'flex items-center hover:text-primary-dark font-thin rounded-lg w-10'
            )}
        >
            <i className="feather-list text-3xl mx-auto" />
        </button>
    </>)
}

export default ViewModeSelector