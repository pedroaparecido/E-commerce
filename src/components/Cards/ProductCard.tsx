import { ShoppingCart, Heart, Star } from 'lucide-react'
import type { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const isOutOfStock = product.stockQuantity === 0
  const isLowStock = product.stockQuantity > 0 && product.stockQuantity <= 3

  return (
    <div className="group bg-zinc-900 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between hover:shadow-lg hover:shadow-amber-500/5">
      {/* Imagem e Badges */}
      <div className="relative aspect-square bg-zinc-950 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />

        {/* Botão Favoritar */}
        <button 
          className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-md border border-zinc-800 rounded-full text-zinc-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
          aria-label="Adicionar aos favoritos"
        >
          <Heart className="w-4 h-4" />
        </button>

        {/* Badges de Destaque / Estoque */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isExclusive && (
            <span className="bg-amber-500 text-zinc-950 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
              Exclusivo
            </span>
          )}
          {isLowStock && (
            <span className="bg-amber-950/90 border border-amber-500/40 text-amber-300 font-semibold text-[10px] px-2 py-0.5 rounded-md">
              Apenas {product.stockQuantity} un!
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-zinc-900/90 border border-zinc-700 text-zinc-400 font-semibold text-[10px] px-2 py-0.5 rounded-md">
              Esgotado
            </span>
          )}
        </div>
      </div>

      {/* Informações do Produto */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <span className="text-[11px] font-medium text-amber-400/80 uppercase tracking-wider">
            {product.category}
          </span>
          <h3 className="font-semibold text-sm text-zinc-100 group-hover:text-amber-300 transition-colors line-clamp-2 mt-0.5">
            {product.title}
          </h3>

          {/* Avaliações */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="text-xs font-bold ml-1">{product.rating}</span>
            </div>
            <span className="text-[11px] text-zinc-500">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Preço e Ação */}
        <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
          <div>
            {product.originalPrice && (
              <span className="block text-[11px] text-zinc-500 line-through">
                R$ {product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-base font-extrabold text-white">
              R$ {product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => onAddToCart?.(product)}
            disabled={isOutOfStock}
            className="flex items-center justify-center p-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 rounded-xl transition-all font-bold disabled:opacity-30 disabled:cursor-not-allowed shadow-md shadow-amber-500/10 active:scale-95"
            title="Adicionar ao Carrinho"
          >
            <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  )
}