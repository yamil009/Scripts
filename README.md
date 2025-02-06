# Directory.py

## Descripción
Este script genera una representación visual de la estructura de directorios y archivos de un proyecto, además de exportar la información en formato JSON. Utiliza la librería `rich` para mostrar la jerarquía con colores y símbolos.

## Características
- Muestra la estructura de archivos y carpetas en la terminal.
- Genera un archivo JSON con los detalles de cada archivo.
- Ignora carpetas y archivos específicos.

## Requisitos
Antes de ejecutar el script, asegúrate de tener instaladas las siguientes dependencias:

```sh
pip install rich
```

## Uso
Ejecuta el script en la terminal de la siguiente manera:

```sh
python directory.py
```

Por defecto, generará:
- Un árbol visual de la estructura de archivos en la terminal.
- Un archivo JSON con la información de cada archivo y carpeta.

## Personalización
Puedes modificar la lista de carpetas y archivos a ignorar dentro del script:

```python
carpetas_ignorar = ['.git', '__pycache__', 'node_modules', '.obsidian']
archivos_ignorar = []
```

## Autor
Desarrollado por Yamil.

## Licencia
Este proyecto está bajo la licencia MIT.

