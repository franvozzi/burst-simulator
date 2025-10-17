'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SimulationData } from '@/types/burst';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface BurstChartProps {
  data: SimulationData;
}

export default function BurstChart({ data }: BurstChartProps) {
  if (!data.upload.length || !data.download.length) {
    return (
      <Card className="shadow-lg">
        <CardContent className="pt-6">
          <p className="text-muted-foreground">No hay datos de simulación para mostrar</p>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.upload.map((point, index) => ({
    time: point.time,
    upload: point.speed,
    download: data.download[index]?.speed || 0,
  }));

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Simulación de Burst en el Tiempo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="time"
                label={{ value: 'Tiempo (segundos)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis label={{ value: 'Velocidad (Kbps)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="upload"
                stroke="#1976d2"
                strokeWidth={2}
                name="Upload"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="download"
                stroke="#dc004e"
                strokeWidth={2}
                name="Download"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Alert className="mt-4">
          <AlertDescription>
            <strong>Nota:</strong> El gráfico muestra cómo la velocidad alcanza el Burst Limit
            durante el Burst Time, y luego desciende gradualmente hasta el Max Limit.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
