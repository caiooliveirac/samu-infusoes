

export const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'vasopressor', label: 'Vasopressores' },
  { id: 'sedativo', label: 'Sedativos' },
  { id: 'inotropos', label: 'Inotrópicos' },
  { id: 'vasodilatador', label: 'Vasodilatadores' },
  { id: 'antiarritmico', label: 'Antiarritmicos' },
];

interface Props {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryList = ({ selectedCategory, onSelectCategory }: Props) => (
  <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
    {CATEGORIES.map(cat => (
      <button
        key={cat.id}
        onClick={() => onSelectCategory(cat.id)}
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
);
