import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MikroTik Burst Calculator | Academia de Entrenamientos',
  description: 'Calculadora profesional de Burst Limit para configuración de QoS en routers MikroTik',
  keywords: ['MikroTik', 'Burst', 'Calculator', 'Networking', 'QoS', 'RouterOS'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
