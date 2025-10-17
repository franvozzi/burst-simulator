/**
 * Convierte valores de velocidad a formato legible
 * Ejemplo: 1024 -> "1M", 512 -> "512K"
 */
export function formatSpeed(kbps: number): string {
  if (kbps >= 1000) {
    return `${(kbps / 1000).toFixed(0)}M`;
  }
  return `${kbps.toFixed(0)}K`;
}

/**
 * Parsea string de velocidad a número en Kbps
 * Ejemplo: "1M" -> 1000, "512K" -> 512
 */
export function parseSpeed(speed: string): number {
  const value = parseFloat(speed);
  if (speed.toUpperCase().includes('M')) {
    return value * 1000;
  }
  return value;
}

/**
 * Valida formato de velocidad
 */
export function isValidSpeed(speed: string): boolean {
  const regex = /^\d+(\.\d+)?(K|M)$/i;
  return regex.test(speed.trim());
}
