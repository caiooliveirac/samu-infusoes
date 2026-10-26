import { useState } from 'react';
import { BagRegimen } from '../types';
import { calculateBagPreparation, calculateRateForConcentration, isWeightBased } from '../utils/calculator';
import { Input } from './Input';

interface BagDrugCardProps {
  regimen: BagRegimen;
  volumeMl: number;
  weight: number | null;
  idealWeight: number | null;
}

const formatPrecise = (value: number): string =>
  new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(value);

const formatMass = (mg: number): string =>
  mg >= 1000 ? `${formatPrecise(mg / 1000)} g` : `${formatPrecise(mg)} mg`;

export const BagDrugCard = ({ regimen, volumeMl, weight, idealWeight }: BagDrugCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [dose, setDose] = useState('');
  const preparation = calculateBagPreparation(regimen, volumeMl);
  const usesWeight = isWeightBased(regimen.dose_unit);
  const calculationWeight = regimen.weight_basis === 'ideal' ? idealWeight : weight;
  const needsWeight = usesWeight && !calculationWeight;
  const numericDose = Number(dose);
  const hasDose = dose !== '' && Number.isFinite(numericDose) && numericDose > 0;
  const result = hasDose && !needsWeight
    ? calculateRateForConcentration(
      numericDose,
      calculationWeight,
      regimen.final_concentration_mcg_ml,
      regimen.dose_unit
    )
    : null;
  const isLoadingDose = regimen.dose_unit.includes('(carga)');

  return (
    <article className={`overflow-hidden rounded-xl border bg-slate-900 transition-colors ${
      expanded ? 'border-cyan-500/50 ring-1 ring-cyan-500/20' : 'border-slate-800'
    }`}>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-3 p-4 text-left active:bg-slate-800/50"
      >
        <span>
          <span className="block font-bold text-slate-100">{regimen.name}</span>
          <span className="mt-1 block text-xs text-slate-400">
            {formatPrecise(regimen.final_concentration_mcg_ml)} mcg/mL · bolsa {volumeMl} mL
          </span>
          {result !== null && !isLoadingDose && (
            <span className="mt-2 block font-mono text-2xl font-bold text-cyan-400">
              {formatPrecise(result)} <span className="text-sm font-medium">mL/h</span>
            </span>
          )}
          {result !== null && isLoadingDose && (
            <span className="mt-2 block font-mono text-2xl font-bold text-cyan-400">
              {formatPrecise(result)} <span className="text-sm font-medium">mL/dose</span>
            </span>
          )}
        </span>
        <span aria-hidden="true" className="text-2xl text-slate-500">{expanded ? '−' : '+'}</span>
      </button>

      {expanded && (
        <div className="space-y-4 border-t border-slate-800 bg-slate-900/50 p-4">
          <div className="grid grid-cols-2 gap-3 rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-xs">
            <div>
              <span className="block text-slate-500">Concentração final</span>
              <span className="font-mono text-slate-200">
                {formatPrecise(regimen.final_concentration_mcg_ml)} mcg/mL
              </span>
            </div>
            <div>
              <span className="block text-slate-500">Conteúdo total</span>
              <span className="font-mono text-slate-200">{formatMass(preparation.total_drug_mg)}</span>
            </div>
            <div>
              <span className="block text-slate-500">Solução de estoque</span>
              <span className="font-mono text-slate-200">
                {formatPrecise(preparation.drug_volume_ml)} mL · {formatPrecise(regimen.stock_mg_ml)} mg/mL
              </span>
            </div>
            <div>
              <span className="block text-slate-500">Equivalente em ampolas</span>
              <span className="font-mono text-slate-200">
                {formatPrecise(preparation.ampoule_equivalent)} × {formatPrecise(regimen.stock_ampoule_ml)} mL
              </span>
            </div>
            <div className="col-span-2 border-t border-slate-800 pt-3">
              <span className="block text-slate-500">Preparo para volume final de {volumeMl} mL</span>
              <span className="mt-1 block font-medium text-cyan-200">
                Retirar {formatPrecise(preparation.diluent_to_withdraw_ml)} mL da bolsa; manter{' '}
                {formatPrecise(preparation.remaining_diluent_ml)} mL de diluente e adicionar{' '}
                {formatPrecise(preparation.drug_volume_ml)} mL de solução de estoque.
              </span>
              {regimen.diluent && (
                <span className="mt-1 block text-slate-400">Diluente: {regimen.diluent}</span>
              )}
              <span className="mt-1 block text-slate-500">
                Volume final calculado: {formatPrecise(preparation.final_volume_ml)} mL.
              </span>
            </div>
          </div>

          {regimen.warning && (
            <p className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-3 text-xs font-medium leading-relaxed text-amber-200">
              {regimen.warning}
            </p>
          )}
          {preparation.stock_to_diluent_percent > 10 && (
            <p className="rounded-lg border border-orange-500/30 bg-orange-950/20 p-3 text-xs font-medium leading-relaxed text-orange-200">
              O volume de estoque é {formatPrecise(preparation.stock_to_diluent_percent)}% do diluente restante.
              Retire o volume indicado antes de adicionar o medicamento e valide esse preparo com a farmácia.
            </p>
          )}

          <div className="space-y-2">
            <Input
              label="Dose prescrita"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              value={dose}
              onChange={(event) => setDose(event.target.value)}
              suffix={regimen.dose_unit}
              aria-label={`Dose prescrita em ${regimen.dose_unit}`}
            />
            {needsWeight && (
              <p className="text-xs font-medium text-amber-300">
                {regimen.weight_basis === 'ideal'
                  ? 'Informe o peso ideal (IBW) para este cálculo.'
                  : 'Informe o peso do paciente para este cálculo.'}
              </p>
            )}
            {dose !== '' && (!Number.isFinite(numericDose) || numericDose <= 0) && (
              <p className="text-xs font-medium text-red-300">Informe uma dose numérica maior que zero.</p>
            )}
            {result !== null && (
              <div className="rounded-lg border border-cyan-500/30 bg-cyan-950/20 p-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-cyan-200/70">
                  {isLoadingDose ? 'Volume calculado por dose' : 'Vazão calculada'}
                </span>
                <p className="mt-1 font-mono text-3xl font-bold text-cyan-300">
                  {formatPrecise(result)} {isLoadingDose ? 'mL/dose' : 'mL/h'}
                </p>
              </div>
            )}
          </div>

          <p className="text-[10px] leading-relaxed text-slate-500">
            Parâmetros de cálculo: {regimen.source}. Informe somente a dose prescrita. Confira apresentação,
            diluente, preparo, compatibilidade e volume final com o protocolo local; o aplicativo não define
            indicação nem prescrição.
          </p>
        </div>
      )}
    </article>
  );
};
