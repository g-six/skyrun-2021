import Translation from "components/Translation"
import { useAuth } from 'context/AuthContext'
import CreditCardModal from 'components/Modals/CreditCard'
import { CardItemProps, Card } from 'components/Modals/CreditCard/types'
import { useEffect, useState } from "react"

const _cardList = [
  {
    id: 1,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Former_Visa_%28company%29_logo.svg/3072px-Former_Visa_%28company%29_logo.svg.png",
    isPrimary: false,
    cardNumber: "2345-2253-333-9864",
    expiry: '04/19'
  },
  {
    id: 2,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Former_Visa_%28company%29_logo.svg/3072px-Former_Visa_%28company%29_logo.svg.png",
    isPrimary: true,
    cardNumber: "2345-2253-333-9864",
    expiry: '04/19'
  },
  {
    id: 3,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Former_Visa_%28company%29_logo.svg/3072px-Former_Visa_%28company%29_logo.svg.png",
    isPrimary: false,
    cardNumber: "2345-2253-333-9864",
    expiry: '04/19'
  },
]

function PaymentMethod(translations: Record<string, string>){
  const { CreditCardModal: _CreditCardModal } = useAuth()
  const [ selectedCard, setSelectedCard ] = useState<Card | null>(null)
  const [cardList, setCardList] = useState<Card[]>(_cardList)
  
  const handleSelectedCard = (card: Card) => {
    setSelectedCard(card) 
    _CreditCardModal.open()
  }
  const handleOnDelete = () =>{
    //@todo
    setSelectedCard(null)
  }

  const handleMakePrimary = (card: Card) => {
    //@todo
    setCardList(cardList?.map(_card => {
      (_card.id === card.id) ? _card.isPrimary = true : _card.isPrimary = false
      return _card
    }))
  }


  return (
    <>
      <div className="grid lg:grid-cols-3 gap-6 xl:gap-8 xl:max-w-7xl mx-auto mt-12">
        {
          cardList.map((card,index) => <CardItem 
                                          card={card} 
                                          translations={translations} 
                                          key={index} 
                                          handleSelectedCard={handleSelectedCard}
                                          makePrimary={handleMakePrimary}/>) 
        } 
        <div 
          className="bg-white rounded-2xl border border-dashed border-light-blue-500 w-full py-10 px-8"
          onClick={() => _CreditCardModal.open()}> 
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
      <CreditCardModal 
        card={selectedCard} 
        handleOnDelete={handleOnDelete} 
        translations={translations} /> 
    </>
  )
}

function CardItem({card, translations, handleSelectedCard, makePrimary} : CardItemProps){
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
          <button className="flex gap-2 bg-secondary bg-opacity-25 rounded-lg text-secondary py-1 px-2"
            onClick={() => handleSelectedCard(card)}>
            <i className="feather-trash text-sm"></i>
            <Translation
              content_key="btn_delete"
              render_as="div"
              translations={translations}
            />
          </button>
          {
            !isPrimary && 
            <button className="flex gap-2 bg-gray-300 rounded-lg text-primary-light py-1 px-2"
              onClick={() => makePrimary(card)}>
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

export default PaymentMethod