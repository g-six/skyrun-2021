import { useState } from 'react'
import { useAuth} from 'context/AuthContext'
import { classNames } from "utils/dom-helpers"
import { DeleteCardProps } from './types'

function DeleteCard({ onDelete, onCancel }:DeleteCardProps){
  const ctx = useAuth()
  const { close : closeModal } = ctx.CreditCardModal 
  const [loading, toggleLoading] = useState(false)

  const handleOnDelete = () => {
    //@todo 
    toggleLoading(true)
    //@todo save card
    setTimeout(() => {
      onDelete()
      closeModal()
    },3000)

  }
  return (
    <div className={classNames(
      'bg-white rounded-2xl shadow-2xl p-8 w-2/6 m-auto',
      )}>
      
      <div className="flex justify-center p-4">
        <i className="feather-help-circle bg-red-600 text-lg rounded-full" 
          style={{
            color: 'white',
            padding: '1px 6px',
          }}
        ></i>
      </div>
      <div className="flex flex-wrap justify-center text-center font-bold text-2xl py-4">
        <div>Are you sure you want<br/>to delete the card?</div>
      </div>
      <div className="flex justify-center mb-4"><span className="bg-primay-lighter rounded px-2">VISA **** 4334</span></div>
      
      <div className="flex justify-end gap-3 w-full">
        <button
          className={classNames(
              'group text-center w-1/2',
              'py-2 mt-4 px-4 border border-gray-300',
              'focus:outline-none text-md rounded-md',
          )}
          onClick={() => {
            onCancel()
            closeModal()
          }}
          >
          Cancel
        </button>
        <button
            type="submit" 
            className={classNames(
                'group w-1/2 relative flex justify-center',
                'py-2 mt-4 px-4 border border-transparent',
                'text-md rounded-md text-white',
                'focus:outline-none',
                'bg-primary hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary-light',
                loading
                  ? 'bg-primary-light'
                  : 'bg-primary hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary-light'
            )}
            onClick={handleOnDelete}
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {loading && <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    </svg>
                  }
            </span>
            Delete
        </button>
      </div>
    </div>

  )
}
export default DeleteCard