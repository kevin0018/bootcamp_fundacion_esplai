/*
Tecla:
    Componente tecla, debe mostrar el un botón con el valor recibido como etiqueta y llamar a la función pulsar devolviendo el mismo valor 
        States: ninguno
        Props: pulsar (método), valor (string)
*/

function CalculatorKey({ press, value }) {
    // bootstrap
    return (
        <button
            className="btn btn-secondary m-1"
            onClick={() => press(value)}
        >
            {value}
        </button>
    );
}
export default CalculatorKey;