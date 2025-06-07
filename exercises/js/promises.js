/*
Exercicis de Promises – Nivell Bàsic
1. Simula un retard amb setTimeout
Escriu una funció que retorna una Promise que es resolgui amb el missatge "Temps acabat"
després de 3 segons.
2. Resol immediatament una Promise
Escriu una funció que retorna una Promise ja resolta amb el valor "Tot correcte".
3. Promise condicional (número positiu o negatiu)
Escriu una funció que rebi un número i retorni una Promise:
• Si el número és positiu, es resol amb "Número vàlid"
• Si és negatiu, es rebutja amb "Número no vàlid"
4. Simula una consulta a base de dades
Fes una funció que retorni una Promise que es resolgui amb un array de noms (["Anna",
"Marc", "Júlia"]) després d’1 segon.
5. Comença amb Promise.resolve
Crea una Promise amb Promise.resolve("Hola món") i afegeix un .then() per mostrar el
valor rebut.
6. Multiplicació asíncrona
Escriu una funció que rebi dos números i retorni una Promise que es resolgui amb el resultat
de multiplicar-los després de 2 segons.
7. Ús de .catch()
Reutilitza l’exercici 3. Fes servir .catch() per capturar l’error i mostrar un missatge d’error
per consola.
8. Cadena de .then()
Escriu una funció que:
• Retorni una Promise amb el número 5.
• En el primer .then(), afegeix 3.
• En el segon .then(), multiplica per 2.
• Mostra el resultat final.
9. Missatge personalitzat asíncron
Escriu una funció que rebi un nom i retorni una Promise que es resolgui amb el missatge
"Hola, [nom]!" després de mig segon.
10. Filtrar noms després d’un delay
Fes una funció que retorni una Promise amb un array de noms. Després d’un .then(), filtra
només els noms que comencen per la lletra "M" i mostra’ls per consola.
*/
