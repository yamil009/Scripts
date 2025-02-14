import pyperclip
import time
from pynput.keyboard import Controller, Key
from pynput import keyboard as kb
from colorama import Fore, Style, init

# Inicializar colorama (para colores en la terminal)
init()

# Inicializar el controlador del teclado
keyboard = Controller()

def liberar_teclas_modificadoras():
    """Libera todas las teclas modificadoras para evitar conflictos."""
    for tecla in [Key.ctrl, Key.shift, Key.alt, Key.cmd]:
        keyboard.release(tecla)

def tipo_caracter(caracter):
    """Envía un carácter de manera segura."""
    try:
        if caracter == "\n":  # Manejar saltos de línea
            keyboard.press(Key.enter)
            keyboard.release(Key.enter)
            print(Fore.YELLOW + "\\n" + Style.RESET_ALL, end="", flush=True)  # Mostrar salto de línea
        elif caracter == "\t":  # Manejar tabulaciones
            keyboard.press(Key.tab)
            keyboard.release(Key.tab)
            print(Fore.YELLOW + "\\t" + Style.RESET_ALL, end="", flush=True)  # Mostrar tabulación
        else:
            keyboard.press(caracter)
            keyboard.release(caracter)
            print(Fore.GREEN + caracter + Style.RESET_ALL, end="", flush=True)  # Mostrar carácter
    except Exception as e:
        print(Fore.RED + f"\nError al escribir el carácter: {caracter} - {str(e)}" + Style.RESET_ALL)

def escribir_portapapeles():
    """Escribe el contenido del portapapeles carácter por carácter."""
    try:
        # Liberar todas las teclas modificadoras
        liberar_teclas_modificadoras()
        
        # Esperar 1 segundo para asegurar que el sistema libere las teclas
        time.sleep(1)
        
        # Obtener texto del portapapeles
        texto = pyperclip.paste()
        if not texto:
            print(Fore.RED + "El portapapeles está vacío." + Style.RESET_ALL)
            return
        
        # Mostrar el contenido del portapapeles
        print(Fore.CYAN + "\nContenido del portapapeles:" + Style.RESET_ALL)
        print(Fore.BLUE + texto + Style.RESET_ALL)
        
        # Escribir con delay configurable
        print(Fore.CYAN + "\nEscribiendo texto:" + Style.RESET_ALL)
        for caracter in texto:
            tipo_caracter(caracter)
            time.sleep(0.05)  # Delay entre caracteres
        
        print("\n" + Fore.GREEN + "Texto pegado correctamente." + Style.RESET_ALL)
            
    except Exception as e:
        print(Fore.RED + f"\nError inesperado: {str(e)}" + Style.RESET_ALL)

# Configurar el atajo (Ctrl + Shift + Insert)
def on_activate():
    """Función que se ejecuta al presionar la combinación de teclas."""
    print(Fore.MAGENTA + f"\nAtajo activado: Ctrl+Shift+Insert" + Style.RESET_ALL)
    escribir_portapapeles()

with kb.GlobalHotKeys({
    '<ctrl>+<shift>+<insert>': on_activate
}) as listener:
    print(Fore.CYAN + "Escuchando Ctrl+Shift+Insert (Presiona Esc para salir)" + Style.RESET_ALL)
    listener.join()