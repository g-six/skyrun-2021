import { ReactElement, useState } from 'react'
import { classNames } from "utils/dom-helpers"
import { createModal } from '../ModalFactory'
import { AuthContext, useAuth} from 'context/AuthContext'
import { ModalWrapper } from '../ModalWrapper'
import CreateCard from './CreateCard'
import SaveCardSuccess from './SaveSuccess'
import { CreditCardModalProps } from './types'
import DeleteCard from './DeleteCard'

const ModalProvider = createModal(
  AuthContext,
  'CreditCardModal',
  () => (
    <>
        <i className="feather feather-plus mr-4" />
        <span className="circular">Create credit</span>
    </>
  ),
  () => (
    <span className="inline-block w-6 h-6 text-primary text-center font-extralight">
      <i className="feather feather-chevron-left " />
    </span>
  )
)

export const CreateCreditCardModalOpener = ModalProvider.Opener
export const CreateCreditCardModalCloser = ModalProvider.Closer

function CreditCardModal({card,translations, handleOnDelete}: CreditCardModalProps) {
  
  const ctx = useAuth()
  const { close : closeModal } = ctx.CreditCardModal

  const [loading, toggleLoading] = useState(false)
  const [isSaveSuccess, setIsSaveSuccess] = useState(false)

  const handleOnModalClosed = () => {
    setIsSaveSuccess(false)
    closeModal()
    handleOnDelete()// for mock functionality only 
  }
  const onDelete = () => {
    handleOnDelete()
  }

  const Render: React.FC = (): ReactElement => {
    if(card) return <DeleteCard onDelete={onDelete} onCancel={handleOnModalClosed}/>
    return (!isSaveSuccess) ? 
    <CreateCard  handleSaveSuccess={setIsSaveSuccess} translations={translations}/> : 
    <SaveCardSuccess handleOnModalClosed={handleOnModalClosed}/>
  }

  return (
    <ModalProvider.Visible>
      <ModalWrapper>
        <Render />
      </ModalWrapper>
    </ModalProvider.Visible>
  )
}

export default CreditCardModal