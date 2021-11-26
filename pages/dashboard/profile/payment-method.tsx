import { useState } from 'react'
import Translation from "components/Translation"
import { classNames } from "utils/dom-helpers"
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuth } from 'context/AuthContext'

type Card = {
  logo: string,
  cardNumber: string,
  expiry: string,
  isPrimary: boolean,
}
type CardItemProps = {
  card: Card
  translations: Record<string, string>
}

type AddCardFormValues = {
  name: string
  cardNumber: string
  expirydate: string
  cvcCvv: string
}

function PaymentMethod(translations: Record<string, string>){
  const { CreditCardModal: AddCreditCardModal } = useAuth()
  const cardList = [
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Former_Visa_%28company%29_logo.svg/3072px-Former_Visa_%28company%29_logo.svg.png",
      isPrimary: false,
      cardNumber: "2345-2253-333-9864",
      expiry: '04/19'
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Former_Visa_%28company%29_logo.svg/3072px-Former_Visa_%28company%29_logo.svg.png",
      isPrimary: true,
      cardNumber: "2345-2253-333-9864",
      expiry: '04/19'
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Former_Visa_%28company%29_logo.svg/3072px-Former_Visa_%28company%29_logo.svg.png",
      isPrimary: false,
      cardNumber: "2345-2253-333-9864",
      expiry: '04/19'
    },
  ]
  return (
    <>
      <div className="grid lg:grid-cols-3 gap-6 xl:gap-8 xl:max-w-7xl mx-auto mt-12">
        {
          cardList.map((card,index) => <CardItem card={card} translations={translations} key={index}/>) 
        } 
        <div className="bg-white rounded-2xl border border-dashed border-light-blue-500 w-full py-10 px-8">
        
          <div className="flex justify-center">
            <i className="feather-plus px-1 bg-primary-lighter text-base rounded "></i>
          </div>
          <Translation
              className="flex justify-center text-lg text-gray-400"
              content_key="clients_add_new"
              render_as="div"
              translations={translations}
          />
          <Translation
              className="flex justify-center text-lg text-gray-400"
              content_key="payment_method"
              render_as="div"
              translations={translations}
          />
        </div>
      </div>
      <AddCard {...translations}  />
    </>
  )
}

function CardItem({card, translations} : CardItemProps){
  const { logo, cardNumber, expiry, isPrimary } = card
  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full p-4">
      
        <div className="flex">
          <div>
            <img src={logo}
              alt="card image!"
              className="w-12 h-8" />
          </div>
          {
            isPrimary && 
            <div className="w-full flex justify-end py-1">
              <Translation
                className="w-auto inline-block bg-primary-lighter rounded-2xl text-primary-light font-medium px-4 uppercase flex flex-wrap content-center text-sm font-medium"
                content_key="primary_card"
                render_as="div"
                translations={translations}
              />
            </div>
          }
          
        </div>
        <Translation
            className="flex justify-start py-4 text-lg font-semibold"
            content_key={`xxxx-xxxx-xxx-${cardNumber.split('-')[3]}`}
            render_as="div"
            translations={translations}
        />
        <Translation
            className="flex justify-start text-gray-200"
            content_key={expiry}
            render_as="div"
            translations={translations}
        />
        <div className="flex py-2 gap-2">
          <button className="flex gap-2 bg-secondary bg-opacity-25 rounded-lg text-secondary py-1 px-2 ">
            <i className="feather-edit text-sm"></i>
            <Translation
              content_key="btn_update"
              render_as="div"
              translations={translations}
            />
          </button>
          <button className="flex gap-2 bg-secondary bg-opacity-25 rounded-lg text-secondary py-1 px-2 ">
            <i className="feather-trash text-sm"></i>
            <Translation
              content_key="btn_delete"
              render_as="div"
              translations={translations}
            />
          </button>
          {
            !isPrimary && 
            <button className="flex gap-2 bg-gray-300 rounded-lg text-primary-light py-1 px-2 ">
              <i className="feather-credit-card text-sm"></i>
              <Translation
                content_key="btn_make_primary"
                render_as="div"
                translations={translations}
              />
            </button>
          }
          
        </div>
      </div>
  )
}

function AddCard(translations: Record<string, string>){
  const [loading, toggleLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: {errors},
    setError,
    reset
  } = useForm<AddCardFormValues>({
    mode: 'onChange'
  })
  const onSubmit: SubmitHandler<AddCardFormValues> = async (
    values: Record<string, string>
  ) => {
    const { name  } = values
    toggleLoading(true)
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
       <Translation
          className="flex justify-center text-xl"
          content_key="add_card"
          render_as="div"
          translations={translations}
      />
      <div>
        <form
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
          className="z-20 pt-16 px-10">
          <fieldset className="pb-6">
            <label htmlFor="card-holder"
              className={classNames(
                'block font-bold text-gray-600',
                errors.name?.type ? 'text-red-700' : ''
              )}
              >
              Name
            </label>
            <input 
              type="text"
              placeholder="Enter cardholder's full name"
              className={classNames(
                'mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
                errors.name?.type
                  ? 'border-red-300 bg-red-100'
                  : ''
              )}
              {...register('name', { required:true })}
            />
            {errors.name?.type === 'required' && <span className="text-sm text-red-700">Name is required</span>}
          </fieldset>

          <div className="flex gap-3">
            <fieldset className="pb-6 w-1/2">
              <label htmlFor="card-holder"
                className={classNames(
                  'block font-bold text-gray-600',
                  errors.cardNumber?.type ? 'text-red-700' : ''
                )}
                >
                Card Number
              </label>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  className={classNames(
                    'mt-1 focus:ring-primary-light focus:border-primary-light w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
                    errors.cardNumber?.type
                      ? 'border-red-300 bg-red-100'
                      : ''
                  )}
                  {...register('cardNumber', { required:true })}
                />
                <i className="feather-credit-card absolute right-4 top-1 mt-1 text-2xl text-primary-light"/>
              </div>
              {errors.cardNumber?.type === 'required' && <span className="text-sm text-red-700">Card number is required</span>}
            </fieldset>

            <fieldset className="pb-6 w-1/3">
              <label htmlFor="card-holder"
                className={classNames(
                  'block font-bold text-gray-600',
                  errors.expirydate?.type ? 'text-red-700' : ''
                )}
                >
                Expiry Date
              </label>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="MM/YY"
                  className={classNames(
                    'mt-1 focus:ring-primary-light focus:border-primary-light w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
                    errors.expirydate?.type
                      ? 'border-red-300 bg-red-100'
                      : ''
                  )}
                  {...register('expirydate', { required:true })}
                />
                <i className="feather-calendar absolute right-4 top-1 mt-1 text-2xl text-primary-light"/>
              </div>
              {errors.expirydate?.type === 'required' && <span className="text-sm text-red-700">Expiry Date is required</span>}
            </fieldset>

            <fieldset className="pb-6 w-auto">
              <label htmlFor="cvc-cvv"
                className={classNames(
                  'block font-bold text-gray-600',
                  errors.cvcCvv?.type ? 'text-red-700' : ''
                )}
                >
                CVC/CVV
              </label>
              <div className="relative">
                <input 
                  type="password"
                  placeholder="***"
                  className={classNames(
                    'mt-1 focus:ring-primary-light focus:border-primary-light w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
                    errors.cvcCvv?.type
                      ? 'border-red-300 bg-red-100'
                      : ''
                  )}
                  {...register('cvcCvv', { required:true,maxLength:3 })}
                />
                <i className="feather-help-circle absolute right-4 top-1 mt-1 text-2xl text-primary-light"/>
              </div>
              {errors.cvcCvv?.type === 'required' && <span className="text-sm text-red-700">CVC/CVV is required</span>}
              {errors.cvcCvv?.type === 'maxLength' && <span className="text-sm text-red-700">CVC/CVV should only be 3 digits</span>}
            </fieldset>
          </div>

          <div className="flex justify-end gap-3 w-full">
            <button
                className={classNames(
                    'group relative w-1/4 flex justify-center',
                    'py-2 mt-4 px-4 border border-gray-300',
                    'focus:outline-none text-md rounded-md',
                )}
              >
                Cancel
            </button>
            <button
                type="submit"
                className={classNames(
                    'group relative w-1/4 flex justify-center',
                    'py-2 mt-4 px-4 border border-transparent',
                    'text-md rounded-md text-white',
                    'focus:outline-none',
                    loading
                        ? 'bg-primary-light'
                        : 'bg-primary hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary-light'
                )}
                onClick={handleSubmit(onSubmit)}
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
                Add Card
            </button>
          </div>

        </form>
        
      </div>
    </div>
  )
}



export default PaymentMethod