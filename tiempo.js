// Objeto temporizador con métodos y mejoras
const tiempo = {
    detener() {
        if (!Ejercicio || !Ejercicio.mostrarTiempo) {
            this.mostrarError("Sistema de temporizador no disponible");
            return;
        }

        if (Ejercicio.intervalId) {
            clearInterval(Ejercicio.intervalId);
            Ejercicio.intervalId = null;
            this.actualizarEstadoPanel("⏹️ DETENIDO");
        } else {
            this.mostrarError("No hay temporizador activo para detener");
        }
        return this;
    },

    establecer(valor) {
        if (!Ejercicio || !Ejercicio.mostrarTiempo) {
            this.mostrarError("Sistema de temporizador no disponible");
            return;
        }

        if (valor === null || valor === undefined) {
            this.mostrarError("Debes especificar un valor en segundos");
            return;
        }

        valor = Number(valor);
        if (isNaN(valor) || valor <= 0) {
            this.mostrarError("El valor debe ser un número positivo");
            return;
        }

        if (Ejercicio.intervalId) {
            clearInterval(Ejercicio.intervalId);
        }

        Ejercicio.interval = valor;

        const itTiempo = document.getElementById("itTiempo");
        if (itTiempo) {
            itTiempo.value = valor;
        }

        Ejercicio.intervalId = setInterval(Ejercicio.mostrarTiempo, 1000);
        this.actualizarEstadoPanel(`⏱️ ${valor}s`);
        return this;
    },

    pausar() {
        if (!Ejercicio || !Ejercicio.mostrarTiempo) {
            this.mostrarError("Sistema de temporizador no disponible");
            return;
        }

        if (Ejercicio.intervalId) {
            clearInterval(Ejercicio.intervalId);
            Ejercicio._temporizadorPausado = true;
            this.actualizarEstadoPanel("⏸️ PAUSADO");
        } else {
            this.mostrarError("No hay temporizador activo para pausar");
        }
        return this;
    },

    reanudar() {
        if (!Ejercicio || !Ejercicio.mostrarTiempo) {
            this.mostrarError("Sistema de temporizador no disponible");
            return;
        }

        if (Ejercicio._temporizadorPausado) {
            Ejercicio.intervalId = setInterval(Ejercicio.mostrarTiempo, 1000);
            Ejercicio._temporizadorPausado = false;
            this.actualizarEstadoPanel(`▶️ ${Ejercicio.interval}s`);
        } else {
            this.mostrarError("El temporizador no está pausado");
        }
        return this;
    },

    estado() {
        if (!Ejercicio || !Ejercicio.mostrarTiempo) {
            this.mostrarError("Sistema de temporizador no disponible");
            return "No disponible";
        }

        if (!Ejercicio.intervalId && !Ejercicio._temporizadorPausado) {
            this.actualizarEstadoPanel("⚪ INACTIVO");
            return "inactivo";
        } else if (Ejercicio._temporizadorPausado) {
            this.actualizarEstadoPanel(`⏸️ PAUSADO (${Ejercicio.interval}s)`);
            return "pausado";
        } else {
            this.actualizarEstadoPanel(`▶️ ACTIVO (${Ejercicio.interval}s)`);
            return "activo";
        }
    },

    // Método para mostrar errores en el panel
    mostrarError(mensaje) {
        if (this.estadoElement) {
            this.estadoElement.textContent = `❌ Error: ${mensaje}`;
            this.estadoElement.style.color = '#e74c3c';
            setTimeout(() => {
                this.estadoElement.style.color = '#666';
                this.estado();
            }, 3000);
        }
        console.error(mensaje);
    },

    // Método para actualizar el estado en el panel
    actualizarEstadoPanel(estado) {
        if (this.estadoElement) {
            this.estadoElement.textContent = `Estado: ${estado}`;
            this.estadoElement.style.color = '#666';
        }
    },

    // Nuevo método para crear y mostrar el panel
    crearPanel() {
        // Crear el panel de temporizador
        const panel = document.createElement('div');
        panel.style.cssText = `
            position: fixed;
            top: 30px;
            right: 11px;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(2px);
            border: 1px solid rgba(163, 199, 84, 0.2);
            border-radius: 6px;
            box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px;
            z-index: 9999;
            padding: 12px;
            color: rgb(163, 199, 84);
            width: 260px;
        `;

        // Título del panel
        const titulo = document.createElement('div');
        titulo.textContent = '⏱️ Control de Temporizador';
        titulo.style.cssText = `
            margin: 0 0 10px 0;
            padding-bottom: 8px;
            border-bottom: 1px solid #ccc;
            color: #333;
            font-size: 16px;
            text-align: center;
        `;

        // Campo para establecer tiempo
        const contenedorTiempo = document.createElement('div');
        contenedorTiempo.style.cssText = 'display: flex; gap: 6px; margin-bottom: 10px; align-items: center;';
        const inputTiempo = document.createElement('input');
        inputTiempo.type = 'number';
        inputTiempo.min = '1';
        inputTiempo.placeholder = 'Segundos';
        inputTiempo.style.cssText = 'width: 80px; padding: 4px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px;';
        const btnEstablecer = document.createElement('button');
        btnEstablecer.textContent = 'Establecer';
        btnEstablecer.style.cssText = 'background-color: #3498db; color: white; border: none; border-radius: 4px; padding: 4px 10px; font-size: 13px; cursor: pointer;';
        contenedorTiempo.appendChild(inputTiempo);
        contenedorTiempo.appendChild(btnEstablecer);

        // Botones de control
        const contenedorBotones = document.createElement('div');
        contenedorBotones.style.cssText = `
            display: flex;
            gap: 8px;
            margin-bottom: 12px;
        `;

        // Botón de pausar/reanudar
        const btnPausar = document.createElement('button');
        btnPausar.textContent = '⏸️ Pausar';
        btnPausar.style.cssText = `
            background-color: #f39c12;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 8px 12px;
            font-size: 13px;
            cursor: pointer;
            flex: 1;
        `;

        // Botón de detener
        const btnDetener = document.createElement('button');
        btnDetener.textContent = '⏹️ Detener';
        btnDetener.style.cssText = `
            background-color: #e74c3c;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 8px 12px;
            font-size: 13px;
            cursor: pointer;
            flex: 1;
        `;

        // Estado del temporizador
        const estadoTemporizador = document.createElement('div');
        estadoTemporizador.textContent = 'Estado: Inactivo';
        estadoTemporizador.style.cssText = `
            font-size: 12px;
            margin-top: 10px;
            color: #666;
            font-style: italic;
        `;

        // Añadir elementos al panel
        contenedorBotones.appendChild(btnPausar);
        contenedorBotones.appendChild(btnDetener);
        panel.appendChild(titulo);
        panel.appendChild(contenedorTiempo);
        panel.appendChild(contenedorBotones);
        panel.appendChild(estadoTemporizador);

        // Botón de cerrar
        const btnCerrar = document.createElement('button');
        btnCerrar.innerHTML = '&times;';
        btnCerrar.title = 'Cerrar';
        btnCerrar.style.cssText = `
            position: absolute;
            top: 8px;
            right: 12px;
            background: transparent;
            border: none;
            font-size: 22px;
            cursor: pointer;
            color: #888;
            font-weight: bold;
            z-index: 1001;
        `;
        btnCerrar.addEventListener('mouseenter', () => btnCerrar.style.color = '#d00');
        btnCerrar.addEventListener('mouseleave', () => btnCerrar.style.color = '#888');
        btnCerrar.addEventListener('click', () => panel.remove());
        panel.appendChild(btnCerrar);

        // Añadir panel al cuerpo del documento
        document.body.appendChild(panel);

        // Eventos para los botones
        btnEstablecer.addEventListener('click', () => {
            const valor = parseInt(inputTiempo.value, 10);
            if (!isNaN(valor) && valor > 0) {
                this.establecer(valor);
            } else {
                this.mostrarError("El valor debe ser un número positivo");
            }
        });

        btnPausar.addEventListener('click', () => {
            if (Ejercicio._temporizadorPausado) {
                this.reanudar();
                btnPausar.textContent = '⏸️ Pausar';
            } else {
                this.pausar();
                btnPausar.textContent = '▶️ Reanudar';
            }
        });

        btnDetener.addEventListener('click', () => {
            this.detener();
            btnPausar.textContent = '⏸️ Pausar';
        });

        // Guardar referencia al elemento de estado
        this.estadoElement = estadoTemporizador;
    }
};

// Iniciar el panel al cargar
tiempo.crearPanel();