export function Products({ products, onAddToCart }) {
  const addToCartHandler = (product) => {
    if (onAddToCart) onAddToCart(product);
  };
  return (
    <div className="products">
      {products.map((product) => (
        <div key={product.id} className="product">
          <h2>{product.nom} ({product.preu} €/u)</h2>
          <button onClick={() => addToCartHandler(product)}>Afegir</button>
        </div>
      ))}
      <style jsx>{`
        .products {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .product {
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 5px;
          width: 300px;
          background-color: #5cb01f;
          color: white;
          flex-direction: row;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .product h2 {
          font-size: 1.2em;
          margin: 0;
        }
        .product button {
          background-color: #fff;
          color: #5cb01f;
          border: none;
          padding: 5px 10px;
          border-radius: 3px;
          cursor: pointer;
        }
        .product button:hover {
          background-color: #e0e0e0;
        }
      `}</style>
    </div>
  );
}