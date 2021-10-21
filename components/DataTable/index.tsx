export type DataTableColumnProps = {
    label?: string
    checkAll?(): void
    classNames: string
}

export type DataTableProps = {
    columns: DataTableColumnProps[]
    rows: HTMLTableRowElement[]
}
export function DataTable({ columns, rows }: DataTableProps) {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead>
                <tr>
                    {
                        columns.map((col: DataTableColumnProps, idx) =>
                            (<th
                                key={idx}
                                scope="col"
                                className={
                                    col.classNames || 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                }
                            >
                                { col.label }
                                { col.checkAll ? <input type="checkbox" className="h-4 w-4 mr-2 border-gray-300 rounded text-primary focus:ring-primary-light" onChange={col.checkAll} /> : '' }
                            </th>)
                        )
                    }
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {rows}
            </tbody>
        </table>
    )
}

export default DataTable