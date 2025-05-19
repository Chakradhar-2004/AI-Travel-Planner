import React, { useState, useRef } from "react";
import { marked } from "marked";

export default function AIChat() {
  const [messages, setMessages] = useState([
    { id: 1, content: "Hello! How can I help you today?", sender: "ai" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef(null);
  // Removed: const messagesEndRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      content: inputValue,
      sender: "user",
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsLoading(true);

    // Await AI response
    const aiText = await getAIResponse(
      inputValue,
      "user@example.com",
      "session-123"
    );

    const newAIMessage = {
      id: messages.length + 2,
      content: aiText,
      sender: "ai",
    };

    setMessages((prev) => [...prev, newAIMessage]);
    setIsLoading(false);
  };

  // Generate AI responses
  const getAIResponse = async (userInput, userEmail, sessionId) => {
    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userInput,
          user_email: userEmail,
          session_id: sessionId,
        }),
      });

      const data = await res.json();
      return data.response;
    } catch (error) {
      console.error("Error communicating with backend:", error);
      return "Sorry, something went wrong with the AI.";
    }
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-5xl mx-auto border rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="text-white p-4 font-bold bg-gradient-to-r from-[#0b3866] to-[#3fa96b]">
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
            className={`mb-4 ${
              message.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block max-w-xs sm:max-w-md md:max-w-lg p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {message.sender === "ai" ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(message.content),
                  }}
                />
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left mb-4">
            <div className="inline-block bg-gray-200 text-gray-800 p-3 rounded-lg rounded-bl-none">
              <div className="flex space-x-2">
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div
                  className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
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
            className="bg-gradient-to-r from-[#0b3866] to-[#3fa96b] text-white p-2 rounded-r-lg hover:brightness-90 transition duration-200 disabled:opacity-50"

          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
