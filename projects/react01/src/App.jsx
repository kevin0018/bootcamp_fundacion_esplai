import { useState } from 'react';
import './App.css';
import R01 from './pages/R01.jsx';
import R03 from './pages/R03.jsx';

function App() {
    const [currentPage, setCurrentPage] = useState('home');

    const renderPage = () => {
        switch (currentPage) {
            case 'r01':
                return <R01 />;
			case 'r03':
				return <R03 />;
            default:
                return (
                    <>
                        <h1>Ejercicios</h1>
                        <button onClick={() => setCurrentPage('r01')}>Ir a R01</button>
						<button onClick={() => setCurrentPage('r03')}>Ir a R03</button>
                    </>
                );
        }
    };

    return <div>{renderPage()}</div>;
}

export default App;
