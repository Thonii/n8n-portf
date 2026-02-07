PRD: Orquestador de Onboarding Automatizado (n8n + GCP)

1. Visión del Proyecto
Crear un motor de integración centralizado que elimine el 100% de las tareas manuales tras la firma de un nuevo cliente o contrato, asegurando que el ecosistema digital del cliente (archivos, tareas y comunicación) esté listo en tiempo real.

2. Definición del Problema
Latencia: El tiempo entre la venta y el inicio del servicio se ve afectado por procesos administrativos manuales.

Inconsistencia: Errores en la nomenclatura de carpetas o falta de asignación de tareas críticas en el gestor de proyectos.

Falta de Trazabilidad: Dificultad para saber si el cliente recibió toda la información inicial necesaria.

3. Alcance y Funcionalidades (Scopes)
Módulo A: Ingesta de Datos (Trigger)
Soporte Webhook: Escucha activa de eventos desde un CRM (HubSpot, Pipedrive) o base de datos (Airtable/PostgreSQL).

Validación: Verificación de campos obligatorios (Nombre Empresa, Email, Tipo de Servicio).

Módulo B: Aprovisionamiento de Infraestructura
Cloud Storage: Creación automática de una estructura de carpetas jerárquica (ej: [Nombre_Cliente]/Contratos, [Nombre_Cliente]/Assets).

Permisos: Asignación de permisos de lectura/escritura mediante API.

Módulo C: Gestión Operativa
Gestor de Proyectos: Creación de un "Tablero de Proyecto" basado en una plantilla predefinida según el servicio contratado.

Asignación de Tareas: Definición de responsables y fechas de entrega relativas a la fecha de onboarding.

Módulo D: Secuencia de Comunicación
Email Transaccional: Envío de un kit de bienvenida que incluya los enlaces generados en los Módulos B y C.

Notificaciones Internas: Alerta al equipo en Slack o Discord sobre el nuevo registro exitoso.

4. Stack Tecnológico Sugerido
Motor de Flujo: n8n (Self-hosted en Google Cloud Platform).

Lenguaje de Scripting: JavaScript (dentro de los nodos Code de n8n para transformaciones complejas).

Base de Datos de Estado (Opcional): Redis o una tabla en GCP para evitar duplicidad de ejecuciones.

Monitoreo: Integración con herramientas de logs para detectar fallos en los nodos.

5. Requerimientos No Funcionales
Manejo de Errores (Error Workflow): Si una API falla (ej. Google Drive está caído), el sistema debe reintentar o notificar al administrador sin detener el flujo completo.

Escalabilidad: Capacidad para manejar ráfagas de registros simultáneos mediante la configuración de colas en n8n.

Seguridad: Uso estricto de variables de entorno para las API Keys y OAuth2 para las conexiones con servicios externos.

![Diagrama de Flujo](./diagrama-flow.png)

