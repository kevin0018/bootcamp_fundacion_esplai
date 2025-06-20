/*
El componente Password tiene un único state [valores, setValores] cuyo valor inicial será un array con tantos ceros como elementos tenga props.secret:

const [valors, setValors] = useState(props.secret.map(e => 0));

Se muestran siempre 6 "bolas" como elmentos tenga el array props.secret

Clicando sobre una bola se modifica el state valores:
cada bola debe recibir via props el valor que le corresponde (1/0) y una función que permita modificar este valor en el state del componente Password. 




El mensaje que se muestra depende de si el array valores es igual al array secreto, por ejemplo:




let mensaje_a_mostrar = '---';
if (arrays_iguales(valores, props.secret){
      mensaje_a_mostrar="ADELANTE!";
}

(es necesario implementar la función arrays_iguales)

*/
import { useState } from 'react';

function Password({ secret }) {
    const [values, setValores] = useState(secret.map(e => 0));
    

    const handleClick = (index) => {
        const newValues = [...values];
        newValues[index] = newValues[index] === 0 ? 1 : 0;
        setValores(newValues);
    };

    let msg_to_show = '---';
    if (arrays_iguales(values, secret)) {
        msg_to_show = "ADELANTE!";
    }

    return (
        <div>
            <h2>Password</h2>
            <div className="password-balls">
                {values.map((value, index) => (
                    <div
                        key={index}
                        className={`ball ${value === 1 ? 'active' : ''}`}
                        onClick={() => handleClick(index)}
                    >
                        {value}
                    </div>
                ))}
            </div>
            <p>{msg_to_show}</p>
        </div>
    );
}

function arrays_iguales(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

export default Password;