import { Link, Outlet, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Package, 
  RefreshCw, 
  Settings, 
  Store, 
  User 
} from 'lucide-react'

export function AdminLayout() {
  const location = useLocation()

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Produtos', path: '/admin/produtos', icon: Package },
    { label: 'Sync Dropshipping', path: '/admin/dropshipping', icon: RefreshCw },
    { label: 'Configurações', path: '/admin/configuracoes', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans text-gray-900">
      {/* Sidebar / Barra Lateral */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
        {/* Header da Sidebar */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800 font-semibold text-white">
          <Store className="w-6 h-6 text-indigo-400" />
          <span className="tracking-wide">Admin E-commerce</span>
        </div>

        {/* Menu de Navegação */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Footer da Sidebar / Perfil do Admin */}
        <div className="p-4 border-t border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300">
            <User className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-xs">
            <span className="font-medium text-slate-200">Pedro (Admin)</span>
            <span className="text-slate-500">admin@lojinha.com</span>
          </div>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Superior */}
        <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Admin</span>
            <span>/</span>
            <span className="font-medium text-gray-800 capitalize">
              {location.pathname.replace('/admin/', '').replace('/', '') || 'Dashboard'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              API Online (Porta 3333)
            </span>
          </div>
        </header>

        {/* Renderizador de Conteúdo das Rotas */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}