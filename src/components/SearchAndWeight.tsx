

interface Props {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  weight: string;
  onWeightChange: (value: string) => void;
}

export const SearchAndWeight = ({ searchTerm, onSearchChange, weight, onWeightChange }: Props) => (
  <div className="grid grid-cols-[1.2fr_0.8fr] gap-4">
    {/* Search */}
    <div className="relative">
      <input 
        type="text" 
        placeholder="Busca..." 
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
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
        onChange={(e) => onWeightChange(e.target.value)}
        className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-3 pr-8 py-3 text-sm font-mono text-cyan-400 font-bold text-center focus:border-cyan-500/50 outline-none transition-colors"
        placeholder="KG"
      />
      <span className="absolute right-3 top-3.5 text-xs font-medium text-slate-500 pointer-events-none">kg</span>
    </div>
  </div>
);
