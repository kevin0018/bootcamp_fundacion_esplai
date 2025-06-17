import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { Command } from 'commander';

/**
 * Base FormatHandler class
 * Abstract class for handling file formats
 *  @class FormatHandler
 *  @abstract
 *  @method read - Reads data from file
 *  @method write - Writes data to file
 */
class FormatHandler {
    /**
     * Reads data from file
     * @param {string} filePath - Path to the input file
     * @returns {any} - Parsed data
     */
    read(filePath) {
        throw new Error('Method read() must be implemented by derived classes');
    }

    /**
     * Writes data to file
     * @param {string} filePath - Path to the output file
     * @param {any} data - Data to write
     */
    write(filePath, data) {
        throw new Error('Method write() must be implemented by derived classes');
    }
}

/**
 * Handler for CSV format
 *     @class CSVHandler
 *     @extends FormatHandler
 *     @method read - Reads CSV data from a file
 *     @method write - Writes data to a CSV file
 *     @param {string} separator - The separator used in the CSV file (default is ',')
 *     @throws {Error} - If the CSV file is empty or not in the expected format
 */
class CSVHandler extends FormatHandler {
    constructor(separator = ',') {
        super();
        this.separator = separator;
    }

    read(filePath) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n').map(line => line.trim()).filter(line => line);
        if (lines.length === 0) throw new Error('El archivo CSV está vacío');
        const headers = lines[0].split(this.separator).map(header => header.trim());
        return lines.slice(1).map(line => {
            const values = line.split(this.separator).map(value => value.trim());
            return headers.reduce((obj, header, index) => {
                obj[header] = values[index] || '';
                return obj;
            }, {});
        });
    }

    write(filePath, data) {
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('El archivo JSON está vacío o no es un array');
        }
        const headers = Object.keys(data[0]);
        const csvLines = [headers.join(this.separator)];
        data.forEach(item => {
            const values = headers.map(header => {
                const value = item[header] || '';
                return value.includes(this.separator) ? `"${value}"` : value;
            });
            csvLines.push(values.join(this.separator));
        });
        fs.writeFileSync(filePath, csvLines.join('\n'), 'utf-8');
    }
}

/**
 * Handler for JSON format
 *    @class JSONHandler
 *    @extends FormatHandler
 *    @method read - Reads JSON data from a file
 *    @method write - Writes data to a JSON file
 */
class JSONHandler extends FormatHandler {
    read(filePath) {
        const content = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(content);
    }

    write(filePath, data) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    }
}

/**
 * Handler for TXT format
 *   @class TXTHandler
 *   @extends FormatHandler
 *   @method read - Reads TXT data from a file
 *   @method write - Writes data to a TXT file
 */
class TXTHandler extends FormatHandler {
    read(filePath) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const records = content.split('\n\n').map(record => record.trim()).filter(record => record);
        return records.map(record => {
            const lines = record.split('\n');
            return lines.reduce((obj, line) => {
                const [key, ...valueParts] = line.split(':');
                obj[key.trim()] = valueParts.join(':').trim();
                return obj;
            }, {});
        });
    }

    write(filePath, data) {
        const txtBlocks = data.map(item => {
            return Object.entries(item).map(([key, value]) => `${key}: ${value}`).join('\n');
        }).join('\n\n');
        fs.writeFileSync(filePath, txtBlocks, 'utf-8');
    }
}

/**
 * Handler for YAML format
 *  @class YAMLHandler
 *  @extends FormatHandler
 *  @method read - Reads YAML data from a file
 *  @method write - Writes data to a YAML file
 */
class YAMLHandler extends FormatHandler {
    read(filePath) {
        const content = fs.readFileSync(filePath, 'utf-8');
        return yaml.load(content);
    }

    write(filePath, data) {
        const yamlContent = yaml.dump(data, { noRefs: true });
        fs.writeFileSync(filePath, yamlContent, 'utf-8');
    }
}

/**
 * Factory for creating format handlers
 * Based on the requested format, it returns the appropriate handler instance
 *  @class FormatHandlerFactory
 *  @static
 *  @method createHandler
 *  @param {string} format - The format type (csv, json, txt, yaml)
 *  @param {Object} [options] - Additional options (e.g., separator for CSV)
 *  @returns {FormatHandler} - An instance of the appropriate handler
 *  @throws {Error} - If the format is not supported
 */
class FormatHandlerFactory {
    static createHandler(format, options = {}) {
        switch (format.toLowerCase()) {
            case 'csv':
                return new CSVHandler(options.separator || ',');
            case 'json':
                return new JSONHandler();
            case 'txt':
                return new TXTHandler();
            case 'yaml':
            case 'yml':
                return new YAMLHandler();
            default:
                throw new Error(`Formato no soportado: ${format}`);
        }
    }
}

// COMMANDER

const program = new Command();

/**
 * Universal converter
 * Converts files between formats
 */
const universalConverter = (options) => {
    console.log('Ejecutando el conversor universal de formatos');

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
        const inputHandler = FormatHandlerFactory.createHandler(options.from, { separator: options.sep });
        const outputHandler = FormatHandlerFactory.createHandler(options.to, { separator: options.sep });

        const data = inputHandler.read(options.file);

        const baseName = path.basename(options.file, path.extname(options.file));
        const outputPath = path.join(path.dirname(options.file), `${baseName}.${options.to}`);

        outputHandler.write(outputPath, data);

        console.log(`Archivo convertido exitosamente: ${outputPath}`);
    } catch (error) {
        console.error('Error:', error.message);
    }
};

// Configure commander
program
    .option('-f, --file <filePath>', 'Ruta al archivo de entrada')
    .option('--from <format>', 'Formato de entrada (csv, json, txt, yaml)')
    .option('--to <format>', 'Formato de salida (csv, json, txt, yaml)')
    .option('-s, --sep <separator>', 'Separador para CSV')
    .action(universalConverter);

// Parse arguments
program.parse(process.argv);

// node exercise9.js --file=assets/usuarios.yaml --from=yaml --to=json
// node exercise9.js --file=assets/clientes.csv --from=csv --to=yaml --sep=";"
// node exercise9.js --file=assets/productos.json --from=json --to=txt