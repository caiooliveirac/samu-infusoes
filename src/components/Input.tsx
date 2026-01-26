

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  suffix?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, suffix, error, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative flex items-center group">
        <input
          className={`
            w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 
            text-lg font-mono text-slate-50 placeholder-slate-600 outline-none transition-all
            focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500/50 focus:border-red-500' : ''}
          `}
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
