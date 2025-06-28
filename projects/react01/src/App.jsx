import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/common/Sidebar.jsx';
import R01 from './pages/R01.jsx';
import R02 from './pages/R02.jsx';
import R03 from './pages/R03.jsx';
import R04 from './pages/R04.jsx';
import R06 from './pages/R06.jsx';
import R09 from './pages/R09.jsx';
import R10 from './pages/R10.jsx';
import R11 from './pages/R11.jsx';

function App() {
    return (
        <Router>
            <div className="min-vh-100 d-flex flex-row bg-dark" style={{ minHeight: '100vh' }}>
                <Sidebar />
                <main
                    className="flex-grow-1 d-flex flex-column bg-dark"
                    style={{ minHeight: '100vh', width: 900, maxWidth: 900, padding: 0 }}
                >
                    <header className="mb-4 w-100" style={{ padding: '32px 0 16px 0' }}>
                        <h1 className="fw-bold text-light" style={{ textAlign: 'left', margin: 0 }}>Ejercicios</h1>
                    </header>
                    <div className="w-100" style={{ padding: 0 }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/r01" element={<R01 />} />
                            <Route path="/r02" element={<R02 />} />
                            <Route path="/r03" element={<R03 />} />
                            <Route path="/r04" element={<R04 />} />
                            <Route path="/r06" element={<R06 />} />
                            <Route path="/r09" element={<R09 />} />
                            <Route path="/r10" element={<R10 />} />
                            <Route path="/r11" element={<R11 />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </Router>
    );
}

// Home Page Component
function Home() {
    return <h2 className="text-light" style={{ textAlign: 'left' }}>Selecciona un ejercicio para empezar</h2>;
}

export default App;