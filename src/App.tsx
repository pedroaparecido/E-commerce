import { Navbar } from "./components/Navbar/Navbar"
import { ProductCard } from "./components/Cards/ProductCard"
import type { Product } from "./types/product"

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Headset Gaming Wireless Gold Edition 7.1 Surround",
    price: 499.90,
    originalPrice: 650.00,
    rating: 4.9,
    reviewsCount: 128,
    category: "Eletrônicos",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    stockQuantity: 2,
    isExclusive: true
  },
  {
    id: "2",
    title: "Teclado Mecânico RGB Switch Brown ABNT2",
    price: 329.00,
    rating: 4.8,
    reviewsCount: 84,
    category: "Home Office",
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
    stockQuantity: 15
  },
  {
    id: "3",
    title: "Mouse Ergonômico Sem Fio Sensor Óptico 16000 DPI",
    price: 199.90,
    originalPrice: 249.90,
    rating: 4.7,
    reviewsCount: 52,
    category: "Home Office",
    imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80",
    stockQuantity: 0
  },
  {
    id: "4",
    title: "Cadeira de Escritório Ergonômica Mesh Premium",
    price: 1290.00,
    rating: 5.0,
    reviewsCount: 31,
    category: "Home Office",
    imageUrl: "https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?w=500&q=80",
    stockQuantity: 5,
    isExclusive: true
  }
]

export function App() {
  const handleAddToCart = (product: Product) => {
    console.log("Produto adicionado:", product.title)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center w-full">
      <Navbar />
      
      {/* Container do Conteúdo Principal */}
      <main className="w-full max-w-7xl px-4 sm:px-6 py-8 flex-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Produtos em Destaque</h2>
            <p className="text-xs text-zinc-400 mt-1">Aproveite as ofertas com estoque limitado</p>
          </div>
        </div>

        {/* Grid de Cards de Produto */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App