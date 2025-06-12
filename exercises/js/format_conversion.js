import fs from 'fs';
import minimist from 'minimist';
/*
Ejercicio 1: CSV → JSON (usuarios)
Crea un script en Node.js que lea un archivo CSV llamado usuarios.csv y lo convierta en un archivo
JSON llamado usuarios.json.
Requisitos:
    • El archivo CSV contiene las columnas: nombre, edad, ciudad.
    • El archivo JSON debe ser un array de objetos.
    • El nombre del archivo de entrada debe indicarse por línea de comandos.

Entrada: usuarios.csv
Salida esperada: usuarios.json
*/
const args = minimist(process.argv.slice(2));
const csvFilePath = args._[0];
if (!csvFilePath) {
    console.error('Por favor, proporciona el archivo CSV como argumento.');
    process.exit(1);
}
const csv = fs.readFileSync(csvFilePath, 'utf-8');
const csvLines = csv.split('\n').map(line => line.trim()).filter(line => line);
const headers = csvLines[0].split(',').map(header => header.trim());
const jsonArray = csvLines.slice(1).map(line => {
    const values = line.split(',').map(value => value.trim());
    const jsonObject = {};
    headers.forEach((header, index) => {
        jsonObject[header] = values[index];
    });
    return jsonObject;
}
);
const jsonFilePath = csvFilePath.replace('.csv', '.json');
fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArray, null, 2), 'utf-8');
console.log(`Archivo JSON guardado como ${jsonFilePath}`);

/*
Ejercicio 2: JSON → CSV (productos)
Crea un script que convierta un archivo productos.json a un archivo productos.csv.
Requisitos:
    • Detecta automáticamente las claves de cada objeto para generar la cabecera del CSV.
    • El archivo CSV debe tener los campos separados por comas.
    • El script debe funcionar indicando el archivo JSON como argumento.

Entrada: productos.json
Salida esperada: productos.csv
*/

/*
Ejercicio 3: Conversión con separador personalizado (;)
Convierte el archivo clientes.csv (separado por ;) a JSON.
Requisitos:
• El separador (;) debe poder especificarse como argumento (ej: --sep=";").
• El resultado debe guardarse en clientes.json.
Entrada: clientes.csv
Salida esperada: clientes.json

Ejercicio 4: Filtrado durante la conversión
Convierte edades.csv a mayores.json, filtrando solo las personas de 18 años o más.
Requisitos:
• El archivo de entrada tiene columnas: nombre, edad.

• El JSON de salida debe incluir solo las personas mayores de edad.
Entrada: edades.csv
Salida esperada: mayores.json

Ejercicio 5: CSV con errores
Convierte mal_format.csv a JSON, ignorando o reportando las líneas con errores.
Requisitos:
• Muestra por consola un aviso por cada línea mal formateada (vacía, columnas incorrectas,
etc.).
• Las líneas válidas deben guardarse en limpio.json.
Entrada: mal_format.csv
Salida esperada: limpio.json
Líneas con errores deben ser identificadas y omitidas.

Ejercicio 6: Conversión de TXT estructurado a JSON
Convertir el contenido de datos.txt en un archivo datos.json con una lista de objetos
Requisitos:
• Identificar los registros
• Los registros válidos deben guardarse en datos.json

Entrada: datos.txt
Salida esperada: datos.json

Ejercicio 7: Conversión de JSON a TXT tipo clave – valor
Convierte el archivo usuarios.json a usuarios.txt (TXT estructurado)
Requisitos del script:
• Leer el archivo JSON desde línea de comandos.
• Convertir cada objeto en un bloque de texto clave: valor.
• Separar los bloques con una línea en blanco.
• Guardar el resultado en usuarios.txt.

Entrada: usuarios.json
Salida esperada: usuarios.txt

Ejercicio 8: Conversor de formatos flexible
Crear una herramienta en Node.js que reciba por línea de comandos:
• El archivo de entrada
• El formato de entrada (--from)
• El formato de salida (--to)
• (Opcional) el separador si es CSV (--sep)
Formatos soportados:
• csv
• json
Ejemplo de uso:
• node conversor.js datos.csv --from=csv --to=json --sep=";"
• node conversor.js productos.json --from=json --to=csv
Comportamiento esperado:
• Detecta si el archivo existe.
• Parsea según el formato de entrada.
• Convierte al formato de salida.
• Guarda un nuevo archivo con el mismo nombre base y la nueva extensión (datos.json,
productos.csv, etc.).
• Muestra errores claros si el formato no está soportado o el archivo es incorrecto.

Ejercicio 9: Conversor extensible orientado a clases
Refactoriza el conversor universal de formatos creando una arquitectura basada en clases. Cada
clase debe encargarse de manejar un formato de entrada/salida (como CSV, JSON, TXT), permitiendo
añadir nuevos formatos fácilmente.
Formatos soportados:
• csv
• json

• txt plano estructurado
Ejemplo de uso:
• node conversor.js datos.csv --from=csv --to=json --sep=";"
• node conversor.js productos.json --from=json --to=csv
• node conversor.js productos.json --from=json --to=txt
Requisitos:
• Tener una clase FormatoHandler con los métodos necesarios para leer y escribir datos.
• Extender FormatoHandler para poder tratar con cada uno de los formatos
o CSVHandler
o JSONHandler
o TXTHandler

Extensión ejercicio 9: Añadir soporte para ficheros YAML
Añadir soporte de lectura y escritura en formato .yaml o .yml, demostrando la extensibilidad del
sistema basado en clases.
Requisitos:
• Familiarízate con yaml: https://www.redhat.com/es/topics/automation/what-is-yaml
• Instala la librería js-yaml: npm install js-yaml
• Añade una clase YAMLHandler que extienda FormatoHandler y añádela en los formatos
soportados

Ejercicio 10: Lectura desde una API y guardado como archivo local
Crear un script en Node.js que:
1. Obtenga datos desde una API pública usando fetch
2. Permita elegir cuántos usuarios descargar (--count=10)
3. Convierta los datos al formato deseado (--to=json, csv, yaml o txt)
4. Los guarde en un archivo local
Detalles de la API (pública y sin clave):
• https://randomuser.me/
Requisitos:
• Leer la documentación de https://randomuser.me/documentation
• El script debe ejecutarse así: node descarga.js --count=20 --to=csv
• Usa fetch para obtener los datos

• Extrae solo los siguientes campos:
o nombre completo (nombre + apellido)
o email
o ciudad
• Guarda los datos en un archivo:
o usuarios.json si --to=json
o usuarios.csv si --to=csv
o usuarios.txt si --to=txt

Extras opcionales:
• Validar que el número (--count) sea un entero positivo
• Mostrar por consola:
o "Descargando usuarios..."
o "Guardado correctamente en usuarios.csv"
• Permitir que el nombre del archivo se indique con --out=archivo.txt (opcional)
*/