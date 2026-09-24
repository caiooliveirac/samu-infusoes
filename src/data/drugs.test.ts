import { describe, it, expect } from 'vitest';
import { drugsData } from './drugs';
import { calculateConcentration, calculateRate, syringeVolume } from '../utils/calculator';

// Guarda contra erro de digitação na tabela: toda diluição precisa fechar a conta.
describe.each(drugsData)('$id', (drug) => {
  const s = drug.standard_dilution;

  it('ampolas × volume da ampola = volume de droga', () => {
    expect(s.num_ampoules! * drug.presentation.ampoule_ml).toBeCloseTo(s.drug_volume_ml, 9);
  });

  it('concentração declarada = concentração calculada', () => {
    expect(calculateConcentration(drug.presentation, s)).toBeCloseTo(s.final_concentration_mcg_ml, 6);
  });

  it('volume preparado cabe na seringa', () => {
    expect(syringeVolume(drug)).toBeLessThanOrEqual(s.syringe_ml);
  });

  it('faixa de dose válida e unidade suportada', () => {
    const { min, max } = drug.default_dose;
    expect(min).not.toBeNull();
    expect(max).not.toBeNull();
    expect(min!).toBeLessThanOrEqual(max!);
    expect(calculateRate(max!, 70, drug)).toBeGreaterThan(0);
  });
});

describe('ids', () => {
  it('são únicos', () => {
    const ids = drugsData.map((d) => d.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

// Dose fixa: a vazão não pode mudar com o peso do paciente.
describe('magnésio independe do peso', () => {
  it.each(drugsData.filter((d) => d.id.startsWith('magnesio')))('$id', (drug) => {
    const dose = drug.default_dose.min!;
    expect(calculateRate(dose, 50, drug)).toBe(calculateRate(dose, 100, drug));
  });
});
