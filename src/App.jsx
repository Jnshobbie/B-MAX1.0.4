import React, { useState } from "react"
import Sidebar from "./components/sidebar/sidebar"
import Main from "./components/Main/Main"
import "./components/sidebar/sidebar.css"
import "./components/Main/Main.css"
import ContextProvider from './context/context'

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ContextProvider>
      <div className="App" style={{ display: 'flex', width: '100%' }}>
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} /> 
        <Main setIsSidebarOpen={setIsSidebarOpen} />   
      </div>
    </ContextProvider>
  )
}
  
export default App 
