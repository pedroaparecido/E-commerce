import { useState } from "react"
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Loader2 } from "lucide-react"
import { useCartStore } from "../../store/useCartStore"
import { api } from "../../lib/api"
import { PixModal } from "../Checkout/PixModal"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice, getTotalItems } =
    useCartStore()

  // Estados para o checkout via Mercado Pago
  const [loadingCheckout, setLoadingCheckout] = useState(false)
  const [pixData, setPixData] = useState<{
  paymentId: string
  qrCode: string
  qrCodeBase64: string
} | null>(null)
  const [checkoutTotal, setCheckoutTotal] = useState(0)

  // Se não estiver aberto e não houver modal de PIX ativo, não renderiza nada
  if (!isOpen && !pixData) return null

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()

// 2. Atualize a função handleCheckout
  const handleCheckout = async () => {
    try {
      setLoadingCheckout(true)
      const currentTotal = getTotalPrice()
      setCheckoutTotal(currentTotal)

      const response = await api.post("/checkout/pix", {
        items,
        totalAmount: currentTotal,
      })

      // Desestruture o paymentId vindo da API
      const { paymentId, qrCode, qrCodeBase64 } = response.data

      // Salva o paymentId no estado junto com as outras informações
      setPixData({ 
        paymentId, 
        qrCode, 
        qrCodeBase64 
      })
      
      clearCart()
      onClose()
    } catch (err: any) {
      console.error("Erro no checkout:", err)
      alert("Não foi possível gerar o PIX.")
    } finally {
      setLoadingCheckout(false)
    }
  }

  return (
    <>
      {/* 1. Gaveta do Carrinho */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay escuro de fundo */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          />

          {/* Painel da Gaveta Lateral */}
          <div className="relative w-full max-w-md bg-zinc-950 border-l border-zinc-800 h-full flex flex-col shadow-2xl z-10 animate-in slide-in-from-right duration-300">
            
            {/* Cabeçalho */}
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Seu Carrinho</h2>
                  <p className="text-xs text-zinc-400">
                    {totalItems === 0
                      ? "Carrinho vazio"
                      : `${totalItems} ${totalItems === 1 ? "item adicionado" : "itens adicionados"}`}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                aria-label="Fechar carrinho"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lista de Itens */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-zinc-900">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-600">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-zinc-200">
                      Seu carrinho está vazio
                    </p>
                    <p className="text-xs text-zinc-500 max-w-[220px]">
                      Explore nosso catálogo e adicione produtos para começar suas compras.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="mt-2 text-xs font-semibold text-amber-400 hover:text-amber-300 border border-amber-500/30 px-4 py-2 rounded-lg hover:bg-amber-500/10 transition-colors"
                  >
                    Voltar às compras
                  </button>
                </div>
              ) : (
                items.map(({ product, quantity }) => {
                  return (
                    <div key={product.id} className="pt-4 first:pt-0 flex gap-4 items-center">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-16 h-16 rounded-lg object-cover bg-zinc-900 border border-zinc-800 flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-xs font-medium text-zinc-200 truncate" title={product.title}>
                            {product.title}
                          </h3>
                          <button
                            onClick={() => removeItem(product.id)}
                            className="text-zinc-500 hover:text-rose-400 p-1 transition-colors"
                            title="Remover produto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-xs font-bold text-amber-400 mt-0.5">
                          {formatCurrency(product.price)}
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-xs font-bold text-zinc-200 min-w-[24px] text-center">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-semibold text-zinc-400">
                            {formatCurrency(product.price * quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Rodapé e Resumo de Valores */}
            {items.length > 0 && (
              <div className="p-5 border-t border-zinc-800 bg-zinc-900/60 space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Frete</span>
                    <span className="text-emerald-400 font-medium">Grátis</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-800">
                    <span>Total</span>
                    <span className="text-amber-400">{formatCurrency(totalPrice)}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  {/* BOTÃO DE FINALIZAR COMPRA CONECTADO AO PIX */}
                  <button
                    onClick={handleCheckout}
                    disabled={loadingCheckout}
                    className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                  >
                    {loadingCheckout ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                        <span>Gerando PIX...</span>
                      </>
                    ) : (
                      <>
                        <span>Finalizar Compra via Pix</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </>
                    )}
                  </button>

                  <button
                    onClick={clearCart}
                    className="w-full text-xs text-zinc-500 hover:text-zinc-400 py-1 transition-colors text-center"
                  >
                    Esvaziar carrinho
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Modal de Exibição do QR Code e Copia e Cola */}
      {pixData && (
        <PixModal
          isOpen={!!pixData}
          onClose={() => setPixData(null)}
          paymentId={pixData.paymentId} // 👈 Agora o TypeScript aceita e envia o ID!
          qrCode={pixData.qrCode}
          qrCodeBase64={pixData.qrCodeBase64}
          totalAmount={checkoutTotal}
        />
      )}
    </>
  )
}