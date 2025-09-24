// components/Header.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import PixelButton from './PixelButton';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import toast from 'react-hot-toast';
import { FaBars, FaTimes } from 'react-icons/fa'; // Ícones para o menu

function truncateAddress(address: string) {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

const Header = () => {
  const { address, isConnected, status: accountStatus } = useAccount();
  const { connect, connectors, status: connectStatus } = useConnect();
  const { disconnect } = useDisconnect();

  // --- LÓGICA DO MENU HAMBÚRGUER ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Efeito para travar a rolagem da página quando o menu estiver aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);
  
  // O resto da sua lógica de conexão que já funciona
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLoading = accountStatus === 'connecting' || accountStatus === 'reconnecting';

  const handleConnectClick = () => {
    const initialConnectStatus = connectStatus;
    connect({ connector: connectors[0] });
   if (connectStatus == 'error') {
     toast.error('MetaMask not found. Please install the extension!');
   }
  };

  const NavLinks = () => (
    <>
      <a href="#tokenomics" className="hover:text-brand-gold" onClick={() => setIsMenuOpen(false)}>Tokenomics</a>
      <a href="#how-to-buy" className="hover:text-brand-gold" onClick={() => setIsMenuOpen(false)}>How to Buy</a>
      <a href="#whitepaper" className="hover:text-brand-gold" onClick={() => setIsMenuOpen(false)}>Whitepaper</a>
    </>
  );

  return (
    <header className="w-full bg-brand-red border-b-4 border-brand-dark p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl uppercase">$TRUMP</h1>

        {/* --- NAVEGAÇÃO PARA DESKTOP --- */}
        <nav className="hidden lg:flex items-center gap-4 text-sm">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-4">
          {/* Botão Conectar/Desconectar (sempre visível) */}
          {isClient && (
            isConnected ? (
              <PixelButton onClick={() => disconnect()}>{truncateAddress(address!)}</PixelButton>
            ) : (
              <PixelButton onClick={handleConnectClick} disabled={isLoading}>
                {isLoading ? 'Connecting...' : 'Connect Wallet'}
              </PixelButton>
            )
          )}
          {!isClient && <PixelButton disabled={true}>Loading...</PixelButton>}
          
          {/* --- BOTÃO HAMBÚRGUER (SÓ APARECE EM TELAS PEQUENAS) --- */}
          <button 
            className="text-[clamp(0.8rem,4vw,5.5rem)] lg:hidden text-brand-dark" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* --- PAINEL DO MENU MOBILE --- */}
      <div 
        className={`
          lg:hidden fixed top-0 left-0 w-full h-full bg-brand-dark/90 backdrop-blur-sm z-40
          transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8 text-2xl text-white">
          <NavLinks />
        </nav>
      </div>
    </header>
  );
};

export default Header;