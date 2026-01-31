'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { Navbar } from '@/components/navbar'
import { VaultCard } from '@/components/vault-card'
import { PositionCard } from '@/components/position-card'
import { DepositModal } from '@/components/deposit-modal'
import { WithdrawalModal } from '@/components/withdrawal-modal'
import { Coins, TrendingUp, Users, Clock } from 'lucide-react'
import { formatUSD } from '@/lib/utils'

// Mock data - replace with real contract calls
const MOCK_VAULTS = [
  {
    id: 'collective-vendor-1',
    name: 'Collective Vendor',
    description: 'Premium graded Pokémon cards with focus on vintage holos and modern chase cards.',
    tvl: 250000,
    apy: 18.5,
    depositors: 47,
    epoch: 'Q1 2025 (Jan-Mar)',
    tokenPrice: 1.185,
  },
]

const MOCK_POSITIONS = [
  {
    vaultId: 'collective-vendor-1',
    vaultName: 'Collective Vendor',
    vaultTokens: 8.4375,
    currentValue: 10000,
    depositedValue: 8500,
    sharePercent: 4.0,
  },
]

export default function Dashboard() {
  const { isConnected } = useAccount()
  const [depositModalOpen, setDepositModalOpen] = useState(false)
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)
  const [selectedVault, setSelectedVault] = useState<typeof MOCK_VAULTS[0] | null>(null)
  const [selectedPosition, setSelectedPosition] = useState<typeof MOCK_POSITIONS[0] | null>(null)

  const handleDeposit = (vault: typeof MOCK_VAULTS[0]) => {
    setSelectedVault(vault)
    setDepositModalOpen(true)
  }

  const handleWithdraw = (position: typeof MOCK_POSITIONS[0]) => {
    setSelectedPosition(position)
    setWithdrawModalOpen(true)
  }

  // Stats for header
  const totalTVL = MOCK_VAULTS.reduce((sum, v) => sum + v.tvl, 0)
  const totalDepositors = MOCK_VAULTS.reduce((sum, v) => sum + v.depositors, 0)
  const userTotalValue = MOCK_POSITIONS.reduce((sum, p) => sum + p.currentValue, 0)

  return (
    <main className="min-h-screen relative">
      {/* Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          imageRendering: "pixelated",
          opacity: 0.3,
        }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-background/80 to-background" />

      <Navbar />
      
      <div className="relative z-10 pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-in fade-in slide-in-from-top duration-500">
          <h1 className="font-press text-xl md:text-2xl text-white text-outline-dark mb-2">
            COLLECTIVE APP
          </h1>
          <p className="font-vt text-2xl text-white/80">
            Transparent, on-chain access to curated Pokémon vendor markets.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-in fade-in slide-in-from-bottom duration-500 delay-100">
          <div className="glass-panel p-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-pixel-pink/20 border-2 border-pixel-pink flex items-center justify-center">
              <Coins className="w-6 h-6 text-pixel-pink" />
            </div>
            <div>
              <p className="font-vt text-lg text-white/60">Total TVL</p>
              <p className="font-vt text-2xl text-white">{formatUSD(totalTVL)}</p>
            </div>
          </div>
          
          <div className="glass-panel p-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-pixel-blue/20 border-2 border-pixel-blue flex items-center justify-center">
              <Users className="w-6 h-6 text-pixel-blue" />
            </div>
            <div>
              <p className="font-vt text-lg text-white/60">Depositors</p>
              <p className="font-vt text-2xl text-white">{totalDepositors}</p>
            </div>
          </div>
          
          <div className="glass-panel p-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-pixel-green/20 border-2 border-pixel-green flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-pixel-green" />
            </div>
            <div>
              <p className="font-vt text-lg text-white/60">Avg APY</p>
              <p className="font-vt text-2xl text-pixel-green">+18.5%</p>
            </div>
          </div>
          
          <div className="glass-panel p-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-pixel-tan/20 border-2 border-pixel-tan flex items-center justify-center">
              <Clock className="w-6 h-6 text-pixel-tan" />
            </div>
            <div>
              <p className="font-vt text-lg text-white/60">Current Epoch</p>
              <p className="font-vt text-xl text-white">Q1 2025</p>
            </div>
          </div>
        </div>

        {/* Your Positions (only show if connected and has positions) */}
        {isConnected && MOCK_POSITIONS.length > 0 && (
          <section className="mb-8 animate-in fade-in slide-in-from-bottom duration-500 delay-200">
            <h2 className="font-press text-sm text-white mb-4 flex items-center gap-2">
              <span className="text-pixel-green">▶</span> YOUR POSITIONS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_POSITIONS.map((position) => (
                <PositionCard
                  key={position.vaultId}
                  {...position}
                  onWithdraw={() => handleWithdraw(position)}
                />
              ))}
            </div>
            
            {/* Total Portfolio Value */}
            <div className="mt-4 glass-panel p-4 border-2 border-pixel-pink/50">
              <div className="flex items-center justify-between">
                <span className="font-vt text-xl text-white/70">Total Portfolio Value</span>
                <span className="font-press text-lg text-pixel-pink">{formatUSD(userTotalValue)}</span>
              </div>
            </div>
          </section>
        )}

        {/* Available Vaults */}
        <section className="animate-in fade-in slide-in-from-bottom duration-500 delay-300">
          <h2 className="font-press text-sm text-white mb-4 flex items-center gap-2">
            <span className="text-pixel-pink">▶</span> AVAILABLE VAULTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_VAULTS.map((vault) => (
              <VaultCard
                key={vault.id}
                name={vault.name}
                description={vault.description}
                tvl={vault.tvl}
                apy={vault.apy}
                depositors={vault.depositors}
                epoch={vault.epoch}
                onDeposit={() => handleDeposit(vault)}
                onViewDetails={() => {}}
              />
            ))}
          </div>
        </section>

        {/* Info Section */}
        <section className="mt-12 glass-panel p-6 animate-in fade-in slide-in-from-bottom duration-500 delay-400">
          <h2 className="font-press text-sm text-white mb-4">HOW IT WORKS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-pixel-pink/20 border-2 border-pixel-pink flex items-center justify-center">
                <span className="text-3xl">1️⃣</span>
              </div>
              <h3 className="font-vt text-2xl text-white mb-2">Deposit USDC</h3>
              <p className="font-vt text-lg text-white/60">
                Connect your wallet and deposit USDC to receive vault tokens representing your share.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-pixel-blue/20 border-2 border-pixel-blue flex items-center justify-center">
                <span className="text-3xl">2️⃣</span>
              </div>
              <h3 className="font-vt text-2xl text-white mb-2">Vendors Trade</h3>
              <p className="font-vt text-lg text-white/60">
                Expert vendors use pooled capital to buy and sell Pokémon cards for profit.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-pixel-green/20 border-2 border-pixel-green flex items-center justify-center">
                <span className="text-3xl">3️⃣</span>
              </div>
              <h3 className="font-vt text-2xl text-white mb-2">Earn Returns</h3>
              <p className="font-vt text-lg text-white/60">
                As the vault grows, your tokens increase in value. Withdraw anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-white/40 font-press text-xs">
          © 2025 COLLECTIVE MARKETS
        </footer>
      </div>

      {/* Modals */}
      {selectedVault && (
        <DepositModal
          open={depositModalOpen}
          onClose={() => setDepositModalOpen(false)}
          vaultName={selectedVault.name}
          currentPrice={selectedVault.tokenPrice}
        />
      )}

      {selectedPosition && (
        <WithdrawalModal
          open={withdrawModalOpen}
          onClose={() => setWithdrawModalOpen(false)}
          vaultName={selectedPosition.vaultName}
          vaultTokens={selectedPosition.vaultTokens}
          currentValue={selectedPosition.currentValue}
          epochEnd="March 31, 2025"
        />
      )}
    </main>
  )
}
