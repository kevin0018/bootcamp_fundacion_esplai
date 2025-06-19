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
            setDisplay((prev) => (prev === "0" ? x : prev + x));
        } else if (["/", "+", "-", "*"].includes(x)) {
            setLastValue(display);
            setOperation(x);
            setDisplay("0");
        } else if (x === "=") {
            calculate();
        } else if (x === "AC") {
            deleteDisplay();
        }
    };

    const calculate = () => {
        if (lastValue === null || operation === null) return;

        let result;
        const currentValue = parseFloat(display.replace(",", "."));
        const previousValue = parseFloat(lastValue.replace(",", "."));

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

        setDisplay(result.toString().replace(".", ","));
        setLastValue(null);
        setOperation(null);
    };

    return (
        <div className="calculator-container">
            <Display contenido={display} />
            <div className="calculator-keys">
                {["AC", "+/-", "%", "/"].map((key) => (
                    <CalculatorKey key={key} press={press} value={key} isOperator={key === "/"} />
                ))}
                {["7", "8", "9", "*"].map((key) => (
                    <CalculatorKey key={key} press={press} value={key} isOperator={key === "*"} />
                ))}
                {["4", "5", "6", "-"].map((key) => (
                    <CalculatorKey key={key} press={press} value={key} isOperator={key === "-"} />
                ))}
                {["1", "2", "3", "+"].map((key) => (
                    <CalculatorKey key={key} press={press} value={key} isOperator={key === "+"} />
                ))}
                <CalculatorKey press={press} value="0" isWide />
                {[",", "="].map((key) => (
                    <CalculatorKey key={key} press={press} value={key} isOperator={key === "="} />
                ))}
            </div>
            <style jsx>{`
                .calculator-container {
                    max-width: 340px;
                    margin: auto;
                    background: #333;
                    border-radius: 20px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                .calculator-keys {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1px;
                }
            `}</style>
        </div>
    );
}

export default Calculator;