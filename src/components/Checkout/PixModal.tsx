import { useState, useEffect } from "react"
import { Check, Copy, QrCode, X, CheckCircle2, Loader2 } from "lucide-react"
import { api } from "../../lib/api"

interface PixModalProps {
  paymentId: string
  isOpen: boolean
  onClose: () => void
  qrCode: string
  qrCodeBase64: string
  totalAmount: number
}

export function PixModal({ 
  paymentId, // 👈 1. Desestruture o paymentId aqui!
  isOpen, 
  onClose, 
  qrCode, 
  qrCodeBase64, 
  totalAmount 
}: PixModalProps) {
  const [copied, setCopied] = useState(false)
  const [isPaid, setIsPaid] = useState(false) // 👈 Status do pagamento no modal

  // 🟢 2. POLLING: Consulta o backend a cada 3 segundos
  useEffect(() => {
    if (!isOpen || !paymentId || isPaid) return

    const interval = setInterval(async () => {
      try {
        const response = await api.get(`/checkout/status/${paymentId}`)
        
        if (response.data.status === "approved") {
          setIsPaid(true)
          clearInterval(interval)
        }
      } catch (error) {
        console.error("Erro ao verificar status do pagamento:", error)
      }
    }, 3000) // 3 segundos

    return () => clearInterval(interval)
  }, [isOpen, paymentId, isPaid])

  if (!isOpen) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(qrCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const formattedTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(totalAmount)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />

      <div className="relative w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-2xl z-10 animate-in zoom-in-95 duration-200 text-center space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 🟢 TELA DE PAGAMENTO CONFIRMADO */}
        {isPaid ? (
          <div className="py-6 space-y-4 animate-in zoom-in-95 duration-300">
            <div className="inline-flex p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Pagamento Confirmado!</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Recebemos o seu Pix de{" "}
                <span className="text-emerald-400 font-semibold">{formattedTotal}</span>.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-2.5 px-4 rounded-xl transition-all text-xs"
            >
              Concluir
            </button>
          </div>
        ) : (
          /* 🟡 TELA DO QR CODE (PENDENTE) */
          <>
            <div className="inline-flex p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400">
              <QrCode className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Pagamento via Pix</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Escaneie o QR Code abaixo ou copie a chave Pix para finalizar a compra de{" "}
                <span className="text-emerald-400 font-semibold">{formattedTotal}</span>.
              </p>
            </div>

            {/* Exibição do QR Code Base64 */}
            {qrCodeBase64 && (
              <div className="flex justify-center bg-white p-3 rounded-xl border border-zinc-800 w-fit mx-auto">
                <img
                  src={`data:image/jpeg;base64,${qrCodeBase64}`}
                  alt="QR Code Pix"
                  className="w-48 h-48 object-contain"
                />
              </div>
            )}

            {/* Indicador visual de aguardando pagamento */}
            <div className="flex items-center justify-center gap-2 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 py-2 px-3 rounded-xl">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Aguardando confirmação do pagamento...</span>
            </div>

            {/* Input e Botão Copia e Cola */}
            <div className="space-y-2">
              <p className="text-xs text-zinc-400 text-left font-medium">Código Pix Copia e Cola:</p>
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl p-2">
                <input
                  type="text"
                  readOnly
                  value={qrCode}
                  className="bg-transparent text-xs text-zinc-300 flex-1 outline-none px-2 truncate"
                />
                <button
                  onClick={handleCopy}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    copied
                      ? "bg-emerald-500 text-zinc-950"
                      : "bg-amber-500 hover:bg-amber-400 text-zinc-950"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copiar
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}