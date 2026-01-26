import { Drug } from '../types';

export const calculateRate = (
  dose: number,
  weight: number | null,
  drug: Drug
): number => {
  const concentration = drug.standard_dilution.final_concentration_mcg_ml;
  const unit = drug.default_dose.unit;

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

  return 0;
};

export const formatNumber = (num: number): string => {
  if (num === 0) return '0';
  if (num < 0.1) return num.toFixed(2);
  if (num < 10) return num.toFixed(1);
  return Math.round(num).toString();
};
