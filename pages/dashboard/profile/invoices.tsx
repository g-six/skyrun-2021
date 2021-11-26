import { classNames } from "@progress/kendo-react-common"
import DataTable from "components/DataTable"
import { useState } from "react"

type Invoice = {
  id: string,
  date: string,
  invoice: string,
  amount: number,
  isPaid: boolean,
  payment_method?: string,
}

const dummyInvoice: Invoice[] = [
  {
    id: "1",
    date: "October 21, 2021",
    invoice: "INVOICE 00010 October",
    amount: 100.00,
    isPaid: true,
    payment_method: 'Visa Card 0092'
  },
  {
    id: "2",
    date: "October 21, 2021",
    invoice: "INVOICE 00010 October",
    amount: 100.00,
    isPaid: false,
    payment_method: 'Visa Card 0092'
  },
  {
    id: "3",
    date: "October 21, 2021",
    invoice: "INVOICE 00010 October",
    amount: 100.00,
    isPaid: false,
    payment_method: 'Visa Card 0092'
  },
  {
    id: "4",
    date: "October 21, 2021",
    invoice: "INVOICE 00010 October",
    amount: 100.00,
    isPaid: false,
    payment_method: 'Visa Card 0092'
  },
  {
    id: "5",
    date: "October 21, 2021",
    invoice: "INVOICE 00010 October",
    amount: 100.00,
    isPaid: false,
  },
]



function Invoices(translation: Record<string, string>) {
  const [isAllSelected, setIsAllSelected] = useState(false)
  const [invoices, setInvoices] = useState<Invoice[]>(dummyInvoice)
  const [downloadingDocuments, setDownloadingDocuments] = useState<string[]>([])

  const downloadInvoice = (id: string) => {
    setDownloadingDocuments([id, ...downloadingDocuments])
    //@todo download document
    setTimeout(() => setDownloadingDocuments(downloadingDocuments.filter(item => id !== item)),5000) //mock functionlity
  }
  const handlePayment = (id: string) => {

  }

  const rows: HTMLTableRowElement[] = (invoices || []).map(
    ({id, date, invoice, amount, isPaid, payment_method}: Invoice, idx) => (
      <tr
        key={id}
        className={classNames(
          idx % 2 ? 'bg-primary-lighter bg-opacity-30' : '',
          'hover:bg-secondary hover:bg-opacity-10'
        )}
      >
        <td
          className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-bold text-gray-900">
                {date}
            </div>
        </td>
        <td
          className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">
                {invoice}
            </div>
        </td>
        <td
          className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-bold text-gray-900">
                ${amount}
            </div>
        </td>
        <td
          className="px-6 py-4 whitespace-nowrap">
            <div className="flex gap-3 text-sm font-medium text-gray-900">
                <span className={classNames(
                  'text-xl',
                  isPaid ? 'text-green-600 font-bold' : 'text-green-300 font-semibold'
                )}>
                  <i className="feather-check" />
                </span>
                <span className="text-sm">{isPaid ? ' Paid ':' Unpaid '}</span>
                {
                  !isPaid && 
                  <button
                    className={classNames(
                        'flex flex-wrap content-center gap-2 rounded-lg py-1 px-2 ml-4 ',
                        'text-primary-light hover:bg-red-400 focus:ring-2 focus:ring-offset-2'
                    )}
                    onClick={() => handlePayment(id)}
                  >
                    <span className="text-xs text-red-700 uppercase">pay now</span>
                  </button>
                }
            </div>
        </td>
        <td
          className="px-6 py-4 whitespace-nowrap">
            <div className="flex flex-center text-sm font-medium text-gray-900">
                {payment_method ? payment_method:'-'}
            </div>
        </td>
        <td
          className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">
            <button
                className={classNames(
                    'flex gap-2 bg-gray-300 rounded-lg text-primary-light py-1 px-2 ',
                    downloadingDocuments.includes(id)
                        ? 'bg-primary-light'
                        : 'bg-primary hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary-light'
                )}
                onClick={() => downloadInvoice(id)}
              >
                <span>
                    {downloadingDocuments.includes(id) ? <svg
                            className="animate-spin -ml-1 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg> : <i className="feather-file-text" />
                      }
                </span>
                Download Invoice
            </button>
            </div>
        </td>


      </tr>
    ) as unknown as HTMLTableRowElement
  )
  return (
    <div>
      <DataTable
        all_selected={isAllSelected}
        rows={rows}
        columns={[
          {
              label: 'DATE',
              classNames:
                  'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
          },
          {
              label: 'INVOICE',
              classNames:
                  'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
          },
          {
              label: 'AMOUNT',
              classNames:
                  'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
          },
          {
              label: 'STATUS',
              classNames:
                  'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
          },
          {
            label: 'PAYMENT METHOD',
            classNames:
                'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
          },
          {
            label: 'ACTION',
            classNames:
                'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
          },
        ]} 
      />
    </div>
  )

}

export default Invoices