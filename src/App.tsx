import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { SiteDataProvider, useSiteData } from './context/SiteContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import JournalSection from './components/JournalSection';
import StorySection from './components/StorySection';
import StoreSection from './components/StoreSection';
import PostSection from './components/PostSection';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import PolicyPage from './components/PolicyPage';
import React, { useState, useEffect } from 'react';

function LandingPage() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['posts', 'journal', 'story', 'store', 'contact'];
      const scrollPos = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-brand-bg min-h-screen text-brand-text pt-24">
      <Navbar activeSection={activeSection} onNavigate={scrollTo} />
      <PostSection />
      <JournalSection />
      <StorySection />
      <StoreSection />
      <Footer />
    </main>
  );
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAuth();
  return isAdmin ? <>{children}</> : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <SiteDataProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/policies" element={<PolicyPage />} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          </Routes>
        </SiteDataProvider>
      </AuthProvider>
    </Router>
  );
}
