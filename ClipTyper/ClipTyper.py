import keyboard
import pyperclip
import time
from rich.console import Console
from rich.panel import Panel
from rich.text import Text
from rich.progress import Progress

# Inicializar Rich
console = Console()

def mostrar_mensaje(mensaje, estilo="bold green", titulo=None):
    """Muestra un mensaje en un panel con estilo."""
    if titulo:
        panel = Panel.fit(mensaje, title=titulo, style=estilo)
    else:
        panel = Panel.fit(mensaje, style=estilo)
    console.print(panel)

def copiar_texto():
    """Simula la acción de copiar (Ctrl+C) y muestra el texto copiado."""
    keyboard.press_and_release('ctrl+c')
    time.sleep(0.1)  # Espera breve para asegurar que el texto se copió
    texto = pyperclip.paste()
    
    if texto:
        mostrar_mensaje(repr(texto), titulo="Texto copiado", estilo="bold cyan")
    else:
        mostrar_mensaje("No se pudo copiar texto o el portapapeles está vacío.", estilo="bold red")

def pegar_texto():
    """Espera 3 segundos y luego pega el texto del portapapeles rápidamente."""
    mostrar_mensaje("Preparándose para pegar...", estilo="bold cyan")
    
    # Cuenta regresiva antes de pegar
    with Progress() as progress:
        tarea = progress.add_task("[cyan]Pegado en...", total=3)
        while not progress.finished:
            progress.update(tarea, advance=1)
            time.sleep(1)
    
    texto = pyperclip.paste()
    if texto:
        mostrar_mensaje(repr(texto), titulo="Texto a escribir", estilo="bold cyan")
        mostrar_mensaje("Escribiendo...", estilo="bold green")
        
        # Escribir el texto completo de una vez (más rápido)
        keyboard.write(texto)
        
        mostrar_mensaje("Texto pegado correctamente.", estilo="bold green")
    else:
        mostrar_mensaje("No hay texto en el portapapeles.", estilo="bold red")

# Configurar los atajos de teclado
atajo_copiar = 'ctrl+c'
atajo_pegar = 'ctrl+shift+insert'
keyboard.add_hotkey(atajo_copiar, copiar_texto)
keyboard.add_hotkey(atajo_pegar, pegar_texto)

# Mensaje de inicio
mostrar_mensaje("Script en ejecución", titulo="Estado", estilo="bold magenta")
console.print(f"Usa [bold cyan]{atajo_copiar}[/] para copiar y [bold cyan]{atajo_pegar}[/] para pegar.", style="bold magenta")
console.print("Presiona [bold red]ESC[/] para salir.", style="bold magenta")

# Mantener el script activo hasta que el usuario presione ESC
keyboard.wait('esc')