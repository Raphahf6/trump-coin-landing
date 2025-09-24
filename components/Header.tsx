// components/Header.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react'; // 1. Importe o 'useRef'
import PixelButton from './PixelButton';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import toast from 'react-hot-toast';

function truncateAddress(address: string) {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

const Header = () => {
  const { address, isConnected, status: accountStatus } = useAccount();
  const { connect, connectors, status: connectStatus } = useConnect();
  const { disconnect } = useDisconnect();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 2. Usamos useRef para guardar a referência do timeout
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isLoading = accountStatus === 'connecting' || accountStatus === 'reconnecting';

  // 3. Efeito que "ouve" o status da conexão para cancelar o timeout
  useEffect(() => {
    // Se o status se torna 'pending' (pop-up abriu), cancelamos o timeout agendado
    if (connectStatus === 'pending' && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [connectStatus]); // Este efeito roda toda vez que 'connectStatus' muda

  const handleConnectClick = () => {    
    // Tenta a conexão
    connect({ connector: connectors[0] });

    if (connectStatus == "error") {
        toast.error('MetaMask not found. Please install the extension!');
    }

    console.log(connectStatus)
  };

  // O resto do componente (lógica de renderização) permanece o mesmo
  if (!isClient) {
    return (
      <header className="w-full bg-brand-red border-b-4 border-brand-dark p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl uppercase">$TRUMP</h1>
          <nav className="hidden md:flex items-center gap-4 text-sm">
            <a href="#tokenomics" className="hover:text-brand-gold">Tokenomics</a>
            <a href="#how-to-buy" className="hover:text-brand-gold">How to Buy</a>
            <a href="#whitepaper" className="hover:text-brand-gold">Whitepaper</a>
            <a href="#community" className="hover:text-brand-gold">Join</a>
          </nav>
          <PixelButton disabled={true}>Loading Wallet...</PixelButton>
        </div>
      </header>
    );
  }

  if (isConnected) {
    return (
      <header className="w-full bg-brand-red border-b-4 border-brand-dark p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl uppercase">$TRUMP</h1>
          <nav className="hidden md:flex items-center gap-4 text-sm">
           <a href="#tokenomics" className="hover:text-brand-gold">Tokenomics</a>
            <a href="#how-to-buy" className="hover:text-brand-gold">How to Buy</a>
            <a href="#whitepaper" className="hover:text-brand-gold">Whitepaper</a>
            <a href="#community" className="hover:text-brand-gold">Join</a>
          </nav>
          <PixelButton onClick={() => disconnect()}>
            {truncateAddress(address!)}
          </PixelButton>
        </div>
      </header>
    );
  }
  
  return (
    <header className="w-full bg-brand-red border-b-4 border-brand-dark p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl uppercase">$TRUMP</h1>
        <nav className="hidden md:flex items-center gap-4 text-sm">
         <a href="#tokenomics" className="hover:text-brand-gold">Tokenomics</a>
            <a href="#how-to-buy" className="hover:text-brand-gold">How to Buy</a>
            <a href="#whitepaper" className="hover:text-brand-gold">Whitepaper</a>
            <a href="#community" className="hover:text-brand-gold">Join</a>
        </nav>
        <PixelButton onClick={handleConnectClick} disabled={isLoading}>
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </PixelButton>
      </div>
    </header>
  );
};

export default Header;