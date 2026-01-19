/**
 * HTML BUILDER: SPOT PAYMENTS
 * ---------------------------
 * Generates responsive HTML tables for 'Pay Now' invoices.
 * Includes helpers for Currency and Date localization (pt-BR / en-US).
 */

const { imports = [], exports = [] } = $input.first().json;

// Helper: Currency Localization
function formatCurrency(value, currency = 'BRL') {
  return value != null
    ? value.toLocaleString('pt-BR', { style: 'currency', currency: currency })
    : "0.00";
}

// Helper: Date Localization
function formatDate(date) {
  return date ? new Date(date).toLocaleDateString("pt-BR") : "";
}

// 1. Build Import Table
let importTableHTML = "";
if (imports.length > 0) {
  const rows = imports.map(item => {
    const p = item.process;
    return `
      <tr>
        <td>${p.HBL_Number || ""}</td>
        <td>${p.ConsigneeName || ""}</td>
        <td>${p.Origin || ""}</td>
        <td>${p.Destination || ""}</td>
        <td>${formatDate(p.ArrivalDate)}</td>
        <td>${formatCurrency(item.totalLocal, 'BRL')}</td>
        <td>${formatCurrency(item.totalUSD, 'USD')}</td>
        <td>${formatCurrency(item.totalEUR, 'EUR')}</td>
      </tr>`;
  }).join('');

  importTableHTML = `
  <div class="content">
    <h3>Import Processes (Spot Payment)</h3>
    <table class="styled-table">
      <thead>
        <tr>
          <th>HBL</th><th>Consignee</th><th>Origin</th><th>Dest</th>
          <th>Arrival</th><th>Total (R$)</th><th>Total ($)</th><th>Total (€)</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`;
}

// 2. Build Export Table (Logic similar to above)
// ... [Export Table Logic]

return { importTableHTML, exportTableHTML };