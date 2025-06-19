function CalculatorKey({ value, press, isOperator, isWide }) {
    return (
        <button
            className={`calculator-key btn ${
                isOperator ? "btn-warning" : "btn-secondary"
            } ${isWide ? "wide-key" : ""}`}
            onClick={() => press(value)}
        >
            {value}
            <style jsx>{`
                .calculator-key {
                    font-size: 1.5rem;
                    height: 70px;
                    width: 100%;
                    border-radius: 0;
                }

                .wide-key {
                    grid-column: span 2;
                }

                .btn-warning {
                    background-color: #f90 !important;
                    border: none;
                }

                .btn-secondary {
                    background-color: #666 !important;
                    border: none;
                }

                .calculator-key:hover {
                    opacity: 0.8;
                }
            `}</style>
        </button>
    );
}

export default CalculatorKey;