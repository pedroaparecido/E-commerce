import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api'

interface SyncResponse {
  message: string
  itemsProcessed?: number
}

export function useSyncDropshipping() {
  return useMutation({
    mutationFn: async () => {
      const response = await api.post<SyncResponse>('/admin/sync/dropshipping')
      return response.data
    },
  })
}