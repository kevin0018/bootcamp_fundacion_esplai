import { Link, Outlet } from "react-router-dom";

export default function R12() {
    return (
        <div style={{ width: '100%' }}>
            <h2 className='text-light text-center mb-4 mt-3'>Ejercicio 12</h2>
            <h2>Los mejores parques naturales cerca de Barcelona</h2>
            <nav style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1rem',
                margin: '2rem 0',
                maxWidth: 900,
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>
                <Link to="/r12/parks/vallvidrera" style={buttonStyle}>Vallvidrera</Link>
                <Link to="/r12/parks/collserola" style={buttonStyle}>Collserola</Link>
                <Link to="/r12/parks/montserrat" style={buttonStyle}>Montserrat</Link>
                <Link to="/r12/parks/garraf" style={buttonStyle}>Garraf</Link>
                <Link to="/r12/parks/montseny" style={buttonStyle}>Montseny</Link>
                <Link to="/r12/parks/llobregat" style={buttonStyle}>Llobregat</Link>
                <Link to="/r12/parks/llobregat2" style={buttonStyle}>Llobregat II</Link>
                <Link to="/r12/parks/pedraforca" style={buttonStyle}>Pedraforca</Link>
                <Link to="/r12/parks/mola" style={buttonStyle}>Mola</Link>
            </nav>
            <div className="w-100 d-flex justify-content-center">
                <Outlet />
            </div>
        </div>
    );
}

const buttonStyle = {
    display: 'inline-block',
    minWidth: '110px',
    maxWidth: '140px',
    padding: '10px 18px',
    background: '#f5e9da',
    color: '#1a237e',
    borderRadius: '2rem',
    textAlign: 'center',
    fontWeight: 600,
    fontSize: '1rem',
    textDecoration: 'none',
    boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
    transition: 'background 0.2s, color 0.2s',
    border: 'none',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: 0
};