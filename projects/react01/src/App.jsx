import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import R01 from './pages/R01';
import R02 from './pages/R02.jsx';

function App() {
    return (
        <Router>
            <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center">
                {/* Navigation and Header */}
                <header className="text-center mb-4">
                    <h1 className="fw-bold text-light">Ejercicios</h1>
                </header>

                {/* Buttons */}
                <nav className="d-flex gap-3">
                    <Link to="/r01" className="btn btn-primary">Ir a R01</Link>
                    <Link to="/r02" className="btn btn-primary">Ir a R02</Link>
                </nav>

                {/* Route Definitions */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/r01" element={<R01 />} />
                    <Route path="/r02" element={<R02 />} />
                </Routes>
            </div>
        </Router>
    );
}

// Home Page Component
function Home() {
    return <h2>Selecciona un ejercicio para empezar</h2>;
}

export default App;