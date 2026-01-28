import { describe, it, expect } from 'vitest';
import { calculateRate, formatNumber, calculateConcentration } from './calculator';
import { Drug } from '../types';

describe('calculator utils', () => {
  // Helper to create a partial Drug object for testing
  const createMockDrug = (unit: string, concentration: number): Drug => ({
    id: 'test-drug',
    name: 'Test Drug',
    type: 'vasopressor',
    presentation: { ampoule_ml: 10, mg_ml: 10 },
    standard_dilution: {
      syringe_ml: 50,
      drug_volume_ml: 10,
      diluent_volume_ml: 40,
      final_concentration_mcg_ml: concentration,
    },
    default_dose: { min: 0, max: 10, unit: unit },
  });

  describe('calculateConcentration', () => {
    it('should calculate correct concentration for SAMU Standard Norepinephrine', () => {
      // Noradrenalina Padrão SAMU: 4 ampolas de 4mg/4ml em 234ml de SG5%
      // 4mg/4ml -> 1mg/ml concentration in ampoule
      const presentation = {
        ampoule_ml: 4,
        mg_ml: 1 // 4mg / 4ml
      };
      
      const dilution = {
        num_ampoules: 4,
        diluent_volume_ml: 234,
        drug_volume_ml: 16 // 4 * 4ml
      };

      // Drug Volume = 4 * 4 = 16ml
      // Total Volume = 16 + 234 = 250ml
      // Total Mg = 16ml * 1mg/ml = 16mg
      // Total Mcg = 16000
      // Conc = 16000 / 250 = 64 mcg/ml
      
      expect(calculateConcentration(presentation, dilution)).toBe(64);
    });

    it('should calculate correct concentration when only drug volume is provided', () => {
      const presentation = {
        ampoule_ml: 10,
        mg_ml: 5 // 50mg/10ml
      };
      
      const dilution = {
        diluent_volume_ml: 90,
        drug_volume_ml: 10 // 1 ampoule manually specified
      };

      // Total Volume = 100ml
      // Total Mg = 10 * 5 = 50mg
      // Conc = 50000 / 100 = 500 mcg/ml
      
      expect(calculateConcentration(presentation, dilution)).toBe(500);
    });
    
    it('should handle zero total volume gracefully', () => {
      const presentation = { ampoule_ml: 10, mg_ml: 10 };
      const dilution = { diluent_volume_ml: 0, drug_volume_ml: 0 };
      expect(calculateConcentration(presentation, dilution)).toBe(0);
    });
  });

  describe('calculateRate', () => {
    it('should return 0 if final concentration is 0', () => {
      const drug = createMockDrug('mcg/kg/min', 0);
      const rate = calculateRate(1, 70, drug);
      expect(rate).toBe(0);
    });

    it('should calculate rate correctly for unit "mcg/kg/min"', () => {
      // Formula: (Dose * Weight * 60) / Conc
      // Example: (0.5 * 70 * 60) / 100 = 2100 / 100 = 21
      const drug = createMockDrug('mcg/kg/min', 100);
      const rate = calculateRate(0.5, 70, drug);
      expect(rate).toBe(21);
    });

    it('should return 0 for "mcg/kg/min" if weight is missing', () => {
      const drug = createMockDrug('mcg/kg/min', 100);
      const rate = calculateRate(0.5, null, drug);
      expect(rate).toBe(0);
    });

    it('should calculate rate correctly for unit "mcg/kg/h"', () => {
      // Formula: (Dose * Weight) / Conc
      // Example: (2 * 70) / 10 = 140 / 10 = 14
      const drug = createMockDrug('mcg/kg/h', 10);
      const rate = calculateRate(2, 70, drug);
      expect(rate).toBe(14);
    });

    it('should return 0 for "mcg/kg/h" if weight is missing', () => {
      const drug = createMockDrug('mcg/kg/h', 10);
      const rate = calculateRate(2, null, drug);
      expect(rate).toBe(0);
    });

    it('should calculate rate correctly for unit "mcg/min"', () => {
      // Formula: (Dose * 60) / Conc
      // Example: (10 * 60) / 20 = 600 / 20 = 30
      const drug = createMockDrug('mcg/min', 20);
      const rate = calculateRate(10, 70, drug); // Weight shouldn't matter
      expect(rate).toBe(30);
    });

    it('should calculate rate correctly for unit "mg/min"', () => {
      // Formula: (Dose * 1000 * 60) / Conc
      // Example: Amiodarona 50mg/ml, diluída para 6000mcg/ml
      // Dose 7.5mg/min -> 7.5 * 60000 / 6000 = 75 ml/h
      const drug = createMockDrug('mg/min', 6000);
      const rate = calculateRate(7.5, 70, drug);
      expect(rate).toBe(75);
    });

    it('should calculate rate correctly for unit "g/h"', () => {
      // Formula: (Dose * 1,000,000) / Conc
      // Example: (1 * 1000000) / 50000 = 20
      const drug = createMockDrug('g/h', 50000);
      const rate = calculateRate(1, 70, drug);
      expect(rate).toBe(20);
    });

    it('should calculate volume/dose correctly for unit "mg/dose"', () => {
      // Formula: (Dose * 1000) / Conc
      // Example: (10 * 1000) / 100 = 10000 / 100 = 100
      const drug = createMockDrug('mg/dose', 100);
      const rate = calculateRate(10, 70, drug);
      expect(rate).toBe(100);
    });

    it('should calculate volume correctly for unit "mg/kg"', () => {
      // Formula: (Dose * Weight * 1000) / Conc
      // Example: (2 * 50 * 1000) / 2000 = 100000 / 2000 = 50
      const drug = createMockDrug('mg/kg', 2000);
      const rate = calculateRate(2, 50, drug);
      expect(rate).toBe(50);
    });

    it('should return 0 for "mg/kg" if weight is missing', () => {
      const drug = createMockDrug('mg/kg', 100);
      const rate = calculateRate(1, null, drug);
      expect(rate).toBe(0);
    });

    it('should return 0 for unknown unit', () => {
      const drug = createMockDrug('unknown/unit', 100);
      const rate = calculateRate(1, 70, drug);
      expect(rate).toBe(0);
    });
  });

  describe('formatNumber', () => {
    it('should return "0" for 0', () => {
      expect(formatNumber(0)).toBe('0');
    });

    it('should format numbers less than 0.1 with 2 decimal places', () => {
      expect(formatNumber(0.056)).toBe('0.06');
      expect(formatNumber(0.012)).toBe('0.01');
    });

    it('should format numbers less than 10 with 1 decimal place', () => {
      expect(formatNumber(5.56)).toBe('5.6');
      expect(formatNumber(1.23)).toBe('1.2');
    });

    it('should format numbers less than 100 which are >= 10 with 1 decimal place', () => {
      expect(formatNumber(10.5)).toBe('10.5');
      expect(formatNumber(99.4)).toBe('99.4');
    });

    it('should round numbers greater than or equal to 100 to nearest integer', () => {
      expect(formatNumber(100.2)).toBe('100');
      expect(formatNumber(150.7)).toBe('151');
      expect(formatNumber(123)).toBe('123');
    });
  });
});
