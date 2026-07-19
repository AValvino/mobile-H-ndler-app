import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import KundenApp from './pages/KundenApp';
import HaendlerAnsicht from './pages/HaendlerAnsicht';
import './App.css';

function Nav() {
  return (
    <nav className="top-nav">
      <span className="top-nav__brand">🍞 Mobile Händler App</span>
      <div className="top-nav__links">
        <NavLink to="/kunde" className={({ isActive }) => (isActive ? 'active' : '')}>
          Kunden-App
        </NavLink>
        <NavLink to="/haendler" className={({ isActive }) => (isActive ? 'active' : '')}>
          Händler-Ansicht
        </NavLink>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Nav />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Navigate to="/kunde" replace />} />
            <Route path="/kunde" element={<KundenApp />} />
            <Route path="/haendler" element={<HaendlerAnsicht />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AppProvider>
  );
}
