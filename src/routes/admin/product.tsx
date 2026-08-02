// src/routes/admin/products.tsx (ou componente da página de produtos do admin)
import { AdminSyncButton } from '@/components/Button/AdminSyncButton'

export function AdminProductsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold">Gestão de Produtos</h1>
          <p className="text-gray-500 text-sm">Gerencie o catálogo importado via Dropshipping</p>
        </div>

        {/* Botão de sincronização manual posicionado no topo da gestão */}
        <AdminSyncButton />
      </div>

      {/* Tabela de produtos do Prisma aqui */}
    </div>
  )
}