// node --version # Should be >= 18 
// npm install @google/generative-ai 

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-thinking-exp-01-21" 
});

const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
};

async function runChat(prompt) {
    try {
        console.log('Sending prompt:', prompt);
        
        if (!prompt || typeof prompt !== 'string') {
            throw new Error('Invalid prompt provided');
        }

        const chat = model.startChat({
            generationConfig,
            history: []
        });

        const result = await chat.sendMessage(prompt);
        
        if (!result || !result.response) {
            throw new Error('Empty response from API');
        }

        const response = await result.response.text();
        console.log('Response:', response);
        return response;
    } catch (error) {
        console.error('Error details:', {
            message: error.message,
            status: error.status,
            details: error.details
        });
        throw error;
    }
}

export default runChat;  