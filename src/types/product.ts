export interface Product {
  id: string
  title: string
  price: number
  originalPrice?: number
  rating: number
  reviewsCount: number
  imageUrl: string
  category: string
  stockQuantity: number
  isExclusive?: boolean
}