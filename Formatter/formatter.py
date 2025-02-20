import os
import jsbeautifier
import cssbeautifier
import autopep8
from rich.console import Console
from rich.table import Table
from rich.progress import Progress, SpinnerColumn, TextColumn
from rich.progress import BarColumn, TaskProgressColumn
from rich import print as rprint
from datetime import datetime

class FormateadorProyecto:
    def __init__(self):
        self.console = Console()
        self.archivos_procesados = []
        self.archivos_error = []
        self.contador_archivos = {
            'js': 0,
            'css': 0,
            'html': 0
        }
        
    def formatear_archivo(self, ruta_archivo):
        try:
            # Determinar el tipo de archivo y su formateador
            if ruta_archivo.endswith('.js'):
                formateador = jsbeautifier
                opciones = {
                    'indent_size': 4,
                    'indent_char': ' ',
                    'unformatted': ['a', 'sub', 'area', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'],
                    'preserve_newlines': True,
                    'max_preserve_newlines': 5,
                    'jshint_happy': True,
                    'keep_array_indentation': True,
                    'brace_style': 'collapse',
                    'break_chained_methods': True,
                    'eval_code': False,
                    'unescape_strings': False
                }
                funcion = formateador.beautify
                
            elif ruta_archivo.endswith('.css'):
                formateador = cssbeautifier
                opciones = {
                    'indent_size': 4,
                    'indent_char': ' ',
                    'space_around_selector_separator': True,
                    'space_between_declarations': True,
                    'space_after_colon': True,
                    'space_after_comma': True,
                    'space_after_opening_brace': True,
                    'space_before_closing_brace': True,
                    'space_before_colon': False,
                    'space_after_selector_separator': True,
                    'space_after_property_name': True,
                    'space_after_property_value': True,
                    'space_around_combinator': True,
                    'space_around_operator': True,
                    'space_between_property_name_and_colon': False,
                    'space_before_property_name': False,
                    'space_before_value': False,
                    'space_between_values': True,
                    'space_after_line_break': True,
                    'space_after_at_rule': True,
                    'space_after_rule_set': True,
                    'space_after_rule_set_end': True,
                    'space_after_important': True,
                    'space_after_media_feature': True,
                    'space_after_media_feature_colon': True,
                    'space_before_media_feature': False,
                    'space_before_media_feature_colon': False,
                    'space_before_media_feature_value': False,
                    'space_after_media_feature_value': True,
                    'space_before_selector': False,
                    'space_after_selector': True,
                    'space_before_opening_brace': True,
                    'space_after_opening_brace': False,
                    'space_before_closing_brace': False,
                    'space_after_closing_brace': True,
                    'space_before_rule_set': False,
                    'space_after_rule_set': True,
                    'space_before_at_rule': False,
                    'space_after_at_rule': True,
                    'space_before_important': False,
                    'space_after_important': True,
                    'space_before_media_feature': False,
                    'space_after_media_feature': True,
                    'space_before_media_feature_colon': False,
                    'space_after_media_feature_colon': True,
                    'space_before_media_feature_value': False,
                    'space_after_media_feature_value': True,
                    'space_before_selector': False,
                    'space_after_selector': True,
                    'space_before_opening_brace': True,
                    'space_after_opening_brace': False,
                    'space_before_closing_brace': False,
                    'space_after_closing_brace': True,
                    'space_before_rule_set': False,
                    'space_after_rule_set': True,
                    'space_before_at_rule': False,
                    'space_after_at_rule': True,
                    'space_before_important': False,
                    'space_after_important': True
                }
                funcion = formateador.beautify
                
            elif ruta_archivo.endswith('.html'):
                opciones = {
                    'indent_size': 4,
                    'indent_char': ' ',
                    'unformatted': ['a', 'sub', 'area', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'],
                    'preserve_newlines': True,
                    'max_preserve_newlines': 5,
                    'jshint_happy': True,
                    'keep_array_indentation': True,
                    'brace_style': 'collapse',
                    'break_chained_methods': True,
                    'eval_code': False,
                    'unescape_strings': False
                }
                funcion = formateador.beautify
                
            else:
                self.console.print(f"[yellow]⚠️ Archivo ignorado: {ruta_archivo} (tipo no soportado)[/yellow]")
                return True
                
            # Leer y formatear el archivo
            with open(ruta_archivo, 'r', encoding='utf-8') as archivo:
                contenido = archivo.read()
                
            contenido_formateado = funcion(contenido, opts=opciones)
            
            # Guardar el contenido formateado
            with open(ruta_archivo, 'w', encoding='utf-8') as archivo:
                archivo.write(contenido_formateado)
                
            # Actualizar contador
            extension = ruta_archivo.split('.')[-1]
            self.contador_archivos[extension] += 1
            self.archivos_procesados.append(ruta_archivo)
            return True
            
        except Exception as e:
            self.archivos_error.append((ruta_archivo, str(e)))
            return False

    def formatear_proyecto(self, directorio_raiz):
        try:
            if not os.path.exists(directorio_raiz):
                self.console.print(f"[red]❌ El directorio {directorio_raiz} no existe[/red]")
                return
                
            self.console.print("[bold cyan]🚀 Iniciando formateo del proyecto...[/bold cyan]")
            
            # Encontrar todos los archivos primero para calcular el total
            total_archivos = 0
            for _, _, archivos in os.walk(directorio_raiz):
                total_archivos += sum(1 for archivo in archivos if archivo.endswith(('.js', '.html', '.css')))
            
            # Configurar la barra de progreso con colores y spinner
            spinner = SpinnerColumn("simpleDots")
            texto = TextColumn("[progress.description]{task.description}")
            barra = BarColumn(complete_style="cyan", finished_style="green")
            progreso = TaskProgressColumn()
            
            with Progress(
                spinner,
                texto,
                barra,
                progreso,
                refresh_per_second=10
            ) as progress:
                tarea = progress.add_task("[green]Procesando archivos...", total=total_archivos)
                
                for raiz, carpetas, archivos in os.walk(directorio_raiz):
                    for archivo in archivos:
                        if archivo.endswith(('.js', '.html', '.css')):
                            ruta_completa = os.path.join(raiz, archivo)
                            self.formatear_archivo(ruta_completa)
                            progress.update(tarea, advance=1)
                
            self.mostrar_informe()
            
        except Exception as e:
            self.console.print(f"[red]❌ Error al procesar el directorio: {str(e)}[/red]")

    def mostrar_informe(self):
        """
        Muestra un informe detallado del proceso de formateo
        """
        self.console.print("\n[bold cyan]📊 Informe de Formateo[/bold cyan]")
        self.console.print("=" * 50)
        
        # Mostrar resumen por tipo de archivo
        resumen = Table(show_header=True, header_style="bold magenta")
        resumen.add_column("Tipo")
        resumen.add_column("Cantidad")
        
        # Contar todos los archivos existentes
        contador_total = {
            'js': 0,
            'css': 0,
            'html': 0
        }
        
        for raiz, _, archivos in os.walk("."):
            for archivo in archivos:
                if archivo.endswith('.js'):
                    contador_total['js'] += 1
                elif archivo.endswith('.css'):
                    contador_total['css'] += 1
                elif archivo.endswith('.html'):
                    contador_total['html'] += 1
        
        # Mostrar solo los tipos que tienen archivos
        for tipo in contador_total:
            if contador_total[tipo] > 0:
                resumen.add_row(
                    f"[{tipo}]{tipo.upper()}[/{tipo}]",
                    str(contador_total[tipo])
                )
        
        self.console.print("\n[bold cyan]📊 Resumen por tipo de archivo[/bold cyan]")
        self.console.print(resumen)
        
        # Mostrar detalles de cada archivo
        table = Table(show_header=True, header_style="bold magenta")
        table.add_column("Estado")
        table.add_column("Tipo")
        table.add_column("Archivo")
        table.add_column("Ruta")
        
        for archivo in self.archivos_procesados:
            tipo = archivo.split('.')[-1]
            # Aplicar colores según el tipo de archivo
            if tipo == 'js':
                color = "orange1"
            elif tipo == 'css':
                color = "blue"
            else:
                color = "red"
                
            table.add_row(
                "✅",
                f"[{color}]{tipo.upper()}[/{color}]",
                os.path.basename(archivo),
                archivo
            )
            
        for archivo, error in self.archivos_error:
            tipo = archivo.split('.')[-1]
            table.add_row(
                "❌",
                f"[red]{tipo.upper()}[/red]",
                os.path.basename(archivo),
                f"{archivo} - {error}"
            )
            
        self.console.print("\n[bold cyan]📋 Detalles de los archivos procesados[/bold cyan]")
        self.console.print(table)

if __name__ == "__main__":
    formateador = FormateadorProyecto()
    formateador.formatear_proyecto(".")