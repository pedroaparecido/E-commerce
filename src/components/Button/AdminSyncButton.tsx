import { useSyncDropshipping } from '@/hooks/use-sync-dropshipping'

export function AdminSyncButton() {
  const { mutate: sync, isPending, isSuccess, isError, error } = useSyncDropshipping()

  return (
    <div className="flex flex-col gap-2 align-start">
      <button
        onClick={() => sync()}
        disabled={isPending}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? 'Sincronizando Estoque...' : 'Forçar Sincronização Agora'}
      </button>

      {isSuccess && (
        <p className="text-sm text-green-600">Sincronização executada com sucesso!</p>
      )}

      {isError && (
        <p className="text-sm text-red-600">
          Erro ao sincronizar: {error instanceof Error ? error.message : 'Falha na API'}
        </p>
      )}
    </div>
  )
}