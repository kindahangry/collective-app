'use client'

import Link from "next/link"
import Image from "next/image"
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from "@/components/ui/button"
import { shortenAddress } from "@/lib/utils"
import { Wallet, LogOut, ChevronDown } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const [showWalletMenu, setShowWalletMenu] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-3 flex items-center justify-between bg-[#2a3b8f]/90 backdrop-blur-md border-b-2 border-white/20 shadow-lg">
      <Link href="/" className="flex items-center gap-3 group cursor-pointer">
        <div className="relative w-10 h-10 overflow-hidden rounded-sm border-2 border-white/40 group-hover:border-pixel-pink transition-colors">
          <Image
            src="/logo.png"
            alt="Collective Markets Logo"
            width={40}
            height={40}
            className="w-full h-full object-cover"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
        <span className="font-press text-white text-xs hidden md:block tracking-tight group-hover:text-pixel-pink transition-colors text-outline-dark">
          COLLECTIVE
        </span>
      </Link>

      <nav className="flex items-center gap-4 md:gap-6">
        <Link
          href="https://collective.markets"
          className="font-vt text-xl md:text-2xl text-white hover:text-pixel-pink transition-colors"
        >
          Home
        </Link>
        <Link
          href="https://collective.markets/docs"
          className="font-vt text-xl md:text-2xl text-white hover:text-pixel-pink transition-colors"
        >
          Docs
        </Link>
        
        {isConnected ? (
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowWalletMenu(!showWalletMenu)}
              className="flex items-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">{shortenAddress(address!)}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
            
            {showWalletMenu && (
              <div className="absolute right-0 top-full mt-2 glass-panel p-2 min-w-[160px]">
                <button
                  onClick={() => {
                    disconnect()
                    setShowWalletMenu(false)
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 transition-colors font-vt text-lg"
                >
                  <LogOut className="w-4 h-4" />
                  Disconnect
                </button>
              </div>
            )}
          </div>
        ) : (
          <Button
            onClick={() => connect({ connector: connectors[0] })}
            loading={isPending}
            size="sm"
            className="flex items-center gap-2"
          >
            <Wallet className="w-4 h-4" />
            <span className="hidden sm:inline">Connect</span>
          </Button>
        )}
      </nav>
    </header>
  )
}
