import fs from 'fs';
import {Command} from 'commander';
import path from 'path';
import fetch from 'node-fetch';

/**
 * Base converter class
 */
class FileConverter {
	/**
	 * @param {string} inputPath - Path to input file
	 */
	constructor(inputPath) {
		this.inputPath = inputPath;

		// Ensure the class is not instantiated directly
		if (this.constructor === FileConverter) {
			throw new Error('FileConverter is an abstract class and cannot be instantiated directly');
		}
	}

	/**
	 * Validates if file exists and has content
	 * @returns {boolean} - True if file exists and has content
	 */
	validateFile() {
		if (!this.inputPath) {
			console.error('No se ha proporcionado una ruta de archivo');
			return false;
		}

		if (!fs.existsSync(this.inputPath)) {
			console.error(`El archivo ${this.inputPath} no existe`);
			return false;
		}

		return true;
	}

	/**
	 * Reads file content
	 * @returns {string} - File content
	 */
	readFile() {
		return fs.readFileSync(this.inputPath, 'utf-8');
	}

	/**
	 * Writes data to file
	 * @param {string} outputPath - Path where to write data
	 * @param {any} data - Data to write
	 */
	writeFile(outputPath, data) {
		fs.writeFileSync(outputPath, data, 'utf-8');
		console.log(`Archivo guardado como ${outputPath}`);
	}

	/**
	 * Abstract method to convert file
	 */
	convert() {
		throw new Error('Method convert() must be implemented by derived classes');
	}
}

/**
 * CSV to JSON converter implementation
 */
class CsvToJsonConverter extends FileConverter {
	/**
	 * @param {string} inputPath - Path to CSV file
	 * @param {string} [separator=','] - CSV field separator
	 */
	constructor(inputPath, separator = ',') {
		super(inputPath);
		this.separator = separator;
	}

	/**
	 * Converts CSV to JSON
	 * @param {string} [outputPath=''] - Optional custom output path
	 * @returns {boolean} - Success status
	 */
	convert(outputPath = '') {
		if (!this.validateFile()) return false;

		try {
			const csv = this.readFile();
			const csvLines = csv.split('\n').map(line => line.trim()).filter(line => line);

			if (csvLines.length === 0) {
				console.error('El archivo CSV está vacío');
				return false;
			}

			const headers = csvLines[0].split(this.separator).map(header => header.trim());
			const jsonArray = csvLines.slice(1).map(line => {
				const values = line.split(this.separator).map(value => value.trim());
				const jsonObject = {};
				headers.forEach((header, index) => {
					if (index < values.length) {
						jsonObject[header] = values[index];
					}
				});
				return jsonObject;
			});

			const jsonFilePath = outputPath || this.inputPath.replace('.csv', '.json');
			this.writeFile(jsonFilePath, JSON.stringify(jsonArray, null, 2));

			return true;
		} catch (error) {
			console.error('Error al procesar el archivo CSV:', error.message);
			return false;
		}
	}
}

/**
 * JSON to CSV converter implementation
 */
class JsonToCsvConverter extends FileConverter {
	/**
	 * @param {string} inputPath - Path to JSON file
	 * @param {string} [separator=','] - CSV field separator
	 */
	constructor(inputPath, separator = ',') {
		super(inputPath);
		this.separator = separator;
	}

	/**
	 * Converts JSON to CSV
	 * @param {string} [outputPath=''] - Optional custom output path
	 * @returns {boolean} - Success status
	 */
	convert(outputPath = '') {
		if (!this.validateFile()) return false;

		try {
			const jsonContent = this.readFile();
			const jsonArray = JSON.parse(jsonContent);

			if (!Array.isArray(jsonArray) || jsonArray.length === 0) {
				console.error('El archivo JSON está vacío o no es un array');
				return false;
			}

			const headers = Object.keys(jsonArray[0]);
			const csvLines = [headers.join(this.separator)];

			jsonArray.forEach(item => {
				const values = headers.map(header => {
					const value = item[header] || '';
					// Handle values with separator by quoting
					return value.toString().includes(this.separator) ?
						`"${value}"` : value;
				});
				csvLines.push(values.join(this.separator));
			});

			const csvFilePath = outputPath || this.inputPath.replace('.json', '.csv');
			this.writeFile(csvFilePath, csvLines.join('\n'));

			return true;
		} catch (error) {
			console.error('Error al procesar el archivo JSON:', error.message);
			return false;
		}
	}
}

/**
 * CSV to JSON converter with filtering capabilities
 */
class FilteredCsvToJsonConverter extends CsvToJsonConverter {
	/**
	 * @param {string} inputPath - Path to CSV file
	 * @param {Function} filterFunction - Function to filter records
	 * @param {string} [separator=','] - CSV field separator
	 */
	constructor(inputPath, filterFunction, separator = ',') {
		super(inputPath, separator);
		this.filterFunction = filterFunction;
	}

	/**
	 * Converts CSV to JSON with filtering
	 * @param {string} [outputPath=''] - Optional custom output path
	 * @returns {boolean} - Success status
	 */
	convert(outputPath = '') {
		if (!this.validateFile()) return false;

		try {
			const csv = this.readFile();
			const csvLines = csv.split('\n').map(line => line.trim()).filter(line => line);

			if (csvLines.length === 0) {
				console.error('El archivo CSV está vacío');
				return false;
			}

			const headers = csvLines[0].split(this.separator).map(header => header.trim());
			const jsonArray = csvLines.slice(1)
				.map(line => {
					const values = line.split(this.separator).map(value => value.trim());
					const jsonObject = {};
					headers.forEach((header, index) => {
						if (index < values.length) {
							jsonObject[header] = values[index];
						}
					});
					return jsonObject;
				})
				.filter(this.filterFunction); // Apply filter function

			const jsonFilePath = outputPath || this.inputPath.replace('.csv', '.json');
			this.writeFile(jsonFilePath, JSON.stringify(jsonArray, null, 2));

			return true;
		} catch (error) {
			console.error('Error al procesar el archivo CSV:', error.message);
			return false;
		}
	}
}

/**
 * CSV to JSON converter that validates and cleans data
 */
class CleaningCsvToJsonConverter extends CsvToJsonConverter {
	constructor(inputPath, separator = ',') {
		super(inputPath, separator);
	}

	/**
	 * Converts CSV to JSON with validation and cleaning
	 * @param {string} [outputPath=null] - Optional custom output path
	 * @returns {boolean} - Success status
	 */
	convert(outputPath = null) {
		if (!this.validateFile()) return false;

		try {
			const csv = this.readFile();
			const csvLines = csv.split('\n').map(line => line.trim()).filter(line => line);

			if (csvLines.length === 0) {
				console.error('El archivo CSV está vacío');
				return false;
			}

			const headers = csvLines[0].split(this.separator).map(header => header.trim());
			const jsonArray = [];

			// Process each line, reporting errors
			csvLines.slice(1).forEach((line, index) => {
				const values = line.split(this.separator).map(value => value.trim());

				// Validate line format
				if (values.length !== headers.length) {
					console.warn(`Línea ${index + 2} mal formateada: "${line}"`);
					return; // Skip this line
				}

				const jsonObject = {};
				headers.forEach((header, i) => {
					jsonObject[header] = values[i];
				});
				jsonArray.push(jsonObject);
			});

			const jsonFilePath = outputPath || this.inputPath.replace('.csv', '_limpio.json');
			this.writeFile(jsonFilePath, JSON.stringify(jsonArray, null, 2));

			return true;
		} catch (error) {
			console.error('Error al procesar el archivo CSV:', error.message);
			return false;
		}
	}
}

/**
 * TXT to JSON converter implementation
 */
class TxtToJsonConverter extends FileConverter {
	constructor(inputPath) {
		super(inputPath);
	}

	/**
	 * Converts structured TXT to JSON
	 * @param {string} [outputPath=null] - Optional custom output path
	 * @returns {boolean} - Success status
	 */
	convert(outputPath = null) {
		if (!this.validateFile()) return false;

		try {
			const txt = this.readFile();
			// Split by double newline to separate records
			const records = txt.split('\n\n').map(record => record.trim()).filter(record => record);

			if (records.length === 0) {
				console.error('El archivo TXT está vacío o no tiene un formato válido');
				return false;
			}

			const jsonArray = records.map(record => {
				const lines = record.split('\n').filter(line => line.trim());
				const jsonObject = {};

				lines.forEach(line => {
					const [key, ...valueParts] = line.split(':');
					if (key && valueParts.length > 0) {
						const value = valueParts.join(':').trim();
						jsonObject[key.trim()] = value;
					}
				});

				return Object.keys(jsonObject).length > 0 ? jsonObject : null;
			}).filter(obj => obj !== null);

			const jsonFilePath = outputPath || this.inputPath.replace('.txt', '.json');
			this.writeFile(jsonFilePath, JSON.stringify(jsonArray, null, 2));

			return true;
		} catch (error) {
			console.error('Error al procesar el archivo TXT:', error.message);
			return false;
		}
	}
}

/**
 * JSON to TXT converter implementation
 */
class JsonToTxtConverter extends FileConverter {
	constructor(inputPath) {
		super(inputPath);
	}

	/**
	 * Converts JSON to structured TXT
	 * @param {string} [outputPath=''] - Optional custom output path
	 * @returns {boolean} - Success status
	 */
	convert(outputPath = '') {
		if (!this.validateFile()) return false;

		try {
			const jsonContent = this.readFile();
			const jsonArray = JSON.parse(jsonContent);

			if (!Array.isArray(jsonArray) || jsonArray.length === 0) {
				console.error('El archivo JSON está vacío o no es un array');
				return false;
			}

			// Convert each JSON object to TXT format
			const txtBlocks = jsonArray.map(item => {
				const lines = Object.entries(item).map(([key, value]) => `${key}: ${value}`);
				return lines.join('\n');
			});

			const txtContent = txtBlocks.join('\n\n');
			const txtFilePath = outputPath || this.inputPath.replace('.json', '.txt');
			this.writeFile(txtFilePath, txtContent);

			return true;
		} catch (error) {
			console.error('Error al procesar el archivo JSON:', error.message);
			return false;
		}
	}
}

/**
 * Factory for creating appropriate converters
 */
class ConverterFactory {
	/**
	 * Creates appropriate converter based on input and output formats
	 * @param {string} inputPath - Path to input file
	 * @param {string} inputFormat - Input file format
	 * @param {string} outputFormat - Output file format
	 * @param {Object} options - Additional options
	 * @returns {FileConverter} - Appropriate converter instance
	 */
	static createConverter(inputPath, inputFormat, outputFormat, options = {}) {
		// Validate formats
		const validFormats = ['csv', 'json', 'txt'];
		if (!validFormats.includes(inputFormat) || !validFormats.includes(outputFormat)) {
			throw new Error(`Formato no soportado. Formatos válidos: ${validFormats.join(', ')}`);
		}

		// Return appropriate converter
		if (inputFormat === 'csv' && outputFormat === 'json') {
			return new CsvToJsonConverter(inputPath, options.separator || ',');
		} else if (inputFormat === 'json' && outputFormat === 'csv') {
			return new JsonToCsvConverter(inputPath, options.separator || ',');
		} else if (inputFormat === 'txt' && outputFormat === 'json') {
			return new TxtToJsonConverter(inputPath);
		} else if (inputFormat === 'json' && outputFormat === 'txt') {
			return new JsonToTxtConverter(inputPath);
		} else {
			throw new Error(`Conversión de ${inputFormat} a ${outputFormat} no soportada`);
		}
	}

	/**
	 * Creates special converters for specific exercises
	 * @param {string} exercise - Exercise identifier
	 * @param {Object} options - Exercise options
	 * @returns {FileConverter} - Appropriate converter instance
	 */
	static createSpecialConverter(exercise, options) {
		switch (exercise) {
			case 'exercise4':
				// Filter for adults
				return new FilteredCsvToJsonConverter(
					options.file,
					person => parseInt(person.edad, 10) >= 18,
					','
				);
			case 'exercise5':
				return new CleaningCsvToJsonConverter(options.file);
			default:
				throw new Error(`No hay un conversor especial para ${exercise}`);
		}
	}
}

/**
 * API data fetcher and converter
 */
class ApiDataFetcher {
	/**
	 * @param {string} apiUrl - API URL to fetch data from
	 */
	constructor(apiUrl) {
		this.apiUrl = apiUrl;
	}

	/**
	 * Fetches data from API and converts to specified format
	 * @param {number} count - Number of items to fetch
	 * @param {string} outputFormat - Format to save the data
	 * @param {string} outputPath - Path to save the file
	 * @returns {Promise<boolean>} - Success status
	 */
	async fetchAndConvert(count, outputFormat, outputPath) {
		console.log('Descargando usuarios...');

		try {
			// Validate count parameter
			if (!Number.isInteger(count) || count <= 0) {
				throw new Error('El parámetro count debe ser un entero positivo');
			}

			// Fetch data from API
			const response = await fetch(`${this.apiUrl}?results=${count}`);
			if (!response.ok) {
				throw new Error(`Error al obtener datos de la API: ${response.status}`);
			}

			const data = await response.json();

			// Extract required fields
			const processedData = data.results.map(user => ({
				nombre: `${user.name.first} ${user.name.last}`,
				email: user.email,
				ciudad: user.location.city
			}));

			// Determine output file path
			if (!outputPath) {
				outputPath = `usuarios.${outputFormat}`;
			}

			// Convert and save based on format
			switch (outputFormat) {
				case 'json':
					fs.writeFileSync(outputPath, JSON.stringify(processedData, null, 2), 'utf-8');
					break;
				case 'csv':
					const headers = Object.keys(processedData[0]);
					const csvLines = [
						headers.join(','),
						...processedData.map(item => headers.map(key => item[key]).join(','))
					];
					fs.writeFileSync(outputPath, csvLines.join('\n'), 'utf-8');
					break;
				case 'txt':
					const txtBlocks = processedData.map(item => {
						return Object.entries(item)
							.map(([key, value]) => `${key}: ${value}`)
							.join('\n');
					});
					fs.writeFileSync(outputPath, txtBlocks.join('\n\n'), 'utf-8');
					break;
				default:
					throw new Error(`Formato no soportado: ${outputFormat}`);
			}

			console.log(`Guardado correctamente en ${outputPath}`);
			return true;
		} catch (error) {
			console.error('Error:', error.message);
			return false;
		}
	}
}

// Initialize Commander
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
const exercise1 = (options) => {
	console.log('Ejecutando el ejercicio 1: CSV → JSON (usuarios)');
	if (!options.file) {
		console.error('Por favor, proporciona el archivo CSV con la opción --file');
		return;
	}
	const converter = new CsvToJsonConverter(options.file);
	converter.convert();
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
const exercise2 = (options) => {
	console.log('Ejecutando el ejercicio 2: JSON → CSV (productos)');
	if (!options.file) {
		console.error('Por favor, proporciona el archivo JSON con la opción --file');
		return;
	}
	const converter = new JsonToCsvConverter(options.file);
	converter.convert();
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
const exercise3 = (options) => {
	console.log('Ejecutando el ejercicio 3: Conversión con separador personalizado (clientes)');
	if (!options.file) {
		console.error('Por favor, proporciona el archivo CSV con la opción --file');
		return;
	}
	const separator = options.sep || ';';
	const converter = new CsvToJsonConverter(options.file, separator);
	converter.convert();
};

/*
Ejercicio 4: Filtrado durante la conversión
Convierte edades.csv a mayores.json, filtrando solo las personas de 18 años o más.
Requisitos:
    • El archivo de entrada tiene columnas: nombre, edad.
    • El JSON de salida debe incluir solo las personas mayores de edad.
Entrada: edades.csv
Salida esperada: mayores.json
*/
const exercise4 = (options) => {
	console.log('Ejecutando el ejercicio 4: Filtrado durante la conversión (edades)');
	if (!options.file) {
		console.error('Por favor, proporciona el archivo CSV con la opción --file');
		return;
	}

	const converter = new FilteredCsvToJsonConverter(
		options.file,
		person => parseInt(person.edad, 10) >= 18
	);

	converter.convert(options.file.replace('.csv', '_mayores.json'));
};

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
const exercise5 = (options) => {
	console.log('Ejecutando el ejercicio 5: CSV con errores (mal_format)');
	if (!options.file) {
		console.error('Por favor, proporciona el archivo CSV con la opción --file');
		return;
	}

	const converter = new CleaningCsvToJsonConverter(options.file);
	converter.convert();
};

/*
Ejercicio 6: Conversión de TXT estructurado a JSON
Convertir el contenido de datos.txt en un archivo datos.json con una lista de objetos
Requisitos:
	• Identificar los registros
	• Los registros válidos deben guardarse en datos.json

Entrada: datos.txt
Salida esperada: datos.json
*/
const exercise6 = (options) => {
	console.log('Ejecutando el ejercicio 6: Conversión de TXT estructurado a JSON (datos)');
	if (!options.file) {
		console.error('Por favor, proporciona el archivo TXT con la opción --file');
		return;
	}

	const converter = new TxtToJsonConverter(options.file);
	converter.convert();
};

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
*/
const exercise7 = (options) => {
	console.log('Ejecutando el ejercicio 7: Conversión de JSON a TXT tipo clave – valor (usuarios)');
	if (!options.file) {
		console.error('Por favor, proporciona el archivo JSON con la opción --file');
		return;
	}

	const converter = new JsonToTxtConverter(options.file);
	converter.convert();
};

/*
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
*/
const exercise8 = (options) => {
	console.log('Ejecutando el ejercicio 8: Conversor de formatos flexible');

	if (!options.file) {
		console.error('Por favor, proporciona el archivo de entrada con la opción --file');
		return;
	}

	if (!options.from) {
		console.error('Por favor, especifica el formato de entrada con --from=formato');
		return;
	}

	if (!options.to) {
		console.error('Por favor, especifica el formato de salida con --to=formato');
		return;
	}

	try {
		const converter = ConverterFactory.createConverter(
			options.file,
			options.from.toLowerCase(),
			options.to.toLowerCase(),
			{separator: options.sep || ','}
		);

		// Generate output path with new extension
		const baseName = path.basename(options.file, path.extname(options.file));
		const outputPath = path.join(path.dirname(options.file), `${baseName}.${options.to}`);

		converter.convert(outputPath);
	} catch (error) {
		console.error('Error:', error.message);
	}
};

/*
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
*/
const exercise9 = (options) => {
	console.log('Ejecutando el ejercicio 9: Conversor extensible orientado a clases');
	exercise8(options);
};

/*
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
*/
const exercise10 = async (options) => {
	console.log('Ejecutando el ejercicio 10: Lectura desde una API y guardado como archivo local');

	if (!options.count) {
		console.error('Por favor, especifica el número de usuarios a descargar con --count=número');
		return;
	}

	if (!options.to) {
		console.error('Por favor, especifica el formato de salida con --to=formato');
		return;
	}

	const count = parseInt(options.count, 10);
	const outputFormat = options.to.toLowerCase();
	const outputPath = options.out || `usuarios.${outputFormat}`;

	const fetcher = new ApiDataFetcher('https://randomuser.me/api/');
	await fetcher.fetchAndConvert(count, outputFormat, outputPath);
};

// Define tasks
const tasks = {
	exercise1,
	exercise2,
	exercise3,
	exercise4,
	exercise5,
	exercise6,
	exercise7,
	exercise8,
	exercise9,
	exercise10,
};

// Configure commander
Object.keys(tasks).forEach((taskName) => {
	const cmd = program
		.command(taskName)
		.description(`Ejecutar ${taskName}`);

	// Add common options
	cmd.option('-f, --file <filePath>', 'Ruta al archivo de entrada');

	// Add specific options based on task
	if (taskName === 'exercise3') {
		cmd.option('-s, --sep <separator>', 'Separador de campos CSV');
	} else if (taskName === 'exercise8' || taskName === 'exercise9') {
		cmd.option('--from <format>', 'Formato de entrada (csv, json, txt)');
		cmd.option('--to <format>', 'Formato de salida (csv, json, txt)');
		cmd.option('-s, --sep <separator>', 'Separador de campos CSV');
	} else if (taskName === 'exercise10') {
		cmd.option('--count <number>', 'Número de usuarios a descargar');
		cmd.option('--to <format>', 'Formato de salida (csv, json, txt)');
		cmd.option('--out <filePath>', 'Ruta del archivo de salida');
	}

	cmd.action(async (cmdOptions) => {
		const options = {
			file: cmdOptions.file || program.opts().file,
			sep: cmdOptions.sep || program.opts().sep,
			from: cmdOptions.from || program.opts().from,
			to: cmdOptions.to || program.opts().to,
			count: cmdOptions.count || program.opts().count,
			out: cmdOptions.out || program.opts().out
		};

		if (taskName === 'exercise10') {
			await tasks[taskName](options);
		} else {
			tasks[taskName](options);
		}
	});
});

// Global command
program
	.argument('[task]', 'Tarea a ejecutar')
	.option('-f, --file <filePath>', 'Ruta al archivo de entrada')
	.option('-s, --sep <separator>', 'Separador para CSV')
	.option('--from <format>', 'Formato de entrada')
	.option('--to <format>', 'Formato de salida')
	.option('--count <number>', 'Número de elementos (ejercicio 10)')
	.option('--out <filePath>', 'Ruta del archivo de salida')
	.action(async (task, options) => {
		if (!task) {
			program.help();
		} else if (tasks[task]) {
			if (task === 'exercise10') {
				await tasks[task](options);
			} else {
				tasks[task](options);
			}
		} else {
			console.error(`Tarea "${task}" no encontrada.`);
		}
	});

// Parse arguments
program.parse(process.argv);

// Show help if no arguments provided
if (!process.argv.slice(2).length) {
	program.help();
}

// node.exe scripts.js exercise1 --file assets/usuarios.csv
// node.exe scripts.js exercise2 --file assets/productos.json
// node.exe scripts.js exercise3 --file assets/clientes.csv --sep=";"
// node.exe scripts.js exercise4 --file assets/edades.csv
// node.exe scripts.js exercise5 --file assets/mal_formato.csv
// node.exe scripts.js exercise6 --file assets/datos.txt
// node.exe scripts.js exercise7 --file assets/usuarios.json
// node.exe scripts.js exercise8 --file assets/productos.json --from=json --to=csv --sep=";"
// node.exe scripts.js exercise9 --file assets/edades.csv --from=csv --to=json --sep=","
// node.exe scripts.js exercise10 --count=20 --to=json --out=usuarios.json