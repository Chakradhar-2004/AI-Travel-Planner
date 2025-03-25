import React, { useState, useRef } from 'react';

export default function AIChat() {
  const [messages, setMessages] = useState([
    { id: 1, content: "Hello! How can I help you today?", sender: "ai" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef(null);
  // Removed: const messagesEndRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      content: inputValue,
      sender: "user"
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        content: getAIResponse(inputValue),
        sender: "ai"
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  // Simple function to generate AI responses
  const getAIResponse = (userInput) => {
    const responses = [
      `I understand your question about "${userInput}". Let me think about that...`,
      `That's an interesting point. Here's what I know about ${userInput}.`,
      `Thanks for asking! I'd be happy to help with ${userInput}.`,
      `I'm processing your request about "${userInput}". Here's what I can tell you.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-5xl mx-auto border rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 font-bold">
        AI Assistant
      </div>
      
      {/* Messages container */}
      <div
        ref={messagesContainerRef}
        className="flex-grow p-4 overflow-y-auto bg-gray-50"
      >
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div 
              className={`inline-block max-w-xs sm:max-w-md md:max-w-lg p-3 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left mb-4">
            <div className="inline-block bg-gray-200 text-gray-800 p-3 rounded-lg rounded-bl-none">
              <div className="flex space-x-2">
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
        <div className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 transition duration-200 disabled:bg-blue-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
