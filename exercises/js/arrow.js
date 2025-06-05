/*
Ejercicios sobre Arrow Functions en JavaScript
Arrow Functions
*/

/*

1. Convierte esta función a arrow function:
function suma(a, b) {
return a + b;
}
*/
const sum = (a, b) => a + b;
console.log(sum(5, 3));

// 2. Crea una arrow function que reciba un nombre y devuelva: "Hola, <nombre>!"
const greet = name => `Hola, ${name}!`;
console.log(greet("Kevin"));

// 3. Crea una arrow function que reciba un número y devuelva su cuadrado.
const square = number => number * number;
console.log(square(4));

// 4. Crea una arrow function que devuelva siempre el string "¡Hola mundo!".
const helloWorld = () => "¡Hola mundo!";
console.log(helloWorld());
// 5. Arrow function que reciba un número y devuelva "par" o "impar".
const evenOdd = number => (number % 2 === 0 ? "par" : "impar");
console.log(evenOdd(7));
console.log(evenOdd(8));
/*
6. Crea una arrow function que reciba un mensaje y un número, y lo repita n veces en
consola.
*/
const repeatMessage = (message, n) => {
    for (let i = 0; i < n; i++) {
        console.log(message);
    }
};
repeatMessage("¡Hola!", 3);
/*
7. Crea una arrow function que reciba cualquier cantidad de números y devuelva su
promedio.
*/
const average = (...numbers) => {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}
console.log(average(10, 20, 30, 40));
/*
8. Crea una arrow function con dos parámetros, el segundo con valor por defecto. Si no se
pasa, que imprima "No se proporcionó valor".
*/
const greetWithDefault = (name, greeting = "No se proporcionó valor") => {
    return `${greeting}, ${name}!`;
}
console.log(greetWithDefault("Kevin"));
console.log(greetWithDefault("Kevin", "Hola"));
/*
Ejercicios sobre Callbacks
1. Crea una función registrarUsuario(nombre, callback) que valide si el nombre tiene al
menos 3 caracteres.
Si no es válido, el callback debe recibir un mensaje de error.
Si es válido, genera un ID aleatorio y pasa al callback un mensaje como:
“ Usuario Laura registrado con ID 438”
*/
const registerUser = (name, callback) => {
    if (name.length < 3) {
        callback("Error: El nombre debe tener al menos 3 caracteres.");
    }
    else {
        const userId = Math.floor(Math.random() * 1000);
        callback(`Usuario ${name} registrado con ID ${userId}`);
    }
}
registerUser("Kevin", (message) => {
    console.log(message);
});

/*
2. Crea la función procesarPedido(pedido, callback) que reciba un objeto como:
{ producto: "Pizza", cantidad: 3 }
    • Si falta algún dato o la cantidad es menor o igual a 0, pasa al callback un mensaje de
    error.
    • Si todo está correcto, simula un tiempo de procesamiento (cantidad * 500ms) con
    setTimeout.
    • Al terminar, pasa al callback un mensaje como:
    " Tu pedido de 3 Pizza(s) ha sido procesado en 1500ms"
*/
const processOrder = (order, callback) => {
    if (!order.product || !order.total || order.total <= 0) {
        callback("Error: Pedido incompleto o cantidad inválida.");
    }
    else {
        const processingTime = order.total * 500;
        setTimeout(() => {
            callback(`Tu pedido de ${order.total} ${order.product}${order.total > 1 ? 's' : ''} ha sido procesado en ${processingTime}ms`);
        }, processingTime);
    }
}
processOrder({ product: "Pizza", total: 3 }, (message) => {
    console.log(message);
});
/*
3. Crea una función realizarOperacion(a, b, callback) que:
    • Valide que a y b sean números.
    • Aplique la operación matemática definida en el callback (suma, resta, multiplicación,
    etc.).
    • Muestra el resultado por consola o un mensaje de error.
Ejemplo de uso:
realizarOperacion(10, 5, (x, y) => x * y); // Resultado: 50 
*/
const performOperation = (a, b, callback) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
        console.error("Error: Ambos parámetros deben ser números.");
    } else {
        const result = callback(a, b);
        console.log(`Resultado: ${result}`);
    }
}
performOperation(10, 5, (x, y) => x * y); // Resultado: 50

/*
4. Simula una operación asincrónica usando setTimeout con un callback que imprima
'Operación completada' después de 2 segundos.
*/
const asyncOperation = (callback) => {
    setTimeout(() => {
        callback("Operación completada");
    }, 2000);
}
asyncOperation((message) => {
    console.log(message);
});
/*
5. Crea una función validarEmail(email, onSuccess, onError) que:
    • Verifique si el email contiene "@" y ".".
    • Si es válido, llama al callback “onSuccess” con el dominio del email.
    • Si no es válido, llama al callback “onError”.
*/
const validateEmail = (email, onSuccess, onError) => {
    if (email.includes("@") && email.includes(".")) {
        const domain = email.split("@")[1];
        onSuccess(domain);
    } else {
        onError("Error: Email inválido.");
    }
}
validateEmail(
    "akevin.2215@gmail.com",
    (domain) => {
        console.log(`Dominio del email: ${domain}`);
    },
    (error) => {
        console.error(error);
    }
);
/*
6. Crea tres funciones: lavarPlatos, secarPlatos y guardarPlatos. Cada una recibe un callback
que debe ejecutarse al terminar su tarea (simula con setTimeout).
*/
const washDishes = (callback) => {
    setTimeout(() => {
        console.log("Platos lavados.");
        callback();
    }
    , 1000);
}
const dryDishes = (callback) => {
    setTimeout(() => {
        console.log("Platos secos.");
        callback();
    }
    , 1000);
}
const putAwayDishes = (callback) => {
    setTimeout(() => {
        console.log("Platos guardados.");
        callback();
    }
    , 1000);
}
const doDishes = () => {
    washDishes(() => {
        dryDishes(() => {
            putAwayDishes(() => {
                console.log("Tarea de platos completada.");
            });
        });
    });
}
doDishes();
/*
7. Crea una función intentar(fn, veces) que intente ejecutar una función fn. Si la función
lanza un error, vuelve a intentarlo hasta veces veces. Cuando tenga éxito, imprime el
resultado. Si falla siempre, imprime "Error final". La función fn tiene que tener un 70% de
posibilidades de fallar.
Ejercicios sobre Array Helpers
1. Dado un array de números, usa .map() con arrow function para obtener un nuevo array
con los cuadrados.
2. Usa .filter() con arrow function para quedarte solo con los números pares de este array:
[1, 2, 3, 4, 5, 6]
3. Usa .reduce() con arrow function para sumar todos los elementos del array [10, 20, 30].
4. Dado un array de palabras, usa .map() con arrow function para crear un nuevo array con
la longitud de cada palabra.
5. Dado un array de objetos tipo {nombre: "Ana", edad: 25}, usa .filter() con una arrow
function para obtener solo los mayores de edad.
6. Dado un array de números, ordénalos de mayor a menor usando .sort() y una arrow
function.

7. Dado un array de nombres, usa .map() para obtener un array con el número de letras de
cada nombre.
8. Dado un array de objetos {producto: "Pan", precio: 2.5}, usa .map() para crear un array
con frases como "El producto Pan cuesta 2.5€".
9. Dado un array de números, usa .filter() para obtener solo los múltiplos de 3.
10. Dado un array de objetos {nombre: "Ana", notas: [7, 9, 8]}, usa .map() y .reduce() para
obtener un nuevo array con los promedios de cada persona.
11. Dado un array de números, usa .reduce() para contar cuántos son pares.
12. Dado un array de strings, usa .forEach() para imprimir cada uno con su posición (ej: "0:
Hola").
13. Dado un array de precios, usa .reduce() para calcular el total y luego el precio medio.
14. Dado un array de nombres, usa .sort() para ordenarlos por orden alfabético inverso.
15. Dado un array de objetos {nombre: "Pepe", edad: 30}, usa .sort() para ordenarlos de
menor a mayor edad.
16. Dado un array de números, usa .filter() para eliminar los duplicados. (Pista: puedes usar
.filter() junto con .indexOf().)
Clases + callbacks (ejercicio 1)
Implementa una clase EventManager que permita gestionar un sistema de eventos de
manera flexible. Esta clase deberá ofrecer los siguientes métodos:
• .suscribir(evento, callback): registra una función suscriptora para un evento
concreto (por ejemplo, "mensaje" o "oferta").
• .emitir(evento, datos): emite un evento y ejecuta todas las funciones suscritas,
pasándoles los datos correspondientes.
• .cancelar(evento, callback): elimina una suscripción específica para un evento
determinado.
Cada suscripción debe estar asociada a un nombre de evento (string), lo que permite tener
distintos tipos de eventos con diferentes funciones suscritas.
Además, crea una clase Usuario que represente a un usuario del sistema. Esta clase deberá
incluir:
• Una propiedad nombre (string), que identifica al usuario.
• Una propiedad numeroDeMensajesRecibidos (número), que lleve la cuenta de los
mensajes que ha recibido.

• Un método recibirMensaje(mensaje) que actualice la cuenta de mensajes y muestre
el contenido recibido de forma personalizada.
Finalmente, muestra cómo varias instancias de Usuario pueden suscribirse a un evento
llamado "mensaje" usando sus propios métodos como callbacks, y cómo EventManager se
encarga de emitir los mensajes y gestionar las suscripciones.
Clases + callbacks (ejercicio 2)
Implementa una clase Fabrica que permita gestionar un sistema de procesamiento de
productos de manera flexible. Esta clase deberá ofrecer los siguientes métodos:
• .registrarPaso(callback): añade una función de procesamiento (paso) a una lista de
pasos. Cada paso será una función que recibe un producto, lo modifica y lo devuelve.
• .procesarProducto(producto): ejecuta, en orden, todos los pasos registrados sobre el
objeto producto, aplicando cada función secuencialmente.
• .limpiarPasos(): elimina todos los pasos registrados hasta el momento.
Cada paso debe modificar el producto y registrar internamente que ese paso ha sido
ejecutado.
Además, crea una clase Producto que represente un objeto que pasa por la fábrica. Esta
clase deberá incluir:
• Una propiedad nombre (string), que identifica al producto.
• Una propiedad historial (array de strings), que almacena los nombres de los pasos
aplicados.
• Un método marcarPaso(nombrePaso) que añada el nombre del paso al historial.
Finalmente, demuestra cómo varias funciones pueden registrarse como pasos de
procesamiento, cómo diferentes productos pueden ser procesados por la fábrica, y cómo el
historial de cada producto refleja los pasos aplicados en orden.
*/