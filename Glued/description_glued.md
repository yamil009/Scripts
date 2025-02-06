# Simulador de Escritura Automática

Este script en Python simula la escritura por teclado de manera automática, conservando el formato del texto original.

## Características
✅ Simulación realista de escritura con variabilidad en la velocidad.  
✅ Soporta caracteres especiales, saltos de línea e indentación.  
✅ Cuenta regresiva antes de comenzar a escribir.  
✅ Uso de combinaciones de teclas globales para copiar y pegar texto.  

## Requisitos
Antes de ejecutar el script, asegúrate de tener instaladas las siguientes librerías:

```sh
pip install keyboard pyperclip colorama
```

## Uso
1. Ejecuta el script en una terminal:
   ```sh
   python script.py
   ```
2. Copia cualquier texto con `Ctrl + C`.
3. Para pegar simulando la escritura, usa `Ctrl + Shift + Insert`.
4. Puedes salir del programa presionando `ESC`.

## Configuración
Si deseas modificar la velocidad de escritura, puedes ajustar la variable `delay` dentro del código:
```python
keyboard.write(line, delay=0.05)
```

## Licencia
Este proyecto está bajo la licencia MIT. ¡Siéntete libre de usarlo y mejorarlo! 🚀

