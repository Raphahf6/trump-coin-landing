// tailwind.config.js

/** @type {import('tailwindcss').Config} */

function addUtilities({ addUtilities, theme }) {
  addUtilities({
    '.text-shadow-pixel': {
      'text-shadow': theme('textShadow.pixel'),
    },
    '.text-shadow-pixel-lg': {
      'text-shadow': theme('textShadow.pixel-lg'),
    },
  });
}
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1E40AF',  // Um azul forte e presidencial (Tailwind blue-700)
        'brand-red': '#B91C1C',    // Um vermelho vibrante (Tailwind red-700)
        'brand-white': '#FFFFFF',  // Branco puro
        'brand-light': '#F3F4F6', // Um cinza bem claro para fundos de card (Tailwind gray-100)
        'brand-gold': '#FBBF24',   // Um dourado para botões e destaques (Tailwind amber-400)
        'brand-dark': '#111827',   // Um preto um pouco mais suave (Tailwind gray-900)
      },
      fontFamily: {
        // A linha que o erro reclama está aqui.
        // Se este arquivo não for lido, essa configuração não existe.
        pixel: ['var(--font-press-start)'],
      },
      boxShadow: {
        'pixel': '4px 4px 0px #222222',
        'pixel-hover': '6px 6px 0px #222222',
      },

       textShadow: {
      'pixel': '2px 2px 0px #111827', // Uma sombra de 2px 2px na cor brand-dark
      'pixel-lg': '4px 4px 0px #111827', // Uma sombra maior para títulos
    }
    },
  },
  plugins: [addUtilities],
}