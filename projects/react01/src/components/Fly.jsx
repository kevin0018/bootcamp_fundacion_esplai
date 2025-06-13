import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMosquito } from '@fortawesome/free-solid-svg-icons';

function Fly({ color }) {
    return (
        <div style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            fontSize: '40px',
            color: color,
        }}>
            <FontAwesomeIcon icon={faMosquito} />
        </div>
    );
}

export default Fly;