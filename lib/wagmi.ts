// lib/wagmi.ts
import { http, createConfig } from 'wagmi'
import { mainnet, base } from 'wagmi/chains' // Vamos suportar a rede Ethereum e a Base
import { injected } from 'wagmi/connectors' // 'injected' se refere a carteiras de navegador como MetaMask

export const config = createConfig({
  chains: [mainnet, base], // As blockchains que seu app suporta
  connectors: [
    injected(), // Conector para MetaMask e outras carteiras injetadas
  ],
  transports: {
    [mainnet.id]: http(), // Como nos comunicamos com a blockchain Ethereum
    [base.id]: http(),   // Como nos comunicamos com a blockchain Base
  },
})