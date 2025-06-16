import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function R03() {
    // State to manage exercise 3
    let activePage = 1;
    const [page, setPage] = useState(activePage);

    return (
        <div>
            <button onClick={() => window.location.href = '/'}>Volver a la página principal</button>
            <h1>R03 - ejercicios simples useState</h1>

            <h2>Ejercicio 1</h2>
            <p>Círculos cambian de color al hacer click</p>
            <p>
                Crear varios círculos en pantalla, cuando se hace click sobre ellos deben cambiar de color.
            </p>
            <p>
                Uso del creador de eventos “on”
            </p>

            <div className="circles-container">
                {[...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className="circle"
                        onClick={(e) => {
                            e.currentTarget.style.backgroundColor =
                                e.currentTarget.style.backgroundColor === "orange" ? "grey" : "orange";
                        }}
                    ></div>
                ))}
            </div>
            <p>Ejercicio 1b</p>
            <p>
                Crear un botón que ponga todos los círculos de color rojo y otro que los deje como estaban.
            </p>
            <button
                onClick={() => {
                    document.querySelectorAll('.circle').forEach(circle => {
                        circle.style.backgroundColor = 'red';
                    });
                }}
            >
                Poner rojo
            </button>
            <button
                onClick={() => {
                    document.querySelectorAll('.circle').forEach(circle => {
                        circle.style.backgroundColor = 'grey';
                    });
                }}
            >
                Quitar rojo
            </button>

            <h2>Ejercicio 2</h2>
            <p><b>&lt;MasMenos /&gt;</b></p>
            <p>Crear dos botones y un campo &lt;input&gt; como en la figura.</p>
            <p>El valor inicial del campo input deberá ser 0.</p>
            <p>Al clicar sobre el botón “+” debe sumar una unidad.</p>
            <p>Al clicar sobre el botón “-” debe restar una unidad.</p>

            <p>Nota: el campo &lt;input&gt; no debe ser editable directamente, para ello le añadimos el atributo “disabled”:    &lt;input   type="number" value={0} disabled&gt;</p>
            <div>
                <button onClick={() => {
                    const input = document.getElementById('less-more-input');
                    input.value = parseInt(input.value) - 1;
                }}>-</button>
                <input type="number" id="less-more-input" value={0} disabled />
                <button onClick={() => {
                    const input = document.getElementById('less-more-input');
                    input.value = parseInt(input.value) + 1;
                }}>+</button>
            </div>

            <p>Ejercicio 2b</p>

            <p>Limitar los valores posibles a números enteros de 0 a 10. Es decir, no permitir cambiar a un número mayor de 10 o menor de 0.</p>
            <p>Pista: ver qué valor se establecerá si añadimos o restamos, utilizar if para actuar en consecuencia.</p>
            <div>
                <button onClick={() => {
                    const input = document.getElementById('more-less-input-2');
                    if (parseInt(input.value) > 0) {
                        input.value = parseInt(input.value) - 1;
                    }
                }}>-</button>
                <input type="number" id="more-less-input-2" value={0} disabled />
                <button onClick={() => {
                    const input = document.getElementById('more-less-input-2');
                    if (parseInt(input.value) < 10) {
                        input.value = parseInt(input.value) + 1;
                    }
                }}>+</button>
            </div>

            <h2>Ejercicio 3</h2>

            <p>En este ejercicio utilizaremos bootstrap, por tanto deberemos cargar react bootstrap</p>

            <p>https://react-bootstrap.github.io/</p>

            <p>Crear un elemento de paginación</p>

            <p>Objetivo: cuando cliquemos sobre “&lt;&lt;” restará una unidad a todos los números, y cuando cliquemos en “&gt;&gt;” sumará una unidad, simulando un componente de paginación:</p>

            <Pagination>
                <Pagination.Prev onClick={() => setPage(page > 1 ? page - 1 : 1)} />
                {[...Array(5)].map((_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={page === index + 1}
                        onClick={() => setPage(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setPage(page < 5 ? page + 1 : 5)} />
            </Pagination>

            <p>Ejercicio 3b:</p>
            <p>Mejorar el anterior de modo que:</p>
            <ol>
                <li>
                    Solo permita moverse entre min y max (valores que recibirá por props.min, props.max)
                </li>
                <li>
                    Hacer que los números 1,2,3 etc enlacen con las páginas /p1, /p2, /p3… (no hace falta crearlas, sólo hacer el a href.)
                </li>
            </ol>


            <style jsx>{`
                .circles-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                .circle {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    background-color: grey;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
            `}</style>
        </div>
    );

}

export default R03;