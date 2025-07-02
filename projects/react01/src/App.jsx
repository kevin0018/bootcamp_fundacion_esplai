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
import R12 from './pages/R12.jsx';

import Vallvidrera from './pages/parks/Vallvidrera.jsx';
import Collserola from './pages/parks/Collserola.jsx';
import Montserrat from './pages/parks/Montserrat.jsx';
import Garraf from './pages/parks/Garraf.jsx';
import Montseny from './pages/parks/Montseny.jsx';
import Llobregat from './pages/parks/Llobregat.jsx';
import Llobregat2 from './pages/parks/Llobregat2.jsx';
import Pedraforca from './pages/parks/Pedraforca.jsx';
import Mola from './pages/parks/Mola.jsx';

function App() {
    return (
        <Router>
            <div className="min-vh-100 d-flex flex-row" style={{ 
                minHeight: '100vh',
                backgroundColor: '#242424' 
            }}>
                <Sidebar />
                <main
                    className="flex-grow-1 d-flex flex-column justify-content-start align-items-center"
                    style={{ 
                        minHeight: '100vh', 
                        backgroundColor: '#242424',
                        padding: 0,
                        paddingLeft: '250px'
                    }}
                >
                    <div 
                        className="w-100 d-flex flex-column content-container"
                        style={{
                            maxWidth: '900px',
                            width: '100%',
                            minHeight: '100vh',
                            backgroundColor: '#242424'
                        }}
                    >
                        <header className="mb-3 w-100" style={{ 
                            padding: '20px 20px 12px 20px',
                            backgroundColor: '#242424'
                        }}>
                            <div className="d-lg-none text-center">
                                <p className="text-light mb-0 mt-2" style={{ 
                                    fontSize: '0.9rem',
                                    paddingTop: '50px'
                                }}>
                                    Usa el menú ☰ para navegar entre ejercicios
                                </p>
                            </div>
                        </header>
                        <div className="w-100" style={{ 
                            padding: '0 20px',
                            backgroundColor: '#242424',
                            flex: 1
                        }}>
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
                                <Route path="/r12" element={<R12 />}>
                                    <Route path="parks/vallvidrera" element={<Vallvidrera />} />
                                    <Route path="parks/collserola" element={<Collserola />} />
                                    <Route path="parks/montserrat" element={<Montserrat />} />
                                    <Route path="parks/garraf" element={<Garraf />} />
                                    <Route path="parks/montseny" element={<Montseny />} />
                                    <Route path="parks/llobregat" element={<Llobregat />} />
                                    <Route path="parks/llobregat2" element={<Llobregat2 />} />
                                    <Route path="parks/pedraforca" element={<Pedraforca />} />
                                    <Route path="parks/mola" element={<Mola />} />
                                </Route>
                            </Routes>
                        </div>
                    </div>
                </main>
            </div>
        </Router>
    );
}

// Home Page Component
function Home() {
    return (
        <div className="text-light text-center" style={{ marginTop: '2rem' }}>
            <h2 className="mb-4" style={{ fontSize: '1.8rem' }}>
                Selecciona un ejercicio para empezar
            </h2>
            <div className="d-lg-none">
                <p className="mb-3" style={{ fontSize: '1.1rem' }}>
                    Usa el menú ☰ para navegar entre ejercicios
                </p>
                <div className="mt-4">
                    <small className="text-muted">
                        Toca el botón de menú en la esquina superior izquierda para ver todos los ejercicios disponibles.
                    </small>
                </div>
            </div>
            <div className="d-none d-lg-block">
                <p className="text-muted" style={{ fontSize: '1rem' }}>
                    Utiliza el menú de la izquierda para navegar entre los diferentes ejercicios.
                </p>
            </div>
        </div>
    );
}

export default App;