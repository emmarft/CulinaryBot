import React, { useState, useRef, useEffect } from 'react';

interface Message {
  from: 'user' | 'bot';
  text: string;
}

export function Chatbot({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll vers le bas à chaque nouveau message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Ajoute le message utilisateur
    const userMsg = { from: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Ici tu appelleras ton backend, exemple avec fetch
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text }),
      });
      const data = await response.json();

      // Ajoute la réponse du bot
      setMessages(prev => [...prev, { from: 'bot', text: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { from: 'bot', text: "Erreur, impossible de joindre le serveur." }]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-end justify-end z-50">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-t-lg p-4 h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">Chatbot</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-2xl font-bold">&times;</button>
        </div>

        {/* Zone messages */}
        <div className="flex-1 overflow-y-auto mb-2 px-2 space-y-2">
          {messages.length === 0 && (
            <div className="text-gray-500 text-sm">Commencez la conversation...</div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded max-w-[80%] ${msg.from === 'user' ? 'bg-orange-200 self-end' : 'bg-gray-200 self-start'}`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Formulaire d'envoi */}
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Tape ton message..."
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-orange-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
