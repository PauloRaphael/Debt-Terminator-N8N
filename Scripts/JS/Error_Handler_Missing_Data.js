/**
 * DATA QUALITY CHECK: MISSING CONTACTS
 * ------------------------------------
 * Identifies processes where critical contact info is missing.
 */
const items = $input.all();

// Use "Trigger_Context" to imply a standard input interface
const clientName = $('Trigger_Context').first().json.Cliente.NomeCliente; 

const tableRowsJson = items.map(item => {
    const data = item.json.process;
    return {
        'Reference': data.HBL_Number || "N/A",
        'Origin': data.Origem || "-",
        'Destination': data.Destino || "-",
        'Event_Date': data.DataEventoPrincipal ? new Date(data.DataEventoPrincipal).toLocaleDateString('pt-BR') : null,
        'Client': clientName,
        'Issue': 'Missing Billing Email'
    };
});

return { CustomerInconsistencies: tableRowsJson };