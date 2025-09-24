// components/Tokenomics.tsx
import React from 'react';

// Um componente simples para os cartões de informação
const TokenomicCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="bg-brand-light border-4 border-brand-dark p-6 text-center">
      {/* O título será 'lg' em mobile e 'base' (menor) em desktop */}
      <h3 className="text-lg md:text-base uppercase text-brand-red">{title}</h3>
      
      {/* O valor será '3xl' em mobile e '2xl' (menor) em desktop */}
      <p className="text-3xl md:text-sm mt-2">{value}</p> 
    </div>
  );
};

const Tokenomics = () => {
    return (
        <section id="tokenomics" className="bg-brand-red py-16 px-4 border-t-4 border-b-4 border-brand-dark">
            {/* A classe 'text-center' aqui centraliza o título principal 'Tokenomics' */}
            <div className="container mx-auto text-center">
                <h2 data-aos="fade-in"className="text-5xl uppercase text-white mb-10">
                    Tokenomics
                </h2>

                <div data-aos="fade-up" className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <TokenomicCard title="Total Supply" value="1,000,000,000" />
                    <TokenomicCard title="Taxes" value="0% Buy / 0% Sell" />
                    <TokenomicCard title="Liquidity" value="Burned Forever" />
                </div>
            </div>
        </section>
    );
};

export default Tokenomics;