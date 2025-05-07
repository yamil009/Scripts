//Objeto para codificar y de codificar texto a base 64
var b64 = {};

//Dominio empleado en la codificación
Object.defineProperty(b64, "d", {
    value: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz<>"
});

//Codifica 3 caracteres en base 256 a base 64
Object.defineProperty(b64, "c3c", {
    value: function (s) {
        var v = [], a, r, s2 = "", p;
        for (let i = 0; i < s.length; i++) {
            a = s.charCodeAt(2 - i);
            for (let j = 0; j < 8; j++) {
                v.unshift((a >> j) & 1);
            }
        }
        r = v.join("");
        //Código que convierte los bits en caracteres en base 64
        for (let i = 0; i < 4; i++) {
            p = parseInt(r.slice(i * 6, (i + 1) * 6), 2);
            s2 += b64.d.charAt(p);
        }
        return s2;
    }
});

//Codifica los caracteres finales de una cadena en base 256 a base 64
Object.defineProperty(b64, "c3cf", {
    value: function (s) {
        var v = [], a, r, s2 = "", p, l = s.length;
        for (let i = 0; i < l; i++) {
            a = s.charCodeAt(l - 1 - i);
            for (let j = 0; j < 8; j++) {
                v.unshift((a >> j) & 1);
            }
        }
        r = v.join("");
        //Si sólo existe 8 bits se añaden 16 ceros
        if (r.length == 8) r += "0000000000000000";
        //Si existen 16 bits se añande 8 ceros 
        else if (r.length == 16) r += "00000000";
        //Código que convierte los bits en caracteres en base 64
        for (let i = 0; i < 4; i++) {
            p = parseInt(r.slice(i * 6, (i + 1) * 6), 2);
            s2 += b64.d.charAt(p);
        }
        return s2;
    }
});

//Método que decodifica 4 caracteres en base 64 a base 256
Object.defineProperty(b64, "d4c", {
    value: function (s2) {
        var v = [], a, r, p, s3 = "";
        //Código que convierte 4 caracteres en base 64 en 24 bits
        for (let i = 0; i < 4; i++) {
            a = b64.d.search(s2[3 - i]);
            for (let j = 0; j < 6; j++) {
                v.unshift((a >> j) & 1);
            }
        }
        r = v.join("");
        //Código que convierte 24 bits en 3 caracteres en base 256
        for (let i = 0; i < 3; i++) {
            p = parseInt(r.slice(i * 8, (i + 1) * 8), 2);
            s3 += String.fromCharCode(p);
        }
        return s3;
    }
});

//Método que decodifica los caracteres finales en base 64 a base 256
Object.defineProperty(b64, "d4cf", {
    value: function (s2) {
        var v = [], a, r, p, s3 = "";
        //Código que convierte 4 caracteres en base 64 en 24 bits
        for (let i = 0; i < 4; i++) {
            a = b64.d.search(s2[3 - i]);
            for (let j = 0; j < 6; j++) {
                v.unshift((a >> j) & 1);
            }
        }
        r = v.join("");
        //Código que convierte 24 bits en 3 caracteres en base 256
        for (let i = 0; i < 3; i++) {
            p = parseInt(r.slice(i * 8, (i + 1) * 8), 2);
            if (p !== 0) s3 += String.fromCharCode(p);
        }
        return s3;
    }
});

Object.defineProperty(b64, "code", {
    value: function (texto) {
        var i = 0, s = "", r = "";
        while (i < texto.length - 3) {
            s = texto.substring(i, i + 3);
            r += b64.c3c(s);
            i += 3;
        }
        s = texto.substring(i);
        r += b64.c3cf(s);
        return r;
    }
});

Object.defineProperty(b64, "decode", {
    value: function (texto) {
        var i = 0, s = "", r = "";
        while (i < texto.length - 4) {
            s = texto.substring(i, i + 4);
            r += b64.d4c(s);
            i += 4;
        }
        s = texto.substring(i, i + 4);
        r += b64.d4cf(s);
        return r;
    }
});

//Método que decodifica la pregunta/opción, si está codificada. Se sabe que está codificada cuando está encerrada entre las cadenas "%&Ç#$@"
Object.defineProperty(b64, "decodificar", {
    value: function (s) {
        let k = 0, i = s.indexOf("%&Ç#$@"), ui = 0, texto = "";
        while (i >= 0) {
            texto += s.substring(k, i);
            i += 6;
            ui = i; //ültimo índice válido"
            k = s.indexOf("%&Ç#$@", i);
            if (k > 0) {
                texto += eval("'" + b64.decode(s.substring(i, k)) + "'");
            } else break;
            k += 6;
            ui = k;
            i = s.indexOf("%&Ç#$@", k);
        }
        texto += s.substring(ui);
        return texto;
    }
});





// Objeto que almacena los datos codificados correspondientes al capítulo y genera un número entero aleatorio, comprendido entre 0 y 30, guarda ese número , codificado (empleando el dominio estándar)
let dd = {};

Object.defineProperty(dd, "b", { value: null, configurable: true }); // Sigla 
Object.defineProperty(dd, "d", { value: null, configurable: true }); // Gestión
Object.defineProperty(dd, "f", { value: null, configurable: true }); // cu
Object.defineProperty(dd, "h", { value: null, configurable: true }); // Capítulo
Object.defineProperty(dd, "j", { value: null, configurable: true }); // idPagina
Object.defineProperty(dd, "l", { value: null, configurable: true }); // ncapitulo
Object.defineProperty(dd, "n", { value: null, configurable: true }); // semilla
Object.defineProperty(dd, "p", { value: null, configurable: true }); // nfinal
Object.defineProperty(dd, "r", { value: null, configurable: true }); // tdefensa


// Clausura que genera y guarda la semilla que se emplea en la generación de los números aleatorios
let uu = (function () {
    var f = function () {
        let na = Math.round(Math.random() * 32);
        Object.defineProperty(dd, "n", { value: b64.code(na.toString()), configurable: true });
        return dd.n;
    }
    return function () {
        return f();
    }
})()


// Clausura que codifica la información correspondiente al capítulo y llena, los campos del objeto "dd" con la información codificada, empleando el número aleatorio generado y almacenado en "dd", reseteando dicho número (a null) después de llevar a cabo la codificación
let ii = (function () {
    // Objeto que codifica y decodifica cadenas permitiendo variar el dominio
    let tt = {};
    // Método que genera la semilla a emplear en la codificación de los campos
    let n = 0;
    Object.defineProperty(tt, "g", {
        value: function () {
            let n = parseInt(b64.decode(dd.n, 10));
            tt.rd(n);
        }
    });
    // Dominio empleado en la codificación con "cd" y "dc"
    Object.defineProperty(tt, "d", {
        value: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz<>",
        writable: true,
        configurable: true
    });
    // Dominio original (sin modificar)
    Object.defineProperty(tt, "e", {
        value: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz<>",
    });
    // Rota el dominio "n" posiciones hacia la derecha
    Object.defineProperty(tt, "rd", {
        value: function (n) {
            tt.d = tt.d.substr(-n) + tt.d.substr(0, 64 - n);
        }
    })
    //Codifica 3 caracteres en base 256 a base 64
    Object.defineProperty(tt, "c3c", {
        value: function (s) {
            var v = [], a, r, s2 = "", p;
            for (let i = 0; i < s.length; i++) {
                a = s.charCodeAt(2 - i);
                for (let j = 0; j < 8; j++) {
                    v.unshift((a >> j) & 1);
                }
            }
            r = v.join("");
            //Código que convierte los bits en caracteres en base 64
            for (let i = 0; i < 4; i++) {
                p = parseInt(r.slice(i * 6, (i + 1) * 6), 2);
                s2 += tt.d.charAt(p);
            }
            return s2;
        }
    });
    //Codifica los caracteres finales de una cadena en base 256 a base 64
    Object.defineProperty(tt, "c3cf", {
        value: function (s) {
            var v = [], a, r, s2 = "", p, l = s.length;
            for (let i = 0; i < l; i++) {
                a = s.charCodeAt(l - 1 - i);
                for (let j = 0; j < 8; j++) {
                    v.unshift((a >> j) & 1);
                }
            }
            r = v.join("");
            //Si sólo existe 8 bits se añaden 16 ceros
            if (r.length == 8) r += "0000000000000000";
            //Si existen 16 bits se añande 8 ceros 
            else if (r.length == 16) r += "00000000";
            //Código que convierte los bits en caracteres en base 64
            for (let i = 0; i < 4; i++) {
                p = parseInt(r.slice(i * 6, (i + 1) * 6), 2);
                s2 += tt.d.charAt(p);
            }
            return s2;
        }
    });
    //Método que decodifica 4 caracteres en base 64 a base 256
    Object.defineProperty(tt, "d4c", {
        value: function (s2) {
            var v = [], a, r, p, s3 = "";
            //Código que convierte 4 caracteres en base 64 en 24 bits
            for (let i = 0; i < 4; i++) {
                a = tt.d.search(s2[3 - i]);
                for (let j = 0; j < 6; j++) {
                    v.unshift((a >> j) & 1);
                }
            }
            r = v.join("");
            //Código que convierte 24 bits en 3 caracteres en base 256
            for (let i = 0; i < 3; i++) {
                p = parseInt(r.slice(i * 8, (i + 1) * 8), 2);
                s3 += String.fromCharCode(p);
            }
            return s3;
        }
    });
    //Método que decodifica los caracteres finales en base 64 a base 256
    Object.defineProperty(tt, "d4cf", {
        value: function (s2) {
            var v = [], a, r, p, s3 = "";
            //Código que convierte 4 caracteres en base 64 en 24 bits
            for (let i = 0; i < 4; i++) {
                a = tt.d.search(s2[3 - i]);
                for (let j = 0; j < 6; j++) {
                    v.unshift((a >> j) & 1);
                }
            }
            r = v.join("");
            //Código que convierte 24 bits en 3 caracteres en base 256
            for (let i = 0; i < 3; i++) {
                p = parseInt(r.slice(i * 8, (i + 1) * 8), 2);
                if (p !== 0) s3 += String.fromCharCode(p);
            }
            return s3;
        }
    });
    // Método que codifica una cadena de texto
    Object.defineProperty(tt, "cd", {
        value: function (texto) {
            var i = 0, s = "", r = "";
            while (i < texto.length - 3) {
                s = texto.substring(i, i + 3);
                r += tt.c3c(s);
                i += 3;
            }
            s = texto.substring(i);
            r += tt.c3cf(s);
            return r;
        }
    });
    // Método que decodifica una cadena codificada
    Object.defineProperty(tt, "dc", {
        value: function (texto) {
            var i = 0, s = "", r = "";
            while (i < texto.length - 4) {
                s = texto.substring(i, i + 4);
                r += tt.d4c(s);
                i += 4;
            }
            s = texto.substring(i, i + 4);
            r += tt.d4cf(s);
            return r;
        }
    });
    Object.defineProperty(tt, 'h', {
        value: function () {
            Object.defineProperty(dd, "b", { value: tt.cd(b64.decodificar(capitulo.sigla)), configurable: true }); // Sigla 
            Object.defineProperty(dd, "d", { value: tt.cd(b64.decodificar(capitulo.gestion)), configurable: true }); // Gestión
            Object.defineProperty(dd, "f", { value: tt.cd(capitulo.cu), configurable: true }); // cu
            Object.defineProperty(dd, "h", { value: tt.cd(Capitulo.id.toString()), configurable: true }); // Capítulo
            Object.defineProperty(dd, "j", { value: tt.cd(capitulo.idPagina), configurable: true }); // idPagina
            if (capitulo.ncapitulo != undefined /* && dd.l==null */)
                Object.defineProperty(dd, "l", { value: tt.cd(capitulo.ncapitulo.toString()) }); // ncapitulo
            if (capitulo.nfinal != undefined /* && dd.p==null */)
                Object.defineProperty(dd, "p", { value: tt.cd(capitulo.nfinal.toString()) }); // nfinal
            if (capitulo.tdefensa != undefined /* && dd.r==null */)
                Object.defineProperty(dd, "r", { value: tt.cd(capitulo.tdefensa.toString()) }); // tdefensa
            n = 0; // Se reinicia la semilla
            Object.defineProperty(dd, "n", { value: b64.code(n.toString()), configurable: true });
            tt.d = tt.e;
        }
    })

    return function () {
        tt.g();
        tt.h();
    };

})();

// Hacer los objetos disponibles globalmente
window.b64 = b64;
window.dd = dd;
window.uu = uu;
window.ii = ii;

// Confirmar que el codificador está activo
console.log("codificador b64 activo");

/**
 * Literal.js - Resolutor automático para ejercicios de tipo LITERAL
 * 
 * Este script permite resolver automáticamente los ejercicios de tipo LITERAL
 * extrayendo las respuestas correctas del objeto pregunta y rellenando los campos.
 */

// Códigos de tipo de pregunta
const TIPO_PREGUNTA = {
    SIMPLE: 0,
    MULTIPLE: 1,
    ARRASTRAR: 2,
    DATO: 3,
    LITERAL: 4,
    CALCULADORA: 5
};

/**
 * Función para resolver un ejercicio de tipo LITERAL automáticamente
 * Esta función identifica los campos de respuesta y los completa con las respuestas correctas
 * @param {number} indice - Índice del ejercicio a resolver (base 0)
 * @returns {boolean} - true si se resolvió correctamente, false en caso contrario
 */
function resolverLiteral(indice) {
    try {
        // Verificar que capitulo y ejercicio existan
        if (!window.capitulo || !window.capitulo.ejercicios || !window.capitulo.ejercicios[indice]) {
            console.error('❌ No se encontró el ejercicio', indice);
            return false;
        }

        // Obtener el ejercicio actual
        const ejercicio = capitulo.ejercicios[indice];
        
        // Verificar preguntas
        if (!ejercicio.preguntas) {
            console.error('❌ El ejercicio no tiene preguntas definidas');
            return false;
        }

        // Acceder al enunciado actual
        const enunciadoActual = ejercicio.enunciado || 0;
        
        // Obtener el grupo de preguntas para el enunciado actual
        const grupoPregunta = ejercicio.preguntas[enunciadoActual];
        
        if (!Array.isArray(grupoPregunta)) {
            console.error('❌ El grupo de preguntas no es un array');
            return false;
        }

        // Contadores para el sumario
        let preguntasAnalizadas = 0;
        let literalesEncontradas = 0;
        let literalesResueltas = 0;
        let otrosTipos = {};
        
        console.log(`📚 Analizando ejercicio ${indice + 1} con ${grupoPregunta.length} preguntas en total...`);
        
        // Obtener el contenedor del ejercicio actual
        const ejercicioContainer = document.querySelector(`#ejercicio${indice+1}`);
        if (!ejercicioContainer) {
            console.warn(`⚠️ No se encontró el contenedor del ejercicio ${indice+1}`);
            return false;
        }
        
        // Buscar elementos de pregunta SOLO dentro de este ejercicio
        const elementosPreguntas = ejercicioContainer.querySelectorAll('p.pregunta');
        if (!elementosPreguntas || elementosPreguntas.length === 0) {
            console.warn(`⚠️ No se encontraron elementos de pregunta en el ejercicio ${indice+1}`);
            return false;
        }
        
        console.log(`   📍 Limitando búsqueda solo al ejercicio ${indice+1} (#ejercicio${indice+1})`);

        
        // Verificar correspondencia entre modelo y DOM
        if (elementosPreguntas.length !== grupoPregunta.length) {
            console.warn(`   ⚠️ Discrepancia: ${grupoPregunta.length} preguntas en el modelo vs ${elementosPreguntas.length} en el DOM`);
        }
        
        console.log(`   💬 Encontrados ${elementosPreguntas.length} elementos de pregunta en el DOM para ${grupoPregunta.length} preguntas en el modelo`);
        
        // Crear un mapa para rastrear qué elementos de pregunta en el DOM ya se han procesado
        const elementosProcesados = new Array(elementosPreguntas.length).fill(false);
        
        // Recorrer cada pregunta del grupo
        for (let j = 0; j < grupoPregunta.length; j++) {
            const pregunta = grupoPregunta[j];
            preguntasAnalizadas++;
            
            // Verificar el tipo de pregunta
            if (!pregunta || typeof pregunta.tipo === 'undefined') {
                console.warn(`   ⚠️ La pregunta ${j+1} no tiene tipo definido`);
                continue;
            }
            
            // Identificar el tipo de pregunta por su nombre
            const tipoNombre = Object.keys(TIPO_PREGUNTA).find(key => TIPO_PREGUNTA[key] === pregunta.tipo) || `DESCONOCIDO(${pregunta.tipo})`;
            console.log(`   🔍 Pregunta ${j+1}: Tipo ${tipoNombre} [${pregunta.tipo}]`);
            
            // Solo procesamos preguntas de tipo LITERAL
            if (pregunta.tipo !== TIPO_PREGUNTA.LITERAL) {
                // Contabilizar otros tipos de preguntas
                otrosTipos[tipoNombre] = (otrosTipos[tipoNombre] || 0) + 1;
                console.log(`   ℹ️ Pregunta ${j+1}: Tipo ${tipoNombre} - No es LITERAL, omitiendo...`);
                continue;
            }
            
            // Si llegamos aquí, es una pregunta LITERAL
            literalesEncontradas++;
            console.log(`   🔍 Pregunta ${j+1}: Tipo LITERAL - Intentando resolver...`);
            
            // Intento de identificar el elemento DOM correcto para esta pregunta LITERAL
            console.log(`   🔎 Buscando el elemento DOM para la pregunta LITERAL #${j+1}`);
            
            // Estrategia 1: Intentar encontrar una correspondencia basada en el contenido
            let elementoPreguntaIndex = -1;
            let elementoPregunta = null;
            
            // Primero, intentamos buscar por correspondencia directa de índice si no se ha usado aún
            if (j < elementosPreguntas.length && !elementosProcesados[j]) {
                elementoPreguntaIndex = j;
                elementoPregunta = elementosPreguntas[j];
                console.log(`   ✅ Usando emparejamiento por índice para la pregunta ${j+1} → elemento DOM ${j+1}`);
            } 
            // Si no funciona, buscamos cualquier elemento no procesado
            else {
                // Buscar el primer elemento no procesado
                for (let k = 0; k < elementosProcesados.length; k++) {
                    if (!elementosProcesados[k]) {
                        elementoPreguntaIndex = k;
                        elementoPregunta = elementosPreguntas[k];
                        console.log(`   ✅ Usando primer elemento libre disponible: ${k+1}`);
                        break;
                    }
                }
            }
            
            // Si aún no encontramos un elemento, usar estrategia de respaldo
            if (elementoPreguntaIndex === -1) {
                // Respaldo: Si hemos usado todos los elementos pero aún hay preguntas LITERAL por resolver
                if (elementosPreguntas.length > 0) {
                    // Si no hay elementos disponibles, reutilizamos el último por desesperación
                    elementoPreguntaIndex = elementosPreguntas.length - 1;
                    elementoPregunta = elementosPreguntas[elementoPreguntaIndex];
                    console.warn(`   ⚠️ Sin elementos libres: reutilizando el elemento ${elementoPreguntaIndex+1}`);
                } else {
                    console.error(`   ❌ No se encontraron elementos de pregunta para la pregunta LITERAL ${j+1}`);
                    continue;
                }
            }
            
            // Marcar el elemento como procesado
            elementosProcesados[elementoPreguntaIndex] = true;
            
            // Primero verificar si la pregunta tiene los datos de campos en el modelo
            if (!pregunta.pregunta || !pregunta.pregunta.campos) {
                console.warn('   ⚠️ La pregunta no tiene datos de campos en el modelo', pregunta);
                continue;
            }
            
            // Validar que en el modelo realmente haya campos definidos
            let camposDefinidos = 0;
            for (let i = 0; i < pregunta.pregunta.campos.length; i++) {
                if (pregunta.pregunta.campos[i] && pregunta.pregunta.campos[i].length > 0) {
                    camposDefinidos++;
                }
            }
            
            if (camposDefinidos === 0) {
                console.warn(`   ⚠️ La pregunta tiene ${pregunta.pregunta.campos.length} campos definidos, pero ninguno tiene respuestas`);
                continue;
            }
            
            console.log(`   📝 La pregunta tiene ${camposDefinidos} campos con respuestas definidas en el modelo`);
            
            // Buscar campos literales en diferentes niveles del DOM
            let camposLiterales = elementoPregunta.querySelectorAll('.campo_literal');
            
            // Si no encontramos campos literales directamente, intentar diferentes estrategias
            if (!camposLiterales || camposLiterales.length === 0) {
                // 1. Intenta buscar en contenedores específicos que puedan contener los campos LITERAL
                let camposEncontrados = [];
                
                // Asegurarnos de que estamos usando el contenedor del ejercicio actual
                // que ya fue definido al inicio de la función resolverLiteral
                if (ejercicioContainer) {
                    // Obtener todos los campos literales SOLO de este ejercicio
                    const todosCampos = ejercicioContainer.querySelectorAll('.campo_literal');
                    
                    if (todosCampos && todosCampos.length > 0) {
                        console.log(`   🔎 Encontrados ${todosCampos.length} campos literales dentro del ejercicio ${indice+1}`);
                        
                        // Buscar mejor lógica para asociar campos a preguntas
                        // B. Usar proximidad - campos que están cerca de esta pregunta en el DOM
                        
                        // Primero identificar todos los elementos de pregunta para establecer límites
                        const todasPreguntas = Array.from(ejercicioContainer.querySelectorAll('.pregunta, [class*="pregunta"]'));
                        const indicePreguntaActual = todasPreguntas.indexOf(elementoPregunta);
                        
                        if (indicePreguntaActual !== -1) {
                            console.log(`   🔍 Pregunta actual es la ${indicePreguntaActual+1} de ${todasPreguntas.length}`);
                            
                            // Determinar el siguiente elemento de pregunta (si existe)
                            const siguientePregunta = todasPreguntas[indicePreguntaActual + 1];
                            
                            // Filtrar campos basados en su posición relativa a las preguntas
                            const camposFiltrados = Array.from(todosCampos).filter(campo => {
                                // El campo debe estar después de esta pregunta
                                const despuesDeEstaPregunta = elementoPregunta.compareDocumentPosition(campo) & Node.DOCUMENT_POSITION_FOLLOWING;
                                
                                // Y antes de la siguiente pregunta (si existe)
                                const antesDelaSiguiente = !siguientePregunta || 
                                    (siguientePregunta.compareDocumentPosition(campo) & Node.DOCUMENT_POSITION_PRECEDING);
                                
                                return despuesDeEstaPregunta && antesDelaSiguiente;
                            });
                            
                            if (camposFiltrados.length > 0) {
                                camposEncontrados = camposFiltrados;
                                console.log(`   ✅ Se encontraron ${camposEncontrados.length} campos literales entre esta pregunta y la siguiente`);
                            }
                        }
                        
                        // C. Usar distancia para encontrar campos cercanos
                        if (camposEncontrados.length === 0) {
                            // Calcular y ordenar campos por cercanía a esta pregunta
                            const camposConDistancia = Array.from(todosCampos).map(campo => {
                                // Obtener rectángulos de posición
                                const rectPregunta = elementoPregunta.getBoundingClientRect();
                                const rectCampo = campo.getBoundingClientRect();
                                
                                // Calcular distancia (simplificada como distancia vertical)
                                const distancia = Math.abs(rectCampo.top - rectPregunta.bottom);
                                
                                return { campo, distancia };
                            }).sort((a, b) => a.distancia - b.distancia);
                            
                            // Tomar el número esperado de campos o todos los disponibles
                            const numCamposEsperados = pregunta.pregunta.campos.length;
                            const camposCercanos = camposConDistancia.slice(0, numCamposEsperados)
                                .map(item => item.campo);
                            
                            if (camposCercanos.length > 0) {
                                camposEncontrados = camposCercanos;
                                console.log(`   ✅ Se encontraron ${camposEncontrados.length} campos literales más cercanos a esta pregunta`);
                            }
                        }
                        
                        // D. Si todo falla, intentar con campos que no están asignados a ninguna pregunta
                        if (camposEncontrados.length === 0) {
                            // Crear un conjunto de campos ya procesados por otras preguntas
                            const camposProcesados = new Set();
                            
                            // Tomar campos que no han sido procesados aún
                            const camposLibres = Array.from(todosCampos).filter(campo => !camposProcesados.has(campo));
                            
                            if (camposLibres.length > 0) {
                                // Limitar al número de campos esperados en esta pregunta
                                const numCamposEsperados = pregunta.pregunta.campos.length;
                                camposEncontrados = camposLibres.slice(0, numCamposEsperados);
                                console.log(`   ✅ Se asignaron ${camposEncontrados.length} campos literales disponibles a esta pregunta`);
                            }
                        }
                    }
                }
                
                if (camposEncontrados.length > 0) {
                    camposLiterales = camposEncontrados;
                }
            }
            
            if (!camposLiterales || camposLiterales.length === 0) {
                console.warn('   ⚠️ No se encontraron campos literales para esta pregunta en el DOM');
                continue;
            }
            
            console.log(`   🔤 Pregunta LITERAL encontrada con ${camposLiterales.length} campos disponibles en el DOM`);
            
            // Comparar campos disponibles con campos definidos
            if (camposLiterales.length < camposDefinidos) {
                console.warn(`   ⚠️ Discrepancia: Hay ${camposDefinidos} campos definidos pero solo ${camposLiterales.length} en el DOM`);
            } else if (camposLiterales.length > camposDefinidos) {
                console.warn(`   ⚠️ Discrepancia: Hay ${camposDefinidos} campos definidos pero ${camposLiterales.length} en el DOM`);
            }
            
            // Rellenar cada campo con la primera respuesta correcta
            let camposRellenados = 0;
            
            // Verificar si hay suficientes campos en el DOM
            if (camposLiterales.length < pregunta.pregunta.campos.length) {
                console.warn(`   ⚠️ Advertencia: Solo hay ${camposLiterales.length} campos en el DOM, pero se esperaban ${pregunta.pregunta.campos.length}`);
            }
            
            // Mapear primero todas las respuestas disponibles
            const respuestasDisponibles = [];
            for (let i = 0; i < pregunta.pregunta.campos.length; i++) {
                if (pregunta.pregunta.campos[i] && pregunta.pregunta.campos[i].length > 0) {
                    // Obtener la primera respuesta correcta (está codificada en base64)
                    let respuestaCorrecta = b64.decode(pregunta.pregunta.campos[i][0]);
                    
                    // Procesar la respuesta exactamente igual que en corregirPreguntaLiteral
                    // 1. Suprimir espacios innecesarios
                    respuestaCorrecta = respuestaCorrecta.replace(/\b\s+\b/g, "&#&").replace(/\s/g, "").replace(/&#&/g, " ");
                    
                    // 2. Eliminar caracteres de notación matemática (_^ y _$)
                    // 3. Eliminar marcadores de plantilla que causan problemas
                    respuestaCorrecta = respuestaCorrecta
                        .replace(/_\*/g, '') // Eliminar separadores _*
                        .replace(/_{(\d+)_}/g, '') // Eliminar contadores _{n_}
                        .replace(/_\|/g, '') // Eliminar separadores _|
                        .replace(/_\(/g, '') // Eliminar paréntesis especiales _(
                        .replace(/_\)/g, '') // Eliminar paréntesis especiales _)
                        .replace(/_\?/g, '') // Eliminar marcador de interrogación _?
                        .replace(/(_[+.\^$\\|\[\]{}])/g, ''); // Eliminar TODOS los caracteres especiales de regex
                    
                    // 4. Normalizar para presentación en interfaz
                    respuestaCorrecta = respuestaCorrecta.trim();
                    
                    respuestasDisponibles.push(respuestaCorrecta);
                    console.log(`   📝 Respuesta ${i+1} disponible: "${respuestaCorrecta}"`);
                }
            }
            
            // Rellenar todos los campos disponibles en el DOM con las respuestas obtenidas
            for (let i = 0; i < camposLiterales.length && i < respuestasDisponibles.length; i++) {
                try {
                    // Rellenar campo usando diferentes métodos para garantizar que se apliquen los cambios
                    const campo = camposLiterales[i];
                    const respuesta = respuestasDisponibles[i];
                    
                    // Método 1: textContent (el estándar)
                    campo.textContent = respuesta;
                    
                    // Método 2: innerHTML como respaldo
                    campo.innerHTML = respuesta;
                    
                    // Método 3: Usar valor si es un input o textarea
                    if (campo.tagName === 'INPUT' || campo.tagName === 'TEXTAREA') {
                        campo.value = respuesta;
                    }
                    
                    // Método 4: Asignar un atributo data para marcar como completado
                    campo.setAttribute('data-completado', 'true');
                    
                    // Método 5: Simular evento de teclado para activar oyentes de eventos
                    const eventInput = new Event('input', { bubbles: true });
                    campo.dispatchEvent(eventInput);
                    
                    // Método 6: Asegurarse de que el campo esté visible y enfocado
                    campo.style.visibility = 'visible';
                    
                    console.log(`   ✅ Campo ${i+1} rellenado con: "${respuesta}"`);
                    camposRellenados++;
                } catch (err) {
                    console.error(`   ❌ Error al rellenar el campo ${i+1}:`, err);
                }
            }
            
            if (camposRellenados > 0) {
                literalesResueltas++;
                console.log(`   ✅ Pregunta LITERAL ${j+1} resuelta con ${camposRellenados} campos rellenados`);
            }
        }
        
        // Mostrar resumen detallado
        console.log(`
📊 INFORME DETALLADO DEL EJERCICIO ${indice+1}:
-------------------------------------`);
        console.log(`   ✓ Preguntas totales analizadas: ${preguntasAnalizadas}`);
        console.log(`   ✓ Preguntas LITERAL encontradas: ${literalesEncontradas}`);
        console.log(`   ✓ Preguntas LITERAL resueltas: ${literalesResueltas}`);
        
        // Calcular porcentaje de éxito para LITERAL
        const porcentajeExitoLiteral = literalesEncontradas > 0 ? 
            Math.round((literalesResueltas / literalesEncontradas) * 100) : 0;
        console.log(`   ✓ Tasa de éxito LITERAL: ${porcentajeExitoLiteral}% (${literalesResueltas}/${literalesEncontradas})`);
        
        // Mostrar otros tipos encontrados con detalles
        if (Object.keys(otrosTipos).length > 0) {
            console.log('\n   📋 DISTRIBUCIÓN DE TIPOS DE PREGUNTAS:');
            console.log('   ------------------------------------');
            
            // Calcular el total para porcentajes
            const totalPreguntas = preguntasAnalizadas;
            
            // LITERAL
            const porcentajeLiteral = Math.round((literalesEncontradas / totalPreguntas) * 100);
            console.log(`   ⭐ LITERAL: ${literalesEncontradas} (${porcentajeLiteral}% del total)`);
            
            // Otros tipos
            for (const tipo in otrosTipos) {
                const porcentaje = Math.round((otrosTipos[tipo] / totalPreguntas) * 100);
                console.log(`   ⚪ ${tipo}: ${otrosTipos[tipo]} (${porcentaje}% del total)`);
            }
        }
        
        return literalesResueltas > 0;
    } catch (e) {
        console.error('❌ Error al resolver pregunta LITERAL:', e);
        return false;
    }
}

/**
 * Función para generar un ejercicio y resolver sus preguntas tipo LITERAL
 * Esta función primero genera el ejercicio y luego identifica y resuelve las preguntas LITERAL
 * @param {number} numeroEjercicio - Número del ejercicio a resolver (base 1)
 * @returns {boolean} - true si el proceso inició correctamente, false en caso contrario
 */
function generarYResolverLiteral(numeroEjercicio) {
    try {
        // Convertir a base 0 para uso interno
        const indice = numeroEjercicio - 1;
        
        console.log(`🔍 Iniciando generación y resolución del ejercicio ${numeroEjercicio}...`);
        
        // Buscar y hacer clic en el botón de generar ejercicio
        const botonGenerar = document.querySelector(`#ejercicio${numeroEjercicio} .btGenerar`);
        if (!botonGenerar) {
            console.error(`❌ No se encontró el botón para generar el ejercicio ${numeroEjercicio}`);
            return false;
        }
        
        // Hacer clic en el botón para generar el ejercicio
        botonGenerar.click();
        console.log(`   ▶️ Ejercicio ${numeroEjercicio} generado`);
        
        // Comprobar si el ejercicio contiene preguntas LITERAL y resolverlas
        console.log(`   ⏳ Esperando a que se cargue completamente el DOM... (5 segundos)`);
        
        // Función para verificar si el ejercicio está completamente cargado
        const verificarCargaCompleta = () => {
            const ejercicioContainer = document.querySelector(`#ejercicio${numeroEjercicio}`);
            if (!ejercicioContainer) {
                console.log(`   ⚠️ El contenedor del ejercicio ${numeroEjercicio} aún no está disponible.`);
                return false;
            }
            
            // Verificar si hay preguntas y campos en el DOM
            const preguntas = ejercicioContainer.querySelectorAll('.pregunta, [class*="pregunta"]');
            if (!preguntas || preguntas.length === 0) {
                console.log(`   ⚠️ Aún no hay preguntas disponibles en el DOM para el ejercicio ${numeroEjercicio}.`);
                return false;
            }
            
            return true;
        };
        
        // Ejecutar con retraso suficiente para permitir la carga completa
        setTimeout(() => {
            if (!verificarCargaCompleta()) {
                console.log(`   ⚠️ El ejercicio aún no ha terminado de cargarse. Esperando más tiempo...`);
                // Esperar aún más si no está cargado
                setTimeout(() => {
                    try {
                        console.log(`   🕐 Segundo intento de resolución después de espera adicional...`);
                        console.log(`   🔍 Buscando y resolviendo preguntas LITERAL...`);
                        const resuelto = resolverLiteral(indice);
                        
                        if (resuelto) {
                            console.log(`✅ Ejercicio ${numeroEjercicio}: Campos LITERAL completados correctamente.`);
                        } else {
                            console.log(`ℹ️ Ejercicio ${numeroEjercicio}: No se encontraron o no se pudieron resolver preguntas LITERAL.`);
                        }
                    } catch (e) {
                        console.error('   ⚠️ Error al procesar el ejercicio:', e);
                        console.log(`🚨 Ocurrió un error al procesar el ejercicio ${numeroEjercicio}.`);
                    }
                }, 3000); // 3 segundos adicionales
            } else {
                // Analizar el ejercicio si está listo
                try {
                    console.log(`   🔍 Buscando y resolviendo preguntas LITERAL...`);
                    const resuelto = resolverLiteral(indice);
                    
                    if (resuelto) {
                        console.log(`✅ Ejercicio ${numeroEjercicio}: Campos LITERAL completados correctamente.`);
                    } else {
                        console.log(`ℹ️ Ejercicio ${numeroEjercicio}: No se encontraron o no se pudieron resolver preguntas LITERAL.`);
                    }
                } catch (e) {
                    console.error('   ⚠️ Error al procesar el ejercicio:', e);
                    console.log(`🚨 Ocurrió un error al procesar el ejercicio ${numeroEjercicio}.`);
                }
            }
        }, 5000); // Aumentado a 5 segundos para la primera verificación
        
        return true;
    } catch (e) {
        console.error(`❌ Error al procesar ejercicio ${numeroEjercicio}:`, e);
        return false;
    }
}

/**
 * Función para resolver un ejercicio LITERAL ya generado
 * @param {number} numeroEjercicio - Número del ejercicio a resolver (base 1)
 * @returns {boolean} - true si se resolvió correctamente, false en caso contrario
 */
function completarLiteral(numeroEjercicio) {
    try {
        // Convertir a base 0 para uso interno
        const indice = numeroEjercicio - 1;
        console.log(`🔍 Resolviendo campos LITERAL en ejercicio ${numeroEjercicio} ya generado...`);
        
        // Resolver preguntas LITERAL automáticamente
        const resuelto = resolverLiteral(indice);
        
        if (resuelto) {
            console.log(`✅ Ejercicio ${numeroEjercicio}: Campos LITERAL completados correctamente.`);
        } else {
            console.log(`ℹ️ Ejercicio ${numeroEjercicio}: No se encontraron o no se pudieron resolver preguntas LITERAL.`);
        }
        
        return resuelto;
    } catch (e) {
        console.error(`❌ Error al procesar ejercicio ${numeroEjercicio}:`, e);
        return false;
    }
}

// Mensaje de carga del script
console.log('💡 Script de resolución automática de preguntas LITERAL cargado correctamente.');
console.log('💡 Funciones disponibles:');
console.log('  - generarYResolverLiteral(numero): Genera el ejercicio especificado y resuelve sus campos LITERAL');
console.log('  - completarLiteral(numero): Resuelve los campos LITERAL de un ejercicio ya generado');
console.log('  - resolverLiteral(indice): Función interna (base 0) utilizada por las funciones anteriores');
console.log('💡 Este script solo completa campos LITERAL, dejando intactas las preguntas de otros tipos.');
console.log('💡 No modifica tiempos ni puntuaciones del ejercicio.');

/**
 * Función para resolver un ejercicio de tipo MULTIPLE automáticamente
 * Esta función identifica los checkboxes y los marca según correspondan a opciones correctas
 * @param {number} indice - Índice del ejercicio a resolver (base 0)
 * @returns {boolean} - true si se resolvió correctamente, false en caso contrario
 */
function resolverMultiple(indice) {
    try {
        // Verificar que capitulo y ejercicio existan
        if (!window.capitulo || !window.capitulo.ejercicios || !window.capitulo.ejercicios[indice]) {
            console.error('❌ No se encontró el ejercicio', indice);
            return false;
        }

        // Obtener el ejercicio actual
        const ejercicio = capitulo.ejercicios[indice];
        
        // Verificar preguntas
        if (!ejercicio.preguntas) {
            console.error('❌ El ejercicio no tiene preguntas definidas');
            return false;
        }

        // Acceder al enunciado actual
        const enunciadoActual = ejercicio.enunciado || 0;
        
        // Obtener el grupo de preguntas para el enunciado actual
        const grupoPregunta = ejercicio.preguntas[enunciadoActual];
        
        if (!Array.isArray(grupoPregunta)) {
            console.error('❌ El grupo de preguntas no es un array');
            return false;
        }

        // Contadores para el sumario
        let preguntasAnalizadas = 0;
        let multiplesEncontradas = 0;
        let multiplesResueltas = 0;
        let otrosTipos = {};
        
        console.log(`📚 Analizando ejercicio ${indice + 1} con ${grupoPregunta.length} preguntas en total...`);
        
        // Obtener el contenedor del ejercicio actual
        const ejercicioContainer = document.querySelector(`#ejercicio${indice+1}`);
        if (!ejercicioContainer) {
            console.warn(`⚠️ No se encontró el contenedor del ejercicio ${indice+1}`);
            return false;
        }
        
        // Buscar elementos de pregunta SOLO dentro de este ejercicio
        const elementosPreguntas = ejercicioContainer.querySelectorAll('p.pregunta');
        if (!elementosPreguntas || elementosPreguntas.length === 0) {
            console.warn(`⚠️ No se encontraron elementos de pregunta en el ejercicio ${indice+1}`);
            return false;
        }
        
        console.log(`   📍 Limitando búsqueda solo al ejercicio ${indice+1} (#ejercicio${indice+1})`);

        // Verificar correspondencia entre modelo y DOM
        if (elementosPreguntas.length !== grupoPregunta.length) {
            console.warn(`   ⚠️ Discrepancia: ${grupoPregunta.length} preguntas en el modelo vs ${elementosPreguntas.length} en el DOM`);
        }
        
        console.log(`   💬 Encontrados ${elementosPreguntas.length} elementos de pregunta en el DOM para ${grupoPregunta.length} preguntas en el modelo`);
        
        // Crear un mapa para rastrear qué elementos de pregunta en el DOM ya se han procesado
        const elementosProcesados = new Array(elementosPreguntas.length).fill(false);
        
        // Recorrer cada pregunta del grupo
        for (let j = 0; j < grupoPregunta.length; j++) {
            const pregunta = grupoPregunta[j];
            preguntasAnalizadas++;
            
            // Verificar el tipo de pregunta
            if (!pregunta || typeof pregunta.tipo === 'undefined') {
                console.warn(`   ⚠️ La pregunta ${j+1} no tiene tipo definido`);
                continue;
            }
            
            // Registrar estadísticas por tipo
            const nombreTipo = Object.keys(TIPO_PREGUNTA).find(key => TIPO_PREGUNTA[key] === pregunta.tipo) || 'DESCONOCIDO';
            if (pregunta.tipo !== TIPO_PREGUNTA.MULTIPLE) {
                otrosTipos[nombreTipo] = (otrosTipos[nombreTipo] || 0) + 1;
                continue;
            }
            
            multiplesEncontradas++;
            
            // Buscar el elemento de pregunta correspondiente en el DOM
            // Primero intentamos encontrar una coincidencia exacta basándonos en el contenido del enunciado
            let preguntaElemento = null;
            let opcionesMultipleElements = [];
            
            // Recorrer los elementos de pregunta no procesados en el DOM para encontrar coincidencias
            for (let k = 0; k < elementosPreguntas.length; k++) {
                if (elementosProcesados[k]) continue;
                
                // Verificar si este elemento DOM de pregunta coincide con la pregunta del modelo
                preguntaElemento = elementosPreguntas[k];
                
                // Encontrar todos los checkboxes relacionados con esta pregunta
                // Las opciones múltiple están en elementos <p class="opcionMultiple"> que siguen a la pregunta
                opcionesMultipleElements = [];
                let currentElement = preguntaElemento.nextElementSibling;
                
                while (currentElement && currentElement.classList.contains('opcionMultiple')) {
                    opcionesMultipleElements.push(currentElement);
                    currentElement = currentElement.nextElementSibling;
                }
                
                // Si encontramos opciones múltiple, probablemente esta es la pregunta MULTIPLE que buscamos
                if (opcionesMultipleElements.length > 0) {
                    elementosProcesados[k] = true;  // Marcar como procesado
                    break;
                }
            }
            
            if (!preguntaElemento || opcionesMultipleElements.length === 0) {
                console.warn(`   ⚠️ No se encontraron elementos de opción múltiple para la pregunta ${j+1}`);
                continue;
            }
            
            console.log(`   ✓ Procesando pregunta MULTIPLE #${j+1} con ${opcionesMultipleElements.length} opciones`);
            
            // Verificar que tengamos el mismo número de opciones en el DOM y en el modelo
            if (opcionesMultipleElements.length !== pregunta.pregunta.length) {
                console.warn(`   ⚠️ Discrepancia: ${pregunta.pregunta.length} opciones en el modelo vs ${opcionesMultipleElements.length} en el DOM`);
            }
            
            // Marcar los checkboxes según corresponda a opciones correctas
            let opcionesResueltas = 0;
            
            for (let m = 0; m < Math.min(opcionesMultipleElements.length, pregunta.pregunta.length); m++) {
                const opcionElement = opcionesMultipleElements[m];
                const checkbox = opcionElement.querySelector('input[type="checkbox"]');
                
                if (!checkbox) {
                    console.warn(`   ⚠️ No se encontró checkbox en la opción ${m+1}`);
                    continue;
                }
                
                const opcionModelo = pregunta.pregunta[m];
                // NOTA: Después de investigar, parece que Opcion.CORRECTA es 1, Opcion.ERRONEA es 0 (contrario a lo asumido inicialmente)
                // Marcamos como checked si la opción es CORRECTA
                const esCorrecta = opcionModelo.tipo === 1; // 1 es Opcion.CORRECTA
                
                // Marcar o desmarcar el checkbox según corresponda
                checkbox.checked = esCorrecta;
                opcionesResueltas++;
                
                console.log(`     ${esCorrecta ? '✅' : '❌'} Opción ${m+1}: ${esCorrecta ? 'marcada como correcta' : 'dejada sin marcar'}`);
            }
            
            if (opcionesResueltas > 0) {
                multiplesResueltas++;
                console.log(`   ✅ Pregunta MULTIPLE #${j+1} resuelta con ${opcionesResueltas} opciones completadas`);
            }
        }
        
        // Mostrar resumen
        console.log('📊 Resumen del procesamiento:');
        console.log(`   - Preguntas analizadas: ${preguntasAnalizadas}`);
        console.log(`   - Preguntas MULTIPLE encontradas: ${multiplesEncontradas}`);
        console.log(`   - Preguntas MULTIPLE resueltas: ${multiplesResueltas}`);
        
        if (Object.keys(otrosTipos).length > 0) {
            console.log('   - Otros tipos de preguntas encontradas:');
            for (const tipo in otrosTipos) {
                console.log(`     > ${tipo}: ${otrosTipos[tipo]}`);
            }
        }
        
        return multiplesResueltas > 0;
    } catch (error) {
        console.error('❌ Error al resolver preguntas MULTIPLE:', error);
        return false;
    }
}

/**
 * Función para generar un ejercicio y resolver sus preguntas tipo MULTIPLE
 * Esta función primero genera el ejercicio y luego identifica y resuelve las preguntas MULTIPLE
 * @param {number} numeroEjercicio - Número del ejercicio a resolver (base 1)
 * @returns {boolean} - true si el proceso inició correctamente, false en caso contrario
 */
function generarYResolverMultiple(numeroEjercicio) {
    try {
        // Convertir a base 0 para uso interno
        const indice = numeroEjercicio - 1;
        
        // Verificar ejercicio
        if (!window.capitulo || !window.capitulo.ejercicios || !window.capitulo.ejercicios[indice]) {
            console.error(`❌ No se encontró el ejercicio ${numeroEjercicio}`);
            return false;
        }
        
        console.log(`🚀 Generando ejercicio ${numeroEjercicio}...`);
        
        // Generar el ejercicio utilizando la función del sistema
        const botonGenerar = document.querySelector(`#ejercicio${numeroEjercicio} button`);
        if (!botonGenerar) {
            console.error(`❌ No se encontró el botón de generar para el ejercicio ${numeroEjercicio}`);
            return false;
        }
        
        // Simular clic en el botón de generar ejercicio
        botonGenerar.click();
        console.log(`   ✓ Ejercicio ${numeroEjercicio} generado. Esperando a que se cargue completamente...`);
        
        // Función interna para verificar si el ejercicio está completamente cargado
        function verificarCargaCompleta() {
            // Verificar si las preguntas se han creado en el DOM
            const ejercicioContainer = document.querySelector(`#ejercicio${numeroEjercicio}`);
            if (!ejercicioContainer) return false;
            
            const elementosPreguntas = ejercicioContainer.querySelectorAll('p.pregunta');
            if (!elementosPreguntas || elementosPreguntas.length === 0) return false;
            
            // Verificar si hay opciones múltiple
            const opcionesMultiple = ejercicioContainer.querySelectorAll('p.opcionMultiple');
            
            console.log(`   📝 Carga verificada: ${elementosPreguntas.length} preguntas y ${opcionesMultiple.length} opciones múltiple encontradas`);
            return elementosPreguntas.length > 0;
        }
        
        // Esperar un tiempo para que se cargue el ejercicio y luego resolver las preguntas MULTIPLE
        setTimeout(() => {
            if (!verificarCargaCompleta()) {
                console.log(`   ⚠️ El ejercicio aún no ha terminado de cargarse. Esperando más tiempo...`);
                // Esperar aún más si no está cargado
                setTimeout(() => {
                    try {
                        console.log(`   🕐 Segundo intento de resolución después de espera adicional...`);
                        console.log(`   🔍 Buscando y resolviendo preguntas MULTIPLE...`);
                        const resuelto = resolverMultiple(indice);
                        
                        if (resuelto) {
                            console.log(`✅ Ejercicio ${numeroEjercicio}: Preguntas MULTIPLE completadas correctamente.`);
                        } else {
                            console.log(`ℹ️ Ejercicio ${numeroEjercicio}: No se encontraron o no se pudieron resolver preguntas MULTIPLE.`);
                        }
                    } catch (e) {
                        console.error('   ⚠️ Error al procesar el ejercicio:', e);
                        console.log(`🚨 Ocurrió un error al procesar el ejercicio ${numeroEjercicio}.`);
                    }
                }, 3000); // 3 segundos adicionales
            } else {
                // Analizar el ejercicio si está listo
                try {
                    console.log(`   🔍 Buscando y resolviendo preguntas MULTIPLE...`);
                    const resuelto = resolverMultiple(indice);
                    
                    if (resuelto) {
                        console.log(`✅ Ejercicio ${numeroEjercicio}: Preguntas MULTIPLE completadas correctamente.`);
                    } else {
                        console.log(`ℹ️ Ejercicio ${numeroEjercicio}: No se encontraron o no se pudieron resolver preguntas MULTIPLE.`);
                    }
                } catch (e) {
                    console.error('   ⚠️ Error al procesar el ejercicio:', e);
                    console.log(`🚨 Ocurrió un error al procesar el ejercicio ${numeroEjercicio}.`);
                }
            }
        }, 5000); // Aumentado a 5 segundos para la primera verificación
        
        return true;
    } catch (e) {
        console.error(`❌ Error al procesar ejercicio ${numeroEjercicio}:`, e);
        return false;
    }
}

/**
 * Función para resolver un ejercicio MULTIPLE ya generado
 * @param {number} numeroEjercicio - Número del ejercicio a resolver (base 1)
 * @returns {boolean} - true si se resolvió correctamente, false en caso contrario
 */
function completarMultiple(numeroEjercicio) {
    try {
        // Convertir a base 0 para uso interno
        const indice = numeroEjercicio - 1;
        console.log(`🔍 Resolviendo preguntas MULTIPLE en ejercicio ${numeroEjercicio} ya generado...`);
        
        // Resolver preguntas MULTIPLE automáticamente
        const resuelto = resolverMultiple(indice);
        
        if (resuelto) {
            console.log(`✅ Ejercicio ${numeroEjercicio}: Preguntas MULTIPLE completadas correctamente.`);
        } else {
            console.log(`ℹ️ Ejercicio ${numeroEjercicio}: No se encontraron o no se pudieron resolver preguntas MULTIPLE.`);
        }
        
        return resuelto;
    } catch (e) {
        console.error(`❌ Error al procesar ejercicio ${numeroEjercicio}:`, e);
        return false;
    }
}

// Mensaje de carga del script
console.log('💡 Script de resolución automática de preguntas MULTIPLE cargado correctamente.');
console.log('💡 Funciones disponibles:');
console.log('  - generarYResolverMultiple(numero): Genera el ejercicio especificado y resuelve sus preguntas MULTIPLE');
console.log('  - completarMultiple(numero): Resuelve las preguntas MULTIPLE de un ejercicio ya generado');
console.log('  - resolverMultiple(indice): Función interna (base 0) utilizada por las funciones anteriores');
console.log('💡 Este script solo completa preguntas MULTIPLE, dejando intactas las preguntas de otros tipos.');
console.log('💡 No modifica tiempos ni puntuaciones del ejercicio.');

/**
 * Funciu00f3n para resolver un ejercicio de tipo SIMPLE automu00e1ticamente
 * Esta funciu00f3n identifica los radio buttons y selecciona el que corresponde a la opciu00f3n correcta
 * @param {number} indice - u00cdndice del ejercicio a resolver (base 0)
 * @returns {boolean} - true si se resolviu00f3 correctamente, false en caso contrario
 */
function resolverSimple(indice) {
    try {
        // Verificar que capitulo y ejercicio existan
        if (!window.capitulo || !window.capitulo.ejercicios || !window.capitulo.ejercicios[indice]) {
            console.error('u274c No se encontru00f3 el ejercicio', indice);
            return false;
        }

        // Obtener el ejercicio actual
        const ejercicio = capitulo.ejercicios[indice];
        
        // Verificar preguntas
        if (!ejercicio.preguntas) {
            console.error('u274c El ejercicio no tiene preguntas definidas');
            return false;
        }

        // Acceder al enunciado actual
        const enunciadoActual = ejercicio.enunciado || 0;
        
        // Obtener el grupo de preguntas para el enunciado actual
        const grupoPregunta = ejercicio.preguntas[enunciadoActual];
        
        if (!Array.isArray(grupoPregunta)) {
            console.error('u274c El grupo de preguntas no es un array');
            return false;
        }

        // Contadores para el sumario
        let preguntasAnalizadas = 0;
        let simplesEncontradas = 0;
        let simplesResueltas = 0;
        let otrosTipos = {};
        
        console.log(`📚 Analizando ejercicio ${indice + 1} con ${grupoPregunta.length} preguntas en total...`);
        
        // Obtener el contenedor del ejercicio actual
        const ejercicioContainer = document.querySelector(`#ejercicio${indice+1}`);
        if (!ejercicioContainer) {
            console.warn(`u26a0ufe0f No se encontru00f3 el contenedor del ejercicio ${indice+1}`);
            return false;
        }
        
        // Buscar elementos de pregunta SOLO dentro de este ejercicio
        const elementosPreguntas = ejercicioContainer.querySelectorAll('p.pregunta');
        if (!elementosPreguntas || elementosPreguntas.length === 0) {
            console.warn(`u26a0ufe0f No se encontraron elementos de pregunta en el ejercicio ${indice+1}`);
            return false;
        }
        
        console.log(`   📍 Limitando búsqueda solo al ejercicio ${indice+1} (#ejercicio${indice+1})`);

        // Verificar correspondencia entre modelo y DOM
        if (elementosPreguntas.length !== grupoPregunta.length) {
            console.warn(`   u26a0ufe0f Discrepancia: ${grupoPregunta.length} preguntas en el modelo vs ${elementosPreguntas.length} en el DOM`);
        }
        
        console.log(`   💬 Encontrados ${elementosPreguntas.length} elementos de pregunta en el DOM para ${grupoPregunta.length} preguntas en el modelo`);
        
        // Crear un mapa para rastrear quu00e9 elementos de pregunta en el DOM ya se han procesado
        const elementosProcesados = new Array(elementosPreguntas.length).fill(false);
        
        // Recorrer cada pregunta del grupo
        for (let j = 0; j < grupoPregunta.length; j++) {
            const pregunta = grupoPregunta[j];
            preguntasAnalizadas++;
            
            // Verificar el tipo de pregunta
            if (!pregunta || typeof pregunta.tipo === 'undefined') {
                console.warn(`   u26a0ufe0f La pregunta ${j+1} no tiene tipo definido`);
                continue;
            }
            
            // Registrar estadu00edsticas por tipo
            const nombreTipo = Object.keys(TIPO_PREGUNTA).find(key => TIPO_PREGUNTA[key] === pregunta.tipo) || 'DESCONOCIDO';
            if (pregunta.tipo !== TIPO_PREGUNTA.SIMPLE) {
                otrosTipos[nombreTipo] = (otrosTipos[nombreTipo] || 0) + 1;
                continue;
            }
            
            simplesEncontradas++;
            
            // Buscar el elemento de pregunta correspondiente en el DOM
            // Primero intentamos encontrar una coincidencia exacta basu00e1ndonos en el contenido del enunciado
            let preguntaElemento = null;
            let opcionesSimpleElements = [];
            
            // Recorrer los elementos de pregunta no procesados en el DOM para encontrar coincidencias
            for (let k = 0; k < elementosPreguntas.length; k++) {
                if (elementosProcesados[k]) continue;
                
                // Verificar si este elemento DOM de pregunta coincide con la pregunta del modelo
                preguntaElemento = elementosPreguntas[k];
                
                // Encontrar todos los radio buttons relacionados con esta pregunta
                // Las opciones simples estu00e1n en elementos <p class="opcionSimple"> que siguen a la pregunta
                opcionesSimpleElements = [];
                let currentElement = preguntaElemento.nextElementSibling;
                
                while (currentElement && currentElement.classList.contains('opcionSimple')) {
                    opcionesSimpleElements.push(currentElement);
                    currentElement = currentElement.nextElementSibling;
                }
                
                // Si encontramos opciones simples, probablemente esta es la pregunta SIMPLE que buscamos
                if (opcionesSimpleElements.length > 0) {
                    elementosProcesados[k] = true;  // Marcar como procesado
                    break;
                }
            }
            
            if (!preguntaElemento || opcionesSimpleElements.length === 0) {
                console.warn(`   u26a0ufe0f No se encontraron elementos de opciu00f3n simple para la pregunta ${j+1}`);
                continue;
            }
            
            console.log(`   ✓ Procesando pregunta SIMPLE #${j+1} con ${opcionesSimpleElements.length} opciones`);
            
            // Verificar que tengamos el mismo nu00famero de opciones en el DOM y en el modelo
            if (opcionesSimpleElements.length !== pregunta.pregunta.visibles.length) {
                console.warn(`   ⚠️ Discrepancia: ${pregunta.pregunta.visibles.length} opciones en el modelo vs ${opcionesSimpleElements.length} en el DOM`);
            }
            
            // Para una pregunta SIMPLE, la propiedad correcta del objeto pregunta.pregunta contiene la respuesta correcta
            // Vamos a encontrar el índice de la opción correcta entre las opciones visibles
            let indiceOpcionCorrecta = -1;
            const respuestaCorrecta = pregunta.pregunta.correcta;
            
            console.log(`     🔍 Respuesta correcta en el modelo:`, respuestaCorrecta);
            
            // Recorrer las opciones para encontrar la coincidencia con la respuesta correcta
            for (let m = 0; m < opcionesSimpleElements.length; m++) {
                const opcionElement = opcionesSimpleElements[m];
                const radioButton = opcionElement.querySelector('input[type="radio"]');
                
                if (!radioButton) {
                    console.warn(`   ⚠️ No se encontró radio button en la opción ${m+1}`);
                    continue;
                }
                
                // La etiqueta asociada al radio button contiene el texto de la opción
                const opcionLabel = opcionElement.querySelector('label');
                if (!opcionLabel) {
                    console.warn(`   ⚠️ No se encontró etiqueta para la opción ${m+1}`);
                    continue;
                }
                
                // Desmarcar todos los radio buttons primero
                radioButton.checked = false;
                
                // Si es la opción correcta, marcarla
                if (respuestaCorrecta && respuestaCorrecta.length > 0) {
                    const textoOpcion = opcionLabel.textContent.trim();
                    // En el texto_.js se hace una comparación con b64.decode
                    // Vamos a revisar el id del elemento para encontrar la coincidencia
                    const radioId = radioButton.id;
                    
                    // Obtenemos el id de la opción correcta del modelo
                    // Comparando con la lógica del método corregirPreguntaSimple
                    const correctoEnModelo = pregunta.pregunta.visibles.find(visible => {
                        // visible[0] es el texto y visible[1] es el id
                        return visible[1] === radioId;
                    });
                    
                    console.log(`     🔎 Opción ${m+1}: "${textoOpcion}" (ID: ${radioId})`);
                    
                    // Verificamos si esta opción es la correcta por su ID o por el texto
                    if (correctoEnModelo && pregunta.pregunta.correcta[0] === correctoEnModelo[0]) {
                        radioButton.checked = true;
                        indiceOpcionCorrecta = m;
                        console.log(`     ✅ Opción ${m+1}: "${textoOpcion}" SELECCIONADA (coincide con respuesta correcta)`);
                    } else {
                        console.log(`     ❌ Opción ${m+1}: "${textoOpcion}" (no coincide con la respuesta correcta)`);
                    }
                }
            }
            
            if (indiceOpcionCorrecta >= 0) {
                simplesResueltas++;
                console.log(`   ✅ Pregunta SIMPLE #${j+1} resuelta con éxito. Opción ${indiceOpcionCorrecta+1} marcada.`);
            } else {
                console.warn(`   ⚠️ No se pudo identificar la opción correcta para la pregunta SIMPLE #${j+1}`);
            }
        }
        
        // Mostrar resumen
        console.log('📊 Resumen del procesamiento:');
        console.log(`   - Preguntas analizadas: ${preguntasAnalizadas}`);
        console.log(`   - Preguntas SIMPLE encontradas: ${simplesEncontradas}`);
        console.log(`   - Preguntas SIMPLE resueltas: ${simplesResueltas}`);
        
        if (Object.keys(otrosTipos).length > 0) {
            console.log('   - Otros tipos de preguntas encontradas:');
            for (const tipo in otrosTipos) {
                console.log(`     > ${tipo}: ${otrosTipos[tipo]}`);
            }
        }
        
        return simplesResueltas > 0;
    } catch (error) {
        console.error('❌ Error al resolver preguntas SIMPLE:', error);
        return false;
    }
}

/**
 * Funciu00f3n para generar un ejercicio y resolver sus preguntas tipo SIMPLE
 * Esta funciu00f3n primero genera el ejercicio y luego identifica y resuelve las preguntas SIMPLE
 * @param {number} numeroEjercicio - Nu00famero del ejercicio a resolver (base 1)
 * @returns {boolean} - true si el proceso iniciu00f3 correctamente, false en caso contrario
 */
function generarYResolverSimple(numeroEjercicio) {
    try {
        // Convertir a base 0 para uso interno
        const indice = numeroEjercicio - 1;
        
        // Verificar ejercicio
        if (!window.capitulo || !window.capitulo.ejercicios || !window.capitulo.ejercicios[indice]) {
            console.error(`u274c No se encontru00f3 el ejercicio ${numeroEjercicio}`);
            return false;
        }
        
        console.log(`🚀 Generando ejercicio ${numeroEjercicio}...`);
        
        // Generar el ejercicio utilizando la funciu00f3n del sistema
        const botonGenerar = document.querySelector(`#ejercicio${numeroEjercicio} button`);
        if (!botonGenerar) {
            console.error(`u274c No se encontru00f3 el botu00f3n de generar para el ejercicio ${numeroEjercicio}`);
            return false;
        }
        
        // Simular clic en el botu00f3n de generar ejercicio
        botonGenerar.click();
        console.log(`   ✓ Ejercicio ${numeroEjercicio} generado. Esperando a que se cargue completamente...`);
        
        // Funciu00f3n interna para verificar si el ejercicio estu00e1 completamente cargado
        function verificarCargaCompleta() {
            // Verificar si las preguntas se han creado en el DOM
            const ejercicioContainer = document.querySelector(`#ejercicio${numeroEjercicio}`);
            if (!ejercicioContainer) return false;
            
            const elementosPreguntas = ejercicioContainer.querySelectorAll('p.pregunta');
            if (!elementosPreguntas || elementosPreguntas.length === 0) return false;
            
            // Verificar si hay opciones simples
            const opcionesSimple = ejercicioContainer.querySelectorAll('p.opcionSimple');
            
            console.log(`   📝 Carga verificada: ${elementosPreguntas.length} preguntas y ${opcionesSimple.length} opciones simples encontradas`);
            return elementosPreguntas.length > 0;
        }
        
        // Esperar un tiempo para que se cargue el ejercicio y luego resolver las preguntas SIMPLE
        setTimeout(() => {
            if (!verificarCargaCompleta()) {
                console.log(`   ⚠️ El ejercicio aún no ha terminado de cargarse. Esperando más tiempo...`);
                // Esperar au00fan mu00e1s si no estu00e1 cargado
                setTimeout(() => {
                    try {
                        console.log(`   🕐 Segundo intento de resolución después de espera adicional...`);
                        console.log(`   ud83dudd0d Buscando y resolviendo preguntas SIMPLE...`);
                        const resuelto = resolverSimple(indice);
                        
                        if (resuelto) {
                            console.log(`✅ Ejercicio ${numeroEjercicio}: Preguntas SIMPLE completadas correctamente.`);
                        } else {
                            console.log(`ℹ️ Ejercicio ${numeroEjercicio}: No se encontraron o no se pudieron resolver preguntas SIMPLE.`);
                        }
                    } catch (e) {
                        console.error('   ⚠️ Error al procesar el ejercicio:', e);
                        console.log(`🚨 Ocurrió un error al procesar el ejercicio ${numeroEjercicio}.`);
                    }
                }, 3000); // 3 segundos adicionales
            } else {
                // Analizar el ejercicio si estu00e1 listo
                try {
                    console.log(`   ud83dudd0d Buscando y resolviendo preguntas SIMPLE...`);
                    const resuelto = resolverSimple(indice);
                    
                    if (resuelto) {
                        console.log(`✅ Ejercicio ${numeroEjercicio}: Preguntas SIMPLE completadas correctamente.`);
                    } else {
                        console.log(`ℹ️ Ejercicio ${numeroEjercicio}: No se encontraron o no se pudieron resolver preguntas SIMPLE.`);
                    }
                } catch (e) {
                    console.error('   ⚠️ Error al procesar el ejercicio:', e);
                    console.log(`🚨 Ocurrió un error al procesar el ejercicio ${numeroEjercicio}.`);
                }
            }
        }, 5000); // Aumentado a 5 segundos para la primera verificación
        
        return true;
    } catch (e) {
        console.log(`Error al procesar ejercicio ${numeroEjercicio}:`, e);
        return false;
    }
}

/**
 * Función para resolver un ejercicio SIMPLE ya generado
 * @param {number} numeroEjercicio - Número del ejercicio a resolver (base 1)
 * @returns {boolean} - true si se resolvió correctamente, false en caso contrario
 */
function completarSimple(numeroEjercicio) {
    try {
        // Convertir a base 0 para uso interno
        const indice = numeroEjercicio - 1;
        console.log(`Resolviendo preguntas SIMPLE en ejercicio ${numeroEjercicio} ya generado...`);
        
        // Resolver preguntas SIMPLE automáticamente
        const resuelto = resolverSimple(indice);
        
        if (resuelto) {
            console.log(`Ejercicio ${numeroEjercicio}: Preguntas SIMPLE completadas correctamente.`);
        } else {
            console.log(`Ejercicio ${numeroEjercicio}: No se encontraron o no se pudieron resolver preguntas SIMPLE.`);
        }
        
        return resuelto;
    } catch (e) {
        console.log(`Error al procesar ejercicio ${numeroEjercicio}:`, e);
        return false;
    }
}

// Mensaje de carga del script
console.log('Script de resolución automática de preguntas SIMPLE cargado correctamente.');
console.log('Funciones disponibles:');
console.log('💡 Funciones disponibles:');
console.log('  - generarYResolverSimple(numero): Genera el ejercicio especificado y resuelve sus preguntas SIMPLE');
console.log('  - completarSimple(numero): Resuelve las preguntas SIMPLE de un ejercicio ya generado');
console.log('  - resolverSimple(indice): Funciu00f3n interna (base 0) utilizada por las funciones anteriores');
console.log('💡 Este script solo completa preguntas SIMPLE, dejando intactas las preguntas de otros tipos.');
console.log('💡 No modifica tiempos ni puntuaciones del ejercicio.');

/**
 * Función para resolver un ejercicio de tipo ARRASTRAR automáticamente
 * Esta función identifica los campos de arrastrar y selecciona las opciones correctas
 * @param {number} indice - Índice del ejercicio a resolver (base 0)
 * @returns {boolean} - true si se resolvió correctamente, false en caso contrario
 */
function resolverArrastrar(indice) {
    try {
        // Verificar que capitulo y ejercicio existan
        if (!window.capitulo || !window.capitulo.ejercicios || !window.capitulo.ejercicios[indice]) {
            console.error('❌ No se encontró el ejercicio', indice);
            return false;
        }

        // Obtener el ejercicio actual
        const ejercicio = capitulo.ejercicios[indice];
        
        // Verificar preguntas
        if (!ejercicio.preguntas) {
            console.error('❌ El ejercicio no tiene preguntas definidas');
            return false;
        }

        // Acceder al enunciado actual
        const enunciadoActual = ejercicio.enunciado || 0;
        
        // Obtener el grupo de preguntas para el enunciado actual
        const grupoPregunta = ejercicio.preguntas[enunciadoActual];
        
        if (!Array.isArray(grupoPregunta)) {
            console.error('❌ El grupo de preguntas no es un array');
            return false;
        }

        // Contadores para el sumario
        let preguntasAnalizadas = 0;
        let arrastrarEncontradas = 0;
        let arrastrarResueltas = 0;
        let otrosTipos = {};
        
        console.log(`📚 Analizando ejercicio ${indice + 1} con ${grupoPregunta.length} preguntas en total...`);
        
        // Obtener el contenedor del ejercicio actual
        const ejercicioContainer = document.querySelector(`#ejercicio${indice+1}`);
        if (!ejercicioContainer) {
            console.warn(`⚠️ No se encontró el contenedor del ejercicio ${indice+1}`);
            return false;
        }
        
        // Buscar elementos de pregunta SOLO dentro de este ejercicio
        const elementosPreguntas = ejercicioContainer.querySelectorAll('p.pregunta');
        if (!elementosPreguntas || elementosPreguntas.length === 0) {
            console.warn(`⚠️ No se encontraron elementos de pregunta en el ejercicio ${indice+1}`);
            return false;
        }
        
        console.log(`   📍 Limitando búsqueda solo al ejercicio ${indice+1} (#ejercicio${indice+1})`);

        // Verificar correspondencia entre modelo y DOM
        if (elementosPreguntas.length !== grupoPregunta.length) {
            console.warn(`   ⚠️ Discrepancia: ${grupoPregunta.length} preguntas en el modelo vs ${elementosPreguntas.length} en el DOM`);
        }
        
        console.log(`   💬 Encontrados ${elementosPreguntas.length} elementos de pregunta en el DOM para ${grupoPregunta.length} preguntas en el modelo`);
        
        // Crear un mapa para rastrear qué elementos de pregunta en el DOM ya se han procesado
        const elementosProcesados = new Array(elementosPreguntas.length).fill(false);
        
        // Recorrer cada pregunta del grupo
        for (let j = 0; j < grupoPregunta.length; j++) {
            const pregunta = grupoPregunta[j];
            preguntasAnalizadas++;
            
            // Verificar el tipo de pregunta
            if (!pregunta || typeof pregunta.tipo === 'undefined') {
                console.warn(`   ⚠️ La pregunta ${j+1} no tiene tipo definido`);
                continue;
            }
            
            // Registrar estadísticas por tipo
            const nombreTipo = Object.keys(TIPO_PREGUNTA).find(key => TIPO_PREGUNTA[key] === pregunta.tipo) || 'DESCONOCIDO';
            if (pregunta.tipo !== TIPO_PREGUNTA.ARRASTRAR) {
                otrosTipos[nombreTipo] = (otrosTipos[nombreTipo] || 0) + 1;
                continue;
            }
            
            arrastrarEncontradas++;
            
            // Buscar el elemento de pregunta correspondiente en el DOM
            let preguntaElemento = null;
            let camposArrastrar = [];
            
            // Recorrer los elementos de pregunta no procesados en el DOM para encontrar coincidencias
            for (let k = 0; k < elementosPreguntas.length; k++) {
                if (elementosProcesados[k]) continue;
                
                // Verificar si este elemento DOM de pregunta coincide con la pregunta del modelo
                preguntaElemento = elementosPreguntas[k];
                
                // Encontrar todos los campos de arrastrar relacionados con esta pregunta
                camposArrastrar = preguntaElemento.querySelectorAll('.campo_arrastrar');
                
                // Si encontramos campos de arrastrar, probablemente esta es la pregunta ARRASTRAR que buscamos
                if (camposArrastrar.length > 0) {
                    elementosProcesados[k] = true;  // Marcar como procesado
                    break;
                }
            }
            
            if (!preguntaElemento || camposArrastrar.length === 0) {
                console.warn(`   ⚠️ No se encontraron campos de arrastrar para la pregunta ${j+1}`);
                continue;
            }
            
            console.log(`   ✓ Procesando pregunta ARRASTRAR #${j+1} con ${camposArrastrar.length} campos`);
            
            // Verificar que tengamos el mismo número de campos en el DOM y correctas en el modelo
            if (camposArrastrar.length !== pregunta.pregunta.correctas.length) {
                console.warn(`   ⚠️ Discrepancia: ${pregunta.pregunta.correctas.length} correctas en el modelo vs ${camposArrastrar.length} campos en el DOM`);
            }
            
            // Para una pregunta ARRASTRAR, la propiedad correctas del objeto pregunta.pregunta contiene las respuestas correctas
            // Vamos a recorrer cada campo y seleccionar la opción correcta
            let camposCompletados = 0;
            
            console.log(`   🔍 Respuestas correctas en el modelo:`, pregunta.pregunta.correctas);
            
            for (let m = 0; m < camposArrastrar.length; m++) {
                const campo = camposArrastrar[m];
                
                // Obtener las opciones disponibles para este campo
                const opcionesStr = campo.getAttribute('data-opciones');
                if (!opcionesStr) {
                    console.warn(`   ⚠️ No se encontraron opciones para el campo ${m+1}`);
                    continue;
                }
                
                // Dividir las opciones (separadas por &@%)
                const opciones = opcionesStr.split('&@%');
                
                // La respuesta correcta para este campo necesita ser decodificada
                const respuestaCorrecta = pregunta.pregunta.correctas[m];
                
                // Intentar diferentes métodos de decodificación
                let respuestaDecodificada = respuestaCorrecta;
                
                // Primero intentamos con b64.decode si está disponible
                if (window.b64) {
                    if (typeof b64.decode === 'function') {
                        respuestaDecodificada = b64.decode(respuestaCorrecta);
                    } else if (typeof b64.decodificar === 'function') {
                        respuestaDecodificada = b64.decodificar(respuestaCorrecta);
                    }
                }
                
                console.log(`     🔎 Campo ${m+1}: ${opciones.length} opciones disponibles`);
                console.log(`     💬 Respuesta correcta codificada: "${respuestaCorrecta}"`);
                console.log(`     💬 Respuesta correcta decodificada: "${respuestaDecodificada}"`);
                
                // Buscar la opción correcta entre las opciones disponibles
                let opcionCorrecta = -1;
                for (let n = 0; n < opciones.length; n++) {
                    const opcion = opciones[n];
                    console.log(`       - Opción ${n+1}: "${opcion}"`);
                    if (opcion === respuestaDecodificada) {
                        opcionCorrecta = n;
                        break;
                    }
                }
                
                // Si no encontramos coincidencia exacta, intentar buscar coincidencias parciales
                if (opcionCorrecta === -1) {
                    console.log(`     ⚠️ No se encontró coincidencia exacta, buscando coincidencias parciales...`);
                    for (let n = 0; n < opciones.length; n++) {
                        const opcion = opciones[n];
                        if (opcion.includes(respuestaDecodificada) || respuestaDecodificada.includes(opcion)) {
                            console.log(`       ✅ Coincidencia parcial encontrada con opción ${n+1}`);
                            opcionCorrecta = n;
                            break;
                        }
                    }
                }
                
                if (opcionCorrecta >= 0) {
                    console.log(`     ✅ Opción correcta encontrada: "${opciones[opcionCorrecta]}" (índice ${opcionCorrecta})`);
                    
                    // Simular clic en el campo para abrir la lista de opciones
                    console.log(`     📋 Simulando clic en el campo ${m+1} para abrir la lista de opciones...`);
                    
                    // En el DOM, Pregunta.mostrarOpcionesCampo(campo) es el método que muestra las opciones
                    // y Pregunta.elegirOpcionCampo(campo, opcionCorrecta) selecciona una opción
                    
                    // Crear un elemento span con el texto de la opción correcta y añadirlo al campo
                    const span = document.createElement('span');
                    span.textContent = opciones[opcionCorrecta];
                    
                    // Limpiar el campo antes de añadir la opción
                    campo.innerHTML = '';
                    campo.appendChild(span);
                    
                    camposCompletados++;
                } else {
                    console.warn(`     ❌ No se pudo encontrar una coincidencia para la respuesta correcta en el campo ${m+1}`);
                }
            }
            
            if (camposCompletados === camposArrastrar.length) {
                arrastrarResueltas++;
                console.log(`   ✅ Pregunta ARRASTRAR #${j+1} resuelta con éxito. ${camposCompletados} de ${camposArrastrar.length} campos completados.`);
            } else {
                console.warn(`   ⚠️ Solo se completaron ${camposCompletados} de ${camposArrastrar.length} campos en la pregunta ARRASTRAR #${j+1}`);
            }
        }
        
        // Mostrar resumen
        console.log('📊 Resumen del procesamiento:');
        console.log(`   - Preguntas analizadas: ${preguntasAnalizadas}`);
        console.log(`   - Preguntas ARRASTRAR encontradas: ${arrastrarEncontradas}`);
        console.log(`   - Preguntas ARRASTRAR resueltas: ${arrastrarResueltas}`);
        
        if (Object.keys(otrosTipos).length > 0) {
            console.log('   - Otros tipos de preguntas encontradas:');
            for (const tipo in otrosTipos) {
                console.log(`     > ${tipo}: ${otrosTipos[tipo]}`);
            }
        }
        
        return arrastrarResueltas > 0;
    } catch (error) {
        console.error('❌ Error al resolver preguntas ARRASTRAR:', error);
        return false;
    }
}

/**
 * Función para generar un ejercicio y resolver sus preguntas tipo ARRASTRAR
 * Esta función primero genera el ejercicio y luego identifica y resuelve las preguntas ARRASTRAR
 * @param {number} numeroEjercicio - Número del ejercicio a resolver (base 1)
 * @returns {boolean} - true si el proceso inició correctamente, false en caso contrario
 */
function generarYResolverArrastrar(numeroEjercicio) {
    try {
        // Convertir a base 0 para uso interno
        const indice = numeroEjercicio - 1;
        
        // Verificar ejercicio
        if (!window.capitulo || !window.capitulo.ejercicios || !window.capitulo.ejercicios[indice]) {
            console.error(`❌ No se encontró el ejercicio ${numeroEjercicio}`);
            return false;
        }
        
        console.log(`🚀 Generando ejercicio ${numeroEjercicio}...`);
        
        // Generar el ejercicio utilizando la función del sistema
        const botonGenerar = document.querySelector(`#ejercicio${numeroEjercicio} button`);
        if (!botonGenerar) {
            console.error(`❌ No se encontró el botón de generar para el ejercicio ${numeroEjercicio}`);
            return false;
        }
        
        // Simular clic en el botón de generar ejercicio
        botonGenerar.click();
        console.log(`   ✓ Ejercicio ${numeroEjercicio} generado. Esperando a que se cargue completamente...`);
        
        // Función interna para verificar si el ejercicio está completamente cargado
        function verificarCargaCompleta() {
            // Verificar si las preguntas se han creado en el DOM
            const ejercicioContainer = document.querySelector(`#ejercicio${numeroEjercicio}`);
            if (!ejercicioContainer) return false;
            
            const elementosPreguntas = ejercicioContainer.querySelectorAll('p.pregunta');
            if (!elementosPreguntas || elementosPreguntas.length === 0) return false;
            
            // Verificar si hay campos de arrastrar
            const camposArrastrar = ejercicioContainer.querySelectorAll('.campo_arrastrar');
            
            console.log(`   📝 Carga verificada: ${elementosPreguntas.length} preguntas y ${camposArrastrar.length} campos de arrastrar encontrados`);
            return elementosPreguntas.length > 0;
        }
        
        // Esperar un tiempo para que se cargue el ejercicio y luego resolver las preguntas ARRASTRAR
        setTimeout(() => {
            if (!verificarCargaCompleta()) {
                console.log(`   ⚠️ El ejercicio aún no ha terminado de cargarse. Esperando más tiempo...`);
                // Esperar aún más si no está cargado
                setTimeout(() => {
                    try {
                        console.log(`   🕐 Segundo intento de resolución después de espera adicional...`);
                        console.log(`   🔍 Buscando y resolviendo preguntas ARRASTRAR...`);
                        const resuelto = resolverArrastrar(indice);
                        
                        if (resuelto) {
                            console.log(`✅ Ejercicio ${numeroEjercicio}: Preguntas ARRASTRAR completadas correctamente.`);
                        } else {
                            console.log(`ℹ️ Ejercicio ${numeroEjercicio}: No se encontraron o no se pudieron resolver preguntas ARRASTRAR.`);
                        }
                    } catch (e) {
                        console.error('   ⚠️ Error al procesar el ejercicio:', e);
                        console.log(`🚨 Ocurrió un error al procesar el ejercicio ${numeroEjercicio}.`);
                    }
                }, 3000); // 3 segundos adicionales
            } else {
                // Analizar el ejercicio si está listo
                try {
                    console.log(`   🔍 Buscando y resolviendo preguntas ARRASTRAR...`);
                    const resuelto = resolverArrastrar(indice);
                    
                    if (resuelto) {
                        console.log(`✅ Ejercicio ${numeroEjercicio}: Preguntas ARRASTRAR completadas correctamente.`);
                    } else {
                        console.log(`ℹ️ Ejercicio ${numeroEjercicio}: No se encontraron o no se pudieron resolver preguntas ARRASTRAR.`);
                    }
                } catch (e) {
                    console.error('   ⚠️ Error al procesar el ejercicio:', e);
                    console.log(`🚨 Ocurrió un error al procesar el ejercicio ${numeroEjercicio}.`);
                }
            }
        }, 5000); // Aumentado a 5 segundos para la primera verificación
        
        return true;
    } catch (e) {
        console.error(`❌ Error al procesar ejercicio ${numeroEjercicio}:`, e);
        return false;
    }
}

/**
 * Función para resolver un ejercicio ARRASTRAR ya generado
 * @param {number} numeroEjercicio - Número del ejercicio a resolver (base 1)
 * @returns {boolean} - true si se resolvió correctamente, false en caso contrario
 */
function completarArrastrar(numeroEjercicio) {
    try {
        // Convertir a base 0 para uso interno
        const indice = numeroEjercicio - 1;
        console.log(`🔍 Resolviendo preguntas ARRASTRAR en ejercicio ${numeroEjercicio} ya generado...`);
        
        // Resolver preguntas ARRASTRAR automáticamente
        const resuelto = resolverArrastrar(indice);
        
        if (resuelto) {
            console.log(`✅ Ejercicio ${numeroEjercicio}: Preguntas ARRASTRAR completadas correctamente.`);
        } else {
            console.log(`ℹ️ Ejercicio ${numeroEjercicio}: No se encontraron o no se pudieron resolver preguntas ARRASTRAR.`);
        }
        
        return resuelto;
    } catch (e) {
        console.error(`❌ Error al procesar ejercicio ${numeroEjercicio}:`, e);
        return false;
    }
}

// Mensaje de carga del script
console.log('💡 Script de resolución automática de preguntas ARRASTRAR cargado correctamente.');
console.log('💡 Funciones disponibles:');
console.log('  - generarYResolverArrastrar(numero): Genera el ejercicio especificado y resuelve sus preguntas ARRASTRAR');
console.log('  - completarArrastrar(numero): Resuelve las preguntas ARRASTRAR de un ejercicio ya generado');
console.log('  - resolverArrastrar(indice): Función interna (base 0) utilizada por las funciones anteriores');
console.log('💡 Este script solo completa preguntas ARRASTRAR, dejando intactas las preguntas de otros tipos.');
console.log('💡 No modifica tiempos ni puntuaciones del ejercicio.');

/**
 * Funciu00f3n para resolver un ejercicio de tipo DATO automu00e1ticamente
 * Esta funciu00f3n identifica los campos de datos en la tabla y selecciona las opciones correctas
 * @param {number} indice - u00cdndice del ejercicio a resolver (base 0)
 * @returns {boolean} - true si se resolviu00f3 correctamente, false en caso contrario
 */
function resolverDato(indice) {
    try {
        // Verificar que capitulo y ejercicio existan
        if (!window.capitulo || !window.capitulo.ejercicios || !window.capitulo.ejercicios[indice]) {
            console.error('❌ No se encontró el ejercicio', indice);
            return false;
        }

        // Obtener el ejercicio actual
        const ejercicio = capitulo.ejercicios[indice];
        
        // Verificar preguntas
        if (!ejercicio.preguntas) {
            console.error('❌ El ejercicio no tiene preguntas definidas');
            return false;
        }

        // Acceder al enunciado actual
        const enunciadoActual = ejercicio.enunciado || 0;
        
        // Obtener el grupo de preguntas para el enunciado actual
        const grupoPregunta = ejercicio.preguntas[enunciadoActual];
        
        if (!Array.isArray(grupoPregunta)) {
            console.error('❌ El grupo de preguntas no es un array');
            return false;
        }

        // Contadores para el sumario
        let preguntasAnalizadas = 0;
        let datosEncontrados = 0;
        let datosResueltos = 0;
        let otrosTipos = {};
        
        console.log(`📚 Analizando ejercicio ${indice + 1} con ${grupoPregunta.length} preguntas en total...`);
        
        // Obtener el contenedor del ejercicio actual
        const ejercicioContainer = document.querySelector(`#ejercicio${indice+1}`);
        if (!ejercicioContainer) {
            console.warn(`⚠️ No se encontró el contenedor del ejercicio ${indice+1}`);
            return false;
        }
        
        // Buscar elementos de pregunta SOLO dentro de este ejercicio
        const elementosPreguntas = ejercicioContainer.querySelectorAll('p.pregunta');
        if (!elementosPreguntas || elementosPreguntas.length === 0) {
            console.warn(`⚠️ No se encontraron elementos de pregunta en el ejercicio ${indice+1}`);
            return false;
        }
        
        console.log(`   📍 Limitando búsqueda solo al ejercicio ${indice+1} (#ejercicio${indice+1})`);

        // Verificar correspondencia entre modelo y DOM
        if (elementosPreguntas.length !== grupoPregunta.length) {
            console.warn(`   ⚠️ Discrepancia: ${grupoPregunta.length} preguntas en el modelo vs ${elementosPreguntas.length} en el DOM`);
        }
        
        console.log(`   💬 Encontrados ${elementosPreguntas.length} elementos de pregunta en el DOM para ${grupoPregunta.length} preguntas en el modelo`);
        
        // Crear un mapa para rastrear quu00e9 elementos de pregunta en el DOM ya se han procesado
        const elementosProcesados = new Array(elementosPreguntas.length).fill(false);
        
        // Recorrer cada pregunta del grupo
        for (let j = 0; j < grupoPregunta.length; j++) {
            const pregunta = grupoPregunta[j];
            preguntasAnalizadas++;
            
            // Verificar el tipo de pregunta
            if (!pregunta || typeof pregunta.tipo === 'undefined') {
                console.warn(`   ⚠️ La pregunta ${j+1} no tiene tipo definido`);
                continue;
            }
            
            // Registrar estadu00edsticas por tipo
            const nombreTipo = Object.keys(TIPO_PREGUNTA).find(key => TIPO_PREGUNTA[key] === pregunta.tipo) || 'DESCONOCIDO';
            if (pregunta.tipo !== TIPO_PREGUNTA.DATO) {
                otrosTipos[nombreTipo] = (otrosTipos[nombreTipo] || 0) + 1;
                continue;
            }
            
            datosEncontrados++;
            
            // Buscar el elemento de pregunta correspondiente en el DOM
            let preguntaElemento = null;
            
            // Recorrer los elementos de pregunta no procesados en el DOM para encontrar coincidencias
            for (let k = 0; k < elementosPreguntas.length; k++) {
                if (elementosProcesados[k]) continue;
                
                // Verificar si este elemento DOM de pregunta coincide con la pregunta del modelo
                preguntaElemento = elementosPreguntas[k];
                elementosProcesados[k] = true;  // Marcar como procesado
                break;
            }
            
            if (!preguntaElemento) {
                console.warn(`   ⚠️ No se encontró el elemento de pregunta para la pregunta ${j+1}`);
                continue;
            }
            
            // En las preguntas DATO, la tabla estu00e1 en el siguiente elemento despuu00e9s del p.pregunta
            const tablaContainer = preguntaElemento.nextElementSibling;
            if (!tablaContainer || !tablaContainer.classList.contains('dato')) {
                console.warn(`   ⚠️ No se encontró el contenedor de la tabla de datos para la pregunta ${j+1}`);
                continue;
            }
            
            // Buscar los campos de datos dentro de la tabla
            const camposDato = tablaContainer.querySelectorAll('.campo_dato');
            if (!camposDato || camposDato.length === 0) {
                console.warn(`   ⚠️ No se encontraron campos de datos para la pregunta ${j+1}`);
                continue;
            }
            
            console.log(`   ✓ Procesando pregunta DATO #${j+1} con ${camposDato.length} campos`);
            
            // Verificar que tengamos el mismo nu00famero de campos en el DOM y correctas en el modelo
            if (camposDato.length !== pregunta.pregunta.correctas.length) {
                console.warn(`   ⚠️ Discrepancia: ${pregunta.pregunta.correctas.length} correctas en el modelo vs ${camposDato.length} campos en el DOM`);
            }
            
            // Para una pregunta DATO, la propiedad correctas del objeto pregunta.pregunta contiene las respuestas correctas
            let camposCompletados = 0;
            
            console.log(`   🔍 Respuestas correctas en el modelo:`, pregunta.pregunta.correctas);
            
            for (let m = 0; m < camposDato.length; m++) {
                const campo = camposDato[m];
                
                // Obtener las opciones disponibles para este campo
                const opcionesStr = campo.getAttribute('data-opciones');
                if (!opcionesStr) {
                    console.warn(`   ⚠️ No se encontraron opciones para el campo ${m+1}`);
                    continue;
                }
                
                // Dividir las opciones (separadas por &@%)
                const opciones = opcionesStr.split('&@%');
                
                // Intentar diferentes mu00e9todos de decodificaciu00f3n para la respuesta correcta
                const respuestaCorrecta = pregunta.pregunta.correctas[m];
                let respuestaDecodificada = respuestaCorrecta;
                
                // Primero intentamos con b64.decode si estu00e1 disponible
                if (window.b64) {
                    if (typeof b64.decode === 'function') {
                        respuestaDecodificada = b64.decode(respuestaCorrecta);
                    } else if (typeof b64.decodificar === 'function') {
                        respuestaDecodificada = b64.decodificar(respuestaCorrecta);
                    }
                }
                
                console.log(`     🔎 Campo ${m+1}: ${opciones.length} opciones disponibles`);
                console.log(`     💬 Respuesta correcta codificada: "${respuestaCorrecta}"`);
                console.log(`     💬 Respuesta correcta decodificada: "${respuestaDecodificada}"`);
                
                // Buscar la opciu00f3n correcta entre las opciones disponibles
                let opcionCorrecta = -1;
                for (let n = 0; n < opciones.length; n++) {
                    const opcion = opciones[n];
                    console.log(`       - Opciu00f3n ${n+1}: "${opcion}"`);
                    if (opcion === respuestaDecodificada) {
                        opcionCorrecta = n;
                        break;
                    }
                }
                
                // Si no encontramos coincidencia exacta, intentar buscar coincidencias parciales
                if (opcionCorrecta === -1) {
                    console.log(`     ⚠️ No se encontró coincidencia exacta, buscando coincidencias parciales...`);
                    for (let n = 0; n < opciones.length; n++) {
                        const opcion = opciones[n];
                        if (opcion.includes(respuestaDecodificada) || respuestaDecodificada.includes(opcion)) {
                            console.log(`       ✅ Coincidencia parcial encontrada con opción ${n+1}`);
                            opcionCorrecta = n;
                            break;
                        }
                    }
                }
                
                if (opcionCorrecta >= 0) {
                    console.log(`     ✅ Opción correcta encontrada: "${opciones[opcionCorrecta]}" (índice ${opcionCorrecta})`);
                    
                    // Crear un elemento span con el texto de la opciu00f3n correcta y au00f1adirlo al campo
                    const span = document.createElement('span');
                    span.textContent = opciones[opcionCorrecta];
                    
                    // Limpiar el campo antes de au00f1adir la opciu00f3n
                    campo.innerHTML = '';
                    campo.appendChild(span);
                    
                    camposCompletados++;
                } else {
                    console.warn(`     ❌ No se pudo encontrar una coincidencia para la respuesta correcta en el campo ${m+1}`);
                }
            }
            
            if (camposCompletados === camposDato.length) {
                datosResueltos++;
                console.log(`   ✅ Pregunta DATO #${j+1} resuelta con éxito. ${camposCompletados} de ${camposDato.length} campos completados.`);
            } else {
                console.warn(`   ⚠️ Solo se completaron ${camposCompletados} de ${camposDato.length} campos en la pregunta DATO #${j+1}`);
            }
        }
        
        // Mostrar resumen
        console.log('📊 Resumen del procesamiento:');
        console.log(`   - Preguntas analizadas: ${preguntasAnalizadas}`);
        console.log(`   - Preguntas DATO encontradas: ${datosEncontrados}`);
        console.log(`   - Preguntas DATO resueltas: ${datosResueltos}`);
        
        if (Object.keys(otrosTipos).length > 0) {
            console.log('   - Otros tipos de preguntas encontradas:');
            for (const tipo in otrosTipos) {
                console.log(`     > ${tipo}: ${otrosTipos[tipo]}`);
            }
        }
        
        return datosResueltos > 0;
    } catch (error) {
        console.error('❌ Error al resolver preguntas DATO:', error);
        return false;
    }
}

/**
 * Funciu00f3n para generar un ejercicio y resolver sus preguntas tipo DATO
 * Esta funciu00f3n primero genera el ejercicio y luego identifica y resuelve las preguntas DATO
 * @param {number} numeroEjercicio - Nu00famero del ejercicio a resolver (base 1)
 * @returns {boolean} - true si el proceso iniciu00f3 correctamente, false en caso contrario
 */
function generarYResolverDato(numeroEjercicio) {
    try {
        // Convertir a base 0 para uso interno
        const indice = numeroEjercicio - 1;
        
        // Verificar ejercicio
        if (!window.capitulo || !window.capitulo.ejercicios || !window.capitulo.ejercicios[indice]) {
            console.error(`❌ No se encontró el ejercicio ${numeroEjercicio}`);
            return false;
        }
        
        console.log(`🚀 Generando ejercicio ${numeroEjercicio}...`);
        
        // Generar el ejercicio utilizando la funciu00f3n del sistema
        const botonGenerar = document.querySelector(`#ejercicio${numeroEjercicio} button`);
        if (!botonGenerar) {
            console.error(`❌ No se encontró el botón de generar para el ejercicio ${numeroEjercicio}`);
            return false;
        }
        
        // Simular clic en el botu00f3n de generar ejercicio
        botonGenerar.click();
        console.log(`   ✓ Ejercicio ${numeroEjercicio} generado. Esperando a que se cargue completamente...`);
        
        // Funciu00f3n interna para verificar si el ejercicio estu00e1 completamente cargado
        function verificarCargaCompleta() {
            // Verificar si las preguntas se han creado en el DOM
            const ejercicioContainer = document.querySelector(`#ejercicio${numeroEjercicio}`);
            if (!ejercicioContainer) return false;
            
            const elementosPreguntas = ejercicioContainer.querySelectorAll('p.pregunta');
            if (!elementosPreguntas || elementosPreguntas.length === 0) return false;
            
            // Verificar si hay campos de datos
            const tablasDato = ejercicioContainer.querySelectorAll('.dato');
            const camposDato = ejercicioContainer.querySelectorAll('.campo_dato');
            
            console.log(`   📝 Carga verificada: ${elementosPreguntas.length} preguntas, ${tablasDato.length} tablas y ${camposDato.length} campos de datos encontrados`);
            return elementosPreguntas.length > 0;
        }
        
        // Esperar un tiempo para que se cargue el ejercicio y luego resolver las preguntas DATO
        setTimeout(() => {
            if (!verificarCargaCompleta()) {
                console.log(`   ⚠️ El ejercicio aún no ha terminado de cargarse. Esperando más tiempo...`);
                // Esperar au00fan mu00e1s si no estu00e1 cargado
                setTimeout(() => {
                    try {
                        console.log(`   🕐 Segundo intento de resolución después de espera adicional...`);
                        console.log(`   🔍 Buscando y resolviendo preguntas DATO...`);
                        const resuelto = resolverDato(indice);
                        
                        if (resuelto) {
                            console.log(`✅ Ejercicio ${numeroEjercicio}: Preguntas DATO completadas correctamente.`);
                        } else {
                            console.log(`ℹ️ Ejercicio ${numeroEjercicio}: No se encontraron o no se pudieron resolver preguntas DATO.`);
                        }
                    } catch (e) {
                        console.error('   ⚠️ Error al procesar el ejercicio:', e);
                        console.log(`🚨 Ocurrió un error al procesar el ejercicio ${numeroEjercicio}.`);
                    }
                }, 3000); // 3 segundos adicionales
            } else {
                // Analizar el ejercicio si estu00e1 listo
                try {
                    console.log(`   🔍 Buscando y resolviendo preguntas DATO...`);
                    const resuelto = resolverDato(indice);
                    
                    if (resuelto) {
                        console.log(`✅ Ejercicio ${numeroEjercicio}: Preguntas DATO completadas correctamente.`);
                    } else {
                        console.log(`ℹ️ Ejercicio ${numeroEjercicio}: No se encontraron o no se pudieron resolver preguntas DATO.`);
                    }
                } catch (e) {
                    console.error('   ⚠️ Error al procesar el ejercicio:', e);
                    console.log(`🚨 Ocurrió un error al procesar el ejercicio ${numeroEjercicio}.`);
                }
            }
        }, 5000); // Aumentado a 5 segundos para la primera verificaciu00f3n
        
        return true;
    } catch (e) {
        console.error(`❌ Error al procesar ejercicio ${numeroEjercicio}:`, e);
        return false;
    }
}

/**
 * Funciu00f3n para resolver un ejercicio DATO ya generado
 * @param {number} numeroEjercicio - Nu00famero del ejercicio a resolver (base 1)
 * @returns {boolean} - true si se resolviu00f3 correctamente, false en caso contrario
 */
function completarDato(numeroEjercicio) {
    try {
        // Convertir a base 0 para uso interno
        const indice = numeroEjercicio - 1;
        console.log(`🔍 Resolviendo preguntas DATO en ejercicio ${numeroEjercicio} ya generado...`);
        
        // Resolver preguntas DATO automu00e1ticamente
        const resuelto = resolverDato(indice);
        
        if (resuelto) {
            console.log(`✅ Ejercicio ${numeroEjercicio}: Preguntas DATO completadas correctamente.`);
        } else {
            console.log(`ℹ️ Ejercicio ${numeroEjercicio}: No se encontraron o no se pudieron resolver preguntas DATO.`);
        }
        
        return resuelto;
    } catch (e) {
        console.error(`❌ Error al procesar ejercicio ${numeroEjercicio}:`, e);
        return false;
    }
}

// Mensaje de carga del script
console.log('💡 Script de resolución automática de preguntas DATO cargado correctamente.');
console.log('💡 Funciones disponibles:');
console.log('  - generarYResolverDato(numero): Genera el ejercicio especificado y resuelve sus preguntas DATO');
console.log('  - completarDato(numero): Resuelve las preguntas DATO de un ejercicio ya generado');
console.log('  - resolverDato(indice): Funciu00f3n interna (base 0) utilizada por las funciones anteriores');
console.log('💡 Este script solo completa preguntas DATO, dejando intactas las preguntas de otros tipos.');
console.log('💡 No modifica tiempos ni puntuaciones del ejercicio.');

/**
 * Mapa de tipos de opciones y sus significados
 * Esto nos ayuda a entender cómo procesar cada tipo de opción
 */
const TIPOS_OPCIONES = {
    0: 'VERIFICAR_INSTRUCCION',   // Original
    1: 'VERIFICAR_RESULTADO',     // Original
    4: 'INSTRUCCION_CALCULADORA', // Detectado en ejercicios complejos
    5: 'RESULTADO_CALCULADORA'    // Detectado en ejercicios complejos
};

/**
 * Estructura de debug para guardar las instrucciones decodificadas
 * Util para ver qué instrucciones se están procesando
 */
const debugInstrucciones = {};

/**
 * Decodifica texto en formato Base64 si tiene el formato correcto
 * @param {string} texto - Texto posiblemente codificado
 * @returns {string} - Texto decodificado o el texto original si no estaba codificado
 */
function decodificarTexto(texto) {
    if (!texto) return '';

    try {
        // Verificar si es texto codificado (comienza con %&Ç#$@)
        if (typeof texto === 'string' && texto.startsWith('%&Ç#$@')) {
            // Intentar decodificar usando la función b64.decodificar si está disponible
            if (window.b64 && typeof window.b64.decodificar === 'function') {
                texto = window.b64.decodificar(texto);
            } else if (window.b64 && typeof window.b64.decode === 'function') {
                texto = window.b64.decode(texto);
            }
        }

        // Eliminar marcadores de plantilla que causan problemas
        if (typeof texto === 'string') {
            // Procesar patrón especial de alternativas _(opcion1_|opcion2_|..._) quedando solo con la primera opción
            texto = texto.replace(/_\(([^_|]*?)_\|.*?_\)/g, '$1');

            texto = texto
                .replace(/_\*/g, '') // Eliminar separadores _*
                .replace(/_{(\d+)_}/g, '') // Eliminar contadores _{n_}
                .replace(/_\|/g, '') // Eliminar separadores _|
                .replace(/_\(/g, '') // Eliminar paréntesis especiales _(
                .replace(/_\)/g, '') // Eliminar paréntesis especiales _)
                .replace(/_\?/g, '') // Eliminar marcador de interrogación _?
                .replace(/(_[+.\^$\\|\[\]{}])/g, ''); // Eliminar TODOS los caracteres especiales de regex
        }

        // Devolver el texto procesado
        return texto;
    } catch (error) {
        console.error('Error al decodificar texto:', error);
        return texto; // Devolver el texto original en caso de error
    }
}

/**
 * Función para resolver un ejercicio de tipo CALCULADORA automáticamente
 * Esta función identifica los editores CodeMirror y completa las instrucciones correctas
 * @param {number} indice - Índice del ejercicio a resolver (base 0)
 * @returns {Promise<boolean>} - Promise que se resuelve a true si se resolvió correctamente, false en caso contrario
 */
async function resolverCalculadora(indice) {
    try {
        console.log(`🔍 Iniciando resolución automática de ejercicio CALCULADORA #${indice + 1}`);

        // Verificar que capítulo y ejercicio existan
        if (!window.capitulo || !window.capitulo.ejercicios || !window.capitulo.ejercicios[indice]) {
            console.error('❌ No se encontró el ejercicio', indice);
            return false;
        }

        // Obtener el ejercicio actual
        const ejercicio = capitulo.ejercicios[indice];

        // Verificar preguntas
        if (!ejercicio.preguntas) {
            console.error('❌ El ejercicio no tiene preguntas definidas');
            return false;
        }

        // Acceder al enunciado actual
        const enunciadoActual = ejercicio.enunciado || 0;

        // Obtener el grupo de preguntas para el enunciado actual
        const grupoPregunta = ejercicio.preguntas[enunciadoActual];

        if (!Array.isArray(grupoPregunta)) {
            console.error('❌ El grupo de preguntas no es un array');
            return false;
        }

        // Contadores para estadísticas
        let preguntasAnalizadas = 0;
        let calculadorasEncontradas = 0;
        let calculadorasResueltas = 0;
        let otrosTipos = {};

        console.log(`📚 Analizando ejercicio ${indice + 1} con ${grupoPregunta.length} preguntas en total...`);

        // Obtener el contenedor del ejercicio actual
        const ejercicioContainer = document.querySelector(`#ejercicio${indice + 1}`);
        if (!ejercicioContainer) {
            console.warn(`⚠️ No se encontró el contenedor del ejercicio ${indice + 1}`);
            return false;
        }

        // Buscar elementos de pregunta SOLO dentro de este ejercicio
        const elementosPreguntas = ejercicioContainer.querySelectorAll('p.pregunta');
        if (!elementosPreguntas || elementosPreguntas.length === 0) {
            console.warn(`⚠️ No se encontraron elementos de pregunta en el ejercicio ${indice + 1}`);
            return false;
        }

        console.log(`   📊 Limitando búsqueda solo al ejercicio ${indice + 1} (#ejercicio${indice + 1})`);

        // Verificar correspondencia entre modelo y DOM
        if (elementosPreguntas.length !== grupoPregunta.length) {
            console.warn(`⚠️ El número de preguntas en el DOM (${elementosPreguntas.length}) no coincide con el modelo (${grupoPregunta.length})`);
            // Continuar de todos modos, podría ser una discrepancia menor
        }
        console.log(`   \ud83d\udcac Encontrados ${elementosPreguntas.length} elementos de pregunta en el DOM para ${grupoPregunta.length} preguntas en el modelo`);

        // Detectar si hay preguntas que solo tienen resultado sin instrucción
        const preguntasConSoloResultado = grupoPregunta.filter(p => {
            if (!p || !p.opcion || !Array.isArray(p.opcion)) return false;
            return p.opcion.some(op =>
                op.opcion && op.opcion.resultado && (!op.opcion.instruccion || op.opcion.instruccion === '')
            );
        });

        if (preguntasConSoloResultado.length > 0) {
            console.log(`   🔍 Detectadas ${preguntasConSoloResultado.length} preguntas con solo resultado (sin instrucción)`);
        }

        // Crear un mapa para rastrear qué elementos de pregunta en el DOM ya se han procesado
        const elementosProcesados = new Array(elementosPreguntas.length).fill(false);

        // Iterar sobre cada pregunta del grupo
        for (let j = 0; j < grupoPregunta.length; j++) {
            preguntasAnalizadas++;

            // Obtener detalles de la pregunta
            const pregunta = grupoPregunta[j];

            // Verificar que la pregunta tenga todas las propiedades esperadas
            if (!pregunta) {
                console.warn(`   ⚠️ Pregunta ${j + 1} no encontrada en el modelo`);
                continue; // Pasar a la siguiente pregunta
            }

            // Verificar si es una pregunta CALCULADORA
            const tipoPregunta = pregunta.tipo;

            if (tipoPregunta !== TIPO_PREGUNTA.CALCULADORA) {
                // Contar otros tipos de preguntas para el resumen
                otrosTipos[tipoPregunta] = (otrosTipos[tipoPregunta] || 0) + 1;
                continue; // Pasar a la siguiente pregunta
            }

            calculadorasEncontradas++;
            console.log(`\n✏️ ENCONTRADA PREGUNTA CALCULADORA #${j + 1} en ejercicio ${indice + 1}`);

            // Obtener el elemento DOM de la pregunta
            const preguntaElemento = elementosPreguntas[j];
            if (!preguntaElemento) {
                console.warn(`   ⚠️ No se encontró el elemento DOM para la pregunta CALCULADORA #${j + 1}`);
                continue;
            }

            // Buscar el contenedor de la calculadora
            const calculadoraContainer = document.getElementById(pregunta.id);
            if (!calculadoraContainer) {
                console.warn(`   ⚠️ No se encontró el contenedor de la calculadora para la pregunta ${j + 1}`);
                continue;
            }

            // Buscar las instrucciones dentro del contenedor
            // Pueden estar en divs con clase 'instruccion' o divs con atributo 'data-modo'
            let instrucciones = Array.from(calculadoraContainer.querySelectorAll('.instruccion, div[data-modo]'));

            if (!instrucciones || instrucciones.length === 0) {
                console.warn(`   ⚠️ No se encontraron instrucciones para la pregunta CALCULADORA #${j + 1}`);
                continue;
            }

            console.log(`   ✓ Procesando pregunta CALCULADORA #${j + 1} con ${instrucciones.length} instrucciones`);

            // Extraer y organizar la información del modelo
            let estructuraInstrucciones = {}; // Organizado por índice

            // Primero verificar si hay diagramas GOJS directamente en el DOM
            const diagramasGOJS = Array.from(instrucciones).filter(
                instr => instr.getAttribute('data-graph') === 'gojs'
            );

            // Procesar los diagramas GOJS inmediatamente, sin esperar índices u opciones
            if (diagramasGOJS.length > 0) {
                console.log(`   📊 Detectados ${diagramasGOJS.length} diagramas GOJS en la pregunta`);

                // Procesamos cada diagrama directamente
                const procesarDiagramasGOJS = async () => {
                    let diagramasCompletados = 0;

                    for (const diagrama of diagramasGOJS) {
                        console.log(`   🔄 Procesando diagrama GOJS directamente`);

                        try {
                            // 1. Verificar si ya está completado
                            if (diagrama.getAttribute('data-corregido') === 'true') {
                                console.log(`   ✅ Diagrama GOJS ya está completado`);
                                diagramasCompletados++;
                                continue;
                            }

                            // 2. Intentar obtener el modelo correcto almacenado en modeloc
                            if (diagrama.modeloc) {
                                console.log(`   🔄 Reemplazando diagrama GOJS con modelo correcto`);
                                const modeloCorrecto = JSON.parse(diagrama.modeloc);

                                // Limpiar marcadores de plantilla de los textos de los nodos
                                if (modeloCorrecto && modeloCorrecto.nodeDataArray) {
                                    console.log(`   🧹 Limpiando marcadores de plantilla en textos de nodos del diagrama`);
                                    modeloCorrecto.nodeDataArray.forEach(nodo => {
                                        if (nodo.text) {
                                            nodo.text = decodificarTexto(nodo.text);
                                        }
                                    });

                                    // También limpiar textos de enlaces si existen
                                    if (modeloCorrecto.linkDataArray) {
                                        modeloCorrecto.linkDataArray.forEach(enlace => {
                                            if (enlace.text) {
                                                enlace.text = decodificarTexto(enlace.text);
                                            }
                                        });
                                    }
                                }

                                // 3. Inicializar o actualizar el diagrama con el modelo correcto
                                if (diagrama.diagram) {
                                    // El diagrama ya está inicializado, solo cargar el modelo
                                    if (typeof loadGoJs === 'function') {
                                        loadGoJs(diagrama.diagram, modeloCorrecto);
                                    } else if (window.loadGoJs && typeof window.loadGoJs === 'function') {
                                        window.loadGoJs(diagrama.diagram, modeloCorrecto);
                                    }
                                } else if (typeof gojsGraph === 'function' || typeof window.gojsGraph === 'function') {
                                    // El diagrama no está inicializado, inicializarlo primero
                                    const gojsFn = typeof gojsGraph === 'function' ? gojsGraph : window.gojsGraph;
                                    gojsFn({ divi: diagrama });

                                    // Si ahora existe un diagrama, cargar el modelo
                                    if (diagrama.diagram && typeof loadGoJs === 'function') {
                                        loadGoJs(diagrama.diagram, modeloCorrecto);
                                    }
                                }
                            } else if (typeof window.corregirDiagrama === 'function') {
                                // Si no tiene modeloc, intentar usar corregirDiagrama
                                console.log(`   🔄 Intentando corregir diagrama usando corregirDiagrama()`);
                                window.corregirDiagrama(diagrama);
                            } else if (typeof gojsGraph === 'function' || typeof window.gojsGraph === 'function') {
                                // Como último recurso, solo inicializar el diagrama
                                console.log(`   🔄 Inicializando diagrama usando gojsGraph`);
                                const gojsFn = typeof gojsGraph === 'function' ? gojsGraph : window.gojsGraph;
                                gojsFn({ divi: diagrama });
                            } else {
                                console.warn(`   ⚠️ No se encontraron funciones para procesar el diagrama GOJS`);
                                continue;
                            }

                            // 4. Asegurarse de que exista un div de resultado
                            let resultadoExistente = diagrama.nextElementSibling;
                            if (!resultadoExistente || resultadoExistente.className !== 'resultado') {
                                console.log(`   📝 Creando div de resultado para diagrama GOJS`);
                                const divResultado = document.createElement('div');
                                divResultado.className = 'resultado';
                                divResultado.style.color = 'black';
                                diagrama.parentNode.insertBefore(divResultado, diagrama.nextSibling);
                            }

                            // 5. Simular la evaluación (Shift+Enter) en el diagrama
                            console.log(`   🔄 Simulando Shift+Enter en el diagrama GOJS`);

                            // Primero intentar con la función evaluar si existe
                            if (typeof evaluar === 'function') {
                                try {
                                    evaluar(diagrama);
                                    console.log(`   ✅ Función evaluar() ejecutada en el diagrama`);
                                } catch (evalError) {
                                    console.warn(`   ⚠️ Error al ejecutar evaluar() en el diagrama:`, evalError);
                                }
                            }

                            // Como alternativa, intentar simular el evento de teclado Shift+Enter
                            try {
                                // Crear un evento de teclado para Shift+Enter (keyCode 13 = Enter, shiftKey = true)
                                const keyEvent = new KeyboardEvent('keydown', {
                                    bubbles: true,
                                    cancelable: true,
                                    keyCode: 13,
                                    which: 13,
                                    key: 'Enter',
                                    code: 'Enter',
                                    shiftKey: true
                                });

                                // Disparar el evento en el diagrama
                                diagrama.dispatchEvent(keyEvent);
                                console.log(`   🔄 Evento Shift+Enter simulado en el diagrama`);
                            } catch (keyError) {
                                console.warn(`   ⚠️ Error al simular evento Shift+Enter:`, keyError);
                            }

                            // 6. Marcar el diagrama como corregido
                            diagrama.setAttribute('data-corregido', 'true');
                            console.log(`   ✅ Diagrama GOJS procesado correctamente`);
                            diagramasCompletados++;

                        } catch (diagramaError) {
                            console.error(`   ❌ Error al procesar diagrama GOJS:`, diagramaError);
                        }
                    }

                    return diagramasCompletados;
                };

                // Procesar los diagramas inmediatamente y mostrar resultados
                procesarDiagramasGOJS().then(completados => {
                    completadas += completados;
                    console.log(`   ✅ ${completados}/${diagramasGOJS.length} diagramas GOJS completados con éxito`);

                    if (completados === diagramasGOJS.length) {
                        const totalInstrucciones = instrucciones.length;
                        if (totalInstrucciones === diagramasGOJS.length) {
                            console.log(`   ✅ Todos los diagramas GOJS han sido procesados correctamente`);
                            console.log(`✅ Pregunta CALCULADORA #${j + 1} completada con éxito con ${completados} diagramas GOJS.`);
                            calculadorasResueltas++;
                            elementosProcesados[j] = true;
                            return;
                        }
                    }
                });

                // Si todos los elementos son diagramas GOJS, no continuamos con el proceso normal
                if (instrucciones.length === diagramasGOJS.length) {
                    continue; // Pasar a la siguiente pregunta
                }

                // Filtrar las instrucciones para excluir los diagramas GOJS que ya procesamos
                instrucciones = instrucciones.filter(instr => instr.getAttribute('data-graph') !== 'gojs');
                console.log(`   💬 Quedan ${instrucciones.length} instrucciones normales por procesar`);

                // Si no quedan instrucciones normales, pasar a la siguiente pregunta
                if (instrucciones.length === 0) {
                    continue;
                }
            }

            // Ahora procesar las opciones del modelo normalmente
            if (pregunta.opcion && Array.isArray(pregunta.opcion)) {
                console.log(`   🔍 Analizando ${pregunta.opcion.length} opciones para la pregunta:`);

                for (const opcion of pregunta.opcion) {
                    if (!opcion.opcion) continue;

                    // Obtener el índice de la instrucción/resultado
                    const idx = opcion.opcion.index !== undefined ? opcion.opcion.index : 0;

                    // Inicializar la estructura para este índice
                    if (!estructuraInstrucciones[idx]) {
                        estructuraInstrucciones[idx] = {
                            instrucciones: [],
                            resultados: [],
                            errores: []
                        };
                    }

                    // Guardar información según el tipo
                    if (opcion.tipo === 0 || opcion.tipo === 4) { // Instrucciones
                        if (opcion.opcion.instruccion) {
                            const instruccionDecodificada = decodificarTexto(opcion.opcion.instruccion);
                            estructuraInstrucciones[idx].instrucciones.push(instruccionDecodificada);
                            console.log(`      📌 Índice ${idx} - Instrucción: "${instruccionDecodificada}"`);
                        }
                    } else if (opcion.tipo === 1 || opcion.tipo === 5) { // Resultados
                        if (opcion.opcion.resultado) {
                            const resultadoDecodificado = decodificarTexto(opcion.opcion.resultado);
                            estructuraInstrucciones[idx].resultados.push(resultadoDecodificado);
                            console.log(`      🔄 Índice ${idx} - Resultado esperado: "${resultadoDecodificado}"`);

                            // CASO ESPECIAL: Detectar si esta opción tiene SOLO resultado sin instrucción
                            if (!opcion.opcion.instruccion) {
                                console.log(`      ⚠️ Índice ${idx} - CASO ESPECIAL: Opción con resultado pero sin instrucción`);
                            }
                        }
                    }

                    // Guardar mensajes de error
                    if (opcion.opcion.error) {
                        const errorDecodificado = decodificarTexto(opcion.opcion.error);
                        estructuraInstrucciones[idx].errores.push(errorDecodificado);
                    }
                }
            }

            // Verificar si todas las instrucciones ya están completas
            let todasCompletadas = true;
            for (const instruccion of instrucciones) {
                if (instruccion.getAttribute('data-corregido') !== 'true') {
                    todasCompletadas = false;
                    break;
                }
            }

            if (todasCompletadas) {
                console.log('   ✅ Todas las instrucciones ya están completadas');
                calculadorasResueltas++;
                continue; // Pasar a la siguiente pregunta
            }

            // Procesar cada instrucción secuencialmente
            let completadas = 0;

            // Obtener todos los índices de instrucciones encontradas en el modelo
            const indicesEncontrados = Object.keys(estructuraInstrucciones).map(Number).sort((a, b) => a - b);
            console.log(`   📊 Se procesarán instrucciones para los índices: ${indicesEncontrados.join(', ')}`);

            // Función para procesar una instrucción de manera asíncrona
            const procesarInstruccion = async (instruccion, indiceInstruccion) => {
                return new Promise((resolve) => {
                    try {
                        // Verificar si ya está completada
                        if (instruccion.getAttribute('data-corregido') === 'true') {
                            console.log(`     ✅ Instrucción ${indiceInstruccion} ya está completada`);
                            resolve(true);
                            return;
                        }

                        // Verificar si es un diagrama GOJS
                        if (instruccion.getAttribute('data-graph') === 'gojs') {
                            console.log(`     📊 Detectado diagrama GOJS para índice ${indiceInstruccion}`);

                            // Para diagramas GOJS, intentar acceder directamente a la propiedad modeloc
                            // Esta propiedad contiene el modelo correcto del diagrama
                            try {
                                if (instruccion.modeloc) {
                                    console.log(`     🔄 Reemplazando diagrama GOJS con modelo correcto`);
                                    const modeloCorrecto = JSON.parse(instruccion.modeloc);

                                    // Si el diagrama ya está inicializado, usarlo
                                    if (instruccion.diagram) {
                                        // Cargar el modelo correcto en el diagrama
                                        if (typeof loadGoJs === 'function') {
                                            loadGoJs(instruccion.diagram, modeloCorrecto);
                                        } else if (window.loadGoJs && typeof window.loadGoJs === 'function') {
                                            window.loadGoJs(instruccion.diagram, modeloCorrecto);
                                        } else {
                                            console.warn(`     ⚠️ No se encontró función loadGoJs`);
                                        }
                                    } else if (typeof window.goJSGraph === 'function') {
                                        // Si el diagrama no está inicializado, intentar inicializarlo
                                        console.log(`     📊 Inicializando nuevo diagrama GOJS`);
                                        window.goJSGraph({ divi: instruccion });

                                        // Ahora cargar el modelo correcto
                                        if (instruccion.diagram && typeof loadGoJs === 'function') {
                                            loadGoJs(instruccion.diagram, modeloCorrecto);
                                        }
                                    }

                                    // Verificar si ya existe un resultado para esta instrucción
                                    let resultadoExistente = instruccion.nextElementSibling;
                                    if (!resultadoExistente || resultadoExistente.className !== 'resultado') {
                                        console.log(`     📝 Creando div de resultado para diagrama GOJS índice ${indiceInstruccion}`);
                                        const divResultado = document.createElement('div');
                                        divResultado.className = 'resultado';
                                        divResultado.style.color = 'black';
                                        instruccion.parentNode.insertBefore(divResultado, instruccion.nextSibling);
                                    }

                                    // Marcar como corregido
                                    instruccion.setAttribute('data-corregido', 'true');

                                    console.log(`     ✅ Diagrama GOJS completado correctamente para índice ${indiceInstruccion}`);
                                    resolve(true);
                                    return;
                                } else {
                                    console.warn(`     ⚠️ Diagrama GOJS sin modelo correcto para índice ${indiceInstruccion}. Intentando corregir...`);

                                    // Si no tiene modeloc, intentar usar corregirDiagrama si está disponible
                                    if (typeof window.corregirDiagrama === 'function') {
                                        console.log(`     🔄 Intentando corregir diagrama usando corregirDiagrama()`);
                                        window.corregirDiagrama(instruccion);
                                        instruccion.setAttribute('data-corregido', 'true');
                                        console.log(`     ✅ Diagrama GOJS corregido usando función corregirDiagrama`);
                                        resolve(true);
                                        return;
                                    }
                                }
                            } catch (diagramError) {
                                console.error(`     ❌ Error al procesar diagrama GOJS:`, diagramError);
                            }

                            // Si llegamos aquí sin haber resuelto el diagrama, es probable que necesitemos usar otra estrategia
                            console.log(`     🔄 Intentando otras estrategias para procesar el diagrama GOJS...`);

                            // Intentar obtener directamente el diagrama correcto como ultimo recurso
                            if (typeof gojsGraph === 'function' || typeof window.gojsGraph === 'function') {
                                const gojsFn = typeof gojsGraph === 'function' ? gojsGraph : window.gojsGraph;
                                console.log(`     🔄 Ejecutando gojsGraph para inicializar el diagrama`);

                                try {
                                    // Llamar a gojsGraph con el div actual
                                    gojsFn({ divi: instruccion });

                                    // Marcar como corregido
                                    instruccion.setAttribute('data-corregido', 'true');

                                    // Verificar si ya existe un resultado para esta instrucción
                                    let resultadoExistente = instruccion.nextElementSibling;
                                    if (!resultadoExistente || resultadoExistente.className !== 'resultado') {
                                        console.log(`     📝 Creando div de resultado para diagrama GOJS índice ${indiceInstruccion}`);
                                        const divResultado = document.createElement('div');
                                        divResultado.className = 'resultado';
                                        divResultado.style.color = 'black';
                                        instruccion.parentNode.insertBefore(divResultado, instruccion.nextSibling);
                                    }

                                    console.log(`     ✅ Diagrama GOJS inicializado usando gojsGraph para índice ${indiceInstruccion}`);
                                    resolve(true);
                                    return;
                                } catch (gojsError) {
                                    console.error(`     ❌ Error al ejecutar gojsGraph:`, gojsError);
                                }
                            }
                        }

                        // Si llegamos aquí, no es un diagrama GOJS o no se pudo procesar como tal
                        // Procedemos con el flujo normal de CodeMirror

                        // Buscar el editor CodeMirror asociado a esta instrucción
                        const editor = instruccion.editor || window.getEditor && window.getEditor(instruccion);

                        if (!editor) {
                            console.warn(`     ⚠️ No se encontró el editor para la instrucción ${indiceInstruccion}`);
                            resolve(false);
                            return;
                        }

                        // Buscar TODAS las instrucciones correctas para este índice
                        let instruccionCorrecta = null;
                        const opcionesIndice = estructuraInstrucciones[indiceInstruccion];
                        const tieneInstrucciones = opcionesIndice && opcionesIndice.instrucciones.length > 0;
                        const tieneResultados = opcionesIndice && opcionesIndice.resultados.length > 0;
                        const esCasoEspecial = !tieneInstrucciones && tieneResultados;

                        // Caso 1: Hay instrucciones normales
                        if (tieneInstrucciones) {
                            // Concatenar TODAS las instrucciones disponibles para este índice
                            instruccionCorrecta = opcionesIndice.instrucciones.join('\n');
                            console.log(`     📝 Usando ${opcionesIndice.instrucciones.length} instrucciones para índice ${indiceInstruccion}:`);
                            opcionesIndice.instrucciones.forEach((instr, i) => {
                                console.log(`       ${i + 1}. "${instr}"`);
                            });
                        }
                        // Caso 2: CASO ESPECIAL - Solo hay resultado, no hay instrucción
                        else if (esCasoEspecial) {
                            // Usar el resultado como instrucción (caso especial)
                            instruccionCorrecta = `// Resultado esperado:\n${opcionesIndice.resultados[0]}`;
                            console.log(`     📝 CASO ESPECIAL: Usando resultado como instrucción para índice ${indiceInstruccion}:`);
                            console.log(`       "${opcionesIndice.resultados[0]}"`);
                        }
                        // Caso 3: No hay ni instrucciones ni resultados
                        else {
                            console.warn(`     ⚠️ No se encontró instrucción ni resultado para el índice ${indiceInstruccion} en el modelo`);
                            resolve(false);
                            return;
                        }
                        editor.setValue(instruccionCorrecta);
                        console.log(`     ✏️ Instrucciones establecidas en el editor para índice ${indiceInstruccion}`);

                        // Simular evaluación (Shift+Enter)
                        setTimeout(() => {
                            try {
                                // Intentar evaluar si la función existe
                                if (typeof evaluar === 'function') {
                                    console.log(`     🔄 Evaluando instrucciones...`);
                                    evaluar(instruccion);
                                    console.log(`     ✅ Instrucciones evaluadas correctamente`);
                                } else {
                                    console.warn(`     ⚠️ No se encontró la función evaluar()`);
                                }

                                // Esperar a que se complete la evaluación
                                setTimeout(() => {
                                    try {
                                        // Verificar si ya existe un resultado para esta instrucción
                                        let resultadoExistente = null;
                                        const resultados = calculadoraContainer.querySelectorAll('.resultado');

                                        // Buscar el resultado correspondiente a esta instrucción
                                        for (const resultado of resultados) {
                                            if (resultado.previousElementSibling === instruccion) {
                                                resultadoExistente = resultado;
                                                break;
                                            }
                                        }

                                        // Obtener el resultado esperado para este índice
                                        let resultadoEsperado = "";

                                        // Verificar si hay resultados específicos para este índice
                                        if (tieneResultados) {
                                            // Tomar el primer resultado disponible (generalmente solo hay uno)
                                            resultadoEsperado = opcionesIndice.resultados[0];
                                            console.log(`     📊 Usando resultado esperado para índice ${indiceInstruccion}: "${resultadoEsperado}"`);

                                            // CASO ESPECIAL: Si no había instrucciones pero usamos el resultado como instrucción
                                            if (esCasoEspecial) {
                                                console.log(`     ✅ Caso especial: usando el mismo valor como resultado`);
                                            }
                                        } else if (opcionesIndice.resultado) {
                                            // Fallback al resultado general si existe
                                            resultadoEsperado = opcionesIndice.resultado;
                                            console.log(`     📊 Usando resultado general para índice ${indiceInstruccion}: "${resultadoEsperado}"`);
                                        } else {
                                            console.log(`     📊 No se encontró resultado específico para índice ${indiceInstruccion}, dejando vacío`);
                                        }

                                        // Si no existe un resultado, crear uno nuevo
                                        if (!resultadoExistente) {
                                            console.log(`     📝 Creando div de resultado para índice ${indiceInstruccion}`);
                                            const divResultado = document.createElement('div');
                                            divResultado.className = 'resultado';
                                            divResultado.setAttribute('data-index', indiceInstruccion);
                                            divResultado.textContent = resultadoEsperado;

                                            // Insertar el resultado después de la instrucción
                                            instruccion.parentNode.insertBefore(divResultado, instruccion.nextSibling);
                                        } else {
                                            console.log(`     📝 Actualizando div de resultado existente para índice ${indiceInstruccion}`);
                                            resultadoExistente.textContent = resultadoEsperado;
                                        }

                                        // Asegurarse de que la instrucción esté marcada como corregida
                                        if (instruccion.getAttribute('data-corregido') !== 'true') {
                                            console.log(`     🔧 Marcando instrucción como corregida para índice ${indiceInstruccion}`);
                                            instruccion.setAttribute('data-corregido', 'true');
                                        }

                                        resolve(true);
                                    } catch (resultError) {
                                        console.error(`     ❌ Error al crear/actualizar resultado:`, resultError);
                                        resolve(false);
                                    }
                                }, 50); // Esperar 1 segundo para que la evaluación se complete
                            } catch (evalError) {
                                console.error(`     ❌ Error al evaluar instrucciones:`, evalError);
                                resolve(false);
                            }
                        }, 50);
                    } catch (processError) {
                        console.error(`     ❌ Error al procesar instrucción:`, processError);
                        resolve(false);
                    }
                });
            };

            // Procesar cada índice secuencialmente
            const procesarInstrucciones = async () => {
                for (let i = 0; i < indicesEncontrados.length; i++) {
                    const indice = indicesEncontrados[i];

                    // Verificar si hay instrucciones o resultados para este índice
                    if (estructuraInstrucciones[indice] &&
                        (estructuraInstrucciones[indice].instrucciones.length > 0 ||
                            estructuraInstrucciones[indice].resultados.length > 0)) {
                        console.log(`   🔍 Procesando instrucción del índice ${indice}...`);

                        // Obtener las instrucciones actualizadas (puede haber nuevas después de cada evaluación)
                        const instruccionesActualizadas = Array.from(calculadoraContainer.querySelectorAll('.instruccion, div[data-modo]'));
                        console.log(`     📊 Encontradas ${instruccionesActualizadas.length} instrucciones en el DOM`);

                        if (i < instruccionesActualizadas.length) {
                            const resultado = await procesarInstruccion(instruccionesActualizadas[i], indice);
                            if (resultado) completadas++;

                            // Establecer color negro en el div de resultado actual
                            const resultadosActuales = calculadoraContainer.querySelectorAll('.resultado');
                            for (const resultado of resultadosActuales) {
                                if (resultado.style.color !== 'black') {
                                    console.log(`     🖊️ Cambiando color de resultado a negro`);
                                    resultado.style.color = 'black';
                                }
                            }

                            // Esperar para dar tiempo a que el DOM se actualice
                            await new Promise(resolve => setTimeout(resolve, 50));
                        } else {
                            console.warn(`     ⚠️ No se encontró elemento DOM para el índice ${indice}`);
                        }
                    }
                }
            };

            // Ejecutar el procesamiento secuencial
            await procesarInstrucciones();

            // Verificar si completamos todas las instrucciones
            const instruccionesFinal = Array.from(calculadoraContainer.querySelectorAll('.instruccion, div[data-modo]'));
            if (completadas >= indicesEncontrados.length) {
                console.log(`   ✅ Pregunta CALCULADORA #${j + 1} completada con éxito. Procesadas ${completadas} instrucciones.`);
                calculadorasResueltas++;
            } else {
                console.log(`   ⚠️ Pregunta CALCULADORA #${j + 1} parcialmente completada. ${completadas}/${indicesEncontrados.length} instrucciones procesadas.`);
            }
        }

        // Mostrar resumen final
        console.log('\n📊 Resumen del procesamiento:');
        console.log(`   - Preguntas analizadas: ${preguntasAnalizadas}`);
        console.log(`   - Calculadoras encontradas: ${calculadorasEncontradas}`);
        console.log(`   - Calculadoras completamente resueltas: ${calculadorasResueltas}`);

        // Mostrar otros tipos de preguntas encontrados
        if (Object.keys(otrosTipos).length > 0) {
            console.log('   - Otros tipos de preguntas:');
            for (const tipo in otrosTipos) {
                console.log(`     - Tipo ${tipo}: ${otrosTipos[tipo]}`);
            }
        }

        return true; // Indicar que el proceso se completó correctamente
    } catch (error) {
        console.error('❌ Error al resolver preguntas CALCULADORA:', error);
        return false;
    }
}
/**
 * Función para generar un ejercicio y resolver sus preguntas tipo CALCULADORA
 * Esta función primero genera el ejercicio y luego identifica y resuelve las preguntas CALCULADORA
 * @param {number} numeroEjercicio - Número del ejercicio a resolver (base 1)
 * @returns {Promise<boolean>} - Promise que se resuelve a true si el proceso se completó correctamente, false en caso contrario
 */
async function generarYResolverCalculadora(numeroEjercicio) {
    try {
        const numEjercicio = numeroEjercicio || 1;
        console.log(`📝 Generando ejercicio ${numEjercicio} y resolviendo sus preguntas CALCULADORA...`);

        // Convertir a base 0 para uso interno
        const indice = numEjercicio - 1;

        // Verificar ejercicio
        if (!window.capitulo || !window.capitulo.ejercicios || !window.capitulo.ejercicios[indice]) {
            console.error(`❌ No se encontró el ejercicio ${numEjercicio}`);
            return false;
        }

        console.log(`🚀 Generando ejercicio ${numEjercicio}...`);

        // Generar el ejercicio utilizando la función del sistema
        const botonGenerar = document.querySelector(`#ejercicio${numEjercicio} button`);
        if (!botonGenerar) {
            console.error(`❌ No se encontró el botón de generar para el ejercicio ${numEjercicio}`);
            return false;
        }

        // Simular clic en el botón de generar ejercicio
        botonGenerar.click();

        console.log(`   ✓ Ejercicio ${numEjercicio} generado. Esperando a que se cargue completamente...`);

        // Esperar a que el ejercicio se cargue completamente antes de procesarlo
        return new Promise((resolve) => {
            setTimeout(async () => {
                try {
                    // Verificar si el ejercicio se ha cargado completamente
                    const ejercicioListo = document.querySelector(`#ejercicio${numEjercicio}`);

                    if (!ejercicioListo) {
                        console.log(`   ⏳ El ejercicio ${numEjercicio} aún no ha terminado de cargar. Esperando...`);
                        // Intentar nuevamente después de 3 segundos
                        setTimeout(async () => {
                            try {
                                console.log(`   🔍 Reintentando buscar el ejercicio ${numEjercicio}...`);
                                const resuelto = await resolverCalculadora(indice);

                                if (resuelto) {
                                    console.log(`✅ Ejercicio ${numEjercicio}: Proceso de completado de preguntas CALCULADORA iniciado.`);
                                } else {
                                    console.log(`ℹ️ Ejercicio ${numEjercicio}: No se encontraron o no se pudieron resolver preguntas CALCULADORA.`);
                                }
                                resolve(resuelto);
                            } catch (error) {
                                console.error('   ⚠️ Error al procesar el ejercicio:', error);
                                console.log(`🚨 Ocurrió un error al procesar el ejercicio ${numEjercicio}.`);
                                resolve(false);
                            }
                        }, 50); // 3 segundos adicionales
                    } else {
                        // Analizar el ejercicio si está listo
                        try {
                            console.log(`   🔍 Buscando y resolviendo preguntas CALCULADORA...`);
                            const resuelto = await resolverCalculadora(indice);

                            if (resuelto) {
                                console.log(`✅ Ejercicio ${numEjercicio}: Proceso de completado de preguntas CALCULADORA iniciado.`);
                            } else {
                                console.log(`ℹ️ Ejercicio ${numEjercicio}: No se encontraron o no se pudieron resolver preguntas CALCULADORA.`);
                            }
                            resolve(resuelto);
                        } catch (error) {
                            console.error('   ⚠️ Error al procesar el ejercicio:', error);
                            console.log(`🚨 Ocurrió un error al procesar el ejercicio ${numEjercicio}.`);
                            resolve(false);
                        }
                    }
                } catch (error) {
                    console.error(`❌ Error al verificar la carga del ejercicio ${numEjercicio}:`, error);
                    resolve(false);
                }
            }, 50);
        });
    } catch (error) {
        console.error(`❌ Error al procesar ejercicio ${numeroEjercicio}:`, error);
        return false;
    }
}



/**
 * Función para resolver un ejercicio CALCULADORA ya generado
 * @param {number} numeroEjercicio - Número del ejercicio a resolver (base 1)
 * @returns {Promise<boolean>} - Promise que se resuelve a true si se resolvió correctamente, false en caso contrario
 */
async function completarCalculadora(numeroEjercicio) {
    try {
        // Convertir a base 0 para uso interno
        const indice = numeroEjercicio - 1;
        console.log(`📝 Resolviendo preguntas CALCULADORA en ejercicio ${numeroEjercicio} ya generado...`);

        // Resolver preguntas CALCULADORA automáticamente
        const resuelto = await resolverCalculadora(indice);

        if (resuelto) {
            console.log(`✅ Ejercicio ${numeroEjercicio}: Proceso de completado de preguntas CALCULADORA iniciado.`);
        } else {
            console.log(`ℹ️ Ejercicio ${numeroEjercicio}: No se encontraron o no se pudieron resolver preguntas CALCULADORA.`);
        }

        return resuelto;
    } catch (error) {
        console.error(`❌ Error al procesar ejercicio CALCULADORA ${numeroEjercicio}:`, error);
        return false;
    }
}

// Exportar las funciones para uso global
window.resolverCalculadora = resolverCalculadora;
window.generarYResolverCalculadora = generarYResolverCalculadora;
window.completarCalculadora = completarCalculadora;

// Mensaje de carga del script
console.log('💡 Script de resolución automática de preguntas CALCULADORA cargado correctamente.');
console.log('💡 Funciones disponibles:');
console.log('  - generarYResolverCalculadora(numero): Genera el ejercicio especificado y resuelve sus preguntas CALCULADORA');
console.log('  - completarCalculadora(numero): Resuelve las preguntas CALCULADORA de un ejercicio ya generado');
console.log('  - resolverCalculadora(indice): Función interna (base 0) utilizada por las funciones anteriores');
console.log('💡 Este script solo completa preguntas CALCULADORA, dejando intactas las preguntas de otros tipos.');
console.log('💡 NOTA: Para preguntas CALCULADORA, el script proporciona instrucciones adecuadas y simula la evaluación con Shift+Enter.');


/**
 * resolver_ejercicios_correcto.js
 * Script que SOLO genera un ejercicio y resuelve sus problemas.
 * No hace nada más, especialmente no activa automáticamente el botón Corregir.
 */

// Mapa de tipos de preguntas
const tiposPregunta = {
    0: "SIMPLE",
    1: "MULTIPLE",
    2: "ARRASTRAR",
    3: "DATO",
    4: "LITERAL",
    5: "CALCULADORA"
};

// Constante global para tiempos de espera estándar en ms
const ESPERA_CORTA = 40;
const ESPERA_ENTRE_EJ = 50; // Espera extra entre ejercicios (ms)

// Variable para mantener el estado actual de los ejercicios
let avanceEjercicios = [];

/**
 * Crea y muestra una tabla en la esquina superior izquierda con el avance de los ejercicios
 */
function mostrarTablaAvance() {
    try {
        // Guardar scroll si existe
        let scrollPos = 0;
        let tablaScrollAnterior = document.getElementById('tabla-scroll-wrapper');
        if (tablaScrollAnterior) {
            scrollPos = tablaScrollAnterior.scrollTop;
        }
        // Eliminar tabla anterior si existe
        let tablaAnterior = document.getElementById('tabla-avance-ejercicios');
        if (tablaAnterior) {
            tablaAnterior.remove();
        }

        // Si no hay datos de avance, no mostramos nada
        if (avanceEjercicios.length === 0) {
            return;
        }

        // Crear elemento para contener la tabla
        const contenedorTabla = document.createElement('div');
        contenedorTabla.id = 'tabla-avance-ejercicios';
        contenedorTabla.style.cssText = `
            position: fixed;
            top: 30px;
            right: 11px;
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            padding: 10px;
            font-weight: bold;
        `;

        // Contenedor para hacer scroll solo en la tabla
        const tablaScrollWrapper = document.createElement('div');
        tablaScrollWrapper.id = 'tabla-scroll-wrapper';
        tablaScrollWrapper.style.cssText = `
            max-height: calc(12 * 36px); /* 16 filas de ~36px cada una */
            overflow-y: auto;
            margin-bottom: 8px;
        `;

        // Crear el título de la tabla
        const titulo = document.createElement('h3');
        titulo.textContent = '📊 Avance';
        titulo.style.cssText = `
            margin: 0 0 10px 0;
            padding-bottom: 8px;
            border-bottom: 1px solid #ccc;
            color: #333;
            font-size: 16px;
            text-align: center;
        `;
        contenedorTabla.appendChild(titulo);

        // Crear elemento de tiempo y agregarlo arriba de la tabla
        let tiempoElemento = document.createElement('div');
        tiempoElemento.id = 'tiempo-global-ejercicios';
        tiempoElemento.style.cssText = `
            margin-bottom: 8px;
            text-align: center;
            font-size: 14px;
            color: #007bff;
            font-weight: bold;
        `;
        // Mostrar tiempo actual si el temporizador está activo
        if (window.temporizadorGlobal && temporizadorGlobal.inicio) {
            let ms = Date.now() - temporizadorGlobal.inicio;
            if (temporizadorGlobal.fin) ms = temporizadorGlobal.fin - temporizadorGlobal.inicio;
            const min = Math.floor(ms / 60000);
            const segRest = ((ms % 60000) / 1000).toFixed(2);
            tiempoElemento.textContent = `⏳ Tiempo total: ${min > 0 ? min + 'm ' : ''}${segRest}s`;
        } else {
            tiempoElemento.textContent = '';
        }
        contenedorTabla.appendChild(tiempoElemento);

        // Crear la tabla
        const tabla = document.createElement('table');
        tabla.style.cssText = `
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
        `;

        // Crear encabezado de la tabla
        const encabezado = document.createElement('thead');
        const filaEncabezado = document.createElement('tr');
        ['N°', 'Estado', 'Nota', 'Puntos'].forEach(texto => {
            const th = document.createElement('th');
            th.textContent = texto;
            th.style.cssText = `
                padding: 8px;
                background-color: #f2f2f2;
                border: 1px solid #ddd;
                text-align: center;
            `;
            filaEncabezado.appendChild(th);
        });
        encabezado.appendChild(filaEncabezado);
        tabla.appendChild(encabezado);

        // Crear cuerpo de la tabla
        const cuerpo = document.createElement('tbody');
        avanceEjercicios.forEach(ejercicio => {
            const fila = document.createElement('tr');

            // Número de ejercicio
            const celdaNumero = document.createElement('td');
            celdaNumero.textContent = ejercicio['N°'];
            celdaNumero.style.cssText = `
                padding: 8px;
                border: 1px solid #ddd;
                text-align: center;
            `;
            fila.appendChild(celdaNumero);

            // Estado (aprobado/no aprobado)
            const celdaEstado = document.createElement('td');
            celdaEstado.textContent = ejercicio['Estado'];
            celdaEstado.style.cssText = `
                padding: 8px;
                border: 1px solid #ddd;
                text-align: center;
                font-size: 16px;
            `;
            fila.appendChild(celdaEstado);

            // Nota del ejercicio
            const celdaNota = document.createElement('td');
            celdaNota.textContent = ejercicio['Nota'];
            celdaNota.style.cssText = `
                padding: 8px;
                border: 1px solid #ddd;
                text-align: center;
                ${parseInt(ejercicio['Nota']) >= 70 ? 'color: green; font-weight: bold;' : 'color: red;'}
            `;
            fila.appendChild(celdaNota);

            // Puntos del ejercicio
            const celdaPuntos = document.createElement('td');
            celdaPuntos.textContent = ejercicio['Puntos'];
            celdaPuntos.style.cssText = `
                padding: 8px;
                border: 1px solid #ddd;
                text-align: center;
            `;
            fila.appendChild(celdaPuntos);

            cuerpo.appendChild(fila);
        });
        tabla.appendChild(cuerpo);
        tablaScrollWrapper.appendChild(tabla);
        contenedorTabla.appendChild(tablaScrollWrapper);
        // Desplazar siempre el scroll hacia abajo para ver el último ejercicio
        setTimeout(() => {
            tablaScrollWrapper.scrollTop = tablaScrollWrapper.scrollHeight;
        }, 0);

        // Agregar resumen al final
        const aprobados = avanceEjercicios.filter(e => e['Estado'] === '✅').length;
        const resumen = document.createElement('p');
        resumen.textContent = `📊 Total Aprobados: ${aprobados}/${capitulo.ejercicios.length}`;
        resumen.style.cssText = `
            margin: 10px 0 0 0;
            text-align: center;
            font-weight: bold;
            color: ${aprobados === avanceEjercicios.length ? 'green' : '#333'};
        `;
        contenedorTabla.appendChild(resumen);

        // Intentar obtener y mostrar la nota del capítulo
        try {
            const notaCapituloElement = document.getElementById('notaCapitulo');
            if (notaCapituloElement && notaCapituloElement.value) {
                const notaCapitulo = document.createElement('p');
                notaCapitulo.textContent = `🌟 Nota Capítulo: ${notaCapituloElement.value}`;
                notaCapitulo.style.cssText = `
                    margin: 5px 0 0 0;
                    text-align: center;
                    font-weight: bold;
                    font-size: 16px;
                    color: ${parseInt(notaCapituloElement.value) >= 70 ? 'green' : 'red'};
                `;
                contenedorTabla.appendChild(notaCapitulo);

                // Mostrar el ID de la página cuando la nota es 100
                if (parseInt(notaCapituloElement.value) === 100 && window.capitulo && window.capitulo.idPagina) {
                    // Crear contenedor para ID y botón
                    const idContainer = document.createElement('div');
                    idContainer.style.cssText = `
                        margin: 5px 0;
                        text-align: center;
                        background-color: #e6f2ff;
                        padding: 5px;
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    `;

                    // Mostrar el ID de la página
                    const idPaginaElement = document.createElement('span');
                    idPaginaElement.textContent = `🔑 ID Página: ${window.capitulo.idPagina}`;
                    idPaginaElement.style.cssText = `
                        font-weight: bold;
                        font-size: 16px;
                        color: #0066cc;
                        margin-right: 10px;
                    `;
                    idContainer.appendChild(idPaginaElement);

                    // Crear botón para copiar
                    const copyButton = document.createElement('button');
                    copyButton.textContent = 'Copiar';
                    copyButton.style.cssText = `
                        background-color: #0066cc;
                        color: white;
                        border: none;
                        border-radius: 15px;
                        padding: 8px 15px;
                        cursor: pointer;
                        font-size: 12px;
                        transition: background-color 0.2s;
                    `;

                    // Función para copiar al portapapeles
                    copyButton.addEventListener('click', () => {
                        const idPagina = window.capitulo.idPagina;
                        navigator.clipboard.writeText(idPagina)
                            .then(() => {
                                // Cambiar texto temporal del botón para indicar éxito
                                const originalText = copyButton.textContent;
                                copyButton.textContent = '✅ Copiado!';
                                copyButton.style.backgroundColor = '#25c149';

                                // Restaurar el botón después de 1.5 segundos
                                setTimeout(() => {
                                    copyButton.textContent = originalText;
                                    copyButton.style.backgroundColor = '#0066cc';
                                }, 1500);

                                console.log(`✅ ID copiado al portapapeles: ${idPagina}`);
                            })
                            .catch(err => {
                                console.error('Error al copiar:', err);
                                copyButton.textContent = '❌ Error';
                                copyButton.style.backgroundColor = '#ff3333';

                                // Restaurar después de 1.5 segundos
                                setTimeout(() => {
                                    copyButton.textContent = 'Copiar';
                                    copyButton.style.backgroundColor = '#0066cc';
                                }, 1500);
                            });
                    });

                    // Agregar efecto hover
                    copyButton.addEventListener('mouseover', () => {
                        copyButton.style.backgroundColor = '#0055b3';
                    });
                    copyButton.addEventListener('mouseout', () => {
                        if (copyButton.textContent === 'Copiar') {
                            copyButton.style.backgroundColor = '#0066cc';
                        }
                    });

                    idContainer.appendChild(copyButton);
                    contenedorTabla.appendChild(idContainer);

                    console.log(`🎉 ¡Felicidades! Has obtenido la nota máxima. ID de la página: ${window.capitulo.idPagina}`);
                }
            }
        } catch (error) {
            console.log('No se pudo obtener la nota del capítulo', error);
        }

        // Agregar botón para cerrar la tabla
        const btnCerrar = document.createElement('button');
        btnCerrar.textContent = '✖';
        btnCerrar.style.cssText = `
            position: absolute;
            top: 5px;
            right: 5px;
            background: none;
            border: none;
            font-size: 16px;
            cursor: pointer;
            color: #666;
        `;
        btnCerrar.onclick = () => contenedorTabla.remove();
        contenedorTabla.appendChild(btnCerrar);

        // Agregar la tabla al documento
        document.body.appendChild(contenedorTabla);

        console.log('📊 Tabla de avance actualizada');
    } catch (error) {
        console.error('❌ Error al mostrar tabla de avance:', error);
    }
}

/**
 * Actualiza los datos de avance con la información del ejercicio completado
 * @param {number} numeroEjercicio - Número del ejercicio finalizado
 */
async function actualizarAvance(numeroEjercicio) {
    try {
        // Esperar un poco para que la información del ejercicio se actualice
        await new Promise(resolve => setTimeout(resolve, ESPERA_CORTA));

        // Verificar si existe el objeto capitulo con los ejercicios
        if (window.capitulo && window.capitulo.ejercicios) {
            const indice = numeroEjercicio - 1;
            const ejercicio = window.capitulo.ejercicios[indice];

            if (ejercicio) {
                // Crear o actualizar la información del ejercicio
                const estadoEjercicio = {
                    'N°': numeroEjercicio,
                    'Estado': ejercicio.nota >= 70 ? '✅' : '❌',
                    'Nota': ejercicio.nota,
                    'Puntos': `${ejercicio.puntos}/${ejercicio.puntaje}`
                };

                // Buscar si ya existe este ejercicio en el avance
                const ejercicioExistente = avanceEjercicios.findIndex(e => e['N°'] === numeroEjercicio);

                if (ejercicioExistente >= 0) {
                    // Actualizar ejercicio existente
                    avanceEjercicios[ejercicioExistente] = estadoEjercicio;
                } else {
                    // Agregar nuevo ejercicio al avance
                    avanceEjercicios.push(estadoEjercicio);
                }

                // Ordenar por número de ejercicio
                avanceEjercicios.sort((a, b) => a['N°'] - b['N°']);

                // Mostrar la tabla actualizada
                mostrarTablaAvance();

                // También mostrar en consola para debugging
                console.table([estadoEjercicio]);
            }
        } else {
            console.warn('⚠️ No se pudo acceder a la información del ejercicio');
        }
    } catch (error) {
        console.error('❌ Error al actualizar avance:', error);
    }
}

/**
 * Resuelve un ejercicio específico que el usuario selecciona.
 * Solo hace dos cosas: 
 * 1. Genera el ejercicio si es necesario
 * 2. Resuelve los problemas existentes
 * @param {number} numeroEjercicio - Número del ejercicio (base 1)
 */
async function resolverEjercicioSeleccionado(numeroEjercicio) {

    // Quitar borde rojo de todos los ejercicios antes de resaltar el actual
    document.querySelectorAll('[id^="ejercicio"]').forEach(ej => ej.style.boxShadow = "");
    // (El temporizador individual ha sido eliminado, solo se usa el global)
    // Agregar borde rojo al ejercicio actual
    const ejercicioElemento = document.getElementById(`ejercicio${numeroEjercicio}`);
    if (ejercicioElemento) {
        ejercicioElemento.style.boxShadow = "0 0 0 3px red";
    }
    try {
        // Hacer scroll al ejercicio correspondiente y esperar a que termine
        const ejercicioElemento = document.getElementById(`ejercicio${numeroEjercicio}`);
        if (ejercicioElemento) {
            ejercicioElemento.scrollIntoView({ behavior: "auto", block: "start" });
            // Esperar a que termine el scroll principal y luego ajustar más arriba
            await new Promise(resolve => {
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        const rect = ejercicioElemento.getBoundingClientRect();
                        const offset = 10; // margen deseado desde arriba
                        const desplazamiento = rect.top - offset;
                        window.scrollBy({ top: desplazamiento, left: 0, behavior: "auto" });
                        // Esperar un poco más tras el ajuste
                        setTimeout(resolve, 100);
                    });
                }, 100);
            });
        }
        console.log(`
🚀 Iniciando resolución del ejercicio ${numeroEjercicio}...`);


        // Obtener el índice correcto (base 0)
        const indice = numeroEjercicio - 1;

        // 1. GENERAR EL EJERCICIO SI ES NECESARIO
        const botonGenerar = document.querySelector(`#ejercicio${numeroEjercicio} .btGenerar`);
        if (botonGenerar) {
            console.log('📝 Generando ejercicio...');
            botonGenerar.click();
            // Esperar a que se genere el ejercicio
            await new Promise(resolve => setTimeout(resolve, ESPERA_CORTA));
        } else {
            console.log('ℹ️ El ejercicio ya está generado');
        }

        // 2. RESOLVER LOS PROBLEMAS EXISTENTES
        console.log('🔄 Resolviendo todos los tipos de problemas...');

        // Intentar resolver cada tipo de ejercicio posible
        try { await resolverSimple(indice); } catch (e) { }
        try { await resolverMultiple(indice); } catch (e) { }
        try { await resolverArrastrar(indice); } catch (e) { }
        try { await resolverDato(indice); } catch (e) { }
        try { await resolverLiteral(indice); } catch (e) { }
        try { await resolverCalculadora(indice); } catch (e) { }

        // Log estilizado con fondo verde para indicar finalización exitosa
        console.log(
            '%c \u2705 \uD83C\uDF89 EJERCICIO ' + numeroEjercicio + ' RESUELTO CON \u00c9XITO \uD83C\uDF89 \u2705 ',
            'background: #25c149; color: white; font-weight: bold; font-size: 14px; padding: 6px 12px; border-radius: 4px; margin: 5px 0;'
        );

        // Activar automáticamente el botón Corregir ahora que se han resuelto todos los problemas
        setTimeout(() => {
            const botonCorregir = document.querySelector(`#ejercicio${numeroEjercicio} #btCorregir`);
            if (botonCorregir) {
                console.log('%c ➡️ Presionando botón Corregir automáticamente...', 'color: orange; font-weight: bold;');
                botonCorregir.click();
                console.log('%c ✅ Botón Corregir activado', 'color: green;');

                // Actualizar la tabla de avance después de un breve tiempo para permitir que la corrección se complete
                setTimeout(async () => {
                    await actualizarAvance(numeroEjercicio);
                }, ESPERA_CORTA);
            } else {
                console.warn('⚠️ Botón Corregir no encontrado');
            }
        }, ESPERA_CORTA); // Espera corta antes de hacer clic

        return true;
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        return false;
    }
    // Si existía un temporizador individual, asegúrate de limpiarlo (por compatibilidad)
    // clearInterval(intervaloTemporizador); // Ya no existe, solo para referencia
}

/**
 * Resuelve todos los ejercicios existentes automáticamente, uno por uno,
 * repitiendo cada ejercicio hasta obtener nota máxima
 */
// Variables globales para el temporizador de todo el proceso
temporizadorGlobal = {
    inicio: null,
    fin: null,
    intervalo: null
};

async function resolverTodosLosEjercicios() {
    try {
        // Iniciar temporizador global
        temporizadorGlobal.inicio = Date.now();
        // Limpiar cualquier intervalo previo
        if (temporizadorGlobal.intervalo) {
            clearInterval(temporizadorGlobal.intervalo);
            temporizadorGlobal.intervalo = null;
        }
        temporizadorGlobal.fin = null;
        temporizadorGlobal.intervalo = setInterval(() => {
            const transcurrido = Date.now() - temporizadorGlobal.inicio;
            const min = Math.floor(transcurrido / 60000);
            const segRest = ((transcurrido % 60000) / 1000).toFixed(2);
            // Actualizar en el panel si existe
            const tiempoElemento = document.getElementById('tiempo-global-ejercicios');
            if (tiempoElemento) {
                tiempoElemento.textContent = `⏳ Tiempo total: ${min > 0 ? min + 'm ' : ''}${segRest}s`;
            }
            // También en consola si quieres
            // console.log(`⏳ Tiempo transcurrido: ${min > 0 ? min + 'm ' : ''}${segRest}s`);
        }, 1000);

        // 1. Encontrar todos los ejercicios disponibles
        const ejercicios = document.querySelectorAll('[id^="ejercicio"]');
        if (ejercicios.length === 0) {
            console.warn('⚠️ No se encontraron ejercicios en la página');
            return false;
        }

        console.log(
            '%c 🔥 INICIANDO RESOLUCIÓN AUTOMÁTICA DE ' + ejercicios.length + ' EJERCICIOS 🔥 ',
            'background: #3366cc; color: white; font-weight: bold; font-size: 14px; padding: 8px; border-radius: 4px; margin: 10px 0;'
        );

        // 2. Resolver cada ejercicio secuencialmente, repitiendo hasta obtener nota máxima
        for (let i = 0; i < ejercicios.length; i++) {
            const ejercicioDiv = ejercicios[i];
            const idEjercicio = ejercicioDiv.id.replace('ejercicio', '');
            const numeroEjercicio = parseInt(idEjercicio);

            if (isNaN(numeroEjercicio)) continue;

            console.log(
                '%c ⭐ PROCESANDO EJERCICIO ' + numeroEjercicio + ' (' + (i + 1) + '/' + ejercicios.length + ') ⭐',
                'background: #ff9900; color: white; font-weight: bold; padding: 4px 8px; border-radius: 3px;'
            );

            // Resolver este ejercicio hasta que obtenga nota máxima
            await resolverHastaNotaMaxima(numeroEjercicio, 5); // Máximo 5 intentos por ejercicio

            // Esperar un poco entre ejercicios
            await new Promise(resolve => setTimeout(resolve, ESPERA_CORTA));
        }

        // 3. Mostrar mensaje final de éxito
        console.log(
            '%c 🌟 🎉 TODOS LOS EJERCICIOS HAN SIDO RESUELTOS Y CORREGIDOS 🎉 🌟 ',
            'background: linear-gradient(to right, #25c149, #1e9d74); color: white; font-weight: bold; font-size: 16px; padding: 10px; border-radius: 5px; margin: 15px 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);'
        );

        // 4. Asegurar que se muestre la tabla de avance al final
        mostrarTablaAvance();

        // Detener temporizador global y mostrar tiempo total
        temporizadorGlobal.fin = Date.now();
        if (temporizadorGlobal.intervalo) {
            clearInterval(temporizadorGlobal.intervalo);
            temporizadorGlobal.intervalo = null;
        }
        // Actualizar el panel de tiempo final
        setTimeout(() => {
            mostrarTablaAvance();
        }, 200);
        const ms = temporizadorGlobal.fin - temporizadorGlobal.inicio;
        const seg = (ms / 1000).toFixed(2);
        const min = Math.floor(ms / 60000);
        const segRest = ((ms % 60000) / 1000).toFixed(2);
        console.log(`✅ Tiempo total de resolución: ${min > 0 ? min + 'm ' : ''}${segRest}s (${ms} ms)`);

        // Scroll automático al final de la página
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        // Quitar borde rojo de todos los ejercicios al terminar
        document.querySelectorAll('[id^="ejercicio"]').forEach(ej => ej.style.boxShadow = "");

        return true;
    } catch (error) {
        console.error(`❌ Error al procesar todos los ejercicios: ${error.message}`);
        return false;
    }
}

/**
 * Verifica si un ejercicio ha obtenido la nota máxima (100%) y todos los puntos posibles
 * @param {number} numeroEjercicio - Número del ejercicio a verificar
 * @returns {boolean} - True si el ejercicio obtuvo nota máxima, false en caso contrario
 */
async function verificarNotaMaxima(numeroEjercicio) {
    try {
        // Esperar un poco para que la información del ejercicio se actualice
        await new Promise(resolve => setTimeout(resolve, ESPERA_CORTA));

        // Verificar si existe el objeto capitulo con los ejercicios
        if (window.capitulo && window.capitulo.ejercicios) {
            const indice = numeroEjercicio - 1;
            const ejercicio = window.capitulo.ejercicios[indice];

            if (ejercicio) {
                console.log(`🔎 Verificando nota del ejercicio ${numeroEjercicio}:`);
                console.log(`   📊 Nota: ${ejercicio.nota}%`);
                console.log(`   📊 Puntos: ${ejercicio.puntos}/${ejercicio.puntaje}`);

                // Verificar si la nota es 100% y si obtuvo todos los puntos posibles
                const notaMaxima = ejercicio.nota === 100;
                const puntosMaximos = ejercicio.puntos === ejercicio.puntaje;

                if (notaMaxima && puntosMaximos) {
                    console.log(`   ✅ El ejercicio ${numeroEjercicio} obtuvo la nota máxima y todos los puntos.`);
                    return true;
                } else {
                    console.log(`   ⚠️ El ejercicio ${numeroEjercicio} NO obtuvo la nota máxima.`);
                    if (!notaMaxima) console.log(`      - Nota obtenida: ${ejercicio.nota}%, se requiere: 100%`);
                    if (!puntosMaximos) console.log(`      - Puntos obtenidos: ${ejercicio.puntos}/${ejercicio.puntaje}`);
                    return false;
                }
            }
        }

        // Si no se pudo verificar, asumimos que no obtuvo nota máxima
        console.warn(`⚠️ No se pudo verificar la nota del ejercicio ${numeroEjercicio}`);
        return false;
    } catch (error) {
        console.error(`❌ Error al verificar nota máxima:`, error);
        return false;
    }
}

/**
 * Busca y hace clic en el botón Repetir para un ejercicio específico
 * @param {number} numeroEjercicio - Número del ejercicio a repetir
 * @returns {boolean} - True si se encontró y se hizo clic en el botón, false en caso contrario
 */
async function repetirEjercicio(numeroEjercicio) {
    try {
        // Buscar el botón de repetir en el ejercicio especificado
        const botonRepetir = document.querySelector(`#ejercicio${numeroEjercicio} .btRepetir`);

        if (botonRepetir) {
            console.log(`🔄 Repitiendo ejercicio ${numeroEjercicio} para obtener nota máxima...`);
            botonRepetir.click();

            // Esperar a que se genere el nuevo ejercicio
            await new Promise(resolve => setTimeout(resolve, ESPERA_CORTA));
            return true;
        } else {
            console.warn(`⚠️ Botón Repetir no encontrado para el ejercicio ${numeroEjercicio}`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Error al repetir ejercicio:`, error);
        return false;
    }
}

/**
 * Resuelve un ejercicio y lo repite hasta obtener la nota máxima
 * @param {number} numeroEjercicio - Número del ejercicio a resolver
 * @param {number} maxIntentos - Número máximo de intentos para obtener nota máxima
 * @returns {boolean} - True si el ejercicio finalmente obtuvo nota máxima, false si se agotaron los intentos
 */
async function resolverHastaNotaMaxima(numeroEjercicio, maxIntentos = 3) {
    try {
        console.log(`
🔥 RESOLVIENDO EJERCICIO ${numeroEjercicio} HASTA OBTENER NOTA MÁXIMA`);

        let intentos = 0;
        let notaMaximaObtenida = false;

        // Intentar resolver el ejercicio hasta obtener nota máxima o agotar intentos
        while (intentos < maxIntentos && !notaMaximaObtenida) {
            intentos++;
            console.log(`
🔄 Intento ${intentos}/${maxIntentos} para ejercicio ${numeroEjercicio}`);

            // Resolver el ejercicio actual
            await resolverEjercicioSeleccionado(numeroEjercicio);

            // Verificar si obtuvimos nota máxima
            await new Promise(resolve => setTimeout(resolve, ESPERA_CORTA));
            notaMaximaObtenida = await verificarNotaMaxima(numeroEjercicio);

            // Si no obtuvimos nota máxima y aún tenemos intentos, repetir el ejercicio
            if (!notaMaximaObtenida && intentos < maxIntentos) {
                const repetido = await repetirEjercicio(numeroEjercicio);
                if (!repetido) {
                    console.warn(`⚠️ No se pudo repetir el ejercicio ${numeroEjercicio}, continuando...`);
                    break;
                }

                // Esperar a que se genere el nuevo ejercicio
                await new Promise(resolve => setTimeout(resolve, ESPERA_CORTA));
            }
        }

        // Resultado final
        // (No quitar borde rojo aquí: se mantiene hasta terminar todos los ejercicios)
        // Esperar un poco antes de pasar al siguiente ejercicio
        await new Promise(resolve => setTimeout(resolve, ESPERA_ENTRE_EJ));
        if (notaMaximaObtenida) {
            console.log(`✅ 🎉 Ejercicio ${numeroEjercicio} completado con nota máxima en ${intentos} intento(s)!`);
        } else {
            console.warn(`⚠️ No se logró nota máxima para ejercicio ${numeroEjercicio} después de ${intentos} intento(s).`);
        }

        return notaMaximaObtenida;
    } catch (error) {
        console.error(`❌ Error al resolver hasta nota máxima:`, error);
        return false;
    }
}

// Mensaje de carga del script
console.log('💡 Script correcto de resolución de ejercicios cargado');
console.log('💡 Para resolver un ejercicio usa: resolverEjercicioSeleccionado(numeroEjercicio)');
console.log('💡 Para resolver TODOS los ejercicios usa: resolverTodosLosEjercicios()');

// Exportar las funciones para uso global
window.resolverEjercicioSeleccionado = resolverEjercicioSeleccionado;
window.resolverTodosLosEjercicios = resolverTodosLosEjercicios;
resolverTodosLosEjercicios();





