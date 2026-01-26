

interface Props {
  syringeSize: number;
  setSyringeSize: (size: number) => void;
}

export const SyringeSelector = ({ syringeSize, setSyringeSize }: Props) => (
  <div className="bg-slate-900 p-1 rounded-lg flex relative">
    <button
      onClick={() => setSyringeSize(20)}
      className={`flex-1 py-1.5 text-xs font-bold uppercase rounded-md transition-all ${
        syringeSize === 20 ? 'bg-cyan-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'
      }`}
    >
      Seringa 20ml
    </button>
    <button
      onClick={() => setSyringeSize(50)}
      className={`flex-1 py-1.5 text-xs font-bold uppercase rounded-md transition-all ${
        syringeSize === 50 ? 'bg-cyan-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'
      }`}
    >
      Seringa 50ml
    </button>
  </div>
);
