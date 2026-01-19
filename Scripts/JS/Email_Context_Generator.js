/**
 * EMAIL CONTEXT GENERATOR: TERM (CREDIT) PAYMENTS
 * -----------------------------------------------
 * Generates the email payload specifically for Credit clients.
 * Prioritizes Account Statements over Invoice logic.
 */

// 1. Fetch Context
const clientData = $('Trigger_Context').first().json.Cliente;
const config = $('Config_Node').first().json;
const termGroup = $('Process_Grouper_Service').first().json.TERM; // "APRAZO" in old code

// 2. Logic: Copy (CC) Management
// Checks if any Export Routing Orders exist in the Term bucket
const hasExpoRoutingOrder = $('Logistics_Splitter_Term').first().json.exports
  .some(item => item.process.RoutingOrder === true && item.process.LoadType !== 'LCL');

const additionalCopy = hasExpoRoutingOrder ? config.cc_policy_expo_ro : "";
const collectorEmail = $('Trigger_Context').first().json.CollectorEmail;

// Construct Final CC String
let finalCopy = config.base_cc;
if (additionalCopy) finalCopy += `, ${additionalCopy}`;
if (collectorEmail) finalCopy += `, ${collectorEmail}`;

// 3. Hydrate Template
let emailBody = config.html_template_term;
emailBody = emailBody.replace(
  "{{CHARGE_TABLES}}", 
  `${$input.first().json.importTableHTML} <br> ${$input.first().json.exportTableHTML}`
);

return {
  customerName: clientData.NomeCliente,
  emailFrom: config.sender_address,
  emailTo: termGroup.RealClientEmail,
  cc: finalCopy,
  html: emailBody
};