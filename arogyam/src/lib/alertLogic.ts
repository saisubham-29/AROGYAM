export function generateAlerts(data: {
  heartRate: number;
  oxygenLevel: number;
  systolic: number;
  diastolic: number;
}) {
  const alerts: { type: "critical" | "warning" | "alert"; message: string }[] = [];

  if (data.heartRate < 50 || data.heartRate > 110)
    alerts.push({ type: "alert", message: `Abnormal heart rate: ${data.heartRate} bpm` });

  if (data.oxygenLevel < 92)
    alerts.push({ type: "critical", message: `Critical oxygen level: ${data.oxygenLevel}%` });

  if (data.systolic > 140 || data.diastolic > 90)
    alerts.push({ type: "warning", message: `High blood pressure: ${data.systolic}/${data.diastolic} mmHg` });

  return alerts;
}
