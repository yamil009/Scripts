# Paso a paso para convertir el script en un ejecutable

##  1. Instalar PyInstaller
PyInstaller es una herramienta que convierte scripts de Python en archivos ejecutables independientes. Para instalarlo, abre una terminal y ejecuta:

```python
pip install pyinstaller
```

--- 

## 2. Preparar el script
Asegúrate de que tu script (ClipTyper.py) esté listo y funcione correctamente. Guárdalo en una carpeta dedicada, por ejemplo:

```python
C:\Scripts\ClipTyper.py
```

--- 

## 3. Crear el ejecutable

1. Abre una terminal y navega a la carpeta donde está tu script. Por ejemplo:

```python
cd C:\Scripts
```

2. Ejecuta el siguiente comando para crear el ejecutable:


```python
pyinstaller --onefile ClipTyper.py
```



- El parámetro --onefile le dice a PyInstaller que cree un único archivo ejecutable en lugar de varios archivos.

- PyInstaller analizará tu script y generará un archivo ejecutable en la carpeta dist.

---

## 4. Encontrar el ejecutable
Después de ejecutar el comando, PyInstaller creará varias carpetas en la misma ubicación que tu script:

- build: Contiene archivos temporales generados durante el proceso. Puedes ignorar esta carpeta.

- dist: Aquí encontrarás el archivo ejecutable generado (ClipTyper.exe en Windows o ClipTyper en Linux/macOS).

---

## 5. Mover el ejecutable a una carpeta en el PATH
Para poder ejecutar ClipTyper desde cualquier lugar, debes mover el archivo ejecutable a una carpeta que esté en el PATH de tu sistema.

En Windows:

1. Crea una carpeta para tus ejecutables:
Por ejemplo, C:\Scripts.

2. Mueve el archivo ejecutable:
Copia ClipTyper.exe desde la carpeta dist a C:\Scripts.

3. Agrega la carpeta al PATH:

- Haz clic derecho en "Este equipo" o "Mi PC" y selecciona "Propiedades".

- Haz clic en "Configuración avanzada del sistema".

- En la pestaña "Opciones avanzadas", haz clic en "Variables de entorno".

- En la sección "Variables del sistema", busca la variable Path y haz clic en "Editar".

- Haz clic en "Nuevo" y agrega la ruta de la carpeta (C:\Scripts).

- Haz clic en "Aceptar" para guardar los cambios.

---

## 4. Prueba el ejecutable:
Abre una nueva terminal y escribe:

```python
ClipTyper
```