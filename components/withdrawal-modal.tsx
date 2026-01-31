'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatUSD } from '@/lib/utils'
import { AlertTriangle, Clock, ArrowRight, Zap } from 'lucide-react'

interface WithdrawalModalProps {
  open: boolean
  onClose: () => void
  vaultName: string
  vaultTokens: number
  currentValue: number
  epochEnd: string
}

export function WithdrawalModal({
  open,
  onClose,
  vaultName,
  vaultTokens,
  currentValue,
  epochEnd,
}: WithdrawalModalProps) {
  const [amount, setAmount] = useState('')
  const [isEmergency, setIsEmergency] = useState(false)
  const [step, setStep] = useState<'input' | 'confirm' | 'success'>('input')

  const numAmount = parseFloat(amount) || 0
  const maxTokens = vaultTokens
  const tokensToWithdraw = Math.min(numAmount, maxTokens)
  const valueToReceive = (tokensToWithdraw / vaultTokens) * currentValue
  const emergencyFee = isEmergency ? valueToReceive * 0.03 : 0
  const netValue = valueToReceive - emergencyFee
  const isValidAmount = numAmount > 0 && numAmount <= maxTokens

  const handleWithdraw = async () => {
    setStep('confirm')
    setTimeout(() => {
      setStep('success')
    }, 2000)
  }

  const handleClose = () => {
    setStep('input')
    setAmount('')
    setIsEmergency(false)
    onClose()
  }

  const setMaxAmount = () => {
    setAmount(maxTokens.toString())
  }

  return (
    <Modal open={open} onClose={handleClose} title={`Withdraw from ${vaultName}`}>
      {step === 'input' && (
        <div className="space-y-6">
          {/* Withdrawal Type Toggle */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setIsEmergency(false)}
              className={`p-4 border-2 transition-all ${
                !isEmergency 
                  ? 'border-pixel-green bg-pixel-green/20' 
                  : 'border-white/20 hover:border-white/40'
              }`}
            >
              <Clock className="w-6 h-6 mx-auto mb-2 text-pixel-green" />
              <p className="font-vt text-xl text-white">Standard</p>
              <p className="font-vt text-sm text-white/60">No fee • End of epoch</p>
            </button>
            <button
              onClick={() => setIsEmergency(true)}
              className={`p-4 border-2 transition-all ${
                isEmergency 
                  ? 'border-pixel-pink bg-pixel-pink/20' 
                  : 'border-white/20 hover:border-white/40'
              }`}
            >
              <Zap className="w-6 h-6 mx-auto mb-2 text-pixel-pink" />
              <p className="font-vt text-xl text-white">Emergency</p>
              <p className="font-vt text-sm text-white/60">3% fee • ~2 weeks</p>
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-vt text-xl text-white/70">
                Vault Tokens to Withdraw
              </label>
              <button 
                onClick={setMaxAmount}
                className="font-vt text-lg text-pixel-pink hover:underline"
              >
                Max: {maxTokens.toFixed(4)}
              </button>
            </div>
            <Input
              type="number"
              placeholder="Enter amount..."
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              max={maxTokens}
            />
          </div>

          <div className="glass-panel p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-vt text-lg text-white/70">Tokens to Withdraw</span>
              <span className="font-vt text-xl text-white">{tokensToWithdraw.toFixed(4)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-vt text-lg text-white/70">Estimated Value</span>
              <span className="font-vt text-xl text-white">{formatUSD(valueToReceive)}</span>
            </div>
            {isEmergency && (
              <div className="flex items-center justify-between text-red-400">
                <span className="font-vt text-lg">Emergency Fee (3%)</span>
                <span className="font-vt text-xl">-{formatUSD(emergencyFee)}</span>
              </div>
            )}
            <div className="border-t border-white/20 pt-3 flex items-center justify-between">
              <span className="font-vt text-lg text-white">You Receive</span>
              <span className="font-vt text-2xl text-pixel-green">{formatUSD(netValue)} USDC</span>
            </div>
          </div>

          {isEmergency && (
            <div className="bg-red-500/20 border-2 border-red-500 p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <p className="font-vt text-lg text-white">
                  Emergency withdrawals incur a 3% fee and may take up to 2 weeks to process as the vendor must liquidate inventory.
                </p>
              </div>
            </div>
          )}

          {!isEmergency && (
            <div className="bg-pixel-blue/20 border-2 border-pixel-blue p-4">
              <p className="font-vt text-lg text-white/80">
                <span className="text-pixel-blue font-bold">Timeline:</span> Standard withdrawals are processed after the current epoch ends on {epochEnd}. Submit your request before the deadline (2 weeks prior).
              </p>
            </div>
          )}

          <Button 
            onClick={handleWithdraw} 
            disabled={!isValidAmount}
            variant={isEmergency ? "danger" : "default"}
            className="w-full"
            size="lg"
          >
            {isEmergency ? 'Emergency Withdraw' : 'Request Withdrawal'}
          </Button>
        </div>
      )}

      {step === 'confirm' && (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-pixel-pink border-t-transparent rounded-full animate-spin" />
          <p className="font-vt text-2xl text-white">
            {isEmergency ? 'Processing withdrawal...' : 'Submitting request...'}
          </p>
          <p className="font-vt text-lg text-white/60 mt-2">
            Please confirm in your wallet
          </p>
        </div>
      )}

      {step === 'success' && (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-pixel-green/20 border-2 border-pixel-green flex items-center justify-center">
            <span className="text-3xl">✓</span>
          </div>
          <p className="font-press text-sm text-white mb-2">
            {isEmergency ? 'WITHDRAWAL INITIATED!' : 'REQUEST SUBMITTED!'}
          </p>
          <p className="font-vt text-xl text-white mb-4">
            {isEmergency 
              ? `You will receive ~${formatUSD(netValue)} within 2 weeks`
              : `Your withdrawal will be processed after ${epochEnd}`
            }
          </p>
          <Button onClick={handleClose} className="w-full">
            Done
          </Button>
        </div>
      )}
    </Modal>
  )
}
