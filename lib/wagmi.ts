import { http, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

// Define HyperEVM chain (placeholder values - update with real ones)
const hyperEVM = {
  id: 999,
  name: 'HyperEVM',
  nativeCurrency: {
    decimals: 18,
    name: 'HYPE',
    symbol: 'HYPE',
  },
  rpcUrls: {
    default: { http: ['https://rpc.hyperliquid.xyz/evm'] },
  },
  blockExplorers: {
    default: { name: 'HyperScan', url: 'https://hyperscan.xyz' },
  },
} as const

export const config = createConfig({
  chains: [hyperEVM, mainnet],
  connectors: [
    injected(),
  ],
  transports: {
    [hyperEVM.id]: http(),
    [mainnet.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
