import os
import json
from rich.tree import Tree
from rich.console import Console

# Definir colores
CARPETA_COLOR = "[magenta]"
ARCHIVO_COLOR = "[blue]"
RESET_COLOR = "[/]"

def obtener_icono_archivo(nombre_archivo):
    extension = os.path.splitext(nombre_archivo)[1].lower()
    iconos = {
        '.py': '🐍', '.txt': '📝', '.md': '📂',
        '.json': '💾', '.xml': '💾', '.png': '🏙️', '.jpg': '🏙️', '.jpeg': '🏙️', '.gif': '🏙️'
    }
    return iconos.get(extension, '📄')

def convertir_tamaño(bytes_tamaño):
    unidades = ['B', 'KB', 'MB', 'GB', 'TB']
    tamaño = float(bytes_tamaño)
    unidad_index = 0
    while tamaño >= 1024 and unidad_index < len(unidades) - 1:
        tamaño /= 1024
        unidad_index += 1
    return f"{tamaño:.2f} {unidades[unidad_index]}"

def leer_contenido_archivo(ruta):
    try:
        with open(ruta, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception:
        return "No se pudo leer el contenido del archivo."

def generar_estructura_json(directorio='.', carpetas_ignorar=None, archivos_ignorar=None):
    carpetas_ignorar = carpetas_ignorar or []
    archivos_ignorar = archivos_ignorar or []
    nombre_json = f"{os.path.basename(os.path.abspath(directorio))}.json"
    archivos_ignorar.extend(["directory.py", nombre_json])
    
    def recorrer_directorio(ruta):
        estructura = {
            "nombre": os.path.basename(ruta),
            "ruta": os.path.abspath(ruta),
            "tipo": "carpeta",
            "contenido": []
        }
        
        try:
            for item in sorted(os.listdir(ruta)):
                item_ruta = os.path.join(ruta, item)
                if os.path.isdir(item_ruta) and item not in carpetas_ignorar:
                    estructura["contenido"].append(recorrer_directorio(item_ruta))
                elif os.path.isfile(item_ruta) and item not in archivos_ignorar:
                    tamaño_bytes = os.path.getsize(item_ruta)
                    estructura["contenido"].append({
                        "nombre": item,
                        "ruta": os.path.abspath(item_ruta),
                        "tipo": "archivo",
                        "tamaño": convertir_tamaño(tamaño_bytes),
                        "contenido": leer_contenido_archivo(item_ruta)
                    })
        except Exception as e:
            estructura["error"] = str(e)
        
        return estructura
    
    raiz = os.path.abspath(directorio)
    estructura_json = recorrer_directorio(raiz)
    estructura_json["nombre"] = os.path.basename(raiz)
    
    with open(nombre_json, "w", encoding='utf-8') as f:
        json.dump(estructura_json, f, indent=4, ensure_ascii=False)

def generar_arbol_directorio(directorio='.', carpetas_ignorar=None, archivos_ignorar=None):
    console = Console()
    carpetas_ignorar = carpetas_ignorar or []
    archivos_ignorar = archivos_ignorar or []
    nombre_json = f"{os.path.basename(os.path.abspath(directorio))}.json"
    archivos_ignorar.extend(["directory.py", nombre_json])
    
    tree = Tree(f"{CARPETA_COLOR}📂 {os.path.basename(os.path.abspath(directorio))}{RESET_COLOR}")
    
    for root, dirs, files in os.walk(directorio):
        dirs[:] = [d for d in dirs if d not in carpetas_ignorar]
        files[:] = [f for f in files if f not in archivos_ignorar]
        
        relative_path = os.path.relpath(root, directorio)
        branch = tree
        
        if relative_path != '.':
            parts = relative_path.split(os.sep)
            for part in parts:
                found = None
                for child in branch.children:
                    if child.label == f"{CARPETA_COLOR}📂 {part}{RESET_COLOR}":
                        found = child
                        break
                if found:
                    branch = found
                else:
                    branch = branch.add(f"{CARPETA_COLOR}📂 {part}{RESET_COLOR}")
        
        for d in dirs:
            branch.add(f"{CARPETA_COLOR}📂 {d}{RESET_COLOR}")
        
        for f in files:
            icono = obtener_icono_archivo(f)
            branch.add(f"{ARCHIVO_COLOR}{icono} {f}{RESET_COLOR}")
    
    console.print(tree)

# Listas de carpetas y archivos a ignorar
carpetas_ignorar = ['.git', '__pycache__', 'node_modules', '.obsidian']
archivos_ignorar = []

# Ejecutar la función
generar_arbol_directorio(directorio='.', carpetas_ignorar=carpetas_ignorar, archivos_ignorar=archivos_ignorar)
generar_estructura_json(directorio='.', carpetas_ignorar=carpetas_ignorar, archivos_ignorar=archivos_ignorar)
