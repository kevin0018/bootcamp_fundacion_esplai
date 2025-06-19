function Display({ contenido }) {
    return (
        <div className="calculator-display">
            {contenido}
            <style jsx>{`
                .calculator-display {
                    font-size: 2.8rem;
                    text-align: right;
                    padding: 15px 20px;
                    color: white;
                    background: #4c4c4c;
                    border-bottom: 1px solid #333;
                }
            `}</style>
        </div>
    );
}

export default Display;