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
*/
const tryFunction = (fn, attempts) => {
    let success = false;
    for (let i = 0; i < attempts; i++) {
        try {
            const result = fn();
            console.log(`Resultado: ${result}`);
            success = true;
            break;
        } catch (error) {
            console.log(`Intento ${i + 1} falló: ${error.message}`);
        }
    }
    if (!success) {
        console.log("Error final: No se pudo ejecutar la función después de varios intentos.");
    }
}

const functionToTry = () => {
    if (Math.random() < 0.7) {
        throw new Error("La función falló");
    }
    return "Función ejecutada con éxito";
}

tryFunction(functionToTry, 5);


// Ejercicios sobre Array Helpers

/*
1. Dado un array de números, usa .map() con arrow function para obtener un nuevo array
con los cuadrados.
*/
const numbers = [1, 2, 3, 4, 5];
const squares = numbers.map(num => num * num);
console.log(squares);

/*
2. Usa .filter() con arrow function para quedarte solo con los números pares de este array:
[1, 2, 3, 4, 5, 6]
*/
const mixedNumbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = mixedNumbers.filter(num => num % 2 === 0);
console.log(evenNumbers);


// 3. Usa .reduce() con arrow function para sumar todos los elementos del array [10, 20, 30].
const arrayToSum = [10, 20, 30];
const totalSum = arrayToSum.reduce((acc, num) => acc + num, 0);
console.log(totalSum);

/*
4. Dado un array de palabras, usa .map() con arrow function para crear un nuevo array con
la longitud de cada palabra.
*/
const words = ["Hace", "mucho", "calor", "hoy", "!!!"];
const wordLengths = words.map(word => word.length);
console.log(wordLengths);
/*
5. Dado un array de objetos tipo {nombre: "Ana", edad: 25}, usa .filter() con una arrow
function para obtener solo los mayores de edad.
*/
const people = [
    { nombre: "Pablo", edad: 23 },
    { nombre: "Miguel", edad: 17 },
    { nombre: "Fernando", edad: 30 },
    { nombre: "Sergio", edad: 15 }
];
const adults = people.filter(person => person.edad >= 18);
console.log(adults);

/*
6. Dado un array de números, ordénalos de mayor a menor usando .sort() y una arrow
function.
*/
const numbersToSort = [5, 3, 8, 1, 2];
const sortedNumbers = numbersToSort.sort((a, b) => b - a);
console.log(sortedNumbers);

/*
7. Dado un array de nombres, usa .map() para obtener un array con el número de letras de
cada nombre.
*/
const names = ["Pablo", "Luis", "Pedro", "Sergio"];
const nameLengths = names.map(name => name.length);
console.log(nameLengths);

/*
8. Dado un array de objetos {producto: "Pan", precio: 2.5}, usa .map() para crear un array
con frases como "El producto Pan cuesta 2.5€".
*/
const products = [
    { producto: "Pan", precio: 2.5 },
    { producto: "Leche", precio: 1.2 },
    { producto: "Queso", precio: 3.0 }
];
const productDescriptions = products.map(product => `El producto ${product.producto} cuesta ${product.precio}€`);
console.log(productDescriptions);


//9. Dado un array de números, usa .filter() para obtener solo los múltiplos de 3.
const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 21, 25, 27, 30];
const multiplesOfThree = numbersArray.filter(num => num % 3 === 0);
console.log(multiplesOfThree);

/*
10. Dado un array de objetos {nombre: "Ana", notas: [7, 9, 8]}, usa .map() y .reduce() para
obtener un nuevo array con los promedios de cada persona.
*/
const students = [
    { nombre: "Ana", notas: [7, 9, 8] },
    { nombre: "Luis", notas: [6, 5, 7] },
    { nombre: "Pedro", notas: [8, 9, 10] },
    { nombre: "Sergio", notas: [5, 3, 1] },
    { nombre: "Pablo", notas: [0, 0, 0] }
];
const averages = students.map(student => {
    const total = student.notas.reduce((acc, nota) => acc + nota, 0);
    const average = total / student.notas.length;
    return { nombre: student.nombre, promedio: average };
});
console.log(averages);


// 11. Dado un array de números, usa .reduce() para contar cuántos son pares.
const numbersToCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const countEvens = numbersToCount.reduce((count, num) => {
    return count + (num % 2 === 0 ? 1 : 0);
}, 0);
console.log(`Cantidad de números pares: ${countEvens}`);

/*
12. Dado un array de strings, usa .forEach() para imprimir cada uno con su posición (ej: "0:
Hola").
*/
const stringsArray = ["Hoy", "juega", "España", "contra", "Francia"];
stringsArray.forEach((str, index) => {
    console.log(`${index}: ${str}`);
});

// 13. Dado un array de precios, usa .reduce() para calcular el total y luego el precio medio.
const prices = [10.5, 20.0, 15.75, 30.0];
const totalPrice = prices.reduce((acc, price) => acc + price, 0);
const averagePrice = totalPrice / prices.length;
console.log(`Total: ${totalPrice.toFixed(2)}€, Promedio: ${averagePrice.toFixed(2)}€`);

// 14. Dado un array de nombres, usa .sort() para ordenarlos por orden alfabético inverso.
const namesArray = ["Zack", "Luis", "Antonio", "Braum"];
const sortedNames = namesArray.sort((a, b) => b.localeCompare(a));
console.log(sortedNames);
/*
15. Dado un array de objetos {nombre: "Pepe", edad: 30}, usa .sort() para ordenarlos de
menor a mayor edad.
*/
const sortedByAge = people.sort((a, b) => a.edad - b.edad);
console.log(sortedByAge);
/*
16. Dado un array de números, usa .filter() para eliminar los duplicados. (Pista: puedes usar
.filter() junto con .indexOf().)
*/
const numbersWithDuplicates = [1, 2, 3, 2, 4, 5, 1, 6, 7, 8, 5, 2, 3, 2];
const uniqueNumbers = numbersWithDuplicates.filter((num, index) => numbersWithDuplicates.indexOf(num) === index);
console.log(uniqueNumbers);


// Clases + callbacks (ejercicio 1)

/*
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
*/
class EventManager {
    constructor() {
        this.events = {};
        this.callbacks = new Map();
    }

    subscribe(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);

        if (!this.callbacks.has(callback)) {
            this.callbacks.set(callback, callback);
        }
    }

    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }

    cancel(event, callback) {
        const originalCallback = this.callbacks.get(callback);
        if (this.events[event] && originalCallback) {
            this.events[event] = this.events[event].filter(cb => cb !== originalCallback);
            if (this.events[event].length === 0) {
                delete this.events[event];
            }
        }
    }
}

class User {
    constructor(name) {
        this.name = name;
        this.numberOfMessagesReceived = 0;
    }

    receiveMessage(message) {
        this.numberOfMessagesReceived++;
        console.log(`${this.name} ha recibido un mensaje: ${message}`);
    }
}

const eventManager = new EventManager();
const user1 = new User("Rodri");
const user2 = new User("Dani");

const user1Callback = user1.receiveMessage.bind(user1);
const user2Callback = user2.receiveMessage.bind(user2);

eventManager.subscribe("message", user1Callback);
eventManager.subscribe("message", user2Callback);

eventManager.emit("message", "¡Hola a todos!");
eventManager.emit("message", "¡Hoy juega España!");

eventManager.cancel("message", user2Callback);

eventManager.emit("message", "¡España gana 2-0!");

/*
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
class Factory {
    constructor() {
        this.steps = [];
    }

    registerStep(callback, stepName) {
        this.steps.push({ execute: callback, name: stepName });
    }

    processProduct(product) {
        this.steps.forEach(step => {
            product = step.execute(product);
        });
        return product;
    }

    clearSteps() {
        this.steps = [];
    }
}
class Product {
    constructor(name) {
        this.name = name;
        this.history = [];
    }

    markStep(stepName) {
        this.history.push(stepName);
    }
}
const factory = new Factory();
const product1 = new Product("Camiseta");
const product2 = new Product("Pantalones");

factory.registerStep((product) => {
    product.markStep("Cortar");
    return product;
});

factory.registerStep((product) => {
    product.markStep("Coser");
    return product;
});

factory.registerStep((product) => {
    product.markStep("Planchar");
    return product;
});

const processedProduct1 = factory.processProduct(product1);
const processedProduct2 = factory.processProduct(product2);

console.log(`Producto: ${processedProduct1.name}, Historial: ${processedProduct1.history.join(", ")}`);
console.log(`Producto: ${processedProduct2.name}, Historial: ${processedProduct2.history.join(", ")}`);

factory.clearSteps();
factory.registerStep((product) => {
    product.markStep("Empaquetar");
    return product;
});