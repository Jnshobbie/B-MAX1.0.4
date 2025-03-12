import { createContext, useState } from "react";
import runChat from "../config/Gemini";

export const Context = createContext(); 

const ContextProvider = ({ children }) => {  

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]); 
    const [showResult,setShowResult] = useState(false); 
    const [loading,setLoading] = useState(false);
    const [resultData,setResultData] = useState("");  

    const delayPara = (index,nextWord) => {
        if (!nextWord) return;
        setTimeout(() => {
            setResultData(prev => prev + nextWord);  
        }, 75 * index)
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
        setResultData("")
        setInput("")
        setRecentPrompt("")
        setPrevPrompts([])
    }


    const onSent = async (prompt) => {
        if (!prompt?.trim()) return;
        
        try {
            setLoading(true)
            setShowResult(true)
            setRecentPrompt(prompt)
            setResultData("")

            setPrevPrompts(prev => {
                const updatedPrompts = prev.includes(prompt) 
                    ? prev 
                    : [...prev, prompt];
                return updatedPrompts.slice(-10);
            })
            
            const response = await runChat(prompt)
            
            if (typeof response === 'string') {
                const words = response.split(' ')
                words.forEach((word, index) => {
                    delayPara(index, word + ' ')
                })
            } else if (response) {
                setResultData(response)
            } else {
                throw new Error('Empty response from API')
            }
        } catch (error) {
            console.error('Error:', error)
            setResultData("Sorry, there was an error processing your request.")
        } finally {
            setLoading(false) 
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
        resultData,
        input,
        setInput,
        newChat,
    }

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
            
    )
}

export default ContextProvider; 