# Arquitectura del Flujo

## Diagrama del Flujo de Trabajo (n8n)

El flujo implementado sigue una estructura lineal con validación temprana y ejecución paralela para eficiencia.

### Secuencia Paso a Paso

1.  **Ingesta (Airtable Trigger)**: Se activa cuando un nuevo registro entra en la vista "Por Procesar".
2.  **Transformación (Code JS)**: Normaliza nombres, genera slugs y limpia emails.
3.  **Validación (If Node)**:
    *   **False (Error)**: Envía una alerta a Discord indicando datos inválidos (ej. falta email).
    *   **True (Éxito)**: Continúa el proceso.
4.  **Infraestructura (Google Drive)**:
    *   **Create Main Folder**: Crea la carpeta raíz del cliente.
    *   **Ramificación Paralela**:
        *   `Create Contracts Folder`: Subcarpeta para contratos.
        *   `Create Assets Folder`: Subcarpeta para archivos.
    *   **Permissions**: Asigna permisos de edición al email del cliente sobre la carpeta raíz.
5.  **Gestión (Trello)**: Crea una tarjeta en el tablero de onboarding con la información y los links generados.
6.  **Persistencia (Airtable Update)**: Escribe la URL de la carpeta de Drive creada (`driveFolderUrl`) de vuelta en el registro original de Airtable.
7.  **Comunicación (Gmail)**: Envía el correo de bienvenida al cliente con los accesos.
8.  **Notificación Interna (Discord)**: Avisa al equipo por el canal privado que el onboarding ha finalizado exitosamente.

## Decisiones de Diseño

### 1. Lógica "Fail Fast" con Notificación
Se colocó un nodo condicional `If` inmediatamente después de la limpieza. Si los datos no son válidos, el flujo se detiene y avisa a Discord (nodo conectado a la salida "False"), evitando ejecuciones innecesarias de API y permitiendo corrección rápida.

### 2. Creación de Carpetas en Paralelo
Las carpetas "Contratos" y "Assets" se crean simultáneamente ramificando desde la "Main Folder" para reducir el tiempo total de ejecución.

### 3. Cierre de Ciclo (Write-back)
Se añadió un paso de actualización en Airtable (`Add Drive Link`) después de generar los recursos. Esto asegura que la base de datos central (Airtable) tenga siempre la referencia actualizada de los recursos externos creados.