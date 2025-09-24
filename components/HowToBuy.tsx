// components/HowToBuy.tsx
"use client";

import React from 'react';
// Importamos os ícones que vamos usar da biblioteca react-icons
import { FaWallet, FaEthereum, FaSyncAlt, FaCopy } from 'react-icons/fa';
import toast from 'react-hot-toast';
import PixelButton from './PixelButton';

// Criamos um sub-componente para cada "card" de passo, para manter o código limpo.
const StepCard = ({ icon, step, title, description }: { icon: React.ReactNode; step: number; title: string; description: string; }) => {
  return (
    // Reutilizamos o estilo dos cards da seção Tokenomics para manter a consistência
    <div data-aos="fade-up" className="bg-brand-light border-4 border-brand-dark p-6 text-center h-full flex flex-col items-center">
      <div className="text-4xl text-brand-blue mb-4">{icon}</div>
      <h3 className="text-lg uppercase text-brand-red font-bold">Passo {step}: {title}</h3>
      <p className="text-[clamp(0.6rem,0.9vw,1.5rem)] text-base mt-2 flex-grow">{description}</p>
    </div>
  );
};

const HowToBuy = () => {
  // O endereço do contrato do seu token (use um de exemplo por enquanto)
  const contractAddress = "0x0000000000000000000000000000000000000000";

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    // Usamos o toast que já instalamos para dar um feedback!
    toast.success('Contract Address Copied!');
  };

  return (
    <section id="how-to-buy" className="bg-brand-white py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 data-aos="fade-in" className="text-5xl uppercase text-brand-dark mb-12 text-shadow-pixel">
          How To Buy
        </h2>

        {/* Usamos um grid responsivo para os passos */}
        <div data-aos="fade-up"className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          <StepCard 
            step={1}
            title="Pegue uma Carteira"
            icon={<FaWallet />}
            description="Baixe a MetaMask gratuitamente. Se estiver no celular, baixe o app da MetaMask."
          />
          <StepCard 
            step={2}
            title="Compre ETH"
            icon={<FaEthereum />}
            description="Você vai precisar de Ethereum (ETH) na sua carteira para trocar pela $TRUMP. Compre ETH em uma corretora e envie para sua carteira."
          />
          <StepCard 
            step={3}
            title="Vá para a Uniswap"
            icon={<FaSyncAlt />}
            description="Conecte sua carteira na Uniswap. A Uniswap é a exchange descentralizada onde você pode trocar seus ETH pela $TRUMP."
          />
          {/* O último card é um pouco diferente, com o endereço do contrato e um botão */}
          <div className="bg-brand-light border-4 border-brand-dark p-6 text-center h-full flex flex-col items-center">
            <div className="text-4xl text-brand-blue mb-4">
              <span className="text-brand-gold font-bold">$</span>
            </div>
            <h3 className="text-lg uppercase text-brand-red font-bold">Passo 4: Faça a Troca</h3>
            <p className="text-base mt-2 flex-grow">Cole o endereço do contrato da $TRUMP na Uniswap, selecione a quantidade e confirme a transação.</p>
            <PixelButton onClick={handleCopy} className="mt-4 w-full">
              <FaCopy className="inline mr-2" /> Copiar Contrato
            </PixelButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToBuy;