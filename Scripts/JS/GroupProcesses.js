/**
 * CORE LOGIC: PROCESS GROUPING SERVICE
 * ------------------------------------
 * Segregates processes into 'Spot' (Cash) vs 'Term' (Credit) buckets based on expiry rules.
 * Consolidates contact emails, prioritizing the Routing Order (RO) contact over the main client email if present.
 */

const data = $input.all();
const mainClientEmail = $('Trigger_Context').first().json.Client.MainEmail;

const groups = {
  SPOT: { RealClientEmail: "", processes: [] }, // Formerly AVISTA
  TERM: { RealClientEmail: "", processes: [] }  // Formerly APRAZO
};

let roEmailSpot = "";
let roEmailTerm = "";

// Iterate and sort based on payment terms
data.forEach(item => {
  const isTermPayment = item.json.expiry; // Boolean flag from previous logic

  // Priority Logic: Capture specific Routing Order email if available
  if (item.json.process.RoutingOrder) {
    const processEmail = item.json.process.EmailRO || "";
    if (isTermPayment && !roEmailTerm) roEmailTerm = processEmail;
    if (!isTermPayment && !roEmailSpot) roEmailSpot = processEmail;
  }

  // Bucket sorting
  if (isTermPayment) {
    groups.TERM.processes.push(item.json);
  } else {
    groups.SPOT.processes.push(item.json);
  }
});

// Helper: Merge and Deduplicate Emails
function mergeEmails(primary, secondary) {
  const primaryArr = primary ? primary.split(/[,;]/).map(e => e.trim()).filter(Boolean) : [];
  const emailSet = new Set(primaryArr);
  
  if (secondary) {
    secondary.split(/[,;]/).map(e => e.trim()).filter(Boolean).forEach(e => emailSet.add(e));
  }
  return Array.from(emailSet).join(",");
}

groups.SPOT.RealClientEmail = mergeEmails(mainClientEmail, roEmailSpot);
groups.TERM.RealClientEmail = mergeEmails(mainClientEmail, roEmailTerm);

return [{ json: groups }];