import { BagRegimen, Drug, DrugPresentation, StandardDilution } from '../types';

export interface BagPreparation {
  drug_volume_ml: number;
  diluent_to_withdraw_ml: number;
  remaining_diluent_ml: number;
  stock_to_diluent_percent: number;
  total_drug_mg: number;
  ampoule_equivalent: number;
  final_volume_ml: number;
}

export const calculateBagPreparation = (
  regimen: BagRegimen,
  bagVolumeMl: number
): BagPreparation => {
  if (
    !Number.isFinite(bagVolumeMl) ||
    !Number.isFinite(regimen.final_concentration_mcg_ml) ||
    !Number.isFinite(regimen.stock_mg_ml) ||
    !Number.isFinite(regimen.stock_ampoule_ml) ||
    bagVolumeMl <= 0 ||
    regimen.final_concentration_mcg_ml <= 0 ||
    regimen.stock_mg_ml <= 0 ||
    regimen.stock_ampoule_ml <= 0
  ) {
    throw new RangeError('Volume, concentração e apresentação devem ser maiores que zero.');
  }

  const totalDrugMg = (regimen.final_concentration_mcg_ml * bagVolumeMl) / 1000;
  const drugVolumeMl = totalDrugMg / regimen.stock_mg_ml;
  if (drugVolumeMl > bagVolumeMl) {
    throw new RangeError('O volume do medicamento excede o volume final da bolsa.');
  }

  return {
    drug_volume_ml: drugVolumeMl,
    diluent_to_withdraw_ml: drugVolumeMl,
    remaining_diluent_ml: bagVolumeMl - drugVolumeMl,
    stock_to_diluent_percent: drugVolumeMl / (bagVolumeMl - drugVolumeMl) * 100,
    total_drug_mg: totalDrugMg,
    ampoule_equivalent: drugVolumeMl / regimen.stock_ampoule_ml,
    final_volume_ml: bagVolumeMl,
  };
};

export const calculateConcentration = (
  presentation: DrugPresentation,
  dilution: Pick<StandardDilution, 'diluent_volume_ml' | 'num_ampoules' | 'drug_volume_ml'>
): number => {
  let drugVolume = 0;

  if (dilution.num_ampoules) {
    drugVolume = dilution.num_ampoules * presentation.ampoule_ml;
  } else if (dilution.drug_volume_ml) {
    drugVolume = dilution.drug_volume_ml;
  }

  const totalMg = drugVolume * presentation.mg_ml;
  const totalVolume = dilution.diluent_volume_ml + drugVolume;

  if (totalVolume === 0) return 0;

  return (totalMg * 1000) / totalVolume;
};

export const calculateRate = (
  dose: number,
  weight: number | null,
  drug: Drug
): number => {
  return calculateRateForConcentration(
    dose,
    weight,
    drug.standard_dilution.final_concentration_mcg_ml,
    drug.default_dose.unit
  );
};

export const calculateRateForConcentration = (
  dose: number,
  weight: number | null,
  concentration: number,
  unit: string
): number => {
  if (concentration === 0) return 0;

  // mcg/kg/min -> ml/h
  // (Dose * Weight * 60 min) / Conc
  if (unit === 'mcg/kg/min') {
    if (!weight) return 0;
    return (dose * weight * 60) / concentration;
  }

  // mcg/kg/h -> ml/h
  // (Dose * Weight) / Conc
  if (unit === 'mcg/kg/h') {
    if (!weight) return 0;
    return (dose * weight) / concentration;
  }

  // mcg/min -> ml/h
  // (Dose * 60) / Conc
  if (unit === 'mcg/min') {
    return (dose * 60) / concentration;
  }

  // mg/min -> ml/h
  // (Dose * 1000 * 60) / Conc
  if (unit === 'mg/min') {
    return (dose * 60000) / concentration;
  }

  // mg/kg/h -> ml/h
  if (unit === 'mg/kg/h') {
    if (!weight) return 0;
    return (dose * weight * 1000) / concentration;
  }

  // A fixed amount infused over a stated duration -> ml/h.
  if (unit === 'mg/10 min') {
    return (dose * 6000) / concentration;
  }

  if (unit === 'mg/20 min') {
    return (dose * 3000) / concentration;
  }

  // g/h -> ml/h
  // (Dose * 1,000,000) / Conc
  if (unit === 'g/h') {
    return (dose * 1000000) / concentration;
  }

  // mg/dose -> ml (Volume)
  // (Dose * 1000) / Conc
  if (unit === 'mg/dose') {
    return (dose * 1000) / concentration;
  }

  // mg/kg -> ml (Volume based on weight)
  // (Dose * Weight * 1000) / Conc
  if (unit === 'mg/kg') {
    if (!weight) return 0;
    return (dose * weight * 1000) / concentration;
  }

  if (unit === 'mg/kg (carga)') {
    if (!weight) return 0;
    return (dose * weight * 1000) / concentration;
  }

  throw new Error(`Unidade de dose sem suporte: ${unit}`);
};

export const isWeightBased = (unit: string): boolean => unit.includes('/kg');

// Volume real da seringa (droga + diluente) — pode ser menor que syringe_ml.
export const syringeVolume = (drug: Drug): number =>
  drug.standard_dilution.drug_volume_ml + drug.standard_dilution.diluent_volume_ml;

// Quanto de droga (mg) há na seringa preparada.
export const totalDrugMg = (drug: Drug): number =>
  drug.standard_dilution.drug_volume_ml * drug.presentation.mg_ml;

// Minutos até a seringa esvaziar na vazão dada (ml/h).
export const syringeDurationMin = (drug: Drug, rateMlH: number): number =>
  rateMlH > 0 ? (syringeVolume(drug) / rateMlH) * 60 : 0;

// Arredonda ANTES de separar horas e minutos: 119,5 min vira 2h, nunca "1h60".
export const formatDuration = (min: number): string => {
  const total = Math.round(min);
  if (total < 60) return `${total} min`;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return m ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`;
};

export const formatNumber = (num: number): string => {
  if (num === 0) return '0';
  if (num < 0.1) return num.toFixed(2);
  if (num < 100) return num.toFixed(1);
  return Math.round(num).toString();
};
