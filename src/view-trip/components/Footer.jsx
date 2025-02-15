import React from "react";

export default function Footer() {
  return (
    <div className="font-bold text-lg text-center p-4 text-gray-500">
      <p className="typing">AI-GENERATED-TRIP-PLAN</p>
      <style>
        {`
          .typing {
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            border-right: 2px solid white;
            width: 0;
            animation: typing 3s steps(25, end) infinite alternate, blink 0.7s infinite;
          }

          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }

          @keyframes blink {
            50% { border-color: transparent }
          }
        `}
      </style>
    </div>
  );
}
