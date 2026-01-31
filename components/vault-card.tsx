'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatUSD, formatPercent } from "@/lib/utils"
import { TrendingUp, Users, DollarSign, Clock } from "lucide-react"

interface VaultCardProps {
  name: string
  description: string
  tvl: number
  apy: number
  depositors: number
  epoch: string
  onDeposit: () => void
  onViewDetails: () => void
}

export function VaultCard({
  name,
  description,
  tvl,
  apy,
  depositors,
  epoch,
  onDeposit,
  onViewDetails,
}: VaultCardProps) {
  return (
    <Card className="hover:glow-pink">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="w-12 h-12 bg-pixel-pink/20 border-2 border-pixel-pink flex items-center justify-center">
            <span className="text-2xl">🎴</span>
          </div>
          <div>
            <span className="text-sm">{name}</span>
            <div className="flex items-center gap-2 mt-1">
              <span className={`font-vt text-lg ${apy >= 0 ? 'text-pixel-green' : 'text-red-400'}`}>
                {formatPercent(apy)} APY
              </span>
            </div>
          </div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-pixel-pink" />
            <div>
              <p className="font-vt text-white/60 text-lg">Total Value</p>
              <p className="font-vt text-2xl text-white">{formatUSD(tvl)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-pixel-blue" />
            <div>
              <p className="font-vt text-white/60 text-lg">Depositors</p>
              <p className="font-vt text-2xl text-white">{depositors}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 col-span-2">
            <Clock className="w-5 h-5 text-pixel-tan" />
            <div>
              <p className="font-vt text-white/60 text-lg">Current Epoch</p>
              <p className="font-vt text-xl text-white">{epoch}</p>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-3">
        <Button onClick={onDeposit} className="flex-1">
          Deposit
        </Button>
        <Button onClick={onViewDetails} variant="outline" className="flex-1">
          Details
        </Button>
      </CardFooter>
    </Card>
  )
}
