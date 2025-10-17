# 🌐 MikroTik Burst Simulator

[![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)](https://github.com/franvozzi/burst-simulator)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![Go](https://img.shields.io/badge/Go-1.23-00ADD8)](https://golang.org/)
[![MikroTik](https://img.shields.io/badge/MikroTik-RouterOS-blue)](https://mikrotik.com/)

Calculadora y simulador profesional para la configuración de límites de burst en routers MikroTik RouterOS. Desarrollada con Next.js 15, shadcn/ui y funciones serverless en Go.

---

## ✨ Características

* 🧮 **Cálculo Automático:** Calcula *Limit At* y *Burst Duration* en base a parámetros de entrada.
* 📊 **Simulación Visual:** Gráficos interactivos que muestran el comportamiento del burst en el tiempo.
* 🎨 **UI Moderna:** Interfaz responsive con shadcn/ui y Tailwind CSS.
* ⚡ **Alto Rendimiento:** Backend serverless en Go para cálculos rápidos.
* ✅ **Validación en Tiempo Real:** Feedback inmediato sobre la configuración.
* 📱 **Mobile Friendly:** Diseño completamente adaptable a dispositivos móviles.

---

## 🛠️ Tech Stack

### Frontend

* **Next.js 15** – Framework React con App Router y Turbopack.
* **shadcn/ui** – Componentes UI modernos y accesibles.
* **Tailwind CSS** – Framework CSS utility-first.
* **TypeScript** – Tipado estático.
* **Recharts** – Biblioteca de gráficos para React.
* **Vitest** – Framework de testing ultrarrápido.

### Backend

* **Go 1.23** – Lenguaje de alto rendimiento.
* **Vercel Serverless Functions** – Despliegue serverless.

---

## 📦 Instalación

```bash
git clone https://github.com/franvozzi/burst-simulator.git
cd burst-simulator
bun install
bun run dev
```

El servidor estará disponible en [http://localhost:3000](http://localhost:3000).

---

## 🧪 Testing

### Ejecutar tests

```bash
bun run test
```

### Tests con UI interactiva

```bash
bun run test:ui
```

### Reporte de cobertura

```bash
bun run test:coverage
```

### Tests de integración

```bash
vercel dev &
curl -X POST http://localhost:3000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{...}'
```

---

## 📊 API Endpoints

### **POST** `/api/calculate`

Calcula parámetros de burst optimizados.

#### Request Body

```json
{
  "maxLimitUpload": "512K",
  "maxLimitDownload": "1M",
  "burstLimitUpload": "1M",
  "burstLimitDownload": "2M",
  "burstThresholdUpload": "384K",
  "burstThresholdDownload": "750K",
  "burstTimeUpload": 6,
  "burstTimeDownload": 6,
  "priority": 8
}
```

#### Response

```json
{
  "upload": {
    "maxLimit": "512K",
    "burstLimit": "1M",
    "burstThreshold": "384K",
    "burstTime": 6,
    "limitAt": "384K",
    "burstDuration": 2
  },
  "download": { ... },
  "rateLimit": "512K/1M 1M/2M"
}
```

---

### **POST** `/api/simulate`

Genera datos de simulación para la visualización del burst.

---

## 🚀 Deployment

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/franvozzi/burst-simulator)

Desplegar a producción:

```bash
vercel --prod
```

### Variables de Entorno

No se requieren variables de entorno para este proyecto.

---

## 📁 Estructura del Proyecto

```plaintext
burst-simulator/
├── api/                  # Funciones serverless en Go
│   ├── calculate.go       # Endpoint de cálculo
│   ├── simulate.go        # Endpoint de simulación
│   └── *_test.go          # Tests unitarios
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/        # Componentes React
│   │   ├── ui/            # Componentes de shadcn/ui
│   │   ├── BurstForm.tsx
│   │   ├── BurstChart.tsx
│   │   └── ResultsTable.tsx
│   ├── lib/               # Utilidades
│   ├── types/             # Tipos TypeScript
│   └── utils/             # Funciones helper
├── vitest.config.ts       # Configuración de tests
├── tailwind.config.ts     # Configuración de Tailwind
└── vercel.json            # Configuración de Vercel
```

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! 💡

1. Haz un fork del proyecto.
2. Crea una rama de feature (`git checkout -b feature/AmazingFeature`).
3. Realiza tus cambios y commitea (`git commit -m 'feat: Add amazing feature'`).
4. Haz push a la rama (`git push origin feature/AmazingFeature`).
5. Abre un Pull Request.

---

## 📝 Convenciones de Commits

Este proyecto sigue las convenciones de [Conventional Commits](https://www.conventionalcommits.org/):

* `feat:` Nueva funcionalidad.
* `fix:` Corrección de errores.
* `docs:` Cambios en documentación.
* `style:` Formato o estilo de código.
* `refactor:` Refactorización.
* `test:` Nuevos tests.
* `chore:` Tareas de mantenimiento.

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo [LICENSE](LICENSE) para más información.

---

## 👨‍💻 Autor

**Francisco Vozzi**

* GitHub: [@franvozzi](https://github.com/franvozzi)
* LinkedIn: [Francisco Vozzi](https://linkedin.com/in/francisco-vozzi)

---

## 🙏 Agradecimientos

* [MikroTik](https://mikrotik.com/) – Por RouterOS y su documentación.
* [shadcn/ui](https://ui.shadcn.com/) – Por sus componentes UI.
* [Vercel](https://vercel.com/) – Por el hosting y serverless functions.

---

⭐ **Si este proyecto te fue útil, considera dejarle una estrella en GitHub!**

