import React, { useContext } from 'react'
import './sidebar.css' 
import { assets } from '../../assets/assets'
import { Context } from '../../context/context' 

const Sidebar = ({ isOpen, setIsOpen }) => {
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context)

    const handleNewChat = () => {
        newChat();
        setIsOpen(false);  // Close sidebar on mobile
    }

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
        setIsOpen(false);  // Close sidebar on mobile
    }

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="top">
                <img 
                    onClick={() => setIsOpen(!isOpen)} 
                    className='menu' 
                    src={assets.menu_icon} 
                    alt="Menu" 
                />
                <div onClick={handleNewChat} className="new-chat">
                    <img src={assets.plus_icon} alt="New Chat" /> 
                    {isOpen && <p>New Chat</p>}
                </div>
                {isOpen && ( 
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts && prevPrompts.map((item, index) => (
                            <div 
                                key={index}
                                onClick={() => loadPrompt(item)}
                                className="recent-entry"
                            >
                                <img src={assets.message_icon} alt="Message" />
                                <p>{item.slice(0, 18)}...</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="Help" />
                    {isOpen && <p>Help</p>}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="Activity" />
                    {isOpen && <p>Activity</p>}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="Settings" />
                    {isOpen && <p>Settings</p>}
                </div>
            </div>
        </div>
    )
}

export default Sidebar  
