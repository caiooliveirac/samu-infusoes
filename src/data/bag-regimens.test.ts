import { describe, expect, it } from 'vitest';
import { bagRegimens } from './bag-regimens';
import { drugsData } from './drugs';
import {
  calculateBagPreparation,
  calculateRate,
  calculateRateForConcentration,
  convertDoseUnit,
} from '../utils/calculator';

describe.each(bagRegimens)('$id', (regimen) => {
  it('calculates the declared final concentration for every supported bag size', () => {
    for (const volume of regimen.volumes_ml) {
      const preparation = calculateBagPreparation(regimen, volume);
      expect((preparation.total_drug_mg * 1000) / preparation.final_volume_ml)
        .toBeCloseTo(regimen.final_concentration_mcg_ml, 6);
      expect(preparation.drug_volume_ml + preparation.remaining_diluent_ml)
        .toBeCloseTo(volume, 9);
      expect(preparation.diluent_to_withdraw_ml).toBeCloseTo(preparation.drug_volume_ml, 9);
      expect(preparation.stock_to_diluent_percent).toBeCloseTo(
        (preparation.drug_volume_ml / preparation.remaining_diluent_ml) * 100,
        9
      );
      expect(calculateRateForConcentration(
        1,
        70,
        regimen.final_concentration_mcg_ml,
        regimen.dose_unit
      )).toBeGreaterThan(0);
    }
  });

  it('uses only configured bag sizes', () => {
    expect(regimen.volumes_ml.length).toBeGreaterThan(0);
    expect(regimen.volumes_ml.every((volume) => [100, 250, 500, 1000].includes(volume))).toBe(true);
  });
});

describe('specific preparations and dose units', () => {
  it('provides a reference range for each continuous bag infusion with an existing syringe reference', () => {
    const continuousRegimens = bagRegimens.filter((regimen) => regimen.id !== 'fenitoina-5000-mcg-ml');

    for (const regimen of continuousRegimens) {
      expect(regimen.dose_range, regimen.id).toBeDefined();
      const range = regimen.dose_range!;
      expect(convertDoseUnit(range.min, range.unit, regimen.dose_unit, 70)).toBeGreaterThan(0);
      expect(convertDoseUnit(range.max, range.unit, regimen.dose_unit, 70)).toBeGreaterThan(0);
    }
  });

  it('converts existing syringe reference ranges to each bag regimen unit', () => {
    expect(convertDoseUnit(7.5, 'mg/min', 'mg/10 min', null)).toBe(75);
    expect(convertDoseUnit(1.8, 'mcg/kg/min', 'mg/kg/h', 70)).toBeCloseTo(0.108);
    expect(convertDoseUnit(0.01, 'mcg/kg/min', 'mcg/min', 70)).toBeCloseTo(0.7);
    expect(convertDoseUnit(0.0476, 'mcg/kg/min', 'mcg/min', null)).toBeNull();
  });

  it('uses one, two, or four 4 mL norepinephrine ampoules for 16, 32, or 64 mcg/mL in 250 mL', () => {
    const concentrations = [16, 32, 64];
    const ampoules = [1, 2, 4];

    concentrations.forEach((concentration, index) => {
      const regimen = bagRegimens.find((item) => item.final_concentration_mcg_ml === concentration
        && item.name.startsWith('NORADRENALINA'));
      expect(regimen).toBeDefined();
      const preparation = calculateBagPreparation(regimen!, 250);
      expect(preparation.ampoule_equivalent).toBe(ampoules[index]);
      expect(preparation.drug_volume_ml).toBe(ampoules[index] * 4);
    });
  });

  it('shows exact fentanyl stock and remaining diluent for 20 mcg/mL in 250 mL', () => {
    const fentanyl = bagRegimens.filter((regimen) => regimen.id.startsWith('fentanila-'));
    expect(fentanyl).toHaveLength(2);

    for (const regimen of fentanyl) {
      const preparation = calculateBagPreparation(regimen, 250);
      expect(preparation.drug_volume_ml).toBe(100);
      expect(preparation.remaining_diluent_ml).toBe(150);
      expect(preparation.total_drug_mg).toBe(5);
    }
  });

  it('limits eclampsia maintenance to 250 mL and uses 5 g at 20 mg/mL', () => {
    const magnesium = bagRegimens.find((regimen) => regimen.id === 'magnesio-eclampsia-manutencao-ms2022');
    expect(magnesium?.volumes_ml).toEqual([250]);
    expect(magnesium && calculateBagPreparation(magnesium, 250)).toMatchObject({
      drug_volume_ml: 10,
      remaining_diluent_ml: 240,
      total_drug_mg: 5000,
    });
    expect(calculateRateForConcentration(1, null, 20000, 'g/h')).toBe(50);
    expect(calculateRateForConcentration(2, null, 20000, 'g/h')).toBe(100);
  });

  it('calculates the loading-syringe rate from the confirmed MS 2022 attack interval', () => {
    const magnesium = drugsData.find((drug) => drug.id === 'magnesio_ataque_20ml');
    expect(magnesium?.default_dose).toMatchObject({ min: 400, max: 800, unit: 'mg/min' });
    expect(magnesium && calculateRate(400, null, magnesium)).toBe(120);
    expect(magnesium && calculateRate(800, null, magnesium)).toBe(240);
  });

  it('does not offer atropine or propofol as bag regimens', () => {
    expect(bagRegimens.some((regimen) => /atropina|propofol/i.test(regimen.name))).toBe(false);
    expect(drugsData.find((drug) => drug.id === 'atropina_20ml')?.standard_dilution.syringe_ml).toBe(20);
    expect(drugsData.some((drug) => drug.name.startsWith('PROPOFOL'))).toBe(true);
  });

  it('rejects invalid bag preparation inputs', () => {
    const fentanyl = bagRegimens.find((regimen) => regimen.id === 'fentanila-10ml-20-mcg-ml')!;
    expect(() => calculateBagPreparation(fentanyl, 0)).toThrow(RangeError);
  });
});
