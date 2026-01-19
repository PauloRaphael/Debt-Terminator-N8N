let earliestDate = null;
let expeditionDate = null;

$input.all().forEach(item => {
  const dateStr = item.json.DataVencimento;
  const expeditionStr = item.json.DataEmissao;
  if (dateStr) {
    const date = new Date(dateStr);
    const expDate = new Date(expeditionStr);
    if (!earliestDate || date < new Date(earliestDate)) {
      earliestDate = dateStr;
      expeditionDate = expDate
    }
  }
});

return {
  expiryDate: earliestDate,
  expiry: earliestDate !== null,
  expeditionDate: expeditionDate
};