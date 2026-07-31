export type UserRole = 'ADMIN' | 'CLIENT'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface Product {
  id: string
  title: string
  price: number
  imageUrl: string
  stockQuantity: number
  // Dados fiscais para NFC-e
  ncm: string // Nomenclatura Comum do Mercosul (ex: "2202.10.00")
  cfop: string // Código Fiscal de Operações (ex: "5102")
}

export type NfceStatus = 'DRAFT' | 'AUTHORIZED' | 'REJECTED' | 'CANCELLED'

export interface Order {
  id: string
  createdAt: string
  totalAmount: number
  status: 'PENDING' | 'PAID' | 'FAILED'
  nfceStatus: NfceStatus
  nfceKey?: string // Chave de acesso de 44 dígitos
  qrCodeUrl?: string
}

// Interface genérica para respostas paginadas do backend
export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    page: number
    limit: number
    totalItems: number
    totalPages: number
  }
}