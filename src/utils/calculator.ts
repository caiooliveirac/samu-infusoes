import { Drug, DrugPresentation, StandardDilution } from '../types';

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

  return 0;
};

export const formatNumber = (num: number): string => {
  if (num === 0) return '0';
  if (num < 0.1) return num.toFixed(2);
  if (num < 100) return num.toFixed(1);
  return Math.round(num).toString();
};
