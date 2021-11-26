export type Card = {
  id: number,
  logo: string,
  cardNumber: string,
  expiry: string,
  isPrimary: boolean,
}

export type CardItemProps = {
  card: Card
  translations: Record<string, string>
  handleSelectedCard: (card: Card) => void
  makePrimary: (card: Card) => void
}

export type AddCardFormValues = {
  name: string
  cardNumber: string
  expirydate: string
  cvcCvv: string
}

export type SaveCardSuccessProps = {
  handleOnModalClosed: () => void
}

export type CreateCardProps = {
  handleSaveSuccess: (value: boolean) => void
  translations: Record<string, string>
}

export type CreditCardModalProps = {
  card: Card | null
  handleOnDelete: () => void
  translations: Record<string, string>
}

export type DeleteCardProps = {
  onDelete: () => void
  onCancel: () => void
}