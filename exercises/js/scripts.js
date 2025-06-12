import fs from 'fs';
import { Command } from 'commander';

const program = new Command();

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
const csvToJson = (csvFilePath) => {
    try {
        // Validate that the file exists
        if (!fs.existsSync(csvFilePath)) {
            console.error(`El archivo ${csvFilePath} no existe.`);
            return;
        }

        // Read the CSV file
        const csv = fs.readFileSync(csvFilePath, 'utf-8');
        const csvLines = csv.split('\n').map(line => line.trim()).filter(line => line);

        // Validate that the file has content
        if (csvLines.length === 0) {
            console.error('El archivo CSV está vacío.');
            return;
        }

        // Extract headers and data
        const headers = csvLines[0].split(',').map(header => header.trim());
        const jsonArray = csvLines.slice(1).map(line => {
            const values = line.split(',').map(value => value.trim());
            const jsonObject = {};
            headers.forEach((header, index) => {
                jsonObject[header] = values[index];
            });
            return jsonObject;
        });

        // Generate the output file name
        const jsonFilePath = csvFilePath.replace('.csv', '.json');

        // Write the JSON file
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArray, null, 2), 'utf-8');
        console.log(`Archivo JSON guardado como ${jsonFilePath}`);
    } catch (error) {
        console.error('Error al procesar el archivo:', error.message);
    }
};

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
const jsonToCsv = (jsonFilePath) => {
    try {
        // Validate that the file exists
        if (!fs.existsSync(jsonFilePath)) {
            console.error(`El archivo ${jsonFilePath} no existe.`);
            return;
        }

        // Read the JSON file
        const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
        const jsonArray = JSON.parse(jsonData);

        // Validate that the JSON has content
        if (!Array.isArray(jsonArray) || jsonArray.length === 0) {
            console.error('El archivo JSON está vacío o no es un array.');
            return;
        }

        // Extract headers and data
        const headers = Object.keys(jsonArray[0]);
        const csvLines = [headers.join(',')];

        jsonArray.forEach(item => {
            const values = headers.map(header => item[header] || '');
            csvLines.push(values.join(','));
        });

        // Generate the output file name
        const csvFilePath = jsonFilePath.replace('.json', '.csv');

        // Write the CSV file
        fs.writeFileSync(csvFilePath, csvLines.join('\n'), 'utf-8');
        console.log(`Archivo CSV guardado como ${csvFilePath}`);
    } catch (error) {
        console.error('Error al procesar el archivo:', error.message);
    }
};

/*
Ejercicio 3: Conversión con separador personalizado (;)
Convierte el archivo clientes.csv (separado por ;) a JSON.
Requisitos:
    • El separador (;) debe poder especificarse como argumento (ej: --sep=";").
    • El resultado debe guardarse en clientes.json.
Entrada: clientes.csv
Salida esperada: clientes.json
*/
const csvToJsonWithSeparator = (csvFilePath, separator = ',') => {
    try {
        // Validate that the file exists
        if (!fs.existsSync(csvFilePath)) {
            console.error(`El archivo ${csvFilePath} no existe.`);
            return;
        }

        // Read the CSV file
        const csv = fs.readFileSync(csvFilePath, 'utf-8');
        const csvLines = csv.split('\n').map(line => line.trim()).filter(line => line);

        // Validate that the file has content
        if (csvLines.length === 0) {
            console.error('El archivo CSV está vacío.');
            return;
        }

        // Extract headers and data
        const headers = csvLines[0].split(separator).map(header => header.trim());
        const jsonArray = csvLines.slice(1).map(line => {
            const values = line.split(separator).map(value => value.trim());
            const jsonObject = {};
            headers.forEach((header, index) => {
                jsonObject[header] = values[index];
            });
            return jsonObject;
        });

        // Generate the output file name
        const jsonFilePath = csvFilePath.replace('.csv', '.json');

        // Write the JSON file
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArray, null, 2), 'utf-8');
        console.log(`Archivo JSON guardado como ${jsonFilePath}`);
    } catch (error) {
        console.error('Error al procesar el archivo:', error.message);
    }
}

/*
Ejercicio 4: Filtrado durante la conversión
Convierte edades.csv a mayores.json, filtrando solo las personas de 18 años o más.
Requisitos:
    • El archivo de entrada tiene columnas: nombre, edad.
    • El JSON de salida debe incluir solo las personas mayores de edad.
Entrada: edades.csv
Salida esperada: mayores.json
*/
const filterAdultsFromCsv = (csvFilePath) => {
    try {
        // Validate that the file exists
        if (!fs.existsSync(csvFilePath)) {
            console.error(`El archivo ${csvFilePath} no existe.`);
            return;
        }
        // Read the CSV file
        const csv = fs.readFileSync(csvFilePath, 'utf-8');
        const csvLines = csv.split('\n').map(line => line.trim()).filter(line => line);
        // Validate that the file has content
        if (csvLines.length === 0) {
            console.error('El archivo CSV está vacío.');
            return;
        }
        // Extract headers and data
        const headers = csvLines[0].split(',').map(header => header.trim());
        const jsonArray = csvLines.slice(1).map(line => {
            const values = line.split(',').map(value => value.trim());
            const jsonObject = {};
            headers.forEach((header, index) => {
                jsonObject[header] = values[index];
            });
            return jsonObject;
        }
        ).filter(person => {
            // Filter only adults (18 years or older)
            return person.edad && parseInt(person.edad, 10) >= 18;
        });
        // Generate the output file name
        const jsonFilePath = csvFilePath.replace('.csv', '_mayores.json');
        // Write the JSON file
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArray, null, 2), 'utf-8');
        console.log(`Archivo JSON guardado como ${jsonFilePath}`);
    }
    catch (error) {
        console.error('Error al procesar el archivo:', error.message);
    }
}
/*
Ejercicio 5: CSV con errores
Convierte mal_format.csv a JSON, ignorando o reportando las líneas con errores.
Requisitos:
    • Muestra por consola un aviso por cada línea mal formateada (vacía, columnas incorrectas,
    etc.).
    • Las líneas válidas deben guardarse en limpio.json.
Entrada: mal_format.csv
Salida esperada: limpio.json
Líneas con errores deben ser identificadas y omitidas.
*/
const cleanCsvToJson = (csvFilePath) => {
    try {
        // Validate that the file exists
        if (!fs.existsSync(csvFilePath)) {
            console.error(`El archivo ${csvFilePath} no existe.`);
            return;
        }
        // Read the CSV file
        const csv = fs.readFileSync(csvFilePath, 'utf-8');
        const csvLines = csv.split('\n').map(line => line.trim()).filter(line => line);
        // Validate that the file has content
        if (csvLines.length === 0) {
            console.error('El archivo CSV está vacío.');
            return;
        }
        // Extract headers and data
        const headers = csvLines[0].split(',').map(header => header.trim());
        const jsonArray = [];
        csvLines.slice(1).forEach((line, index) => {
            const values = line.split(',').map(value => value.trim());
            if (values.length !== headers.length) {
                console.warn(`Línea ${index + 2} mal formateada: ${line}`);
                return; // Skip malformed lines
            }
            const jsonObject = {};
            headers.forEach((header, i) => {
                jsonObject[header] = values[i];
            });
            jsonArray.push(jsonObject);
        });
        // Generate the output file name
        const jsonFilePath = csvFilePath.replace('.csv', '_limpio.json');
        // Write the JSON file
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArray, null, 2), 'utf-8');
        console.log(`Archivo JSON guardado como ${jsonFilePath}`);
    }
    catch (error) {
        console.error('Error al procesar el archivo:', error.message);
    }
}

/*
Ejercicio 6: Conversión de TXT estructurado a JSON
Convertir el contenido de datos.txt en un archivo datos.json con una lista de objetos
Requisitos:
    • Identificar los registros
    • Los registros válidos deben guardarse en datos.json

Entrada: datos.txt
Salida esperada: datos.json
*/
const txtToJson = (txtFilePath) => {
    try {
        // Validate that the file exists
        if (!fs.existsSync(txtFilePath)) {
            console.error(`El archivo ${txtFilePath} no existe.`);
            return;
        }
        // Read the TXT file
        const txt = fs.readFileSync(txtFilePath, 'utf-8');
        const txtLines = txt.split('\n').map(line => line.trim()).filter(line => line);
        // Validate that the file has content
        if (txtLines.length === 0) {
            console.error('El archivo TXT está vacío.');
            return;
        }
        // Parse the TXT content into JSON objects
        const jsonArray = txtLines.map(line => {
            const parts = line.split(':').map(part => part.trim());
            if (parts.length < 2) {
                console.warn(`Línea mal formateada: ${line}`);
                return null;
            }
            const jsonObject = {};
            parts.forEach((part, index) => {
                if (index % 2 === 0) {
                    const key = part;
                    const value = parts[index + 1] || '';
                    jsonObject[key] = value;
                }
            });
            return jsonObject;
        }
        ).filter(obj => obj !== null);
        // Generate the output file name
        const jsonFilePath = txtFilePath.replace('.txt', '.json');
        // Write the JSON file
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArray, null, 2), 'utf-8');
        console.log(`Archivo JSON guardado como ${jsonFilePath}`);
    }
    catch (error) {
        console.error('Error al procesar el archivo:', error.message);
    }
}
/*
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

const tasks = {
    exercise1: (options) => {
        console.log('Ejecutando el ejercicio 1: CSV → JSON (usuarios)');
        if (!options.file) {
            console.error('Por favor, proporciona el archivo CSV con la opción --file');
            return;
        }
        csvToJson(options.file);
    },
    exercise2: (options) => {
        console.log('Ejecutando el ejercicio 2: JSON → CSV (productos)');
        if (!options.file) {
            console.error('Por favor, proporciona el archivo JSON con la opción --file');
            return;
        }
        jsonToCsv(options.file);
    },
    exercise3: (options) => {
        console.log('Ejecutando el ejercicio 3: Conversión con separador personalizado (clientes)');
        if (!options.file) {
            console.error('Por favor, proporciona el archivo CSV con la opción --file');
            return;
        }
        const separator = options.sep || ';';
        csvToJsonWithSeparator(options.file, separator);
    },
    exercise4: () => console.log('Ejecutando el ejercicio 4: Filtrado durante la conversión (edades)'),
    exercise5: () => console.log('Ejecutando el ejercicio 5: CSV con errores (mal_format)'),
    exercise6: () => console.log('Ejecutando el ejercicio 6: Conversión de TXT estructurado a JSON (datos)'),
    exercise7: () => console.log('Ejecutando el ejercicio 7: Conversión de JSON a TXT tipo clave – valor (usuarios)'),
    exercise8: () => console.log('Ejecutando el ejercicio 8: Conversor de formatos flexible'),
    exercise9: () => console.log('Ejecutando el ejercicio 9: Conversor extensible orientado a clases'),
    exercise10: () => console.log('Ejecutando el ejercicio 10: Lectura desde una API y guardado como archivo local'),
};

// Command configuration
Object.keys(tasks).forEach((taskName) => {
    const cmd = program
        .command(taskName)
        .description(`Run ${taskName}`);

    // Add options specific to each task
    if (taskName === 'exercise1' || taskName === 'exercise2' || taskName === 'exercise3') {
        cmd.option('-f, --file <filePath>', `Path to the ${taskName === 'exercise2' ? 'JSON' : 'CSV'} file`);
    }

    cmd.action((options) => {
        tasks[taskName](options);
    });
});

program
    .argument('[task]', 'Task to run')
    .option('-f, --file <filePath>', 'Path to the file')
    .action((task, options) => {
        if (!task) {
            program.help();
        } else if (tasks[task]) {
            tasks[task](options);
        } else {
            console.error(`Task "${task}" not found.`);
        }
    });

program.parse(process.argv);

// if no arguments are provided, show help
if (!process.argv.slice(2).length) {
    program.help();
}