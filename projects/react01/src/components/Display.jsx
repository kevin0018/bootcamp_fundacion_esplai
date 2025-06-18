/*
Display:
    Componente que muestra el valor suministrado
        States: ninguno
        Props: contenido
*/

function Display({ content }) {
    // bootstrap
    return (
        <div className="d-flex justify-content-end align-items-center bg-light border rounded p-2">
            <span>{content}</span>
        </div>
    );
}

export default Display;