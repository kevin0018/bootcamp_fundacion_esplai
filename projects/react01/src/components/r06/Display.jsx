// Display component
function Display({ contenido }) {
    return (
        <div className="calculator-display">
            {contenido}
            <style jsx="true">{`
                .calculator-display {
                    font-size: 2rem;
                    background: #222;
                    color: white;
                    text-align: right;
                    padding: 10px;
                    border-bottom: 1px solid #444;
                }
            `}</style>
        </div>
    );
}

export default Display;