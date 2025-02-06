# 🛠️ Colección de Scripts de Automatización

¡Bienvenido a este repositorio! Aquí encontrarás una colección de **scripts en Python** diseñados para automatizar tareas repetitivas, mejorar la productividad y facilitar el trabajo diario. 🚀

---

## 📌 Características Principales

✅ **Automatización de procesos comunes** para ahorrar tiempo.  
✅ **Código modular y bien documentado** para fácil reutilización.  
✅ **Uso de atajos de teclado y manipulación de datos.**  
✅ **Compatible con Windows y Linux.**  
✅ **Configuraciones personalizables.**  

---

## 📂 Estructura del Proyecto

```
📦 Scripts
 ├── 📂 Directory             # Generación de estructura de directorios y archivos
 │   ├── 📝 description_directory.md
 │   └── 📄 prompt_directory.txt
 ├── 📂 Glued                # Simulador de escritura automática
 │   ├── 📝 description_glued.md
 │   └── 🐍 glued.py
 ├── 📜 README.md            # Documentación del proyecto
```

Cada carpeta contiene un **script independiente** con su propia documentación y funcionalidad específica.

---

## 🚀 Instalación y Configuración

### 1️⃣ Requisitos Previos

Antes de ejecutar los scripts, instala las dependencias necesarias manualmente:

```sh
pip install keyboard pyperclip colorama pynput rich
```

### 2️⃣ Uso de los Scripts

Ejecuta cualquier script desde la terminal con:

```sh
python ruta/del/script.py
```

Por ejemplo, para ejecutar `glued.py`:

```sh
python Glued/glued.py
```

---

## 🎨 Personalización

Algunos scripts permiten modificar configuraciones dentro del código o archivos de configuración, como listas de carpetas a ignorar, velocidad de escritura, etc.

Ejemplo de configuración para `glued.py`:

```python
keyboard.write(line, delay=0.05)  # Ajustar la velocidad de escritura
```

---

## 📜 Licencia

Este proyecto está bajo la **Licencia MIT**. Puedes usarlo, modificarlo y compartirlo libremente. 💡

---

## 📞 Contacto y Contribuciones

Si deseas contribuir o tienes alguna sugerencia, no dudes en abrir un **issue** o un **pull request**. 😊

💌 **Contacto:** [Tu correo o redes sociales]

