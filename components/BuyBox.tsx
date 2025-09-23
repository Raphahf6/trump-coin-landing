// components/BuyBox.tsx
"use client"; // Necessário para usar hooks como useState

import React, { useState } from 'react';
import PixelButton from './PixelButton';

const BuyBox = () => {
  // MODEL: Nosso estado para os inputs
  const [ethAmount, setEthAmount] = useState('0.1');
  const [trumpAmount, setTrumpAmount] = useState('1000.00');

  // Uma taxa de conversão falsa para o exemplo
  const TRUMP_PRICE_IN_ETH = 0.0001;

  // CONTROLLER: Função que lida com a mudança no input de ETH

  const handleEthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;

  // 1. Verifica se o valor é negativo. Se for, ignora a entrada e não faz nada.
  // Usamos parseFloat para a comparação numérica.
  if (parseFloat(value) < 0) {
    return;
  }

  // 2. Se o valor for válido (positivo ou zero), atualiza o estado.
  setEthAmount(value);
  
  const numericValue = parseFloat(value);
  if (!isNaN(numericValue)) {
    setTrumpAmount((numericValue / TRUMP_PRICE_IN_ETH).toFixed(2));
  } else {
    setTrumpAmount('');
  }
};

  // VIEW: O JSX que será renderizado
  return (
    <div className="bg-brand-light border-4 border-brand-dark p-6 w-full max-w-md">
      <h2 className="text-xl text-center uppercase mb-4">Stage 1 - Buy Now!</h2>
      
      <div className="space-y-4">
        {/* Input de ETH */}
        <div className="bg-white p-2 border-2 border-brand-dark">
          <label className="text-sm">Pay with ETH</label>
          <input
            type="number"
            value={ethAmount}
            onChange={handleEthChange}
            className="w-full bg-transparent text-2xl font-pixel outline-none"
          />
        </div>

        {/* Input de TRUMP */}
        <div className="bg-white p-2 border-2 border-brand-dark">
          <label className="text-sm">Receive $TRUMP</label>
          <input
            type="text"
            value={trumpAmount}
            readOnly // Este campo é apenas para exibição
            className="w-full bg-transparent text-2xl font-pixel outline-none text-gray-500"
            placeholder="0"
          />
        </div>

        <PixelButton className="w-full">
          Buy Now
        </PixelButton>
      </div>
    </div>
  );
};

export default BuyBox;