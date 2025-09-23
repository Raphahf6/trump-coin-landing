// app/layout.tsx
import type { Metadata } from 'next'
import { Press_Start_2P } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header';
import { Web3Provider } from '@/components/Web3Provider';


const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-press-start',
});

export const metadata: Metadata = {
  title: 'Trump Coin - Make Crypto Great Again',
  description: 'The best coin, believe me.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${pressStart2P.variable}`}>
      <body className="font-pixel">
        {/* ESTA É A DIV PRINCIPAL COM O BACKGROUND PIXEL ART */}
        
        <Web3Provider>
        <div
          className="min-h-screen bg-cover bg-center" // Classes Tailwind para background
          style={{ 
            backgroundImage: "url('/oval-office-bg.webp')", // Link para sua imagem
            backgroundAttachment: 'fixed', // Opcional: faz o background ficar fixo ao rolar
          }}
        >
          <Header />
          {children}
        </div>
        </Web3Provider>
        {/* Fim da div do background */}
      </body>
    </html>
  )
}