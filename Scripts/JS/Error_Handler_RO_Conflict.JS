/**
 * INTEGRITY CHECK: ROUTING ORDER CONFLICTS
 * ----------------------------------------
 * Validates that a single Routing Order does not have conflicting billing emails.
 */
const items = $input.all();
const emails = items.map(item => item.json.process?.EmailRO || null);

// Logic: Check for nulls or multiple different emails
const allNull = emails.every(e => e === null);
const allSame = emails.every(e => e === emails[0]);
const hasNull = emails.includes(null);

let statusMsg;
if (allNull) {
    statusMsg = "CRITICAL: No email found for RO";
} else if (!allSame || hasNull) {
    statusMsg = "WARNING: Multiple/Conflicting emails for single RO";
} else {
    statusMsg = "VALID";
}

const tableRowsJson = items.map(item => {
    const data = item.json.process;
    return {
        'Reference': data.HBL_Number,
        'Origin': data.Origem,
        'Client': $('Trigger_Context').first().json.Cliente.NomeCliente,
        'Status': statusMsg
    };
});

return { CustomerInconsistencies: tableRowsJson };