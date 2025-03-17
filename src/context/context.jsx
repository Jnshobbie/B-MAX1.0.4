import { createContext, useState } from "react";
import runChat from "../config/Gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {  
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]); 
    const [showResult, setShowResult] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setInput("");
        setRecentPrompt("");
        setPrevPrompts([]);
        setChatHistory([]);
    }

    const onSent = async (prompt) => {
        if (!prompt?.trim()) return; 
        
        try {
            setLoading(true); 
            setShowResult(true);
            setRecentPrompt(prompt);
            
            // Add user message immediately
            setChatHistory(prev => [...prev, { text: prompt, isUser: true }]);
            
            // Update previous prompts
            setPrevPrompts(prev => {
                if (!prev.includes(prompt)) {
                    return [...prev, prompt];
                }
                return prev;
            });
            
            const response = await runChat(prompt);
            
            // Add AI response after receiving it
            if (response) {
                setChatHistory(prev => [...prev, { text: response, isUser: false }]);
            }
            
        } catch (error) {
            console.error('Error:', error);
            setChatHistory(prev => [...prev, { 
                text: "Sorry, there was an error processing your request.", 
                isUser: false 
            }]);
        } finally {
            setLoading(false);
        }
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        setShowResult,
        loading, 
        input,
        setInput,
        newChat,
        chatHistory,
    }

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider; 