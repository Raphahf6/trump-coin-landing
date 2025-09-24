// components/Whitepaper.tsx
import React from 'react';
import PixelButton from './PixelButton';
import { FaFilePdf } from 'react-icons/fa';

const Whitepaper = () => {
    return (
        // Damos o id 'whitepaper' para que o link do Header funcione
        <section id="whitepaper" className="bg-brand-blue py-20 px-4 border-t-4 border-brand-dark">
            <div className="container mx-auto text-center max-w-3xl">
                <h2 className="text-5xl uppercase text-white mb-4 text-shadow-pixel-lg">
                    Whitepaper
                </h2>
                <p className="text-xl text-brand-light mb-8 text-shadow-pixel">
                    Leia o documento oficial. O melhor documento, acredite. Ele contém as melhores palavras e os planos mais incríveis para tornar as criptomoedas grandes novamente. É um acordo irrecusável.
                </p>

                {/* Este é um link <a> estilizado para parecer com nosso PixelButton */}
                <a
                    href="/trumpcoin-whitepaper.pdf" // O link para o seu arquivo na pasta 'public'
                    target="_blank" // Abre o PDF em uma nova aba
                    rel="noopener noreferrer" // Boas práticas de segurança para links em nova aba
                    className="inline-block"
                >
                    <PixelButton>
                        <FaFilePdf className="inline mr-2" />
                        Read The Deal
                    </PixelButton>
                </a>

            </div>
        </section>
    );
};

export default Whitepaper;