import { useState } from 'react';

function Login({ correctName, correctPassword }) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Handles login form submission
    const handleLogin = (e) => {
        e.preventDefault();
        if (name === correctName && password === correctPassword) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            alert('Credenciales incorrectas');
        }
    };

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center p-3">
            <form onSubmit={handleLogin} className="w-100" style={{maxWidth: 350}}>
                <h2 className="text-center mb-4">Iniciar sesión</h2>
                <div className="mb-3 d-flex align-items-center gap-2">
                    <label htmlFor="name" className="form-label mb-0 flex-shrink-0" style={{width: 80}}>Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="form-control flex-grow-1"
                    />
                    {/* Status circle for authentication */}
                    <span
                        className="ms-2"
                        style={{
                            display: 'inline-block',
                            width: 40,
                            height: 30,
                            borderRadius: '50%',
                            backgroundColor: isAuthenticated ? '#28a745' : '#dc3545',
                            border: '2px solid #dee2e6',
                        }}
                        aria-label={isAuthenticated ? 'Autenticado' : 'No autenticado'}
                    ></span>
                </div>
                <div className="mb-3 d-flex align-items-center gap-2">
                    <label htmlFor="password" className="form-label mb-0 flex-shrink-0" style={{width: 80}}>Contraseña:</label>
                    <input
                        type="password"
                        id="pass"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-control flex-grow-1"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
        </div>
    );
}

export default Login;