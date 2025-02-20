const beautify = require('js-beautify');
const fs = require('fs');
const path = require('path');
const kleur = require('kleur'); // Importamos kleur para los colores

/**
 * Ejecución de este script
 * 
 * 1. Inicializa un nuevo proyecto
 *    npm init -y
 * 
 * 2. Instala las dependencias necesarias
 *    npm install js-beautify kleur
 * 
 * 3. Ejecuta el script
 *    node formatter.js
 */

// Lista de carpetas a ignorar
const carpetasIgnoradas = ['node_modules', '.git', 'dist']; // Puedes agregar más carpetas aquí

// Contadores para los archivos procesados
let contadorJS = 0;
let contadorCSS = 0;
let contadorHTML = 0;

// Obtener el directorio actual para reemplazarlo en la salida
const directorioActual = process.cwd();

// Configuración personalizada de js-beautify para archivos JS, CSS y HTML
const beautifyOptionsJS = {
    indent_size: 4,
    indent_char: " ",
    max_preserve_newlines: 5,
    preserve_newlines: true,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: "normal",
    brace_style: "collapse",
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: false,
    wrap_line_length: 0,
    indent_inner_html: false,
    comma_first: false,
    e4x: false,
    indent_empty_lines: false
};

const beautifyOptionsCSS = {
    indent_size: 4,
    indent_char: " ",
    selector_separator_newline: true,
    end_with_newline: false
};

const beautifyOptionsHTML = {
    indent_size: 4,
    indent_char: " ",
    max_preserve_newlines: 5,
    preserve_newlines: true,
    indent_inner_html: false,
    end_with_newline: false,
    wrap_line_length: 0
};

// Función para formatear los archivos
function formatearArchivo(rutaArchivo, tipo) {
    // Leer el archivo
    fs.readFile(rutaArchivo, 'utf-8', (err, data) => {
        if (err) {
            console.log(`❌ Error al leer el archivo: ${rutaArchivo}`);
            return;
        }

        let contenidoFormateado;
        let colorMensaje;

        // Formatear según el tipo de archivo (js, css o html) y asignar color
        if (tipo === 'js') {
            contenidoFormateado = beautify.js(data, beautifyOptionsJS);
            colorMensaje = kleur.yellow; // Archivos JS en amarillo
            contadorJS++; // Aumentar el contador de archivos JS
        } else if (tipo === 'css') {
            contenidoFormateado = beautify.css(data, beautifyOptionsCSS);
            colorMensaje = kleur.blue; // Archivos CSS en azul
            contadorCSS++; // Aumentar el contador de archivos CSS
        } else if (tipo === 'html') {
            contenidoFormateado = beautify.html(data, beautifyOptionsHTML);
            colorMensaje = kleur.red; // Archivos HTML en rojo
            contadorHTML++; // Aumentar el contador de archivos HTML
        }

        // Guardar el archivo con el contenido formateado
        fs.writeFile(rutaArchivo, contenidoFormateado, 'utf-8', err => {
            if (err) {
                console.log(`❌ Error al escribir el archivo: ${rutaArchivo}`);
                return;
            }

            // Mostrar mensaje con el color adecuado y sin el directorio completo
            const rutaRelativa = rutaArchivo.replace(directorioActual + path.sep, '');
            console.log(colorMensaje(`✅ Archivo formateado: ${rutaRelativa}`));
        });
    });
}

// Función recursiva para recorrer directorios y formatear archivos .js, .css y .html
function recorrerDirectorios(directorio) {
    fs.readdir(directorio, (err, archivos) => {
        if (err) {
            console.log(`❌ Error al leer el directorio: ${directorio}`);
            return;
        }

        archivos.forEach(archivo => {
            const rutaCompleta = path.join(directorio, archivo);

            // Verificar si la carpeta está en la lista de carpetas ignoradas
            const esCarpetaIgnorada = carpetasIgnoradas.some(carpeta => rutaCompleta.includes(carpeta));

            if (esCarpetaIgnorada) {
                console.log(`🚫 Carpeta ignorada: ${rutaCompleta.replace(directorioActual + path.sep, '')}`);
                return; // Ignorar esta carpeta
            }

            fs.stat(rutaCompleta, (err, stats) => {
                if (err) {
                    console.log(`❌ Error al obtener información del archivo: ${rutaCompleta}`);
                    return;
                }

                // Si es un directorio, llamar la función recursivamente
                if (stats.isDirectory()) {
                    recorrerDirectorios(rutaCompleta);
                }

                // Si es un archivo .js, formatearlo
                else if (path.extname(rutaCompleta) === '.js') {
                    formatearArchivo(rutaCompleta, 'js');
                }

                // Si es un archivo .css, formatearlo
                else if (path.extname(rutaCompleta) === '.css') {
                    formatearArchivo(rutaCompleta, 'css');
                }

                // Si es un archivo .html, formatearlo
                else if (path.extname(rutaCompleta) === '.html') {
                    formatearArchivo(rutaCompleta, 'html');
                }
            });
        });
    });
}

// Función para mostrar el resumen final con los contadores
function mostrarResumen() {
    console.log(kleur.green(`\n🔢 Resumen final:`));
    console.log(kleur.yellow(`- JS formateados: ${contadorJS}`));
    console.log(kleur.blue(`- CSS formateados: ${contadorCSS}`));
    console.log(kleur.red(`- HTML formateados: ${contadorHTML}`));
}

// Mostrar el directorio base para que tengas el contexto
console.log(`🔍 Escaneando el directorio: ${directorioActual} y todos sus subdirectorios...\n`);

// Iniciar el recorrido del directorio actual y mostrar resumen al final
recorrerDirectorios(directorioActual);

// Escuchar cuando termina el proceso de ejecución para mostrar el resumen
process.on('exit', mostrarResumen);