
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, MessageSquare, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { sendChatMessage } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
        const history = messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
        }));

      const responseText = await sendChatMessage(userMsg.text, history);
      const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, something went wrong. Please try again.", timestamp: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-white text-black p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] hover:translate-y-1 hover:shadow-none transition-all ${isOpen ? 'hidden' : 'block'}`}
      >
        <div className="flex items-center gap-2 uppercase font-bold tracking-wider">
            <MessageSquare size={20} />
            <span>AI Chat</span>
        </div>
      </button>

      {/* Chat Interface Modal/Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end pointer-events-none">
          
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 pointer-events-auto backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>

          {/* Chat Window */}
          <div className="pointer-events-auto w-full sm:w-[400px] h-[80vh] sm:h-[600px] bg-[#0a0a0a] border-l-4 border-t-4 sm:border-4 border-white flex flex-col shadow-2xl sm:mr-8 sm:mb-8 animate-in slide-in-from-bottom-10 fade-in duration-300">
            
            {/* Header */}
            <div className="bg-white text-black p-4 flex justify-between items-center border-b-4 border-white">
              <h3 className="text-lg font-bold uppercase tracking-widest">Assistant</h3>
              <button onClick={() => setIsOpen(false)} className="hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#111]">
                {messages.length === 0 && (
                    <div className="text-center text-gray-500 mt-10">
                        <p className="font-bold uppercase mb-2 text-gray-300">Toufiq's Assistant</p>
                        <p className="text-sm">Ask me about medical imaging, deep learning, or my research at UPenn.</p>
                    </div>
                )}
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] p-4 border border-white text-sm ${
                    msg.role === 'user' 
                      ? 'bg-white text-black shadow-[2px_2px_0px_0px_rgba(100,100,100,0.5)]' 
                      : 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]'
                  }`}>
                     <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gray-500 mt-1">{msg.role}</span>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-black text-white border border-white p-3 flex items-center gap-2">
                    <Loader2 className="animate-spin" size={16} />
                    <span className="text-xs font-bold uppercase">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#0a0a0a] border-t-4 border-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="TYPE QUESTION..."
                  className="flex-1 bg-black text-white border-2 border-white p-3 font-mono text-sm focus:outline-none placeholder:text-gray-600"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-white text-black p-3 border-2 border-white hover:bg-gray-200 disabled:opacity-50 transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
