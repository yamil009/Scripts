import os
import json
from rich.tree import Tree
from rich.console import Console
import argparse

# Definir colores
CARPETA_COLOR = "[magenta]"
ARCHIVO_COLOR = "[blue]"
RESET_COLOR = "[/]"

def obtener_icono_archivo(nombre_archivo):
    """Asigna un ícono a un archivo según su extensión."""
    extension = os.path.splitext(nombre_archivo)[1].lower()
    iconos = {
        '.py': '🐍', '.txt': '📝', '.md': '📂', '.json': '💾', '.xml': '💾',
        '.png': '🏙️', '.jpg': '🏙️', '.jpeg': '🏙️', '.gif': '🏙️',
        '.csv': '📊', '.xlsx': '📊', '.pdf': '📄', '.zip': '📦', '.exe': '⚙️',
        '.html': '🌐', '.css': '🎨', '.js': '📜', '.sql': '🗃️', '.log': '📋'
    }
    return iconos.get(extension, '📄')

def convertir_tamaño(bytes_tamaño):
    """Convierte el tamaño de un archivo a un formato legible."""
    unidades = ['B', 'KB', 'MB', 'GB', 'TB']
    tamaño = float(bytes_tamaño)
    unidad_index = 0
    while tamaño >= 1024 and unidad_index < len(unidades) - 1:
        tamaño /= 1024
        unidad_index += 1
    return f"{tamaño:.2f} {unidades[unidad_index]}"

def leer_contenido_archivo(ruta, max_tamaño=1024 * 1024):  # 1 MB
    """Lee el contenido de un archivo, limitado a un tamaño máximo."""
    try:
        tamaño = os.path.getsize(ruta)
        if tamaño > max_tamaño:
            return "Archivo demasiado grande para mostrar."
        with open(ruta, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception:
        return "No se pudo leer el contenido del archivo."

def generar_estructura_json(directorio='.', carpetas_ignorar=None, archivos_ignorar=None, max_profundidad=3):
    """Genera un archivo JSON con la estructura del directorio."""
    carpetas_ignorar = carpetas_ignorar or []
    archivos_ignorar = archivos_ignorar or []
    nombre_json = f"{os.path.basename(os.path.abspath(directorio))}.json"
    archivos_ignorar.extend(["directory.py", nombre_json])
    
    def recorrer_directorio(ruta, profundidad=0):
        if profundidad > max_profundidad:
            return None
        
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
                    subdirectorio = recorrer_directorio(item_ruta, profundidad + 1)
                    if subdirectorio:
                        estructura["contenido"].append(subdirectorio)
                elif os.path.isfile(item_ruta) and item not in archivos_ignorar:
                    try:
                        tamaño_bytes = os.path.getsize(item_ruta)
                        estructura["contenido"].append({
                            "nombre": item,
                            "ruta": os.path.abspath(item_ruta),
                            "tipo": "archivo",
                            "tamaño": convertir_tamaño(tamaño_bytes),
                            "contenido": leer_contenido_archivo(item_ruta)
                        })
                    except Exception as e:
                        estructura["contenido"].append({
                            "nombre": item,
                            "ruta": os.path.abspath(item_ruta),
                            "tipo": "archivo",
                            "error": str(e)
                        })
        except Exception as e:
            estructura["error"] = str(e)
        
        return estructura
    
    raiz = os.path.abspath(directorio)
    estructura_json = recorrer_directorio(raiz)
    estructura_json["nombre"] = os.path.basename(raiz)
    
    with open(nombre_json, "w", encoding='utf-8') as f:
        json.dump(estructura_json, f, indent=4, ensure_ascii=False)

def generar_arbol_directorio(directorio='.', carpetas_ignorar=None, archivos_ignorar=None, max_profundidad=3):
    """Genera un árbol visual del directorio usando Rich."""
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

def exportar_a_markdown(directorio='.', carpetas_ignorar=None, archivos_ignorar=None, max_profundidad=3, archivo_salida="estructura.md"):
    """Exporta la estructura del directorio a un archivo Markdown."""
    carpetas_ignorar = carpetas_ignorar or []
    archivos_ignorar = archivos_ignorar or []
    nombre_json = f"{os.path.basename(os.path.abspath(directorio))}.json"
    archivos_ignorar.extend(["directory.py", nombre_json])
    
    markdown = f"# Estructura del directorio: {os.path.basename(os.path.abspath(directorio))}\n\n"
    
    def recorrer_directorio_md(ruta, nivel=0):
        nonlocal markdown
        indentacion = "  " * nivel
        for item in sorted(os.listdir(ruta)):
            item_ruta = os.path.join(ruta, item)
            if os.path.isdir(item_ruta) and item not in carpetas_ignorar:
                markdown += f"{indentacion}- 📂 {item}\n"
                if nivel < max_profundidad:
                    recorrer_directorio_md(item_ruta, nivel + 1)
            elif os.path.isfile(item_ruta) and item not in archivos_ignorar:
                icono = obtener_icono_archivo(item)
                markdown += f"{indentacion}- {icono} {item}\n"
    
    recorrer_directorio_md(directorio)
    
    with open(archivo_salida, "w", encoding='utf-8') as f:
        f.write(markdown)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Genera un árbol de directorios y un archivo JSON con su estructura.")
    parser.add_argument("--dir", default=".", help="Directorio a analizar (por defecto: directorio actual)")
    parser.add_argument("--ignore", default=".git,__pycache__,node_modules", help="Carpetas y archivos a ignorar (separados por comas)")
    parser.add_argument("--max-depth", type=int, default=3, help="Profundidad máxima del árbol (por defecto: 3)")
    parser.add_argument("--export-md", action="store_true", help="Exportar la estructura a un archivo Markdown")
    args = parser.parse_args()

    carpetas_ignorar = args.ignore.split(",")
    archivos_ignorar = []

    generar_arbol_directorio(directorio=args.dir, carpetas_ignorar=carpetas_ignorar, archivos_ignorar=archivos_ignorar, max_profundidad=args.max_depth)
    generar_estructura_json(directorio=args.dir, carpetas_ignorar=carpetas_ignorar, archivos_ignorar=archivos_ignorar, max_profundidad=args.max_depth)

    if args.export_md:
        exportar_a_markdown(directorio=args.dir, carpetas_ignorar=carpetas_ignorar, archivos_ignorar=archivos_ignorar, max_profundidad=args.max_depth)

    # Esperar a que el usuario presione Enter antes de cerrar
    input("\nPresiona Enter para salir...")