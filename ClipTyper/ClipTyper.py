import keyboard
import pyperclip
import time
from rich.console import Console
from rich.panel import Panel
from rich.text import Text
from rich.progress import Progress
from typing import Optional
import sys

class GestorPortapapeles:
    def __init__(self):
        self.console = Console()
        self.configurar_atajos()
        self.texto_anterior = ""
        self.estilos = {
            'exito': 'bold green',
            'error': 'bold red',
            'info': 'bold cyan',
            'advertencia': 'bold yellow',
            'normal': 'white',
            'destacado': 'bold magenta'
        }

    def configurar_atajos(self):
        try:
            keyboard.add_hotkey('ctrl+c', self.copiar_texto)
            keyboard.add_hotkey('ctrl+shift+insert', self.pegar_texto)
            keyboard.add_hotkey('esc', self.salir)
        except Exception as e:
            self.mostrar_error(f"Error al configurar atajos: {str(e)}")

    def mostrar_mensaje(self, mensaje: str, estilo: str = "white", titulo: Optional[str] = None):
        try:
            if titulo:
                panel = Panel.fit(
                    mensaje,
                    title=titulo,
                    style=estilo,
                    border_style=estilo,
                    title_align="center",
                    subtitle_align="center",
                    subtitle=f"[{estilo}] Subtítulo"
                )
            else:
                panel = Panel.fit(
                    mensaje,
                    style=estilo,
                    border_style=estilo
                )
            self.console.print(panel)
        except Exception as e:
            print(f"Error al mostrar mensaje: {str(e)}")

    def copiar_texto(self):
        try:
            keyboard.press_and_release('ctrl+c')
            time.sleep(0.1)
            texto = pyperclip.paste()
            
            if texto:
                if texto != self.texto_anterior:
                    self.texto_anterior = texto
                    self.mostrar_mensaje(
                        repr(texto),
                        estilo=self.estilos['exito'],
                        titulo="Texto copiado"
                    )
                else:
                    self.mostrar_mensaje(
                        "Texto ya copiado anteriormente",
                        estilo=self.estilos['advertencia']
                    )
            else:
                self.mostrar_error("No se pudo obtener texto del portapapeles.")
        except Exception as e:
            self.mostrar_error(f"Error al copiar: {str(e)}")

    def pegar_texto(self):
        try:
            self.mostrar_mensaje(
                "Preparándose para pegar...",
                estilo=self.estilos['info'],
                titulo="Estado"
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
                    estilo=self.estilos['destacado'],
                    titulo="Texto a escribir"
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

    def iniciar(self):
        try:
            self.mostrar_mensaje(
                "Script en ejecución",
                estilo=self.estilos['destacado'],
                titulo="Estado"
            )
            self.mostrar_mensaje(
                "Usa Ctrl+C para copiar y Ctrl+Shift+Insert para pegar.",
                estilo=self.estilos['info']
            )
            self.mostrar_mensaje(
                "Presiona ESC para salir.",
                estilo=self.estilos['error']
            )
            keyboard.wait('esc')
        except KeyboardInterrupt:
            self.mostrar_mensaje(
                "Programa terminado por el usuario.",
                estilo=self.estilos['advertencia']
            )
        except Exception as e:
            self.mostrar_error(f"Error fatal: {str(e)}")
        finally:
            self.limpiar_recursos()

    def limpiar_recursos(self):
        keyboard.unhook_all()

    def salir(self):
        self.mostrar_mensaje("Saliendo...", estilo=self.estilos['advertencia'])
        sys.exit()

if __name__ == "__main__":
    gestor = GestorPortapapeles()
    gestor.iniciar()
