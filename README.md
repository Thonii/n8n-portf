# 🚀 Client Onboarding Automation Workflow

Un flujo de trabajo automatizado en **n8n** que gestiona el ciclo de vida inicial de un cliente, desde la firma del contrato hasta el aprovisionamiento de infraestructura y comunicación.

## � Tech Stack
![n8n](https://img.shields.io/badge/n8n-Workflow-orange)
![Google Drive](https://img.shields.io/badge/Google_Drive-API-green)
![Trello](https://img.shields.io/badge/Trello-Management-blue)
![Discord](https://img.shields.io/badge/Discord-Alerts-purple)

## � Diagrama del Flujo

![Workflow Diagram](workflow.png)

## ⚡ Características Principales
1. **Validación de Datos:** Filtro inicial para asegurar integridad de contactos.
2. **Infraestructura como Código:** Generación dinámica de carpetas `[Slug] - [Cliente]`.
3. **Manejo de Errores:**
   - ✅ **Ruta de Éxito:** Notificación al cliente (Email) y al equipo (Discord #general).
   - ⚠️ **Ruta de Fallo:** Alerta inmediata en Discord (#alertas) si faltan datos críticos.
4. **Gestión de Estado:** Actualización bidireccional en Airtable para evitar duplicados.

## � Instalación
1. Importar el Flujo
En n8n, ve a Workflows > Add Workflow > Import from File y selecciona workflow.json.

2. Configurar "Variables Secretas"
Al importar, verás que los nodos tienen advertencias. Debes rellenar los siguientes campos que he dejado marcados con YOUR_...:

Airtable Trigger: Selecciona tu Base ID y Table ID.

Create Main Folder: Pega el ID de tu carpeta padre (ONboarding) en Parent ID.

Discord (Ambos nodos): Pega tu URL de Webhook en Webhook URL.

Trello: Selecciona tu List ID correcta.

Credenciales: Tendrás que volver a seleccionar tus credenciales guardadas en cada nodo (n8n no exporta las llaves por seguridad).