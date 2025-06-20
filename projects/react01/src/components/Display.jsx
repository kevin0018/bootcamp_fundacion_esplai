// Key button component
function CalculatorKey({ value, press, isOperator, isLightGray, isWide }) {
    return (
        <button
            className={`calculator-key${isOperator ? " operator" : ""}${isLightGray ? " light-gray" : ""}${isWide ? " wide" : ""}`}
            onClick={() => press(value)}
            tabIndex={0}
        >
            {value}
            <style jsx>{`
                .calculator-key {
                    font-size: 1.5rem;
                    height: 70px;
                    width: 100%;
                    border: none;
                    background: #666;
                    color: white;
                    outline: none;
                    border-radius: 0;
                    transition: background 0.2s;
                }
                .calculator-key:hover {
                    background: #777;
                }
                .operator {
                    background: #f90 !important;
                    color: white;
                }
                .light-gray {
                    background: #bbb !important;
                    color: black;
                }
                .wide {
                    grid-column: span 2;
                }
            `}</style>
        </button>
    );
}

export default CalculatorKey;