import Thumbs from "../components/Thumbs";
import Tricolor from "../components/Tricolor.jsx";
import Photos from "../components/Photos.jsx";
function R03 () {
	return (
		<>
			<h2>&lt;Thumbs /&gt;</h2>
			<p>
				Muestra icono1 "thumbs-up" de fontawesome que cambia "thumbs-down" alternativamente al clicar encima.
				El valor true/false debe guardarse en un state.
			</p>
			<Thumbs />
			<h2>&lt;Tricolor /&gt;</h2>
			<p>
				Crear un div en forma circular de 50x50px con color de fondo gris inicialmente.
				Al pulsar sobre el mismo, el color debe cambiar a rojo, verde, azul alternativamente.
				Después de la secuencia, volver a gris.
				El color debe guardarse en un state.
			</p>
			<Tricolor />
			<h2>&lt;Fotos /&gt;</h2>
			<p>
				Mostraremos un desplegable &lt;select&gt; con cuatro opciones: coche, moto, bici, bus. El valor inicial será "bici".
				Debajo mostraremos una imagen de una bicicleta. Al cambiar el valor del desplegable cambiaremos la
				imagen para que muestre otra de acuerdo con la selección.
			</p>
			<Photos />
		</>
	);
}

export default R03;