import { useState } from 'react'
import { api } from '@/lib/api'
import { RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react'

interface SyncSummary {
  totalSynced: number
}

export function DropshippingSyncPage() {
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [lastSyncResult, setLastSyncResult] = useState<SyncSummary | null>(null)

  async function handleStartSync() {
    setLoading(true)
    setSuccessMessage(null)
    setErrorMessage(null)

    try {
      const response = await api.post<{ message: string; summary: SyncSummary }>(
        '/admin/sync/dropshipping'
      )
      setSuccessMessage(response.data.message)
      setLastSyncResult(response.data.summary)
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || 'Erro de conexão com o backend Fastify.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Título e Ação */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Sincronização de Estoque & Preços
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Integração automatizada com os fornecedores de dropshipping.
          </p>
        </div>

        <button
          onClick={handleStartSync}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-all shadow-sm disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Sincronizando...' : 'Disparar Sincronização'}
        </button>
      </div>

      {/* Feedbacks de Retorno */}
      {successMessage && (
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">{successMessage}</p>
            {lastSyncResult && (
              <p className="text-xs text-emerald-700 mt-1">
                Total de <strong>{lastSyncResult.totalSynced}</strong> produtos atualizados no PostgreSQL.
              </p>
            )}
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">Falha na Requisição</p>
            <p className="text-xs text-rose-700 mt-1">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Grid de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Cron Job</span>
          <p className="text-lg font-bold text-gray-900 mt-1">03:00 AM Daily</p>
          <span className="text-xs text-emerald-600 font-medium">America/Sao_Paulo</span>
        </div>

        <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Última Execução</span>
          <p className="text-lg font-bold text-gray-900 mt-1">
            {lastSyncResult ? `${lastSyncResult.totalSynced} itens` : 'Sem histórico recente'}
          </p>
          <span className="text-xs text-gray-500">Manual / API Trigger</span>
        </div>

        <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Margem Automatizada</span>
          <p className="text-lg font-bold text-gray-900 mt-1">+50% Markup</p>
          <span className="text-xs text-gray-500">Calculado sobre o custo</span>
        </div>
      </div>
    </div>
  )
}