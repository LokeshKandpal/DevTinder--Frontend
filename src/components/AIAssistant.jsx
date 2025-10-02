import React, { useState, useRef, useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { Bot, Send, X, Trash2, Sparkles, Zap, Heart, Lightbulb, Copy, Check } from 'lucide-react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const suggestedPrompts = [
    { icon: Lightbulb, text: "Give me dating tips", color: "from-yellow-500 to-orange-500" },
    { icon: Heart, text: "How to start a conversation?", color: "from-pink-500 to-red-500" },
    { icon: Zap, text: "Profile optimization tips", color: "from-blue-500 to-cyan-500" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  };

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatText = (text) => {
    // Remove markdown symbols and format text cleanly
    let formatted = text;
    
    // Remove ### headers and make them bold
    formatted = formatted.replace(/###\s+(.+)/g, '$1');
    
    // Remove ** bold markers
    formatted = formatted.replace(/\*\*(.+?)\*\*/g, '$1');
    
    // Remove single * markers
    formatted = formatted.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '$1');
    
    // Remove --- horizontal rules
    formatted = formatted.replace(/^---+$/gm, '');
    
    // Clean up multiple newlines
    formatted = formatted.replace(/\n{3,}/g, '\n\n');
    
    return formatted.trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { 
      id: Date.now(), 
      text: inputValue, 
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await axios.post(BASE_URL + '/ai-assistant/query', {
        prompt: inputValue
      }, {
        withCredentials: true
      });

      const aiMessage = { 
        id: Date.now() + 1, 
        text: formatText(response.data.response), 
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = { 
        id: Date.now() + 1, 
        text: 'Sorry, I encountered an error. Please try again.', 
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
      console.error('AI Assistant Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedPrompt = (promptText) => {
    setInputValue(promptText);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating button */}
      {!isOpen && (
        <button 
          onClick={toggleAssistant}
          className="group relative"
          aria-label="Open AI Assistant"
        >
          <div className="flex items-center gap-3 bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 rounded-full shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-purple-500/50 pr-5 pl-2 py-2">
            <div className="relative bg-white/20 backdrop-blur-sm rounded-full p-3 w-12 h-12 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
            <div className="text-left pr-2">
              <p className="text-white font-bold text-sm leading-tight">DevTinder AI</p>
              <p className="text-white/80 text-xs leading-tight">Chat with me</p>
            </div>
          </div>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-gradient-to-br from-purple-400 to-purple-600"></span>
          </span>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-xl">
            Need help? Chat with AI! ✨
          </span>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 w-[420px] h-[650px] flex flex-col overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative bg-white/20 rounded-full p-2 backdrop-blur-sm">
                <Bot className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                </span>
              </div>
              <div>
                <h3 className="font-bold text-base flex items-center gap-2">
                  DevTinder AI
                  <Sparkles className="h-3.5 w-3.5" />
                </h3>
                <p className="text-xs text-white/80">Your Smart Dating Assistant</p>
              </div>
            </div>
            <div className="flex space-x-1">
              <button 
                onClick={clearChat}
                className="hover:bg-white/20 rounded-full p-2 transition-all"
                title="Clear chat"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button 
                onClick={toggleAssistant}
                className="hover:bg-white/20 rounded-full p-2 transition-all"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#6b7280 #1f2937' }}
          >
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 px-2">
                <div className="relative">
                  <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full p-6 backdrop-blur-sm">
                    <Sparkles className="h-12 w-12 text-purple-400" />
                  </div>
                </div>
                <div>
                  <p className="text-lg font-bold text-white mb-1">Hey there! 👋</p>
                  <p className="text-sm text-gray-400">Ask me anything about dating!</p>
                </div>
                
                <div className="w-full space-y-2 mt-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase">Quick starts:</p>
                  {suggestedPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedPrompt(prompt.text)}
                      className="w-full bg-gray-800 hover:bg-gray-750 rounded-xl p-3 transition-all hover:scale-[1.02] flex items-center space-x-3 group border border-gray-700"
                    >
                      <div className={`bg-gradient-to-r ${prompt.color} rounded-lg p-2`}>
                        <prompt.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm text-gray-300 text-left">{prompt.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'} max-w-[85%]`}>
                    <div className={`flex items-start gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-br from-purple-500 to-blue-500' 
                          : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                      }`}>
                        {message.sender === 'user' ? (
                          <span className="text-white text-xs font-bold">Y</span>
                        ) : (
                          <Bot className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div className={`rounded-2xl px-4 py-2.5 ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white' 
                          : 'bg-gray-800 text-gray-100 border border-gray-700'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                      </div>
                    </div>
                    
                    <div className={`flex items-center gap-2 mt-1 px-1 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                      {message.sender === 'ai' && (
                        <button
                          onClick={() => copyToClipboard(message.text, message.id)}
                          className="text-gray-500 hover:text-gray-300 transition-colors p-1"
                          title="Copy"
                        >
                          {copiedId === message.id ? (
                            <Check className="h-3 w-3 text-green-400" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex flex-col items-start">
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-gray-800 rounded-2xl px-4 py-3 border border-gray-700">
                      <div className="flex space-x-1.5">
                        <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 px-1">Typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800 bg-gray-900">
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="w-11 h-11 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center justify-center text-white transition-all hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
                disabled={isLoading || !inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-center text-gray-600 mt-2">
              Powered by AI • Always here to help ❤️
            </p>
          </form>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AIAssistant;