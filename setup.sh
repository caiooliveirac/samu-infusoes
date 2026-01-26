#!/bin/bash

echo "🚀 Iniciando migração do SAMU Infusões..."

# 1. Configurar git (se nÃ£o estiver)
git config --global user.email "voce@exemplo.com"
git config --global user.name "Seu Nome"

# 2. Criar estrutura de pastas
mkdir -p src/components src/data src/utils .github/workflows

# 3. Criar Arquivos de Configuração
cat <<EOF > package.json
{
  "name": "samu-infusions",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.3",
    "typescript": "^5.2.2",
    "vite": "^5.2.0",
    "vite-plugin-pwa": "^0.20.0"
  }
}
EOF

cat <<EOF > tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

cat <<EOF > tsconfig.node.json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
EOF

cat <<EOF > vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'SAMU Infusões',
        short_name: 'Infusões',
        description: 'Calculadora de infusões de drogas vasoativas para SAMU 192',
        theme_color: '#0f172a',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
EOF

cat <<EOF > tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: { 950: '#020617' },
        cyan: { 400: '#22d3ee' }
      }
    },
  },
  plugins: [],
}
EOF

cat <<EOF > postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

cat <<EOF > index.html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SAMU Infusões</title>
  </head>
  <body class="bg-slate-950 text-slate-50 antialiased selection:bg-cyan-500 selection:text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

# 4. Criar Código Fonte (SRC)

cat <<EOF > src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

cat <<EOF > src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
}

body { margin: 0; display: flex; place-items: center; min-width: 320px; min-height: 100vh; }
#root { width: 100%; }
EOF

cat <<EOF > src/types.ts
export interface DrugPresentation {
  ampoule_ml: number;
  mg_ml: number;
}

export interface StandardDilution {
  syringe_ml: number;
  num_ampoules?: number;
  drug_volume_ml: number;
  diluent_volume_ml: number;
  final_concentration_mcg_ml: number;
}

export interface DefaultDose {
  min: number | null;
  max: number | null;
  unit: string;
}

export interface Drug {
  id: string;
  name: string;
  type: 'vasopressor' | 'inotropos' | 'sedativo' | 'vasodilatador' | 'antiarritmico' | 'outros';
  presentation: DrugPresentation;
  standard_dilution: StandardDilution;
  default_dose: DefaultDose;
}
EOF

cat <<EOF > src/utils/calculator.ts
import { Drug } from '../types';

export const calculateRate = (
  dose: number,
  weight: number | null,
  drug: Drug
): number => {
  const concentration = drug.standard_dilution.final_concentration_mcg_ml;
  const unit = drug.default_dose.unit;

  if (concentration === 0) return 0;
  if (unit === 'mcg/kg/min') {
    if (!weight) return 0;
    return (dose * weight * 60) / concentration;
  }
  if (unit === 'mcg/kg/h') {
    if (!weight) return 0;
    return (dose * weight) / concentration;
  }
  if (unit === 'mcg/min') {
    return (dose * 60) / concentration;
  }
  return 0;
};

export const formatNumber = (num: number): string => {
  if (num === 0) return '0';
  if (num < 0.1) return num.toFixed(2);
  if (num < 10) return num.toFixed(1);
  return Math.round(num).toString();
};
EOF

cat <<EOF > src/components/Input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  suffix?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, suffix, error, className = '', ...props }) => {
  return (
    <div className={\`flex flex-col gap-1.5 \${className}\`}>
      <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative flex items-center group">
        <input
          className={\`
            w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 
            text-lg font-mono text-slate-50 placeholder-slate-600 outline-none transition-all
            focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20
            disabled:opacity-50 disabled:cursor-not-allowed
            \${error ? 'border-red-500/50 focus:border-red-500' : ''}
          \`}
          {...props}
        />
        {suffix && (
          <span className="absolute right-4 text-sm font-medium text-slate-500 pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
};
EOF

# DrugCard Component (Updated with colors and dilution info)
cat <<EOF > src/components/DrugCard.tsx
import React, { useState, useEffect } from 'react';
import { Drug } from '../types';
import { calculateRate, formatNumber } from '../utils/calculator';
import { Input } from './Input';

interface DrugCardProps {
  drug: Drug;
  weight: number | null;
}

export const DrugCard: React.FC<DrugCardProps> = ({ drug, weight }) => {
  const [expanded, setExpanded] = useState(false);
  const [dose, setDose] = useState<string>('');
  const [rate, setRate] = useState<number>(0);

  useEffect(() => {
    setDose(drug.default_dose.min?.toString() || '');
  }, [drug]);

  useEffect(() => {
    const numDose = parseFloat(dose);
    if (!isNaN(numDose)) {
      setRate(calculateRate(numDose, weight, drug));
    } else {
      setRate(0);
    }
  }, [dose, weight, drug]);

  const toggleExpand = () => setExpanded(!expanded);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vasopressor': return 'text-rose-400 border-rose-400/20 bg-rose-400/10';
      case 'inotropos': return 'text-amber-400 border-amber-400/20 bg-amber-400/10';
      case 'sedativo': return 'text-purple-400 border-purple-400/20 bg-purple-400/10';
      case 'vasodilatador': return 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10';
      case 'antiarritmico': return 'text-blue-400 border-blue-400/20 bg-blue-400/10';
      case 'outros': return 'text-gray-400 border-gray-400/20 bg-gray-400/10';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className={\`
      relative overflow-hidden transition-all duration-300 ease-in-out
      bg-slate-900 border border-slate-800 rounded-xl
      \${expanded ? 'ring-1 ring-cyan-500/50 shadow-lg shadow-cyan-900/20' : 'hover:border-slate-700'}
    \`}>
      <div 
        onClick={toggleExpand}
        className="p-4 flex items-center justify-between cursor-pointer active:bg-slate-800/50"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={\`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border \${getTypeColor(drug.type)}\`}>
              {drug.type}
            </span>
          </div>
          <h3 className="font-bold text-slate-100">{drug.name}</h3>
          
          {!expanded && rate > 0 && (
            <div className="mt-2 flex items-center gap-2">
               <span className="text-2xl font-mono font-bold text-cyan-400 leading-none">
                 {formatNumber(rate)}
               </span>
               <span className="text-xs text-cyan-400/70 font-medium">mL/h</span>
            </div>
          )}
        </div>
        <div className="text-slate-500">
           {expanded ? '▲' : '▼'}
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 bg-slate-900/50 border-t border-slate-800 animate-in slide-in-from-top-2 duration-200">
          <div className="my-4 p-3 bg-slate-950/50 rounded-lg border border-slate-800/50 text-xs text-slate-400 grid grid-cols-2 gap-y-2">
             <div>
                <span className="block text-slate-500">Seringa Total</span>
                <span className="font-mono text-slate-300">{drug.standard_dilution.syringe_ml} mL</span>
             </div>
             <div>
                <span className="block text-slate-500">Concentração</span>
                <span className="font-mono text-slate-300">{drug.standard_dilution.final_concentration_mcg_ml} mcg/mL</span>
             </div>
             <div className="col-span-2 pt-2 border-t border-slate-800/50 flex flex-col gap-1">
                <div className="flex gap-2">
                  <span className="text-slate-500">Preparo:</span>
                  <span className="text-slate-300">
                    {drug.standard_dilution.drug_volume_ml}mL Droga + {drug.standard_dilution.diluent_volume_ml}mL Diluente
                  </span>
                </div>
                {drug.standard_dilution.num_ampoules && (
                  <div className="flex gap-2">
                    <span className="text-slate-500">Ampolas:</span>
                    <span className="text-slate-300">
                      {drug.standard_dilution.num_ampoules} amp
                    </span>
                  </div>
                )}
             </div>
          </div>

          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Input
                label="Dose Prescrita"
                type="number"
                inputMode="decimal"
                value={dose}
                onChange={(e) => setDose(e.target.value)}
                suffix={drug.default_dose.unit === 'mcg/kg/min' ? 'mcg/kg/min' : 
                        drug.default_dose.unit === 'mcg/kg/h' ? 'mcg/kg/h' : 'mcg/min'}
                step={0.01}
              />
            </div>
          </div>

          {rate > 0 && (
             <div className="mt-4 p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-center justify-between">
                <span className="text-sm font-medium text-cyan-200/70 uppercase tracking-wider">Vazão Bomba</span>
                <div className="text-right">
                  <span className="text-4xl font-mono font-bold text-cyan-400 tracking-tight">
                    {formatNumber(rate)}
                  </span>
                  <span className="ml-1.5 text-lg font-medium text-cyan-500/70">mL/h</span>
                </div>
             </div>
          )}
        </div>
      )}
    </div>
  );
};
EOF

# App.tsx (Updated with Pills/Categories)
cat <<EOF > src/App.tsx
import { useState } from 'react';
import drugsData from './data/drugs.json';
import { Drug } from './types';
import { DrugCard } from './components/DrugCard';

const drugs = drugsData as Drug[];

const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'vasopressor', label: 'Vasopressores' },
  { id: 'sedativo', label: 'Sedativos' },
  { id: 'inotropos', label: 'Inotrópicos' },
  { id: 'vasodilatador', label: 'Vasodilatadores' },
  { id: 'antiarritmico', label: 'Antiarritmicos' },
];

function App() {
  const [weight, setWeight] = useState<string>('70');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const numWeight = parseFloat(weight) || 0;

  const filteredDrugs = drugs.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || d.type === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      <div className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 shadow-xl shadow-black/20">
        <div className="max-w-md mx-auto p-4 space-y-4">
          <header className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <span className="text-cyan-400">SAMU</span> 192 Infusões
            </h1>
            <div className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded">v1.0</div>
          </header>

          <div className="grid grid-cols-[1.2fr_0.8fr] gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Busca..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-3 text-sm text-slate-100 focus:border-cyan-500/50 outline-none transition-colors"
                autoComplete='off'
              />
              <svg className="absolute left-3 top-3.5 text-slate-500" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="relative">
               <input
                 type="number" 
                 inputMode="decimal"
                 value={weight}
                 onChange={(e) => setWeight(e.target.value)}
                 className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-3 pr-8 py-3 text-sm font-mono text-cyan-400 font-bold text-center focus:border-cyan-500/50 outline-none transition-colors"
                 placeholder="KG"
               />
               <span className="absolute right-3 top-3.5 text-xs font-medium text-slate-500 pointer-events-none">kg</span>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={\`
                  whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all
                  \${selectedCategory === cat.id 
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25' 
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700'}
                \`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-md mx-auto p-4 space-y-3">
        {filteredDrugs.length === 0 ? (
           <div className="text-center py-12 text-slate-500">
             <p>Nenhuma droga encontrada.</p>
           </div>
        ) : (
          filteredDrugs.map(drug => (
            <DrugCard 
              key={drug.id} 
              drug={drug} 
              weight={numWeight > 0 ? numWeight : null} 
            />
          ))
        )}
      </main>
      <footer className="max-w-md mx-auto px-6 py-8 text-center">
         <p className="text-[10px] text-slate-600 leading-relaxed">
           USO EXCLUSIVO PARA PROFISSIONAIS DE SAÚDE.<br/>
           Conferir sempre as diluições e doses antes da administração.
           O desenvolvedor não se responsabiliza pelo uso indevido.
         </p>
      </footer>
    </div>
  )
}
export default App
EOF

# 5. Criar Workflow de Deploy
cat <<EOF > .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
EOF

# 6. Inserir JSON completo (Compactado para caber no script)
# Nota: Você pode colar o JSON completo aqui manualmente se preferir, 
# mas este comando adiciona o set que você me passou.
cat <<EOF > src/data/drugs.json
[
  {
    "id": "adrenalina_cloridrat_1",
    "name": "ADRENALINA, CLORIDRATO",
    "type": "vasopressor",
    "presentation": { "ampoule_ml": 1.0, "mg_ml": 1.0 },
    "standard_dilution": { "syringe_ml": 20.0, "num_ampoules": 1.0, "drug_volume_ml": 1.0, "diluent_volume_ml": 19.0, "final_concentration_mcg_ml": 50.0 },
    "default_dose": { "min": 0.0476, "max": 0.2024, "unit": "mcg/kg/min" }
  },
  {
    "id": "amiodarona_ataque_1",
    "name": "AMIODARONA (ataque)",
    "type": "antiarritmico",
    "presentation": { "ampoule_ml": 3.0, "mg_ml": 50.0 },
    "standard_dilution": { "syringe_ml": 20.0, "num_ampoules": 1.0, "drug_volume_ml": 3.0, "diluent_volume_ml": 17.0, "final_concentration_mcg_ml": 7500.0 },
    "default_dose": { "min": null, "max": null, "unit": "mcg/kg/h" }
  },
  {
    "id": "amiodarona_manutencao_1",
    "name": "AMIODARONA (manutenção - 6 horas)",
    "type": "antiarritmico",
    "presentation": { "ampoule_ml": 3.0, "mg_ml": 50.0 },
    "standard_dilution": { "syringe_ml": 50.0, "num_ampoules": 6.0, "drug_volume_ml": 18.0, "diluent_volume_ml": 32.0, "final_concentration_mcg_ml": 9000.0 },
    "default_dose": { "min": 7.1429, "max": 14.2857, "unit": "mcg/kg/min" }
  },
  {
    "id": "atropina_sulfato_1",
    "name": "ATROPINA, SULFATO",
    "type": "outros",
    "presentation": { "ampoule_ml": 1.0, "mg_ml": 0.25 },
    "standard_dilution": { "syringe_ml": 20.0, "num_ampoules": 20.0, "drug_volume_ml": 20.0, "diluent_volume_ml": 0.0, "final_concentration_mcg_ml": 250.0 },
    "default_dose": { "min": 0.04, "max": 0.1, "unit": "mcg/kg/min" }
  },
  {
    "id": "dobutamina_cloridrat_1",
    "name": "DOBUTAMINA, CLORIDRATO",
    "type": "inotropos",
    "presentation": { "ampoule_ml": 20.0, "mg_ml": 12.5 },
    "standard_dilution": { "syringe_ml": 50.0, "num_ampoules": 1.0, "drug_volume_ml": 20.0, "diluent_volume_ml": 30.0, "final_concentration_mcg_ml": 5000.0 },
    "default_dose": { "min": 2.0, "max": 20.0, "unit": "mcg/kg/min" }
  },
  {
    "id": "dobutamina_cloridrat_2",
    "name": "DOBUTAMINA, CLORIDRATO (Equiv Concentrada)",
    "type": "inotropos",
    "presentation": { "ampoule_ml": 20.0, "mg_ml": 12.5 },
    "standard_dilution": { "syringe_ml": 50.0, "num_ampoules": 2.0, "drug_volume_ml": 40.0, "diluent_volume_ml": 10.0, "final_concentration_mcg_ml": 10000.0 },
    "default_dose": { "min": 2.0, "max": 20.0, "unit": "mcg/kg/min" }
  },
  {
    "id": "dobutamina_cloridrat_3",
    "name": "DOBUTAMINA, CLORIDRATO (Equiv 4X Concentrada)",
    "type": "inotropos",
    "presentation": { "ampoule_ml": 20.0, "mg_ml": 12.5 },
    "standard_dilution": { "syringe_ml": 50.0, "num_ampoules": 4.0, "drug_volume_ml": 80.0, "diluent_volume_ml": 0.0, "final_concentration_mcg_ml": 20000.0 },
    "default_dose": { "min": 2.0, "max": 20.0, "unit": "mcg/kg/min" }
  },
  {
    "id": "dopamina_cloridrato_1",
    "name": "DOPAMINA, CLORIDRATO",
    "type": "vasopressor",
    "presentation": { "ampoule_ml": 10.0, "mg_ml": 5.0 },
    "standard_dilution": { "syringe_ml": 50.0, "num_ampoules": 4.0, "drug_volume_ml": 40.0, "diluent_volume_ml": 10.0, "final_concentration_mcg_ml": 4000.0 },
    "default_dose": { "min": 2.0, "max": 20.0, "unit": "mcg/kg/min" }
  },
  {
    "id": "fentanila_citrato_1",
    "name": "FENTANILA, CITRATO",
    "type": "sedativo",
    "presentation": { "ampoule_ml": 10.0, "mg_ml": 0.05 },
    "standard_dilution": { "syringe_ml": 50.0, "num_ampoules": 1.0, "drug_volume_ml": 10.0, "diluent_volume_ml": 40.0, "final_concentration_mcg_ml": 10.0 },
    "default_dose": { "min": 0.5, "max": 2.0, "unit": "mcg/kg/h" }
  },
  {
    "id": "fentanila_citrato_2",
    "name": "FENTANILA, CITRATO (Concentrada)",
    "type": "sedativo",
    "presentation": { "ampoule_ml": 10.0, "mg_ml": 0.05 },
    "standard_dilution": { "syringe_ml": 50.0, "num_ampoules": 5.0, "drug_volume_ml": 50.0, "diluent_volume_ml": 0.0, "final_concentration_mcg_ml": 50.0 },
    "default_dose": { "min": 0.5, "max": 2.0, "unit": "mcg/kg/h" }
  },
  {
    "id": "midazolam_sedacao_1",
    "name": "MIDAZOLAM (Sedação)",
    "type": "sedativo",
    "presentation": { "ampoule_ml": 10.0, "mg_ml": 5.0 },
    "standard_dilution": { "syringe_ml": 50.0, "num_ampoules": 1.0, "drug_volume_ml": 10.0, "diluent_volume_ml": 40.0, "final_concentration_mcg_ml": 1000.0 },
    "default_dose": { "min": 20.0, "max": 100.0, "unit": "mcg/kg/h" }
  },
  {
    "id": "midazolam_sedacao_2",
    "name": "MIDAZOLAM (Sedação Concentrada)",
    "type": "sedativo",
    "presentation": { "ampoule_ml": 10.0, "mg_ml": 5.0 },
    "standard_dilution": { "syringe_ml": 50.0, "num_ampoules": 5.0, "drug_volume_ml": 50.0, "diluent_volume_ml": 0.0, "final_concentration_mcg_ml": 5000.0 },
    "default_dose": { "min": 20.0, "max": 100.0, "unit": "mcg/kg/h" }
  },
  {
    "id": "noradrenalina_hemitartarato_1",
    "name": "NORADRENALINA (Hemitartarato)",
    "type": "vasopressor",
    "presentation": { "ampoule_ml": 4.0, "mg_ml": 1.0 },
    "standard_dilution": { "syringe_ml": 50.0, "num_ampoules": 4.0, "drug_volume_ml": 16.0, "diluent_volume_ml": 34.0, "final_concentration_mcg_ml": 320.0 },
    "default_dose": { "min": 0.05, "max": 2.0, "unit": "mcg/kg/min" }
  },
  {
    "id": "noradrenalina_hemitartarato_neo_1",
    "name": "NORADRENALINA (Neonatal/Ped - 16mcg/ml)",
    "type": "vasopressor",
    "presentation": { "ampoule_ml": 4.0, "mg_ml": 1.0 },
    "standard_dilution": { "syringe_ml": 50.0, "num_ampoules": 1.0, "drug_volume_ml": 0.8, "diluent_volume_ml": 49.2, "final_concentration_mcg_ml": 16.0 },
    "default_dose": { "min": 0.05, "max": 2.0, "unit": "mcg/kg/min" }
  },
  {
    "id": "nitroglicerina_sca_1",
    "name": "NITROGLICERINA (SCA)",
    "type": "vasodilatador",
    "presentation": { "ampoule_ml": 10.0, "mg_ml": 5.0 },
    "standard_dilution": { "syringe_ml": 50.0, "num_ampoules": 2.0, "drug_volume_ml": 20.0, "diluent_volume_ml": 30.0, "final_concentration_mcg_ml": 2000.0 },
    "default_dose": { "min": 5.0, "max": 200.0, "unit": "mcg/min" }
  },
  {
    "id": "nitroprussiato_sodio_1",
    "name": "NITROPRUSSIATO DE SÓDIO",
    "type": "vasodilatador",
    "presentation": { "ampoule_ml": 2.0, "mg_ml": 25.0 },
    "standard_dilution": { "syringe_ml": 50.0, "num_ampoules": 1.0, "drug_volume_ml": 2.0, "diluent_volume_ml": 48.0, "final_concentration_mcg_ml": 1000.0 },
    "default_dose": { "min": 0.25, "max": 10.0, "unit": "mcg/kg/min" }
  },
  {
    "id": "propofol_1_1",
    "name": "PROPOFOL 1%",
    "type": "sedativo",
    "presentation": { "ampoule_ml": 20.0, "mg_ml": 10.0 },
    "standard_dilution": { "syringe_ml": 50.0, "num_ampoules": 2.0, "drug_volume_ml": 40.0, "diluent_volume_ml": 0.0, "final_concentration_mcg_ml": 10000.0 },
    "default_dose": { "min": 5.0, "max": 50.0, "unit": "mcg/kg/min" }
  },
  {
    "id": "cetamina_cloridrato_1",
    "name": "CETAMINA CLORIDRATO (Manutenção)",
    "type": "sedativo",
    "presentation": { "ampoule_ml": 10.0, "mg_ml": 50.0 },
    "standard_dilution": { "syringe_ml": 50.0, "num_ampoules": 1.0, "drug_volume_ml": 10.0, "diluent_volume_ml": 40.0, "final_concentration_mcg_ml": 10000.0 },
    "default_dose": { "min": 5.0, "max": 20.0, "unit": "mcg/kg/min" }
  }
]
EOF

echo "✅ Arquivos criados com sucesso!"
echo "Instalando dependências..."
npm install

echo "Adicionando ao Git..."
git add .
git commit -m "Auto-migration via Codespace Script"

echo "Pronto! Agora execute: git push"