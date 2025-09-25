// components/GeminiChat.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import PixelButton from './PixelButton';
import { FaCommentDots, FaTimes, FaPaperPlane } from 'react-icons/fa';

// ATUALIZADO: O tipo de ação agora pode ser 'scroll' ou 'link'
type ButtonAction = {
  label: string;
  action_type: 'scroll' | 'link';
  value: string;
};

type MessagePart = {
  text: string;
  buttons?: ButtonAction[];
};

type Message = {
  role: 'user' | 'model';
  parts: MessagePart[];
};

const initialMessage: Message = {
  role: 'model',
  parts: [{ 
    text: "Certo, estou aqui. Todos dizem que este é o melhor assistente de bate-papo já criado, acredite. Pergunte-me o que quiser saber sobre a incrível moeda $TRUMP. Eu tenho as melhores respostas." 
  }]
};

const GeminiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Message[]>([initialMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // ATUALIZADO: A função agora lida com os dois tipos de ação
  const handleButtonClick = (action: ButtonAction) => {
    if (action.action_type === 'scroll') {
      document.querySelector(action.value)?.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    } else if (action.action_type === 'link') {
      window.open(action.value, '_blank', 'noopener,noreferrer');
      setIsOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', parts: [{ text: input }] };
    const newHistory = [...history, userMessage];

    setHistory(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      const apiHistory = history.map(h => ({ role: h.role, parts: [{text: h.parts[0].text}] }));
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: apiHistory, message: input }),
      });
      
      if (!res.ok) throw new Error('Failed to fetch response from API');
      
      const responseData: MessagePart = await res.json();
      const modelMessage: Message = { role: 'model', parts: [responseData] };
      setHistory([...newHistory, modelMessage]);

    } catch (error) {
      console.error(error);
      const errorMessage: Message = { role: 'model', parts: [{ text: "Believe me, there was a problem. A huge one. Try again later." }] };
      setHistory([...newHistory, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Widget Flutuante para Abrir/Fechar o Chat */}
      <div className="fixed bottom-5 right-5 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-brand-gold text-white w-16 h-16 rounded-full flex items-center justify-center shadow-pixel hover:scale-110 transition-transform"
          aria-label="Toggle Chat"
        >
          {isOpen ? <FaTimes size={24} /> : <FaCommentDots size={24} />}
        </button>
      </div>

      {/* Janela Principal do Chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-5 z-50 w-[calc(100vw-40px)] max-w-sm h-[500px] bg-brand-light border-4 border-brand-dark shadow-pixel-lg flex flex-col font-sans">
          {/* Cabeçalho do Chat */}
          <div className="bg-brand-red p-3 border-b-4 border-brand-dark text-center">
            <h3 className="font-pixel text-white text-lg">Trump AI Assistant</h3>
          </div>

          {/* Container das Mensagens */}
          <div className="flex-1 p-4 overflow-y-auto">
            {history.map((msg, index) => (
              <div key={index} className={`mb-3 flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-2 border-2 border-brand-dark w-fit max-w-[85%] ${msg.role === 'user' ? 'bg-brand-blue text-white' : 'bg-gray-200 text-brand-dark'}`}>
                  {msg.parts[0].text}
                </div>
                {/* Lógica para Renderizar os Botões da IA */}
                {msg.role === 'model' && msg.parts[0].buttons && (
                  <div className="mt-2 flex flex-col gap-2 w-fit max-w-[85%]">
                    {msg.parts[0].buttons.map((button, btnIndex) => (
                      <button 
                        key={btnIndex}
                        onClick={() => handleButtonClick(button)}
                        className="w-full text-left p-2 bg-white border-2 border-brand-dark hover:bg-gray-100 text-sm font-pixel transition-colors"
                      >
                        ➡️ {button.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && <div className="text-center text-brand-dark">A melhor resposta esta vindo...</div>}
            <div ref={chatEndRef} />
          </div>

          {/* Formulário de Input */}
          <form onSubmit={handleSubmit} className="p-2 border-t-4 border-brand-dark flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 border-2 border-brand-dark focus:outline-none"
              placeholder="Pergunte-me sobre a $TRUMP..."
              disabled={isLoading}
            />
            <PixelButton type="submit" disabled={isLoading} className="bg-brand-blue !px-4">
              <FaPaperPlane />
            </PixelButton>
          </form>
        </div>
      )}
    </>
  );
};

export default GeminiChat;