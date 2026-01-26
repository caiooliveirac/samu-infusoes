import { useState } from 'react';
import { drugsData } from './data/drugs';
import { DrugCard } from './components/DrugCard';
import { Header } from './components/Header';
import { SearchAndWeight } from './components/SearchAndWeight';
import { SyringeSelector } from './components/SyringeSelector';
import { CategoryList } from './components/CategoryList';

function App() {
  const [weight, setWeight] = useState<string>('70'); // Default 70kg
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [syringeSize, setSyringeSize] = useState<number>(20); // Default 20ml

  const numWeight = parseFloat(weight) || 0;

  const filteredDrugs = drugsData.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || d.type === selectedCategory;
    const matchesSyringe = d.standard_dilution.syringe_ml === syringeSize;
    
    return matchesSearch && matchesCategory && matchesSyringe;
  });

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      
      {/* Top Bar - Sticky */}
      <div className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 shadow-xl shadow-black/20">
        <div className="max-w-md mx-auto p-4 space-y-4">
          
          <Header />

          <SearchAndWeight 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
            weight={weight} 
            onWeightChange={setWeight}
          />

          <SyringeSelector 
            syringeSize={syringeSize} 
            setSyringeSize={setSyringeSize} 
          />

          <CategoryList 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />

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
