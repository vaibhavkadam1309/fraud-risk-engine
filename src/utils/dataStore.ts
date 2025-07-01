const ipStore = new Set<string>();
const deviceStore = new Set<string>();

export function isRepeatIp(ip: string): boolean {
  const exists = ipStore.has(ip);
  ipStore.add(ip);
  return exists;
}

export function isRepeatDevice(device: string): boolean {
  const exists = deviceStore.has(device);
  deviceStore.add(device);
  return exists;
}

interface Evaluation {
  id: string;
  amount: number;
  riskLevel: 'low' | 'medium' | 'high';
  explanation: string;
}

export const evaluations: Evaluation[] = [];