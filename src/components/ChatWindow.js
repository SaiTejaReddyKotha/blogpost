import React, { useState } from "react";
import "./ChatWindow.css";
import axios from "axios";

// import OpenAI from "openai";
 
// const openai = new OpenAI({
//   apiKey: "***********************************************",
//   dangerouslyAllowBrowser: true,
// });
 
// async function getLocation() {
//   const response = await fetch("https://ipapi.co/json/");
//   const locationData = await response.json();
//   return locationData;
// }
 
// async function getCurrentWeather(latitude, longitude) {
//   const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=apparent_temperature`;
//   const response = await fetch(url);
//   const weatherData = await response.json();
//   return weatherData;
// }
 
// const tools = [
//   {
//     type: "function",
//     function: {
//       name: "getCurrentWeather",
//       description: "Get the current weather in a given location",
//       parameters: {
//         type: "object",
//         properties: {
//           latitude: {
//             type: "string",
//           },
//           longitude: {
//             type: "string",
//           },
//         },
//         required: ["longitude", "latitude"],
//       },
//     }
//   },
//   {
//     type: "function",
//     function: {
//       name: "getLocation",
//       description: "Get the user's location based on their IP address",
//       parameters: {
//         type: "object",
//         properties: {},
//       },
//     }
//   },
// ];
 
// const availableTools = {
//   getCurrentWeather,
//   getLocation,
// };
 
// const messages = [
//   {
//     role: "system",
//     content: `You are a helpful assistant. Only use the functions you have been provided with.`,
//   },
// ];
 
// async function agent(userInput) {
//   messages.push({
//     role: "user",
//     content: userInput,
//   });
 
//   for (let i = 0; i < 5; i++) {
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo-16k",
//       messages: messages,
//       tools: tools,
//     });
 
//     const { finish_reason, message } = response.choices[0];
 
//     if (finish_reason === "tool_calls" && message.tool_calls) {
//       const functionName = message.tool_calls[0].function.name;
//       const functionToCall = availableTools[functionName];
//       const functionArgs = JSON.parse(message.tool_calls[0].function.arguments);
//       const functionArgsArr = Object.values(functionArgs);
//       const functionResponse = await functionToCall.apply(
//         null,
//         functionArgsArr
//       );
 
//       messages.push({
//         role: "function",
//         name: functionName,
//         content: `
//                 The result of the last function was this: ${JSON.stringify(
//                   functionResponse
//                 )}
//                 `,
//       });
//     } else if (finish_reason === "stop") {
//       messages.push(message);
//       return message.content;
//     }
//   }
//   return "The maximum number of iterations has been met without a suitable answer. Please try again with a more specific input.";
// }
 
// const response = await agent(
//   "Please suggest some activities based on my location and the weather."
// );
 
//console.log("response:", response);
const ChatWindow = () => {
  const [input, setInput] = useState(""); // State to manage user input
  const [messages, setMessages] = useState([]); // State to manage chat messages

  const handleMessageSubmit = async () => {
    if (input.trim() === "") return; // Don't send empty messages

    const response = await axios.post("http://localhost:4500/api/ask", { message: input });; // Call the agent function with user input
    setMessages([...messages, { role: "user", content: input }]); // Add user message to messages state
    setMessages([...messages, { role: "system", content: response.data }]); // Add bot response to messages state
    setInput(""); // Clear input field after sending message
  };

  const handleInputChange = (e) => {
    setInput(e.target.value); // Update input state as user types
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button onClick={handleMessageSubmit}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
