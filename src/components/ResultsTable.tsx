'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BurstResult } from '@/types/burst';

interface ResultsTableProps {
  result: BurstResult;
}

export default function ResultsTable({ result }: ResultsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resultados del Cálculo</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="advanced">Avanzado</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Parámetro</TableHead>
                    <TableHead className="text-center font-semibold text-primary">
                      Upload
                    </TableHead>
                    <TableHead className="text-center font-semibold text-secondary">
                      Download
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Max Limit</TableCell>
                    <TableCell className="text-center">
                      {result.upload.maxLimit}
                    </TableCell>
                    <TableCell className="text-center">
                      {result.download.maxLimit}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Burst Limit</TableCell>
                    <TableCell className="text-center">
                      {result.upload.burstLimit}
                    </TableCell>
                    <TableCell className="text-center">
                      {result.download.burstLimit}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Burst Threshold</TableCell>
                    <TableCell className="text-center">
                      {result.upload.burstThreshold}
                    </TableCell>
                    <TableCell className="text-center">
                      {result.download.burstThreshold}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Burst Time</TableCell>
                    <TableCell className="text-center">
                      {result.upload.burstTime}s
                    </TableCell>
                    <TableCell className="text-center">
                      {result.download.burstTime}s
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="mt-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Parámetro</TableHead>
                    <TableHead className="text-center font-semibold text-primary">
                      Upload
                    </TableHead>
                    <TableHead className="text-center font-semibold text-secondary">
                      Download
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Limit At</TableCell>
                    <TableCell className="text-center">
                      {result.upload.limitAt}
                    </TableCell>
                    <TableCell className="text-center">
                      {result.download.limitAt}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Burst Duration</TableCell>
                    <TableCell className="text-center">
                      {result.upload.burstDuration.toFixed(2)}s
                    </TableCell>
                    <TableCell className="text-center">
                      {result.download.burstDuration.toFixed(2)}s
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>

        <Alert className="mt-4">
          <AlertDescription>
            <strong>Rate Limit:</strong> {result.rateLimit}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
