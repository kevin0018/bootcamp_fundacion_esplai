export function Ticket({ cart, onRemoveProduct }) {
    const cartSummary = cart.reduce((acc, product) => {
        const found = acc.find((item) => item.id === product.id);
        if (found) {
            found.quantity += 1;
        } else {
            acc.push({ ...product, quantity: 1 });
        }
        return acc;
    }, []);
    const total = cartSummary.reduce((acc, product) => acc + product.preu * product.quantity, 0);
    return (
        <div className="ticket">
            {cartSummary.length === 0 ? (
                <p>No hay productos en el ticket.</p>
            ) : (
                cartSummary.map((product) => (
                    <div key={product.id} className="ticket-product">
                        <div className="ticket-header">
                            <span>{product.nom}</span>
                            <button onClick={() => onRemoveProduct(product.id)}>Treure</button>
                        </div>
                        <div className="ticket-details">
                            <span>{product.quantity}u x {product.preu} €/u = {(product.quantity * product.preu).toFixed(2)} €</span>
                        </div>
                    </div>
                ))
            )}
            <hr />
            <p><strong>Total: {total.toFixed(2)} €</strong></p>
            <style jsx>{`
                .ticket {
                border: 1px solid #222;
                padding: 10px;
                border-radius: 5px;
                background-color: #234c1a;
                color: #fff;
                min-width: 250px;
                }
                .ticket-product {
                margin-bottom: 10px;
                }
                .ticket-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                }
                .ticket-details {
                margin-left: 10px;
                }
                button {
                background: #e9d8c2;
                color: #234c1a;
                border: none;
                border-radius: 3px;
                padding: 4px 12px;
                cursor: pointer;
                }
                button:hover {
                background: #fff;
                }
                hr {
                border: 1px solid #fff;
                }
            `}</style>
        </div>
    );
}