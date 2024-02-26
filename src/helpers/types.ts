type CardType = 'OFFERING' | 'RECEIVING'

interface Card {
  id: string
  name: string
  description: string
  imageUrl: string
  createdAt: string
}

interface TradeCard {
  id: string
  cardId: string
  tradeId: string
  type: CardType
  card: Card
}

interface UserTrade {
  name: string
}

interface Trade {
  id: string
  userId: string
  createdAt: string
  user: UserTrade
  tradeCards: TradeCard[]
}

interface TradeCardPayload {
  cardId: string
  type: CardType
}

interface IUser {
  id: string
  name: string
  email: string
  cards: Card[]
}

export type {
  CardType,
  Card,
  TradeCard,
  UserTrade,
  Trade,
  TradeCardPayload,
  IUser,
}
