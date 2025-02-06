import keyboard
import pyperclip
import time
import random
from colorama import Fore, Style, init

init(autoreset=True)  # Inicializa colorama para colores en la terminal

def copy_text():
    """Simula la acción de copiar (Ctrl+C) para almacenar en el portapapeles."""
    keyboard.press_and_release('ctrl+c')
    time.sleep(0.1)  # Espera breve para asegurarse de que el texto se copió
    text = pyperclip.paste()
    if text:
        print(Fore.GREEN + "Texto copiado:")
        print(Fore.YELLOW + repr(text))  # Mostrar texto conservando formato
    else:
        print(Fore.RED + "No se pudo copiar texto o el portapapeles está vacío.")


def paste_text():
    """Espera 3 segundos antes de simular la escritura del texto obtenido del portapapeles."""
    for i in range(3, 0, -1):
        print(Fore.BLUE + f"Pegado en {i}...")
        time.sleep(1)
    
    text = pyperclip.paste()
    if text:
        print(Fore.CYAN + "Texto a escribir:")
        print(Fore.YELLOW + repr(text))  # Mostrar texto conservando formato
        print(Fore.GREEN + "Escribiendo...")
        
        for line in text.split('\n'):
            keyboard.write(line)  # Escribe cada línea
            keyboard.press_and_release('enter')  # Simula Enter
            time.sleep(random.uniform(0.05, 0.1))  # Simula retardo aleatorio por línea
    else:
        print(Fore.RED + "No hay texto en el portapapeles.")

# Configurar los atajos de teclado
txt_copy_hotkey = 'ctrl+c'
txt_paste_hotkey = 'ctrl+shift+insert'
keyboard.add_hotkey(txt_copy_hotkey, copy_text)
keyboard.add_hotkey(txt_paste_hotkey, paste_text)

print(Fore.MAGENTA + f"Script en ejecución. Usa {txt_copy_hotkey} para copiar y {txt_paste_hotkey} para pegar.")
print(Fore.MAGENTA + "Presiona ESC para salir.")

# Mantener el script activo hasta que el usuario presione ESC
keyboard.wait('esc')
