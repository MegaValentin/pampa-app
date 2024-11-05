import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";

import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Entrevistas from './pages/Entrevistas'
import Articulos from './pages/Articulos'
import Producciones from './pages/Producciones'
import Calendario from './pages/Calendario'
import ArticleDetail from './pages/ArticleDetail'
import LoginPage from './pages/LoginPage'
import Admin from './pages/Admin.jsx';

function App() {
  
  const { user } = useAuth();

  return (
    <>
    
    <Router>
      <ErrorBoundary>
        
            <NavBar  />
              <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/producciones" element={<Producciones />} />
                <Route path="/entrevistas" element={<Entrevistas />} />
                <Route path="/articulos" element={<Articulos />} />
                <Route path="/calendario" element={<Calendario />} />
                <Route path="/article/:id" element={<ArticleDetail />} />

                {/* Rutas protegidas para usuarios logeados */}
                {user && (
                  <>
                    <Route path="/admin" element={<Admin />} />
                   

                    
                    
                  </>
                )}
              </Routes>
      </ErrorBoundary>
    </Router>    </>
  )
}

export default App
