// components/Community.tsx
import React from 'react';
import PixelButton from './PixelButton';
// Importamos os ícones para Twitter(X) e Telegram
import { FaTwitter, FaTelegramPlane } from 'react-icons/fa';

const Community = () => {
  return (
    <section id="community" className="bg-brand-dark py-20 px-4">
      <div data-aos="fade-in" className="container mx-auto text-center max-w-3xl">
        
        <h2 className="text-[clamp(1.9rem,2vw,4.5rem)] uppercase text-white mb-4 text-shadow-pixel-lg">
          Join The Movement
        </h2>
        
        <p className="text-[clamp(0.9rem,2vw,4.5rem)] text-brand-light mb-10 text-shadow-pixel">
          Nossa comunidade é incrível, a melhor comunidade. Você vai adorar. Siga-nos no X e entre no nosso grupo no Telegram. Vai ser ENORME.
        </p>

        {/* Container para os botões de redes sociais */}
        <div data-aos="fade-up"className="flex flex-col sm:flex-row justify-center items-center gap-6">
          
          {/* Botão Twitter (X) */}
          <a 
           
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full sm:w-auto"
          >
            <PixelButton className="text-[clamp(0.7rem,0.9vw,1.5rem)]">
              <FaTwitter className="inline mr-3 text-2xl" />
              Follow on X
            </PixelButton>
          </a>

          {/* Botão Telegram */}
          <a 
        
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full sm:w-auto"
          >
            <PixelButton className="text-[clamp(0.6rem,0.9vw,1.5rem)] bg-brand-blue hover:bg-sky-600">
              <FaTelegramPlane className="inline mr-3 text-2xl" />
              Join Telegram
            </PixelButton>
          </a>

        </div>
      </div>
    </section>
  );
};

export default Community;