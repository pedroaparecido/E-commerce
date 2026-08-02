import { useState, useEffect, useCallback } from "react"
import { Navbar } from "./components/Navbar/Navbar"
import { ProductCard } from "./components/Cards/ProductCard"
import { CartDrawer } from "./components/Cart/CartDrawer"
import { DropshippingSyncPage } from "./pages/admin/DropshippingSyncPage"
import { api } from "./lib/api"
import type { Product } from "./types/product"
import { useCartStore } from "./store/useCartStore"
import { Loader2, RefreshCw, ShoppingBag } from "lucide-react"

export function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  
  // Controle de estado da Gaveta do Carrinho
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)

  // Alternador simples entre Loja e Painel Admin
  const [currentTab, setCurrentTab] = useState<'shop' | 'admin'>('shop')

  const addItem = useCartStore((state) => state.addItem)

  const fetchProducts = useCallback(async () => {
    try {
      const response = await api.get<Product[]>('/products')
      setProducts(response.data)
      setError(null)
    } catch (err: any) {
      console.error("Erro ao carregar produtos:", err)
      setError("Não foi possível carregar o catálogo. Verifique se o backend na porta 3333 está ativo.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleRefresh = () => {
    setLoading(true)
    setError(null)
    fetchProducts()
  }

  const handleAddToCart = (product: Product) => {
    addItem(product)
    setIsCartOpen(true) // Abre a gaveta automaticamente ao adicionar um produto!
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center w-full">
      {/* Navbar com gatilho para abrir o carrinho */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      {/* Gaveta do Carrinho */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
      
      {/* Barra de alternância entre Loja e Admin */}
      <div className="w-full border-b border-zinc-800 bg-zinc-950 px-4 py-2.5 flex justify-center gap-4 text-xs font-medium">
        <button
          onClick={() => setCurrentTab('shop')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${
            currentTab === 'shop' 
              ? 'bg-zinc-800 text-white font-semibold' 
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5 text-indigo-400" />
          Ver Catálogo (Loja)
        </button>

        <button
          onClick={() => setCurrentTab('admin')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${
            currentTab === 'admin' 
              ? 'bg-indigo-600 text-white font-semibold' 
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5 text-white" />
          Painel Sync Dropshipping
        </button>
      </div>

      {/* Conteúdo Principal */}
      <main className="w-full max-w-7xl px-4 sm:px-6 py-8 flex-1">
        {currentTab === 'admin' ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-slate-100">
            <DropshippingSyncPage />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">Produtos em Destaque</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Aproveite as ofertas vindas do catálogo de dropshipping
                </p>
              </div>

              <button 
                onClick={handleRefresh}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-md transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Atualizar Lista
              </button>
            </div>

            {loading && (
              <div className="flex flex-col items-center justify-center py-20 text-zinc-400 gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                <p className="text-sm">Buscando catálogo no banco de dados...</p>
              </div>
            )}

            {error && !loading && (
              <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded-xl text-rose-300 text-sm text-center my-8">
                {error}
              </div>
            )}

            {!loading && !error && products.length === 0 && (
              <div className="p-12 text-center bg-zinc-900/50 border border-zinc-800 rounded-xl my-8 space-y-3">
                <p className="text-zinc-300 font-medium">Nenhum produto cadastrado no banco ainda.</p>
                <p className="text-xs text-zinc-500">
                  Clique na aba "Painel Sync Dropshipping" acima para rodar a primeira sincronização!
                </p>
              </div>
            )}

            {!loading && !error && products.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default App