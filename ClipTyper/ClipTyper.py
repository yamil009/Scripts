from textual.app import App, ComposeResult
from textual.widgets import Header, Footer, Static
from textual.containers import ScrollableContainer
import pyperclip
import keyboard
import time
from rich.panel import Panel
from rich.syntax import Syntax
from rich.console import Console
from rich.progress import Progress
from typing import Optional
import sys
from textual.reactive import reactive
from textual.timer import Timer

class ClipboardApp(App):
    def __init__(self):
        super().__init__()
        self.title = "ClipTyper"  # Cambiar el título de la aplicación
        self.clipboard_content = Static("")
        self.message_display = Static("")
        self.timer: Timer | None = None
        self.clipboard_text = reactive("")
        self.texto_anterior = ""
        self.estilos = {
            'exito': 'bold green',
            'error': 'bold red',
            'info': 'bold cyan',
            'advertencia': 'bold yellow',
            'normal': 'white',
            'destacado': 'bold magenta'
        }
        self.configurar_atajos()

    def compose(self) -> ComposeResult:
        # Usar el Header sin el argumento show_clock si no es compatible
        yield Header("📋 Mi Aplicación de Portapapeles")
        yield ScrollableContainer(self.clipboard_content)
        yield self.message_display
        footer_text = Static("Desarrollado con Textual y Rich ✨")
        yield Footer(footer_text)

    def on_mount(self) -> None:
        # Configurar un temporizador para actualizar el contenido del portapapeles cada segundo
        self.timer = self.set_interval(1, self.update_clipboard_content)

    def update_clipboard_content(self) -> None:
        # Obtener el contenido actual del portapapeles
        clipboard_text = pyperclip.paste()
        if clipboard_text != self.clipboard_text:
            self.clipboard_text = clipboard_text
            # Crear un widget Syntax para mostrar el texto con apariencia de editor para JavaScript
            syntax = Syntax(
                clipboard_text,
                "javascript",
                theme="dracula",
                line_numbers=True,
                word_wrap=True,
                indent_guides=True
            )
            # Crear un panel con el widget Syntax
            panel = Panel(
                syntax,
                title="[bold cyan]Contenido del Portapapeles[/bold cyan]",
                border_style="bold cyan"
            )
            # Actualizar el widget con el nuevo panel
            self.clipboard_content.update(panel)

    def configurar_atajos(self):
        try:
            keyboard.add_hotkey('ctrl+shift+insert', self.pegar_texto)
        except Exception as e:
            self.mostrar_error(f"Error al configurar atajos: {str(e)}")

    def mostrar_mensaje(self, mensaje: str, estilo: str = "white", titulo: Optional[str] = None):
        try:
            panel = Panel.fit(
                mensaje,
                style=estilo,
                border_style=estilo
            )
            # Actualizar el widget de mensaje con el nuevo panel
            self.message_display.update(panel)
        except Exception as e:
            print(f"Error al mostrar mensaje: {str(e)}")

    def pegar_texto(self):
        try:
            self.mostrar_mensaje(
                "Preparándose para pegar...",
                estilo=self.estilos['info']
            )
            
            with Progress() as progress:
                task = progress.add_task("[cyan]Pegado en...", total=1)
                while not progress.finished:
                    progress.update(task, advance=1)
                    time.sleep(1)
            
            texto = pyperclip.paste()
            if texto:
                self.mostrar_mensaje(
                    repr(texto),
                    estilo=self.estilos['destacado']
                )
                self.mostrar_mensaje(
                    "Escribiendo...",
                    estilo=self.estilos['exito']
                )
                keyboard.write(texto)
                self.mostrar_exito("Texto pegado correctamente.")
            else:
                self.mostrar_error("No hay texto en el portapapeles.")
        except Exception as e:
            self.mostrar_error(f"Error al pegar: {str(e)}")

    def mostrar_error(self, mensaje: str):
        self.mostrar_mensaje(mensaje, estilo=self.estilos['error'])

    def mostrar_exito(self, mensaje: str):
        self.mostrar_mensaje(mensaje, estilo=self.estilos['exito'])

    def salir(self):
        self.mostrar_mensaje("Saliendo...", estilo=self.estilos['advertencia'])
        sys.exit()

if __name__ == "__main__":
    app = ClipboardApp()
    app.run()