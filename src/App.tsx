import { useState } from 'react';
import { drugsData } from './data/drugs';
import { DrugCard } from './components/DrugCard';
import { Header } from './components/Header';
import { SearchAndWeight } from './components/SearchAndWeight';
import { SyringeSelector } from './components/SyringeSelector';
import { BagVolumeSelector } from './components/BagVolumeSelector';
import { BagDrugCard } from './components/BagDrugCard';
import { CategoryList } from './components/CategoryList';
import { bagRegimens } from './data/bag-regimens';

// Busca ignora acento e caixa: "magnesio" acha "MAGNÉSIO".
const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

function App() {
  const [weight, setWeight] = useState<string>(''); // Sem peso padrão: nada de calcular para 70 kg sem querer
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [syringeSize, setSyringeSize] = useState<number>(20); // Default 20ml
  const [bagVolume, setBagVolume] = useState<number>(100);
  const [mode, setMode] = useState<'syringes' | 'bags'>('syringes');
  const [idealWeight, setIdealWeight] = useState<string>('');

  const numWeight = parseFloat(weight) || 0;
  const numIdealWeight = parseFloat(idealWeight) || 0;

  const term = normalize(searchTerm);
  const filteredDrugs = drugsData.filter(d => {
    const matchesSearch = normalize(d.name).includes(term) || normalize(d.type).includes(term);
    const matchesCategory = selectedCategory === 'all' || d.type === selectedCategory;
    const matchesSyringe = d.standard_dilution.syringe_ml === syringeSize;
    
    return matchesSearch && matchesCategory && matchesSyringe;
  });
  const filteredBagRegimens = bagRegimens.filter((regimen) => {
    const matchesSearch = normalize(regimen.name).includes(term) || normalize(regimen.type).includes(term);
    const matchesCategory = selectedCategory === 'all' || regimen.type === selectedCategory;
    const matchesVolume = regimen.volumes_ml.includes(bagVolume);
    return matchesSearch && matchesCategory && matchesVolume;
  });

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      
      {/* Top Bar - Sticky */}
      <div className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 shadow-xl shadow-black/20">
        <div className="max-w-md mx-auto p-4 space-y-4">
          
          <Header />

          <div className="flex rounded-lg bg-slate-900 p-1" role="tablist" aria-label="Modo de cálculo">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'syringes'}
              onClick={() => setMode('syringes')}
              className={`flex-1 rounded-md py-2 text-xs font-bold uppercase transition-colors ${
                mode === 'syringes' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Seringas
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'bags'}
              onClick={() => setMode('bags')}
              className={`flex-1 rounded-md py-2 text-xs font-bold uppercase transition-colors ${
                mode === 'bags' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Frascos / bolsas
            </button>
          </div>

          <SearchAndWeight 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
            weight={weight} 
            onWeightChange={setWeight}
            idealWeight={idealWeight}
            onIdealWeightChange={setIdealWeight}
            showIdealWeight={mode === 'bags' && filteredBagRegimens.some((regimen) => regimen.weight_basis === 'ideal')}
          />

          {mode === 'syringes' ? (
            <SyringeSelector
              syringeSize={syringeSize}
              setSyringeSize={setSyringeSize}
            />
          ) : (
            <BagVolumeSelector volumeMl={bagVolume} onChange={setBagVolume} />
          )}

          <CategoryList 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />

        </div>
      </div>

      {/* Main Content Info */}
      <main className="max-w-md mx-auto p-4 space-y-3">
        {mode === 'syringes' ? filteredDrugs.length === 0 ? (
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
        ) : (
          <>
            <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-3 text-xs leading-relaxed text-amber-100/90">
              Cálculo de preparo e vazão, não prescrição. Digite somente a dose prescrita. Confira apresentação,
              diluente, compatibilidade e volume final com o protocolo local.
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-900 p-3 text-xs leading-relaxed text-slate-300">
              Sulfato de magnésio: manutenção em bolsa disponível somente em 250 mL; o ataque está no modo seringas.
            </div>
            {filteredBagRegimens.length === 0 ? (
              <div className="space-y-3 py-8 text-center text-slate-400">
                <p>Nenhum preparo cadastrado para esta busca e volume.</p>
                <button
                  type="button"
                  onClick={() => setMode('syringes')}
                  className="rounded-lg border border-cyan-500/40 px-4 py-2 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/10"
                >
                  Ver opções em seringas
                </button>
              </div>
            ) : (
              filteredBagRegimens.map((regimen) => (
                <BagDrugCard
                  key={regimen.id}
                  regimen={regimen}
                  volumeMl={bagVolume}
                  weight={numWeight > 0 ? numWeight : null}
                  idealWeight={numIdealWeight > 0 ? numIdealWeight : null}
                />
              ))
            )}
          </>
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
