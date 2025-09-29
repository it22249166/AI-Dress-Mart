import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { chatWithAI } from '../services/api';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! I'm your AI fashion assistant. How can I help you find the perfect dress today?", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages([...messages, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const { data } = await chatWithAI(input);
            setMessages(prev => [...prev, { text: data.message, sender: 'ai' }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                text: 'Sorry, I encountered an error. Please try again!',
                sender: 'ai'
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
    <>
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition z-50"
            >
                {isOpen ?  : }


                {/* Chat Window */}
                {isOpen && (

                    {/* Header */ }
          
            
            
              AI Fashion Assistant
                Always here to help!



                {/* Messages */}

                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] p-3 rounded-lg ${message.sender === 'user'
                                    ? 'bg-purple-600 text-white rounded-br-none'
                                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                                }`}
                        >
                            {message.text}
                
              
            ))}
                            {loading && (
              
                
                  
                    
                    
                    
                  
                
              
            )}



                            {/* Input */}


                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask me anything..."
                                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
                            />
              
                
              
            
          
        
      )}
                        </>
                        );
};

                        export default ChatBot;