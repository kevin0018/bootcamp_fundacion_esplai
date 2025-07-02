import { Link, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import TranslatorContext from "../i18n/TranslatorContext";

export default function R12({ showLanguageSwitcher }) {
    const { translate, language, setLanguage } = useContext(TranslatorContext);
    const location = useLocation();
    return (
        <div style={{ width: '100%' }}>
            <div className="d-flex justify-content-end gap-2 mt-2" style={{ maxWidth: 900, margin: '0 auto', display: showLanguageSwitcher ? 'flex' : 'none' }}>
                <button
                    className={language === 0 ? 'btn btn-primary btn-sm' : 'btn btn-outline-primary btn-sm'}
                    onClick={() => setLanguage(0)}
                    aria-label="Español"
                >
                    ES
                </button>
                <button
                    className={language === 1 ? 'btn btn-primary btn-sm' : 'btn btn-outline-primary btn-sm'}
                    onClick={() => setLanguage(1)}
                    aria-label="Català"
                >
                    CA
                </button>
            </div>
            <h2 className='text-light text-center mb-4 mt-3'>{translate('exercise')}</h2>
            <h2>{translate('parksTitle')}</h2>
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
                <Link to="/r12/parks/vallvidrera" style={buttonStyle} className={location.pathname.endsWith('vallvidrera') ? 'fw-bold' : ''}>{translate('vallvidrera')}</Link>
                <Link to="/r12/parks/collserola" style={buttonStyle} className={location.pathname.endsWith('collserola') ? 'fw-bold' : ''}>{translate('collserola')}</Link>
                <Link to="/r12/parks/montserrat" style={buttonStyle} className={location.pathname.endsWith('montserrat') ? 'fw-bold' : ''}>{translate('montserrat')}</Link>
                <Link to="/r12/parks/garraf" style={buttonStyle} className={location.pathname.endsWith('garraf') ? 'fw-bold' : ''}>{translate('garraf')}</Link>
                <Link to="/r12/parks/montseny" style={buttonStyle} className={location.pathname.endsWith('montseny') ? 'fw-bold' : ''}>{translate('montseny')}</Link>
                <Link to="/r12/parks/llobregat" style={buttonStyle} className={location.pathname.endsWith('llobregat') && !location.pathname.endsWith('llobregat2') ? 'fw-bold' : ''}>{translate('llobregat')}</Link>
                <Link to="/r12/parks/llobregat2" style={buttonStyle} className={location.pathname.endsWith('llobregat2') ? 'fw-bold' : ''}>{translate('llobregat2')}</Link>
                <Link to="/r12/parks/pedraforca" style={buttonStyle} className={location.pathname.endsWith('pedraforca') ? 'fw-bold' : ''}>{translate('pedraforca')}</Link>
                <Link to="/r12/parks/mola" style={buttonStyle} className={location.pathname.endsWith('mola') ? 'fw-bold' : ''}>{translate('mola')}</Link>
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