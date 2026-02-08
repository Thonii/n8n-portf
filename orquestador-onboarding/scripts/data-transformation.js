// Iteramos sobre TODOS los items que lleguen, no solo el primero
return items.map(item => {
    const input = item.json;
    // Aseguramos que fields exista para evitar errores rojos
    const fields = input.fields || {};

    return {
        json: {
            // ID original para futuras actualizaciones en Airtable
            airtableId: input.id,

            // Normalización del Nombre (Juan perez -> Juan Perez)
            clientName: fields.Cliente
                ? fields.Cliente.trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
                : 'Cliente Desconocido',

            // Slug para carpetas (Mi Empresa S.A. -> mi-empresa-s.a.)
            companySlug: fields.Empresa
                ? fields.Empresa.toLowerCase().trim().replace(/\s+/g, '-')
                : 'empresa-sin-nombre',

            // Fecha actual
            onboardingDate: new Date().toISOString().split('T')[0],

            // Email limpio
            safeEmail: fields.Email ? fields.Email.toLowerCase().trim() : null,

            // Tipo de servicio
            serviceType: fields.Servicio || 'Estandar'
        }
    };
});