
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import { Button } from '../components/Button';
import { sendMessageToDigitalTwin } from '../services/geminiService';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { CONTENT } from '../constants/content';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export const Contact: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'chat'>('form');

  // Form State
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Chat State
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: "Greetings. I am Narendra's Digital Twin. Query me regarding my technical stack, projects, or hackathon achievements." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Message received. I will respond shortly.");
      setFormState({ name: '', email: '', message: '' });
    }, 1500);
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      const aiResponse = await sendMessageToDigitalTwin(userMsg);
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: "Neural link unstable." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen w-full pt-32 pb-20 px-6 relative">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-20">
        
        {/* Left Column: Info */}
        <RevealOnScroll>
          <div>
            <h1 className="text-5xl md:text-7xl font-display text-zinc-900 dark:text-white mb-8">{CONTENT.CONTACT.TITLE}</h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-xl font-light mb-12">
              {CONTENT.CONTACT.DESCRIPTION}
            </p>
            
            <div className="space-y-8 text-sm tracking-widest uppercase text-zinc-500">
              <div>
                <p className="mb-2 text-zinc-900 dark:text-white">Email</p>
                <a href={`mailto:${CONTENT.CONTACT.EMAIL}`} className="hover:text-blue-500 transition-colors">{CONTENT.CONTACT.EMAIL}</a>
              </div>
              <div>
                <p className="mb-2 text-zinc-900 dark:text-white">Base</p>
                <p>{CONTENT.CONTACT.LOCATION}</p>
              </div>
              <div>
                <p className="mb-2 text-zinc-900 dark:text-white">Socials</p>
                <div className="flex flex-col gap-2">
                  <a href={CONTENT.CONTACT.SOCIAL.GITHUB.url} target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors">{CONTENT.CONTACT.SOCIAL.GITHUB.label}</a>
                  <a href={CONTENT.CONTACT.SOCIAL.LINKEDIN.url} className="hover:text-blue-500 transition-colors">{CONTENT.CONTACT.SOCIAL.LINKEDIN.label}</a>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Right Column: Interactive */}
        <RevealOnScroll delay={200}>
          <div className="bg-white/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 p-1 rounded-2xl overflow-hidden backdrop-blur-sm h-[600px] flex flex-col shadow-2xl dark:shadow-none transition-all duration-300">
            {/* Tab Switcher */}
            <div className="grid grid-cols-2 border-b border-zinc-200 dark:border-zinc-800 mb-1">
              <button 
                onClick={() => setActiveTab('form')}
                className={`py-4 rounded-t-xl text-sm uppercase tracking-wider font-medium transition-all ${activeTab === 'form' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300'}`}
              >
                Direct Message
              </button>
              <button 
                onClick={() => setActiveTab('chat')}
                className={`py-4 rounded-t-xl text-sm uppercase tracking-wider font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'chat' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300'}`}
              >
                <Bot size={16} /> AI Digital Twin
              </button>
            </div>

            {/* Form View */}
            {activeTab === 'form' && (
              <form onSubmit={handleFormSubmit} className="flex-1 p-8 flex flex-col gap-6 animate-fade-in">
                <div className="space-y-2">
                  <label className="text-xs text-zinc-500 uppercase">Name</label>
                  <input 
                    type="text" 
                    required
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 text-zinc-900 dark:text-white focus:border-zinc-400 dark:focus:border-white focus:outline-none transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                    placeholder="Recruiter Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-zinc-500 uppercase">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 text-zinc-900 dark:text-white focus:border-zinc-400 dark:focus:border-white focus:outline-none transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                    placeholder="recruiter@company.com"
                  />
                </div>
                <div className="space-y-2 flex-1 flex flex-col">
                  <label className="text-xs text-zinc-500 uppercase">Message</label>
                  <textarea 
                    required
                    value={formState.message}
                    onChange={e => setFormState({...formState, message: e.target.value})}
                    className="w-full flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 text-zinc-900 dark:text-white focus:border-zinc-400 dark:focus:border-white focus:outline-none transition-colors resize-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                    placeholder="Discussing AI Developer role..."
                  />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}

            {/* Chat View */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col h-full animate-fade-in">
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-4 rounded-lg text-sm leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-zinc-900 dark:bg-white text-white dark:text-black rounded-tr-none' 
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-none'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg rounded-tl-none flex items-center gap-2">
                         <div className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" />
                         <div className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                         <div className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleChatSubmit} className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex gap-4">
                  <input 
                    type="text" 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask about LabSeva..."
                    className="flex-1 bg-transparent text-zinc-900 dark:text-white focus:outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                  />
                  <button type="submit" disabled={isTyping || !input.trim()} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors disabled:opacity-50">
                    <Send size={20} />
                  </button>
                </form>
              </div>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};
