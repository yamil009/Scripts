import os
from colorama import Fore, Style, init

# Inicializar colorama para asegurar que funcione en todas las plataformas
init(autoreset=True)

# Función para obtener el icono según la extensión del archivo
def obtener_icono_archivo(nombre_archivo):
    extension = os.path.splitext(nombre_archivo)[1].lower()
    if extension == '.py':
        return '🐍'  # Icono para archivos Python
    elif extension == '.txt':
        return '📝'  # Icono para archivos de texto
    elif extension == '.md':
        return '📂'  # Icono para archivos markdown
    elif extension in ['.json', '.xml']:
        return '💾'  # Icono para archivos de datos
    elif extension in ['.png', '.jpg', '.jpeg', '.gif']:
        return '🏙️'  # Icono para archivos de imagen
    else:
        return '📄'  # Icono para otros tipos de archivo

# Función para escribir en el archivo de salida con separación y formato mejorado
def escribir_contenido_archivo(ruta_archivo, archivo_proyecto, contador):
    try:
        with open(ruta_archivo, 'r', encoding='utf-8') as f:
            contenido = f.read()
        
        tamaño_archivo = os.path.getsize(ruta_archivo)
        archivo_proyecto.write(f"\n{'-' * 40}\n")
        archivo_proyecto.write(f"Archivo {contador}: {ruta_archivo}\n")
        archivo_proyecto.write(f"Tamaño: {tamaño_archivo} bytes\n")
        archivo_proyecto.write(f"{'-' * 40}\n")
        archivo_proyecto.write(contenido + "\n")
        archivo_proyecto.write(f"\n{'-' * 40}\n\n\n\n\n\n")
    
    except Exception as e:
        archivo_proyecto.write(f"\n{'-' * 40}\n")
        archivo_proyecto.write(f"Archivo {contador}: {ruta_archivo}\n")
        archivo_proyecto.write(f"{'-' * 40}\n")
        archivo_proyecto.write(f"Error: No se pudo leer el archivo ({e})\n")
        archivo_proyecto.write(f"{'-' * 40}\n\n\n\n\n\n")

def generar_arbol_directorio(directorio='.', carpetas_ignorar=None, archivos_ignorar=None):
    # Obtener el nombre del directorio actual y usarlo como nombre del archivo de salida
    nombre_directorio_actual = os.path.basename(os.path.abspath(directorio))
    archivo_salida = f"{nombre_directorio_actual}.txt"
    estructura_arbol = []

    if carpetas_ignorar is None:
        carpetas_ignorar = []
    if archivos_ignorar is None:
        archivos_ignorar = []

    archivos_ignorar.append(archivo_salida)

    espacio = '    '
    rama = '│   '
    archivo = '├── '
    ultimo_archivo = '└── '
    carpeta = '├── '
    ultima_carpeta = '└── '

    niveles_ramas = []
    contador = 1

    for root, dirs, files in os.walk(directorio):
        dirs[:] = [d for d in dirs if d not in carpetas_ignorar]
        files[:] = [f for f in files if f not in archivos_ignorar]

        dirs.sort()
        files.sort()

        nivel = root.replace(directorio, '').count(os.sep)

        if len(niveles_ramas) < nivel:
            niveles_ramas.append(True)
        elif len(niveles_ramas) > nivel:
            niveles_ramas = niveles_ramas[:nivel]

        carpeta_actual = os.path.basename(root)

        if nivel == 0:
            for file in files:
                icono = obtener_icono_archivo(file)
                print(f"{Fore.MAGENTA}{icono} {file}{Style.RESET_ALL}")
                estructura_arbol.append(f"{icono} {file}\n")
            continue

        if nivel == 1:
            indentacion = ''
        else:
            indentacion = ''.join(rama if show_rama else espacio for show_rama in niveles_ramas[:-1])

        es_ultima_carpeta = carpeta_actual == dirs[-1] if dirs else False
        carpeta_vacia = len(dirs) == 0 and len(files) == 0
        color_carpeta = Fore.RED if carpeta_vacia else Fore.BLUE
        carpeta_icono = "📂"

        if nivel == 1:
            print(f"{Style.BRIGHT}{color_carpeta}{carpeta_icono} {carpeta_actual}/{Style.RESET_ALL}")
            estructura_arbol.append(f"{carpeta_icono} {carpeta_actual}/\n")
        else:
            prefijo_carpeta = ultima_carpeta if es_ultima_carpeta else carpeta
            print(f"{indentacion}{Fore.LIGHTBLACK_EX}{prefijo_carpeta}{Style.BRIGHT}{color_carpeta}{carpeta_icono} {carpeta_actual}/{Style.RESET_ALL}")
            estructura_arbol.append(f"{indentacion}{prefijo_carpeta}{carpeta_icono} {carpeta_actual}/\n")

        niveles_ramas.append(not es_ultima_carpeta)

        for i, file in enumerate(files):
            es_ultimo_archivo = i == len(files) - 1
            prefijo_archivo = ultimo_archivo if es_ultimo_archivo else archivo
            if nivel == 1:
                indentacion = ''
            else:
                indentacion = ''.join(rama if show_rama else espacio for show_rama in niveles_ramas[:-1])

            icono = obtener_icono_archivo(file)
            print(f"{indentacion}{Fore.LIGHTBLACK_EX}{prefijo_archivo}{Fore.MAGENTA}{icono} {file}{Style.RESET_ALL}")
            estructura_arbol.append(f"{indentacion}{prefijo_archivo}{icono} {file}\n")

    with open(archivo_salida, "w", encoding='utf-8') as archivo_proyecto:
        archivo_proyecto.write("Estructura de Carpetas:\n")
        archivo_proyecto.write(''.join(estructura_arbol))

        for root, dirs, files in os.walk(directorio):
            dirs[:] = [d for d in dirs if d not in carpetas_ignorar]
            files[:] = [f for f in files if f not in archivos_ignorar]

            dirs.sort()
            files.sort()

            for file in files:
                ruta_archivo = os.path.join(root, file)
                escribir_contenido_archivo(ruta_archivo, archivo_proyecto, contador)
                contador += 1

# Listas de carpetas y archivos a ignorar
carpetas_ignorar = ['.git', '__pycache__', 'node_modules', '.obsidian']
archivos_ignorar = [__file__.split(os.sep)[-1]]

# Ejecutar la función
generar_arbol_directorio(directorio='.', carpetas_ignorar=carpetas_ignorar, archivos_ignorar=archivos_ignorar)
