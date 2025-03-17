import React, { useState } from "react"
import Sidebar from "./components/sidebar/sidebar"
import Main from "./components/Main/Main"
import "./components/sidebar/sidebar.css"
import "./components/Main/Main.css"

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="App" style={{ display: 'flex', width: '100%' }}>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} /> 
      <Main setIsSidebarOpen={setIsSidebarOpen} />   
    </div>
  )
}

export default App 
