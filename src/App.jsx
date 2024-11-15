import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Entrevistas from './pages/Entrevistas';
import Articulos from './pages/Articulos';
import Producciones from './pages/Producciones';
import Calendario from './pages/Calendario';
import ArticleDetail from './pages/ArticleDetail';
import BookView from './pages/BookView.jsx';
import LoginPage from './pages/LoginPage';
import Admin from './pages/Admin.jsx';
import AdminPreview from './components/AdminPreview.jsx';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <ErrorBoundary>
        
        {!isAuthenticated && <NavBar />}
        
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/producciones" element={<Producciones />} />
          <Route path="/entrevistas" element={<Entrevistas />} />
          <Route path="/articulos" element={<Articulos />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/bookview/:id" element={<BookView/>} />

          {/* Protected routes for logged-in users */}
          {isAuthenticated && (
            <>
            <Route path="/admin" element={<Admin />} />
            <Route path="/adminpreview/:id" element={<AdminPreview/>} />
              
            </>
          )}
        </Routes>

        {!isAuthenticated && <Footer />}
        
      </ErrorBoundary>
    </Router>
  );
}

export default App;
