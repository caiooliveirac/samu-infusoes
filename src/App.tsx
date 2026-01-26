import { useState } from 'react';
import drugsData from './data/drugs.json';
import { Drug } from './types';
import { DrugCard } from './components/DrugCard';

// Assert type for imported JSON
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
  const [weight, setWeight] = useState<string>('70'); // Default 70kg
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
      
      {/* Top Bar - Sticky */}
      <div className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 shadow-xl shadow-black/20">
        <div className="max-w-md mx-auto p-4 space-y-4">
          
          <header className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <span className="text-cyan-400">SAMU</span> 192 Infusões
            </h1>
            <div className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded">
              v1.0
            </div>
          </header>

          <div className="grid grid-cols-[1.2fr_0.8fr] gap-4">
            {/* Search */}
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

            {/* Weight Input (Global) */}
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

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`
                  whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all
                  ${selectedCategory === cat.id 
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25' 
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700'}
                `}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Main Content Info */}
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

      {/* Footer Disclaimer */}
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
