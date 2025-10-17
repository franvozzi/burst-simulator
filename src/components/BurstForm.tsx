'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, Loader2 } from 'lucide-react';
import { BurstConfig } from '@/types/burst';

interface BurstFormProps {
  onCalculate: (config: BurstConfig) => void;
  loading: boolean;
}

export default function BurstForm({ onCalculate, loading }: BurstFormProps) {
  const [config, setConfig] = useState<BurstConfig>({
    maxLimitUpload: '512K',
    maxLimitDownload: '1M',
    burstLimitUpload: '1M',
    burstLimitDownload: '2M',
    burstThresholdUpload: '384K',
    burstThresholdDownload: '750K',
    burstTimeUpload: 6,
    burstTimeDownload: 6,
    priority: 8,
  });

  const handleInputChange = (field: keyof BurstConfig, value: string | number) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Configuración de Burst</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upload */}
          <div className="space-y-4">
            <div className="bg-primary-custom text-white p-3 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-center">📤 Upload</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxLimitUpload">Max Limit (K/M)</Label>
              <Input
                id="maxLimitUpload"
                value={config.maxLimitUpload}
                onChange={(e) => handleInputChange('maxLimitUpload', e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="burstLimitUpload">Burst Limit (K/M)</Label>
              <Input
                id="burstLimitUpload"
                value={config.burstLimitUpload}
                onChange={(e) => handleInputChange('burstLimitUpload', e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="burstThresholdUpload">Burst Threshold (K/M)</Label>
              <Input
                id="burstThresholdUpload"
                value={config.burstThresholdUpload}
                onChange={(e) => handleInputChange('burstThresholdUpload', e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="burstTimeUpload">Burst Time (segundos)</Label>
              <Input
                id="burstTimeUpload"
                type="number"
                value={config.burstTimeUpload}
                onChange={(e) => handleInputChange('burstTimeUpload', parseInt(e.target.value) || 0)}
                className="h-11"
              />
            </div>
          </div>

          {/* Download */}
          <div className="space-y-4">
            <div className="bg-secondary-custom text-white p-3 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-center">📥 Download</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxLimitDownload">Max Limit (K/M)</Label>
              <Input
                id="maxLimitDownload"
                value={config.maxLimitDownload}
                onChange={(e) => handleInputChange('maxLimitDownload', e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="burstLimitDownload">Burst Limit (K/M)</Label>
              <Input
                id="burstLimitDownload"
                value={config.burstLimitDownload}
                onChange={(e) => handleInputChange('burstLimitDownload', e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="burstThresholdDownload">Burst Threshold (K/M)</Label>
              <Input
                id="burstThresholdDownload"
                value={config.burstThresholdDownload}
                onChange={(e) => handleInputChange('burstThresholdDownload', e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="burstTimeDownload">Burst Time (segundos)</Label>
              <Input
                id="burstTimeDownload"
                type="number"
                value={config.burstTimeDownload}
                onChange={(e) => handleInputChange('burstTimeDownload', parseInt(e.target.value) || 0)}
                className="h-11"
              />
            </div>
          </div>
        </div>

        {/* Priority */}
        <div className="mt-6 space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Input
            id="priority"
            type="number"
            value={config.priority}
            onChange={(e) => handleInputChange('priority', parseInt(e.target.value) || 8)}
            className="h-11"
          />
          <p className="text-sm text-muted-foreground">Valor entre 1 y 8 (recomendado: 8)</p>
        </div>

        {/* Button */}
        <Button
          className="w-full mt-6 h-14 text-lg font-semibold bg-primary-custom hover:bg-primary-custom-dark text-white shadow-lg"
          onClick={() => onCalculate(config)}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Calculando...
            </>
          ) : (
            <>
              <Calculator className="mr-2 h-5 w-5" />
              Calcular Burst
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
