import { useAuth} from 'context/AuthContext'
import { classNames } from "utils/dom-helpers"
import { SaveCardSuccessProps } from './types'

function SaveCardSuccess({handleOnModalClosed}: SaveCardSuccessProps) {
  return (
    <div className={classNames(
      'bg-white rounded-2xl shadow-2xl p-8 w-2/6 m-auto',
      )}>
      
      <div className="flex justify-center p-4">
        <i className="feather-check bg-green-600 text-lg rounded-full" 
          style={{
            color: 'white',
            background: 'green',
            padding: '1px 6px',
          }}
        ></i>
      </div>
      <div className="flex flex-wrap justify-center text-center font-bold text-2xl py-4">
        <div>Successfully<br/>Added the card</div>
      </div>
      <div className="flex justify-center mb-4"><span className="bg-primay-lighter rounded px-2">VISA **** 4334</span></div>
      <button
        className={classNames(
            'group relative w-full flex justify-center',
            'py-2 mt-4 px-4 border border-transparent',
            'text-md rounded-md text-white',
            'focus:outline-none',
            'bg-primary hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary-light'
        )}
        onClick={handleOnModalClosed}
      >
        Back to payment methods
      </button>
    </div>
  )
}

export default SaveCardSuccess