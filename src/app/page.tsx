'use client';

import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import BurstForm from '@/components/BurstForm';
import ResultsTable from '@/components/ResultsTable';
import BurstChart from '@/components/BurstChart';
import { BurstConfig, BurstResult, SimulationData } from '@/types/burst';
import { calculateBurst, simulateBurst } from '@/utils/burstCalculations';
import { AlertCircle } from 'lucide-react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BurstResult | null>(null);
  const [simulation, setSimulation] = useState<SimulationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (config: BurstConfig) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setSimulation(null);

    try {
      const [burstResult, simulationData] = await Promise.all([
        calculateBurst(config),
        simulateBurst(config),
      ]);

      setResult(burstResult);
      setSimulation(simulationData);
    } catch (err) {
      setError('Error al calcular los valores de burst. Verifica que el backend esté funcionando.');
      console.error('Error calculating burst:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary-custom text-white shadow-lg">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-3">
            Burst Limit Calculator
          </h1>
          <p className="text-base md:text-lg text-center opacity-95">
            Calculadora de Burst para Redes
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6">
          <BurstForm onCalculate={handleCalculate} loading={loading} />
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <div className="mb-6">
            <ResultsTable result={result} />
          </div>
        )}

        {simulation && (
          <div className="mb-6">
            <BurstChart data={simulation} />
          </div>
        )}

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Calculadora para configuración de límites de burst en routers MikroTik
          </p>
        </div>
      </div>
    </div>
  );
}
