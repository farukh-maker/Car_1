export function exportTelemetryCSV(circuitName: string, dataRows: Record<string, string | number>[]) {
  if (!dataRows || dataRows.length === 0) return;

  const headers = Object.keys(dataRows[0]);
  const csvContent = [
    `# APEX PANTHEON FIA TELEMETRY SPEC v2.4`,
    `# TRACK: ${circuitName.toUpperCase()}`,
    `# TIMESTAMP: ${new Date().toISOString()}`,
    `# SAMPLING RATE: 1000Hz (VBOX DIFFERENTIAL GPS)`,
    headers.join(','),
    ...dataRows.map(row => headers.map(h => JSON.stringify(row[h] ?? '')).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `apex_telemetry_${circuitName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
