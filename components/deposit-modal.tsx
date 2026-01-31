'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatUSD } from '@/lib/utils'
import { useAccount } from 'wagmi'
import { AlertCircle, ArrowRight, Coins } from 'lucide-react'

interface DepositModalProps {
  open: boolean
  onClose: () => void
  vaultName: string
  currentPrice: number // price per vault token
}

export function DepositModal({ open, onClose, vaultName, currentPrice }: DepositModalProps) {
  const { isConnected } = useAccount()
  const [amount, setAmount] = useState('')
  const [step, setStep] = useState<'input' | 'confirm' | 'success'>('input')

  const numAmount = parseFloat(amount) || 0
  const tokensReceived = numAmount > 0 ? numAmount / currentPrice : 0
  const isValidAmount = numAmount >= 1000

  const handleDeposit = async () => {
    // TODO: Implement actual deposit logic with smart contract
    setStep('confirm')
    // Simulate transaction
    setTimeout(() => {
      setStep('success')
    }, 2000)
  }

  const handleClose = () => {
    setStep('input')
    setAmount('')
    onClose()
  }

  if (!isConnected) {
    return (
      <Modal open={open} onClose={handleClose} title="Connect Wallet">
        <div className="text-center py-8">
          <Coins className="w-16 h-16 mx-auto text-pixel-pink mb-4" />
          <p className="font-vt text-2xl text-white mb-4">
            Please connect your wallet to deposit
          </p>
        </div>
      </Modal>
    )
  }

  return (
    <Modal open={open} onClose={handleClose} title={`Deposit to ${vaultName}`}>
      {step === 'input' && (
        <div className="space-y-6">
          <div>
            <label className="font-vt text-xl text-white/70 block mb-2">
              Amount (USDC)
            </label>
            <Input
              type="number"
              placeholder="Enter amount..."
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={1000}
            />
            {amount && !isValidAmount && (
              <div className="flex items-center gap-2 mt-2 text-red-400">
                <AlertCircle className="w-4 h-4" />
                <span className="font-vt text-lg">Minimum deposit is $1,000</span>
              </div>
            )}
          </div>

          <div className="glass-panel p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-vt text-lg text-white/70">You Deposit</span>
              <span className="font-vt text-xl text-white">{formatUSD(numAmount)} USDC</span>
            </div>
            <div className="flex items-center justify-center my-2">
              <ArrowRight className="w-5 h-5 text-pixel-pink" />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-vt text-lg text-white/70">You Receive</span>
              <span className="font-vt text-xl text-pixel-pink">
                {tokensReceived.toFixed(4)} Vault Tokens
              </span>
            </div>
          </div>

          <div className="bg-pixel-tan/20 border-2 border-pixel-tan p-4">
            <p className="font-vt text-lg text-white/80">
              <span className="text-pixel-tan font-bold">Note:</span> Your deposit will be active from the start of the next epoch. Vault tokens represent your proportional share of the vault.
            </p>
          </div>

          <Button 
            onClick={handleDeposit} 
            disabled={!isValidAmount}
            className="w-full"
            size="lg"
          >
            Deposit {formatUSD(numAmount)}
          </Button>
        </div>
      )}

      {step === 'confirm' && (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-pixel-pink border-t-transparent rounded-full animate-spin" />
          <p className="font-vt text-2xl text-white">
            Confirming transaction...
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
            DEPOSIT SUCCESSFUL!
          </p>
          <p className="font-vt text-2xl text-white mb-4">
            You received {tokensReceived.toFixed(4)} vault tokens
          </p>
          <Button onClick={handleClose} className="w-full">
            Done
          </Button>
        </div>
      )}
    </Modal>
  )
}
