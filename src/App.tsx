import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { NavigationBar } from './components/NavigationBar';
import HomePage from './pages/HomePage';
import ElPage from './pages/ElPage';
import VandPage from './pages/VandPage';
import BraendstofPage from './pages/BraendstofPage';
import MaterialerPage from './pages/MaterialerPage';
import AffaldPage from './pages/AffaldPage';
import BygningPage from './pages/BygningPage';
import OversigtPage from './pages/OversigtPage';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="app-header">
          <h1>CO₂-registrering</h1>
        </header>
        <NavigationBar />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/el" element={<ElPage />} />
            <Route path="/vand" element={<VandPage />} />
            <Route path="/braendstof" element={<BraendstofPage />} />
            <Route path="/materialer" element={<MaterialerPage />} />
            <Route path="/affald" element={<AffaldPage />} />
            <Route path="/bygning" element={<BygningPage />} />
            <Route path="/oversigt" element={<OversigtPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
