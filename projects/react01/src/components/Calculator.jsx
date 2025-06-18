/*
Componente principal.
States:
    display
    valorAnterior
    operacion

Funciones:
    borrarDisplay
    pone a 0 el display y borra los valores 1, 2 y la operación en curso 
    pulsar(x)
    si x es un número o “,” lo escribe en el display
    si es una operación (/ + - *) guarda el valor del display en 'valorAnterior' y la operación en 'operacion'
    si es '=' llama a la función calcular
    si es 'C' llama a borrarDisplay
    calcular dependiendo de la operación, realiza cálculo entre valorAnterior y el valor en display
    si no hay valorAnterior no hace nada

actualiza el display con el resultado

Subcomponentes:
<Display
<Tecla

Display:
Componente que muestra el valor suministrado
States: ninguno
Props: contenido

Tecla:
Componente tecla, debe mostrar el un botón con el valor recibido como etiqueta y llamar a la función pulsar devolviendo el mismo valor 
States: ninguno
Props: pulsar (método), valor (string)
*/
import { useState } from "react";
import Display from "./Display";
import CalculatorKey from "./CalculatorKey";

function Calculator() {
    const [display, setDisplay] = useState("0");
    const [lastValue, setLastValue] = useState(null);
    const [operation, setOperation] = useState(null);

    const deleteDisplay = () => {
        setDisplay("0");
        setLastValue(null);
        setOperation(null);
    };

    const press = (x) => {
        if (!isNaN(x) || x === ",") {
            // if it's a number or a comma, we append it to the display
            setDisplay((prev) => (prev === "0" ? x : prev + x));
        } else if (["/", "+", "-", "*"].includes(x)) {
            // if it's an operation, we save the current display value and set the operation
            setLastValue(display);
            setOperation(x);
            setDisplay("0");
        } else if (x === "=") {
            calculate();
        } else if (x === "C") {
            deleteDisplay();
        }
    };

    const calculate = () => {
        if (lastValue === null || operation === null) return;

        let result;
        const currentValue = parseFloat(display);
        const previousValue = parseFloat(lastValue);

        switch (operation) {
            case "/":
                result = previousValue / currentValue;
                break;
            case "+":
                result = previousValue + currentValue;
                break;
            case "-":
                result = previousValue - currentValue;
                break;
            case "*":
                result = previousValue * currentValue;
                break;
            default:
                return;
        }

        setDisplay(result.toString());
        setLastValue(null);
        setOperation(null);
    };
    // Style with bootstrap
    return (
        <div className="d-flex flex-col justify-center items-center gap-2 p-4">
            <Display contenido={display} />
            <div className="d-flex flex-wrap justify-center items-center">
                {["7", "8", "9", "/"].map((key) => (
                    <CalculatorKey key={key} press={press} value={key} />
                ))}
                {["4", "5", "6", "*"].map((key) => (
                    <CalculatorKey key={key} press={press} value={key} />
                ))}
                {["1", "2", "3", "-"].map((key) => (
                    <CalculatorKey
                        key={key}
                        press={press}
                        value={key}
                    />
                ))}
                {["0", ",", "=", "+"].map((key) => (
                    <CalculatorKey key={key} press={press} value={key} />
                ))}
                <CalculatorKey press={deleteDisplay} value="C" />
            </div>
        </div>
    );
}
export default Calculator;
