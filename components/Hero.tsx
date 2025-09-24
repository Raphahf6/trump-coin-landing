// components/Hero.tsx
import React from 'react';
import Image from 'next/image'; // Certifique-se de que o Image está sendo importado
import BuyBox from './BuyBox';

const Hero = () => {
  return (
    <section className="container mx-auto py-12 px-4">
      {/* 👇 Este é o container principal do grid de 2 colunas para telas médias e maiores */}
      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* ✅ COLUNA 1: Conteúdo da Esquerda (Texto + Imagem) */}
        <div className="text-center md:text-left">
          
          {/* Título e Subtítulo */}
          <h2 className="text-[clamp(1.5rem,4vw,5.5rem)] font-bold uppercase drop-shadow-lg text-brand-white text-shadow-pixel-lg">
            Make Crypto Great Again
          </h2>
          <p className="mt-4 text-xl text-brand-white text-shadow-pixel">
            The best coin, believe me. Everyone agrees. Its tremendous.
          </p>

          {/* O container da imagem deve estar DENTRO da coluna 1 */}
          <div className="mt-8 relative w-full" style={{ paddingTop: '100%' }}> {/* Usando padding-top para manter a proporção */}
            <Image
              src="/trump-pixel-art.webp"
              alt="Trump pixel art with meme coins"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>

        </div>

        {/* ✅ COLUNA 2: Conteúdo da Direita (Caixa de Compra) */}
        <div>
          <BuyBox />
        </div>

      </div>
    </section>
  );
};

export default Hero;