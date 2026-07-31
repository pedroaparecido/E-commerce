import { useState } from 'react'
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Menu,
  X,
  Store,
  ChevronDown,
  Percent,
  Sparkles,
  Truck
} from 'lucide-react'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('todas')

  const cartItemCount = 3
  const wishlistCount = 2

  return (
    <header className="w-full bg-black border-b border-zinc-800 text-zinc-100 sticky top-0 z-50">
      {/* 1. Faixa Superior - Dourado Escuro / Ouro Nobre */}
      <div className="bg-gradient-to-r from-amber-950 via-yellow-900 to-amber-950 text-amber-200 border-b border-amber-800/30 text-xs py-1.5 px-4 font-medium flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-amber-400" />
            <span>Frete Grátis para todo o Brasil em compras acima de R$ 199</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-amber-300/80">
            <span className="flex items-center gap-1">
              <Percent className="w-3.5 h-3.5 text-amber-400" /> Cupom: <strong className="text-amber-200">GOLD10</strong>
            </span>
            <span>|</span>
            <a href="#" className="hover:text-amber-200 hover:underline transition-colors">Atendimento VIP</a>
          </div>
        </div>
      </div>

      {/* 2. Barra Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        
        {/* Logo e Botão Mobile */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-amber-400 rounded-lg hover:bg-zinc-900 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <a href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-white group">
            <div className="bg-gradient-to-br from-amber-400 to-yellow-600 group-hover:from-amber-300 group-hover:to-yellow-500 p-2 rounded-xl text-zinc-950 transition-all shadow-md shadow-amber-500/10">
              <Store className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span>
              Lojinha<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">Gold</span>
            </span>
          </a>
        </div>

        {/* Barra de Pesquisa com Filtro de Categoria */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-4">
          <form 
            onSubmit={(e) => e.preventDefault()} 
            className="flex w-full items-center bg-zinc-900/90 border border-zinc-800 rounded-xl focus-within:border-amber-500/80 focus-within:ring-1 focus-within:ring-amber-500/50 transition-all overflow-hidden"
          >
            {/* Seletor de Categoria Integrado */}
            <div className="relative border-r border-zinc-800">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-xs text-zinc-400 font-medium pl-3 pr-8 py-2.5 appearance-none focus:outline-none cursor-pointer hover:text-amber-300 transition-colors"
              >
                <option value="todas" className="bg-zinc-950 text-zinc-200">Todas as Categorias</option>
                <option value="eletronicos" className="bg-zinc-950 text-zinc-200">Eletrônicos</option>
                <option value="home-office" className="bg-zinc-950 text-zinc-200">Home Office</option>
                <option value="pet-care" className="bg-zinc-950 text-zinc-200">Pet Care</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Input de Busca */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar produtos, marcas exclusivas, novidades..."
              className="w-full bg-transparent px-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
            />

            {/* Botão de Buscar */}
            <button
              type="submit"
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 font-bold px-4 py-2.5 transition-all flex items-center justify-center"
              aria-label="Buscar"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>
        </div>

        {/* Ações do Usuário */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Minha Conta / Login */}
          <a
            href="/login"
            className="hidden sm:flex items-center gap-2 p-2 hover:bg-zinc-900 text-zinc-300 hover:text-amber-400 rounded-lg transition-colors text-xs font-medium"
          >
            <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-amber-400">
              <User className="w-4 h-4" />
            </div>
            <div className="text-left hidden lg:block">
              <span className="block text-[10px] text-zinc-500 leading-none">Bem-vindo(a)</span>
              <span className="font-semibold text-zinc-200 leading-tight">Minha Conta</span>
            </div>
          </a>

          {/* Favoritos */}
          <a
            href="/favoritos"
            className="relative p-2.5 text-zinc-400 hover:text-amber-400 hover:bg-zinc-900 rounded-lg transition-colors"
            title="Lista de Desejos"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-amber-500 text-zinc-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </a>

          {/* Carrinho de Compras Dourado */}
          <button
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 px-4 py-2 rounded-xl transition-all font-bold text-sm shadow-md shadow-amber-500/10 active:scale-95"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 stroke-[2.5]" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-black text-amber-400 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-amber-400">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span className="hidden md:inline text-xs font-bold">Meu Carrinho</span>
          </button>
        </div>
      </div>

      {/* 3. Barra de Categorias e Atalhos */}
      <nav className="hidden lg:block border-t border-zinc-900 bg-zinc-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-xs font-medium text-zinc-400">
          <ul className="flex items-center gap-8 py-2.5">
            <li>
              <a href="#" className="text-amber-400 font-semibold flex items-center gap-1.5 hover:text-amber-300 transition-colors">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                Lançamentos Exclusivos
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-300 transition-colors">Eletrônicos & Áudio</a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-300 transition-colors">Home Office & Ergonomia</a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-300 transition-colors">Pet Care Premium</a>
            </li>
            <li>
              <a href="#" className="text-yellow-400 font-semibold hover:text-yellow-300 transition-colors">
                Ofertas Gold %
              </a>
            </li>
          </ul>

          <a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors text-[11px]">
            Central de Atendimento
          </a>
        </div>
      </nav>

      {/* 4. Menu Mobile Expansível */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-800 bg-zinc-950 p-4 space-y-4">
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden focus-within:border-amber-500">
            <input
              type="text"
              placeholder="O que você procura hoje?"
              className="w-full bg-transparent px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
            />
            <button type="submit" className="bg-amber-500 px-3 py-2 text-zinc-950 font-bold">
              <Search className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          <div className="space-y-2 pt-2 border-t border-zinc-900 text-sm font-medium text-zinc-300">
            <a href="#" className="block px-3 py-2 rounded-lg hover:bg-zinc-900 text-amber-400 font-semibold">✨ Lançamentos Exclusivos</a>
            <a href="#" className="block px-3 py-2 rounded-lg hover:bg-zinc-900">Eletrônicos</a>
            <a href="#" className="block px-3 py-2 rounded-lg hover:bg-zinc-900">Home Office</a>
            <a href="#" className="block px-3 py-2 rounded-lg hover:bg-zinc-900">Pet Care</a>
            <a href="#" className="block px-3 py-2 rounded-lg hover:bg-zinc-900 text-yellow-400">Ofertas Gold</a>
            <a href="/login" className="block px-3 py-2 rounded-lg hover:bg-zinc-900 text-amber-400 pt-2 border-t border-zinc-900">Entrar na Minha Conta</a>
          </div>
        </div>
      )}
    </header>
  )
}