/*
Crea una función fusionaArrays(arr1, arr2) que devuelva un nuevo array combinando ambos
usando el operador spread
// Ejemplo: fusionaArrays([1, 2], [3, 4]) => [1, 2, 3, 4]
*/
function fusionaArrays(a1, a2){
  return [...a1, ...a2];
}

console.log("Ejercicio 1:", fusionaArrays([1,2], [3,4]));
/*

2. Copiar y modificar un array
Dado un array de frutas, crea una copia usando spread y añade una fruta al final sin modificar el
original.
const frutas = ["manzana", "pera"];
*/
const frutas = ["manzana", "pera"];
let frutas_1 = [...frutas, "uva"];
console.log("Ejercicio 2:")
console.log(frutas);
console.log(frutas_1);
/*
3. Función con parámetros infinitos
Crea una función sumaTodos(...numeros) que acepte cualquier número de argumentos y devuelva
la suma total.
// Ejemplo: sumaTodos(1, 2, 3, 4) => 10
*/
function sumaTodos(...numeros){
  let sum = 0;
  for (i in numeros) {
    sum += numeros[i]
  }
  return "suma total: " + sum
}
console.log("Ejercicio 3:", sumaTodos(4, 2, 3, 1))
/*
4. Insertar elementos entre medias
Crea una función insertaEnMedio(arr, ...elementos) que inserte los elementos en la mitad del array
original.
*/
function insertaEnMedio(arr, ...elementos){
  let index = Math.floor(arr.length / 2);
  return [...arr.slice(0, index), ...elementos, ...arr.slice(index)];
}
console.log("Ejercicio 4:", insertaEnMedio([1, 2, 3, 10], 5, 6, 7, 8));
/*
Ejercicios sobre Desestructuración
5. Extraer datos de un array
Dado el array [10, 20, 30], usa desestructuración para guardar cada número en una variable.
const numeros = [10, 20, 30];
// Usa desestructuración para obtener a, b, c
*/
let arr = [10, 20, 30];
let [a, b, c] = arr;
console.log("Ejercicio 5:", "a = " + a, "b = " + b, "c = " + c);
/*
6. Intercambiar valores
Intercambia los valores de dos variables a y b usando desestructuración.
let a = 1, b = 2;
// Resultado esperado: a = 2, b = 1
*/
let a1 = 1, b1 = 2;
console.log("Ejercicio 6:", "Antes " + "a = " + a1 + " b = " + b1);
[a1, b1] = [b1, a1];
console.log("Desputes" + "a = " + a1 + " b = " + b1);

/*
7. Desestructurar en bucle
Dado un array de arrays [[1, "uno"], [2, "dos"], [3, "tres"]], usa desestructuración dentro de un for
para imprimir: "1 es uno", "2 es dos", etc.
*/
let matrix = [[1, "uno"], [2, "dos"], [3, "tres"]];
console.log("Ejercicio 7: ")
for (i in matrix){
  let [num, str] = matrix[i];
  console.log(num + " es " + str);
}
/*
8. Ignorar elementos

Dado el array [1, 2, 3, 4], usa desestructuración para obtener solo el primer y el cuarto elemento.
Ejercicios combinados (Rest + Desestructuración)
*/
let array = [1, 2, 3, 4];
let[first, , , fourth] = array;

console.log("Ejercicio 8: ","first " + first, "fourth " + fourth);
/*
9. Desestructurar con rest
Dado el array [100, 200, 300, 400], usa desestructuración para guardar el primer valor en una
variable y el resto en otro array.
const [primero, ...resto] = [100, 200, 300, 400];
*/
let [primer, ...restos] = [100, 200, 300, 400]
console.log("Ejercicio 9:", "primer = " + primer)
/*
10. Función que recibe varios argumentos y los separa
Crea una función que reciba cualquier cantidad de números, y devuelva un objeto con el primero
como inicio y el resto como resto.
*/
function sumAll(...numeros){
  let [first1, ...others] = numeros;
  return "Ejercicio 10: " + " first = " + first1 +  " resto = " + others;
}
console.log(sumAll(1,2,3,6,8,9));