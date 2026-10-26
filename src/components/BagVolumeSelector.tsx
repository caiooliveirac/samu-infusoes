const BAG_VOLUMES = [100, 250, 500, 1000];

interface Props {
  volumeMl: number;
  onChange: (size: number) => void;
}

export const BagVolumeSelector = ({ volumeMl, onChange }: Props) => (
  <div className="space-y-2">
    <p className="px-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
      Volume final da bolsa
    </p>
    <div className="flex gap-1 rounded-lg bg-slate-900 p-1">
      {BAG_VOLUMES.map((volume) => (
        <button
          key={volume}
          type="button"
          onClick={() => onChange(volume)}
          aria-pressed={volumeMl === volume}
          className={`flex-1 rounded-md py-2 text-xs font-bold transition-colors ${
            volumeMl === volume
              ? 'bg-cyan-500 text-white'
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          {volume >= 1000 ? '1.000' : volume} mL
        </button>
      ))}
    </div>
  </div>
);
