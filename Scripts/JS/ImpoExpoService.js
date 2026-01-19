/**
 * LOGISTICS SPLITTER
 * ------------------
 * Splits a consolidated list of processes into Import vs Export arrays 
 * for targeted reporting.
 */
const mode = 'SPOT'; // or 'TERM' dynamically
const processes = $input.first().json[mode].processes;

let imports = [];
let exports = [];

processes.forEach(item => {
  // Check Movement Type (IMPO/EXPO)
  if(item.process.MovementType === "IMPO") {
    imports.push(item);
  } else {
    exports.push(item);
  }
});

return { imports, exports };