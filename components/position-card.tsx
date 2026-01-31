'use client'

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatUSD, formatPercent } from "@/lib/utils"
import { TrendingUp, TrendingDown, Coins, PiggyBank } from "lucide-react"

interface PositionCardProps {
  vaultName: string
  vaultTokens: number
  currentValue: number
  depositedValue: number
  sharePercent: number
  onWithdraw: () => void
}

export function PositionCard({
  vaultName,
  vaultTokens,
  currentValue,
  depositedValue,
  sharePercent,
  onWithdraw,
}: PositionCardProps) {
  const pnl = currentValue - depositedValue
  const pnlPercent = depositedValue > 0 ? ((currentValue - depositedValue) / depositedValue) * 100 : 0
  const isProfit = pnl >= 0

  return (
    <Card className="border-2 border-pixel-green/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pixel-green/20 border-2 border-pixel-green flex items-center justify-center">
              <PiggyBank className="w-5 h-5 text-pixel-green" />
            </div>
            <span className="text-sm">{vaultName}</span>
          </div>
          <span className="font-vt text-lg text-white/60">
            {sharePercent.toFixed(2)}% share
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-vt text-lg text-white/60">Vault Tokens</p>
            <p className="font-vt text-2xl text-white flex items-center gap-2">
              <Coins className="w-5 h-5 text-pixel-pink" />
              {vaultTokens.toFixed(4)}
            </p>
          </div>
          
          <div>
            <p className="font-vt text-lg text-white/60">Current Value</p>
            <p className="font-vt text-2xl text-pixel-pink">{formatUSD(currentValue)}</p>
          </div>
        </div>

        <div className="glass-panel p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-vt text-lg text-white/60">Your P&L</p>
              <p className={`font-vt text-2xl flex items-center gap-2 ${isProfit ? 'text-pixel-green' : 'text-red-400'}`}>
                {isProfit ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                {formatUSD(Math.abs(pnl))} ({formatPercent(pnlPercent)})
              </p>
            </div>
            <div className="text-right">
              <p className="font-vt text-lg text-white/60">Deposited</p>
              <p className="font-vt text-xl text-white">{formatUSD(depositedValue)}</p>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button onClick={onWithdraw} variant="outline" className="w-full">
          Request Withdrawal
        </Button>
      </CardFooter>
    </Card>
  )
}
