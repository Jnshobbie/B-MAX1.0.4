import React, { useContext, useEffect } from 'react'
import './Main.css'  
import { assets } from '../../assets/assets' 
import { Context } from '../../context/context'

const Main = ({ setIsSidebarOpen }) => {
    const {
        onSent,
        showResult,
        loading,
        setInput,
        input,
        chatHistory
    } = useContext(Context)

    const handleSend = () => {
        if (input.trim()) {
            onSent(input);
            setInput(''); // Clear input immediately after sending
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && input.trim()) {
            handleSend();
        }
    }

    // Add click handlers for the suggestion cards
    const handleCardClick = (prompt) => { 
        onSent(prompt); 
        // No need to setInput here since it's a card click
    }

    // Add this effect to scroll to bottom on new messages
    useEffect(() => {
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [chatHistory, loading]);

    return (
        <div className='main'> 
            <div className='nav'> 
                <img 
                    src={assets.menu_icon}  
                    alt="Menu"
                    className="menu-icon"
                    onClick={() => setIsSidebarOpen(prev => !prev)}
                />
                <p>B-Max</p> 
                <img src={assets.user_icon} alt="" /> 
            </div>
            <div className="main-container"> 
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, I'am B-MAX</span></p>
                            <p>HOW CAN I HELP YOU TODAY ?</p>
                        </div>
                        <div className="cards">
                            <div className="card" onClick={() => handleCardClick("Suggest beautiful places to see on an upcoming road trip")}>
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => handleCardClick("Briefly summarize this concept: urban planning")}>
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="" /> 
                            </div>
                            <div className="card" onClick={() => handleCardClick("Brainstorm team bonding activities for our work retreat")}>
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="" /> 
                            </div>
                            <div className="card" onClick={() => handleCardClick("Improve the readability of the following code")}>
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="" /> 
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='result' id="chat-container">
                        {chatHistory.map((message, index) => (
                            <div key={index} className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}>
                                {message.isUser ? (
                                    <div className="user-content">
                                        <p>{message.text}</p>
                                    </div>
                                ) : (
                                    <div className="result-data">
                                        <img src={assets.gemini_icon} alt="" />
                                        <div className="response-content">
                                            {/* Replace asterisks with bold formatting */}
                                            {message.text.split('\n').map((paragraph, pIndex) => (
                                                <p key={pIndex}>
                                                    {paragraph.split(/(\*\*.*?\*\*|__.*?__)/g).map((part, i) => {
                                                        if (part.startsWith('**') || part.startsWith('__')) {
                                                            return <strong key={i}>{part.replace(/\*\*|__/g, '')}</strong>;
                                                        }
                                                        return part;
                                                    })}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {loading && (
                            <div className="result-data">
                                <img src={assets.gemini_icon} alt="" />
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            type="text" 
                            placeholder='Enter a prompt here'
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input && (
                                <img 
                                    onClick={handleSend} 
                                    src={assets.send_icon} 
                                    alt="Send" 
                                    style={{ cursor: 'pointer' }}
                                />
                            )}
                        </div>
                    </div>
                    <p className="bottom-info">
                        B-Max may display inaccurate info, including about people, so double check its responses. Your privacy and B-Max Apps.
                    </p>
                </div>
            </div>
        </div> 
    )
}

export default Main 
