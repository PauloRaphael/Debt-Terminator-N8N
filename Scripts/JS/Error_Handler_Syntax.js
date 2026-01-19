const input = $input.first().json;
const cliente = $('When Executed by Another Workflow').first().json.Cliente;
let emails = input.AVISTA.EmailClienteReal + input.APRAZO.EmailClienteReal;

// merge both AVISTA and APRAZO processes
const allProcesses = [
  ...(input.AVISTA?.processes || []),
  ...(input.APRAZO?.processes || [])
];

const tableRowsJson = allProcesses.map(proc => ({
  'Numero/HBL': proc.process.HBL_Numero || "",
  Origem: proc.process.Origem || "",
  Destino: proc.process.Destino || "",
  'Data Da Chegada/Saida': proc.process.DataEventoPrincipal 
      ? new Date(proc.process.DataEventoPrincipal).toLocaleDateString('pt-BR') 
      : null,
  'Nome Do Cliente': cliente.NomeCliente || "",
  'Inconsistência': `Emails cadastrados do cliente ou RO invalidos: ${emails}`
}));

return {
  CustomerInconsistencies: tableRowsJson
};
