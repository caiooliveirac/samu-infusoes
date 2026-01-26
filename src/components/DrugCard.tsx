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
  const [dose, setDose] = useState<string>(''); // Keep as string for input handling
  const [rate, setRate] = useState<number>(0);

  // Set default min dose on mount
  useEffect(() => {
    setDose(drug.default_dose.min?.toString() || '');
  }, [drug]);

  // Recalculate when inputs change
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
    <div className={`
      relative overflow-hidden transition-all duration-300 ease-in-out
      bg-slate-900 border border-slate-800 rounded-xl
      ${expanded ? 'ring-1 ring-cyan-500/50 shadow-lg shadow-cyan-900/20' : 'hover:border-slate-700'}
    `}>
      {/* Header / Summary */}
      <div 
        onClick={toggleExpand}
        className="p-4 flex items-center justify-between cursor-pointer active:bg-slate-800/50"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${getTypeColor(drug.type)}`}>
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
           {expanded ? (
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
           ) : (
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
           )}
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="px-4 pb-4 bg-slate-900/50 border-t border-slate-800 animate-in slide-in-from-top-2 duration-200">
          
          {/* Dilution Info Block */}
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

          {/* Result Block */}
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
