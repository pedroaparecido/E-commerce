import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Product } from '../types/product'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  
  // Métodos auxiliares de cálculo
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      // Adiciona produto (se já existir no carrinho, incrementa a quantidade)
      addItem: (product: any, quantity = 1) => {
        const currentItems = get().items
        const existingIndex = currentItems.findIndex(
          (item: any) => item.product.id === product.id
        )

        if (existingIndex > -1) {
          const updatedItems = [...currentItems]
          updatedItems[existingIndex].quantity += quantity
          set({ items: updatedItems })
        } else {
          set({ items: [...currentItems, { product, quantity }] })
        }
      },

      // Remove um produto do carrinho pelo ID
      removeItem: (productId: any) => {
        set({
          items: get().items.filter((item: any) => item.product.id !== productId),
        })
      },

      // Atualiza a quantidade diretamente (se for <= 0, remove o item)
      updateQuantity: (productId: any, quantity: any) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set({
          items: get().items.map((item: any) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        })
      },

      // Esvazia o carrinho totalmente
      clearCart: () => set({ items: [] }),

      // Retorna a quantidade total de itens (soma das quantidades)
      getTotalItems: () => {
        return get().items.reduce((acc: any, item: any) => acc + item.quantity, 0)
      },

      // Retorna o valor total da compra
      getTotalPrice: () => {
        return get().items.reduce(
          (acc: any, item: any) => acc + item.product.price * item.quantity,
          0
        )
      },
    }),
    {
      name: 'ecommerce-cart-storage', // Chave salva no localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
)