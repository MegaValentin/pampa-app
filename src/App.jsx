import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Entrevistas from './pages/Entrevistas'
import Articulos from './pages/Articulos'
import Producciones from './pages/Producciones'
import Calendario from './pages/Calendario'
import ArticleDetail from './pages/ArticleDetail'
import LoginPage from './pages/LoginPage'
import Dashboard from './components/Dashboard'

function App() {
  

  return (
    <>
    
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<LoginPage/>}/>
        <Route path="/producciones" element={<Producciones />} />
        <Route path="/entrevistas" element={<Entrevistas />} />
        <Route path="/articulos" element={<Articulos />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
      </Routes>
    
    <Footer/>
    </>
  )
}

export default App
