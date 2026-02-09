# Arquitectura del Flujo

## Decisiones de Diseño

### 1. Lógica "Fail Fast" (Nodo If)
Se colocó un nodo condicional inmediatamente después de la limpieza de datos.
* **Motivo:** Evitar llamadas a la API de Google Drive si el cliente no tiene email.
* **Resultado:** Ahorro de recursos y prevención de carpetas "huérfanas" sin acceso.

### 2. Creación de Carpetas en Paralelo
Las carpetas "Contratos" y "Assets" se crean simultáneamente ramificando desde la "Main Folder".
* **Motivo:** Eficiencia. No es necesario esperar a que se cree una para crear la otra.
* **Dependencia:** Ambas dependen del ID de la "Main Folder" (Parent ID).

### 3. Asignación de Permisos
El nodo de permisos (`Share file`) se coloca al final y referencia al ID de la "Main Folder" mediante expresión absoluta `$('Create Main Folder').item.json.id`.
* **Motivo:** Asegurar que el cliente tenga acceso recursivo a todo el contenido, no solo a la última sub-carpeta creada.