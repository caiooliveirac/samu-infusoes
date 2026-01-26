import { Drug } from '../types';

export const drugsData: Drug[] = [
  {
    "id": "adrenalina_clor_20ml_50",
    "name": "ADRENALINA, CLORIDRATO",
    "type": "vasopressor",
    "presentation": { "ampoule_ml": 1.0, "mg_ml": 1.0 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 1, "drug_volume_ml": 1, "diluent_volume_ml": 19, "final_concentration_mcg_ml": 50 },
    "default_dose": { "min": 0.0476, "max": 1.0, "unit": "mcg/kg/min" }
  },
  {
    "id": "adrenalina_clor_50ml_20",
    "name": "ADRENALINA (Diluição 50ml)",
    "type": "vasopressor",
    "presentation": { "ampoule_ml": 1.0, "mg_ml": 1.0 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 1, "drug_volume_ml": 1, "diluent_volume_ml": 49, "final_concentration_mcg_ml": 20 },
    "default_dose": { "min": 0.0476, "max": 1.0, "unit": "mcg/kg/min" },
    "warning": "DILUIÇÃO 50ML"
  },
  {
    "id": "amiodarona_ataque_20ml",
    "name": "AMIODARONA (Ataque)",
    "type": "antiarritmico",
    "presentation": { "ampoule_ml": 3, "mg_ml": 50 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 1, "drug_volume_ml": 3, "diluent_volume_ml": 17, "final_concentration_mcg_ml": 7500 },
    "default_dose": { "min": 0, "max": 300, "unit": "mg/dose" },
    "warning": "ATAQUE"
  },
  {
    "id": "amiodarona_manut_6h_20ml",
    "name": "AMIODARONA (Manut 6h)",
    "type": "antiarritmico",
    "presentation": { "ampoule_ml": 3, "mg_ml": 50 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 6, "drug_volume_ml": 18, "diluent_volume_ml": 2, "final_concentration_mcg_ml": 9000 },
    "default_dose": { "min": 7.1, "max": 14.3, "unit": "mcg/kg/min" },
    "warning": "USAR 6 AMPOLAS"
  },
  {
    "id": "amiodarona_manut_18h_20ml",
    "name": "AMIODARONA (Manut 18h)",
    "type": "antiarritmico",
    "presentation": { "ampoule_ml": 3, "mg_ml": 50 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 6, "drug_volume_ml": 18, "diluent_volume_ml": 2, "final_concentration_mcg_ml": 9000 },
    "default_dose": { "min": 3.5, "max": 7.2, "unit": "mcg/kg/min" },
    "warning": "USAR 6 AMPOLAS"
  },
  {
    "id": "atropina_20ml",
    "name": "ATROPINA (20 Ampolas)",
    "type": "outros",
    "presentation": { "ampoule_ml": 1, "mg_ml": 0.25 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 20, "drug_volume_ml": 20, "diluent_volume_ml": 0, "final_concentration_mcg_ml": 250 },
    "default_dose": { "min": 0.04, "max": 1.2, "unit": "mcg/kg/min" },
    "warning": "20 AMPOLAS"
  },
  {
    "id": "cetamina_manut_20ml",
    "name": "CETAMINA (Manutenção)",
    "type": "sedativo",
    "presentation": { "ampoule_ml": 10, "mg_ml": 50 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 1, "drug_volume_ml": 10, "diluent_volume_ml": 10, "final_concentration_mcg_ml": 25000 },
    "default_dose": { "min": 1.4, "max": 7.2, "unit": "mcg/kg/min" }
  },
  {
    "id": "dobutamina_std_20ml",
    "name": "DOBUTAMINA (Manutenção)",
    "type": "inotropos",
    "presentation": { "ampoule_ml": 20, "mg_ml": 12.5 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 1, "drug_volume_ml": 20, "diluent_volume_ml": 0, "final_concentration_mcg_ml": 12500 },
    "default_dose": { "min": 2.0, "max": 20.0, "unit": "mcg/kg/min" }
  },
  {
    "id": "dobutamina_conc_20ml",
    "name": "DOBUTAMINA (Equiv Concentrada)",
    "type": "inotropos",
    "presentation": { "ampoule_ml": 20, "mg_ml": 12.5 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 1, "drug_volume_ml": 20, "diluent_volume_ml": 0, "final_concentration_mcg_ml": 12500 },
    "default_dose": { "min": 3.5, "max": 20.0, "unit": "mcg/kg/min" },
    "warning": "CONCENTRADA"
  },
  {
    "id": "dobutamina_conc_2x_20ml",
    "name": "DOBUTAMINA (Equiv 2X Concentrada)",
    "type": "inotropos",
    "presentation": { "ampoule_ml": 20, "mg_ml": 12.5 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 1, "drug_volume_ml": 20, "diluent_volume_ml": 0, "final_concentration_mcg_ml": 12500 },
    "default_dose": { "min": 3.5, "max": 20.0, "unit": "mcg/kg/min" },
    "warning": "CONCENTRADA 2X"
  },
  {
    "id": "dobutamina_conc_4x_20ml",
    "name": "DOBUTAMINA (Equiv 4X Concentrada)",
    "type": "inotropos",
    "presentation": { "ampoule_ml": 20, "mg_ml": 12.5 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 1, "drug_volume_ml": 20, "diluent_volume_ml": 0, "final_concentration_mcg_ml": 12500 },
    "default_dose": { "min": 3.5, "max": 20.0, "unit": "mcg/kg/min" },
    "warning": "CONCENTRADA 4X"
  },
  {
    "id": "dopamina_media_20ml",
    "name": "DOPAMINA (Dose Média)",
    "type": "vasopressor",
    "presentation": { "ampoule_ml": 10, "mg_ml": 5 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 2, "drug_volume_ml": 20, "diluent_volume_ml": 0, "final_concentration_mcg_ml": 5000 },
    "default_dose": { "min": 5.0, "max": 20.0, "unit": "mcg/kg/min" },
    "warning": "USAR 2 AMPOLAS"
  },
  {
    "id": "dopamina_alta_20ml",
    "name": "DOPAMINA (Dose Alta)",
    "type": "vasopressor",
    "presentation": { "ampoule_ml": 10, "mg_ml": 5 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 2, "drug_volume_ml": 20, "diluent_volume_ml": 0, "final_concentration_mcg_ml": 5000 },
    "default_dose": { "min": 5.0, "max": 20.0, "unit": "mcg/kg/min" },
    "warning": "USAR 2 AMPOLAS"
  },
  {
    "id": "fenitoina_20ml",
    "name": "FENITOÍNA",
    "type": "outros",
    "presentation": { "ampoule_ml": 5, "mg_ml": 50 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 2, "drug_volume_ml": 10, "diluent_volume_ml": 10, "final_concentration_mcg_ml": 25000 },
    "default_dose": { "min": 35.0, "max": 715.0, "unit": "mcg/kg/min" },
    "warning": "USAR 2 AMPOLAS"
  },
  {
    "id": "fentanila_2ml_20ml",
    "name": "FENTANILA 2ml",
    "type": "sedativo",
    "presentation": { "ampoule_ml": 2, "mg_ml": 0.05 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 1, "drug_volume_ml": 2, "diluent_volume_ml": 18, "final_concentration_mcg_ml": 5 },
    "default_dose": { "min": 0.02, "max": 0.05, "unit": "mcg/kg/min" }
  },
  {
    "id": "fentanila_10ml_20ml",
    "name": "FENTANILA 10ml",
    "type": "sedativo",
    "presentation": { "ampoule_ml": 10, "mg_ml": 0.05 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 1, "drug_volume_ml": 10, "diluent_volume_ml": 10, "final_concentration_mcg_ml": 25 },
    "default_dose": { "min": 0.02, "max": 0.05, "unit": "mcg/kg/min" }
  },
  {
    "id": "magnesio_ataque_20ml",
    "name": "MAGNÉSIO (Ataque Eclampsia)",
    "type": "outros",
    "presentation": { "ampoule_ml": 10, "mg_ml": 500 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 1, "drug_volume_ml": 8, "diluent_volume_ml": 12, "final_concentration_mcg_ml": 200000 },
    "default_dose": { "min": 2850, "max": 3810, "unit": "mcg/kg/min" }
  },
  {
    "id": "magnesio_manut_20ml",
    "name": "MAGNÉSIO (Manut Eclampsia)",
    "type": "outros",
    "presentation": { "ampoule_ml": 10, "mg_ml": 500 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 2, "drug_volume_ml": 20, "diluent_volume_ml": 0, "final_concentration_mcg_ml": 500000 },
    "default_dose": { "min": 238, "max": 476, "unit": "mcg/kg/min" },
    "warning": "USAR 2 AMPOLAS"
  },
  {
    "id": "magnesio_bronco_20ml",
    "name": "MAGNÉSIO (Broncoespasmo)",
    "type": "outros",
    "presentation": { "ampoule_ml": 10, "mg_ml": 500 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 1, "drug_volume_ml": 4, "diluent_volume_ml": 16, "final_concentration_mcg_ml": 100000 },
    "default_dose": { "min": 142, "max": 238, "unit": "mcg/kg/min" }
  },
  {
    "id": "midazolam_3ml_20ml",
    "name": "MIDAZOLAM 3ml",
    "type": "sedativo",
    "presentation": { "ampoule_ml": 3, "mg_ml": 5 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 1, "drug_volume_ml": 3, "diluent_volume_ml": 17, "final_concentration_mcg_ml": 750 },
    "default_dose": { "min": 1.8, "max": 6.6, "unit": "mcg/kg/min" }
  },
  {
    "id": "midazolam_10ml_20ml",
    "name": "MIDAZOLAM 10ml",
    "type": "sedativo",
    "presentation": { "ampoule_ml": 10, "mg_ml": 5 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 1, "drug_volume_ml": 10, "diluent_volume_ml": 10, "final_concentration_mcg_ml": 2500 },
    "default_dose": { "min": 1.8, "max": 6.6, "unit": "mcg/kg/min" }
  },
  {
    "id": "nitroglicerina_tridil_20ml",
    "name": "NITROGLICERINA (Tridil Conc)",
    "type": "vasodilatador",
    "presentation": { "ampoule_ml": 10, "mg_ml": 5 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 2, "drug_volume_ml": 20, "diluent_volume_ml": 0, "final_concentration_mcg_ml": 5000 },
    "default_dose": { "min": 0.9, "max": 4.8, "unit": "mcg/kg/min" },
    "warning": "USAR 2 AMPOLAS"
  },
  {
    "id": "propofol_20ml",
    "name": "PROPOFOL 1%",
    "type": "sedativo",
    "presentation": { "ampoule_ml": 20, "mg_ml": 10 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 1, "drug_volume_ml": 20, "diluent_volume_ml": 0, "final_concentration_mcg_ml": 10000 },
    "default_dose": { "min": 16.0, "max": 200.0, "unit": "mcg/kg/min" }
  },
  {
    "id": "nipride_conc_20ml",
    "name": "NITROPRUSSIATO (Nipride Conc)",
    "type": "vasodilatador",
    "presentation": { "ampoule_ml": 2, "mg_ml": 25 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 1, "drug_volume_ml": 2, "diluent_volume_ml": 18, "final_concentration_mcg_ml": 2500 },
    "default_dose": { "min": 0.5, "max": 1.5, "unit": "mcg/kg/min" },
    "warning": "CONCENTRADA"
  },
  {
    "id": "noradrenalina_conc_20ml",
    "name": "NORADRENALINA (Conc 4 amp)",
    "type": "vasopressor",
    "presentation": { "ampoule_ml": 4, "mg_ml": 1 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 1, "drug_volume_ml": 4, "diluent_volume_ml": 16, "final_concentration_mcg_ml": 200 },
    "default_dose": { "min": 0.05, "max": 2.0, "unit": "mcg/kg/min" },
    "warning": "CONCENTRADA"
  },
  {
    "id": "noradrenalina_2x_20ml",
    "name": "NORADRENALINA (Conc 2X)",
    "type": "vasopressor",
    "presentation": { "ampoule_ml": 4, "mg_ml": 1 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 1, "drug_volume_ml": 4, "diluent_volume_ml": 16, "final_concentration_mcg_ml": 200 },
    "default_dose": { "min": 0.19, "max": 0.27, "unit": "mcg/kg/min" },
    "warning": "CONCENTRADA 2X"
  },
  {
    "id": "noradrenalina_4x_20ml",
    "name": "NORADRENALINA (Conc 4X)",
    "type": "vasopressor",
    "presentation": { "ampoule_ml": 4, "mg_ml": 1 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 1, "drug_volume_ml": 4, "diluent_volume_ml": 16, "final_concentration_mcg_ml": 200 },
    "default_dose": { "min": 0.38, "max": 0.42, "unit": "mcg/kg/min" },
    "warning": "CONCENTRADA 4X"
  },
  {
    "id": "amiodarona_ataque_50ml",
    "name": "AMIODARONA (Ataque)",
    "type": "antiarritmico",
    "presentation": { "ampoule_ml": 3, "mg_ml": 50 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 1, "drug_volume_ml": 3, "diluent_volume_ml": 47, "final_concentration_mcg_ml": 3000 },
    "default_dose": { "min": 28.0, "max": 43.0, "unit": "mcg/kg/min" },
    "warning": "ATAQUE"
  },
  {
    "id": "amiodarona_manut_6h_50ml",
    "name": "AMIODARONA (Manut 6h)",
    "type": "antiarritmico",
    "presentation": { "ampoule_ml": 3, "mg_ml": 50 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 6, "drug_volume_ml": 18, "diluent_volume_ml": 32, "final_concentration_mcg_ml": 18000 },
    "default_dose": { "min": 14.3, "max": 14.3, "unit": "mcg/kg/min" },
    "warning": "USAR 6 AMPOLAS"
  },
  {
    "id": "amiodarona_manut_18h_50ml",
    "name": "AMIODARONA (Manut 18h)",
    "type": "antiarritmico",
    "presentation": { "ampoule_ml": 3, "mg_ml": 50 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 6, "drug_volume_ml": 18, "diluent_volume_ml": 32, "final_concentration_mcg_ml": 18000 },
    "default_dose": { "min": 7.1, "max": 7.1, "unit": "mcg/kg/min" },
    "warning": "USAR 6 AMPOLAS"
  },
  {
    "id": "cetamina_manut_50ml",
    "name": "CETAMINA (Manutenção)",
    "type": "sedativo",
    "presentation": { "ampoule_ml": 10, "mg_ml": 50 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 1, "drug_volume_ml": 10, "diluent_volume_ml": 40, "final_concentration_mcg_ml": 10000 },
    "default_dose": { "min": 1.4, "max": 7.1, "unit": "mcg/kg/min" }
  },
  {
    "id": "dobutamina_ini_50ml",
    "name": "DOBUTAMINA (Inicial)",
    "type": "inotropos",
    "presentation": { "ampoule_ml": 20, "mg_ml": 12.5 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 1, "drug_volume_ml": 20, "diluent_volume_ml": 30, "final_concentration_mcg_ml": 5000 },
    "default_dose": { "min": 0.6, "max": 1.2, "unit": "mcg/kg/min" }
  },
  {
    "id": "dobutamina_manut_50ml",
    "name": "DOBUTAMINA (Manutenção)",
    "type": "inotropos",
    "presentation": { "ampoule_ml": 20, "mg_ml": 12.5 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 1, "drug_volume_ml": 20, "diluent_volume_ml": 30, "final_concentration_mcg_ml": 5000 },
    "default_dose": { "min": 1.8, "max": 20.0, "unit": "mcg/kg/min" }
  },
  {
    "id": "dobutamina_conc_50ml",
    "name": "DOBUTAMINA (Equiv Concentrada)",
    "type": "inotropos",
    "presentation": { "ampoule_ml": 20, "mg_ml": 12.5 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 1, "drug_volume_ml": 20, "diluent_volume_ml": 30, "final_concentration_mcg_ml": 5000 },
    "default_dose": { "min": 3.6, "max": 20.0, "unit": "mcg/kg/min" },
    "warning": "CONCENTRADA"
  },
  {
    "id": "dobutamina_2x_50ml",
    "name": "DOBUTAMINA (Equiv 2X)",
    "type": "inotropos",
    "presentation": { "ampoule_ml": 20, "mg_ml": 12.5 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 1, "drug_volume_ml": 20, "diluent_volume_ml": 30, "final_concentration_mcg_ml": 5000 },
    "default_dose": { "min": 3.6, "max": 20.0, "unit": "mcg/kg/min" },
    "warning": "CONCENTRADA"
  },
  {
    "id": "dobutamina_4x_50ml",
    "name": "DOBUTAMINA (Equiv 4X)",
    "type": "inotropos",
    "presentation": { "ampoule_ml": 20, "mg_ml": 12.5 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 1, "drug_volume_ml": 20, "diluent_volume_ml": 30, "final_concentration_mcg_ml": 5000 },
    "default_dose": { "min": 3.6, "max": 20.0, "unit": "mcg/kg/min" },
    "warning": "CONCENTRADA"
  },
  {
    "id": "dopamina_baixa_50ml",
    "name": "DOPAMINA (Dose Baixa)",
    "type": "vasopressor",
    "presentation": { "ampoule_ml": 10, "mg_ml": 5 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 2, "drug_volume_ml": 20, "diluent_volume_ml": 30, "final_concentration_mcg_ml": 2000 },
    "default_dose": { "min": 0.8, "max": 1.9, "unit": "mcg/kg/min" },
    "warning": "USAR 2 AMPOLAS"
  },
  {
    "id": "dopamina_media_50ml",
    "name": "DOPAMINA (Dose Média)",
    "type": "vasopressor",
    "presentation": { "ampoule_ml": 10, "mg_ml": 5 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 2, "drug_volume_ml": 20, "diluent_volume_ml": 30, "final_concentration_mcg_ml": 2000 },
    "default_dose": { "min": 5.0, "max": 20.0, "unit": "mcg/kg/min" },
    "warning": "USAR 2 AMPOLAS"
  },
  {
    "id": "dopamina_alta_50ml",
    "name": "DOPAMINA (Dose Alta)",
    "type": "vasopressor",
    "presentation": { "ampoule_ml": 10, "mg_ml": 5 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 2, "drug_volume_ml": 20, "diluent_volume_ml": 30, "final_concentration_mcg_ml": 2000 },
    "default_dose": { "min": 5.0, "max": 20.0, "unit": "mcg/kg/min" },
    "warning": "USAR 2 AMPOLAS"
  },
  {
    "id": "fenitoina_50ml",
    "name": "FENITOÍNA",
    "type": "outros",
    "presentation": { "ampoule_ml": 5, "mg_ml": 50 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 2, "drug_volume_ml": 10, "diluent_volume_ml": 40, "final_concentration_mcg_ml": 10000 },
    "default_dose": { "min": 35.7, "max": 714.3, "unit": "mcg/kg/min" },
    "warning": "USAR 2 AMPOLAS"
  },
  {
    "id": "fentanila_2ml_50ml",
    "name": "FENTANILA 2ml",
    "type": "sedativo",
    "presentation": { "ampoule_ml": 2, "mg_ml": 0.05 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 1, "drug_volume_ml": 2, "diluent_volume_ml": 48, "final_concentration_mcg_ml": 2 },
    "default_dose": { "min": 0.02, "max": 0.05, "unit": "mcg/kg/min" }
  },
  {
    "id": "fentanila_10ml_50ml",
    "name": "FENTANILA 10ml",
    "type": "sedativo",
    "presentation": { "ampoule_ml": 10, "mg_ml": 0.05 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 1, "drug_volume_ml": 10, "diluent_volume_ml": 40, "final_concentration_mcg_ml": 10 },
    "default_dose": { "min": 0.02, "max": 0.05, "unit": "mcg/kg/min" }
  },
  {
    "id": "magnesio_bronco_50ml",
    "name": "MAGNÉSIO (Broncoespasmo)",
    "type": "outros",
    "presentation": { "ampoule_ml": 10, "mg_ml": 500 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 1, "drug_volume_ml": 4, "diluent_volume_ml": 46, "final_concentration_mcg_ml": 40000 },
    "default_dose": { "min": 0.0, "max": 381.0, "unit": "mcg/kg/min" }
  },
  {
    "id": "midazolam_3ml_50ml",
    "name": "MIDAZOLAM 3ml",
    "type": "sedativo",
    "presentation": { "ampoule_ml": 3, "mg_ml": 5 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 1, "drug_volume_ml": 3, "diluent_volume_ml": 47, "final_concentration_mcg_ml": 300 },
    "default_dose": { "min": 0.5, "max": 5.7, "unit": "mcg/kg/min" }
  },
  {
    "id": "midazolam_10ml_50ml",
    "name": "MIDAZOLAM 10ml",
    "type": "sedativo",
    "presentation": { "ampoule_ml": 10, "mg_ml": 5 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 1, "drug_volume_ml": 10, "diluent_volume_ml": 40, "final_concentration_mcg_ml": 1000 },
    "default_dose": { "min": 0.5, "max": 5.7, "unit": "mcg/kg/min" }
  },
  {
    "id": "midazolam_mal_convulsivo_3ml_50ml",
    "name": "MIDAZOLAM (Mal Convulsivo 3ml)",
    "type": "sedativo",
    "presentation": { "ampoule_ml": 3, "mg_ml": 5 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 1, "drug_volume_ml": 3, "diluent_volume_ml": 47, "final_concentration_mcg_ml": 300 },
    "default_dose": { "min": 0.5, "max": 5.0, "unit": "mcg/kg/min" }
  },
  {
    "id": "midazolam_mal_convulsivo_10ml_50ml",
    "name": "MIDAZOLAM (Mal Convulsivo 10ml)",
    "type": "sedativo",
    "presentation": { "ampoule_ml": 10, "mg_ml": 5 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 1, "drug_volume_ml": 10, "diluent_volume_ml": 40, "final_concentration_mcg_ml": 1000 },
    "default_dose": { "min": 0.5, "max": 5.0, "unit": "mcg/kg/min" }
  },
  {
    "id": "nitroglicerina_tridil_50ml",
    "name": "NITROGLICERINA (Tridil Conc)",
    "type": "vasodilatador",
    "presentation": { "ampoule_ml": 10, "mg_ml": 5 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 2, "drug_volume_ml": 20, "diluent_volume_ml": 30, "final_concentration_mcg_ml": 2000 },
    "default_dose": { "min": 1.0, "max": 4.8, "unit": "mcg/kg/min" },
    "warning": "USAR 2 AMPOLAS"
  },
  {
    "id": "nitroglicerina_tridil_std_50ml",
    "name": "NITROGLICERINA (Tridil Padrão)",
    "type": "vasodilatador",
    "presentation": { "ampoule_ml": 5, "mg_ml": 5 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 2, "drug_volume_ml": 10, "diluent_volume_ml": 40, "final_concentration_mcg_ml": 1000 },
    "default_dose": { "min": 1.0, "max": 4.8, "unit": "mcg/kg/min" },
    "warning": "USAR 2 AMPOLAS"
  },
  {
    "id": "propofol_50ml",
    "name": "PROPOFOL 1%",
    "type": "sedativo",
    "presentation": { "ampoule_ml": 20, "mg_ml": 10 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 2, "drug_volume_ml": 40, "diluent_volume_ml": 0, "final_concentration_mcg_ml": 10000 },
    "default_dose": { "min": 16.7, "max": 66.7, "unit": "mcg/kg/min" },
    "warning": "USAR 2 AMPOLAS"
  },
  {
    "id": "propofol_anestesia_50ml",
    "name": "PROPOFOL 1% (Anestesia)",
    "type": "sedativo",
    "presentation": { "ampoule_ml": 20, "mg_ml": 10 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 2, "drug_volume_ml": 40, "diluent_volume_ml": 0, "final_concentration_mcg_ml": 10000 },
    "default_dose": { "min": 125.0, "max": 200.0, "unit": "mcg/kg/min" },
    "warning": "USAR 2 AMPOLAS"
  },
  {
    "id": "nipride_std_50ml",
    "name": "NITROPRUSSIATO (Nipride Padrão)",
    "type": "vasodilatador",
    "presentation": { "ampoule_ml": 2, "mg_ml": 25 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 1, "drug_volume_ml": 2, "diluent_volume_ml": 48, "final_concentration_mcg_ml": 200 },
    "default_dose": { "min": 0.5, "max": 1.4, "unit": "mcg/kg/min" }
  },
  {
    "id": "nipride_conc_50ml",
    "name": "NITROPRUSSIATO (Nipride Conc)",
    "type": "vasodilatador",
    "presentation": { "ampoule_ml": 2, "mg_ml": 25 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 1, "drug_volume_ml": 2, "diluent_volume_ml": 48, "final_concentration_mcg_ml": 200 },
    "default_dose": { "min": 1.0, "max": 2.9, "unit": "mcg/kg/min" },
    "warning": "CONCENTRADA"
  },
  {
    "id": "noradrenalina_conc_50ml",
    "name": "NORADRENALINA (Equiv Concentrada)",
    "type": "vasopressor",
    "presentation": { "ampoule_ml": 4, "mg_ml": 1 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 1, "drug_volume_ml": 4, "diluent_volume_ml": 46, "final_concentration_mcg_ml": 80 },
    "default_dose": { "min": 0.06, "max": 0.17, "unit": "mcg/kg/min" },
    "warning": "CONCENTRADA"
  },
  {
    "id": "noradrenalina_2x_50ml",
    "name": "NORADRENALINA (Equiv 2X)",
    "type": "vasopressor",
    "presentation": { "ampoule_ml": 4, "mg_ml": 1 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 1, "drug_volume_ml": 4, "diluent_volume_ml": 46, "final_concentration_mcg_ml": 80 },
    "default_dose": { "min": 0.19, "max": 0.27, "unit": "mcg/kg/min" },
    "warning": "CONCENTRADA 2X"
  },
  {
    "id": "noradrenalina_4x_50ml",
    "name": "NORADRENALINA (Equiv 4X)",
    "type": "vasopressor",
    "presentation": { "ampoule_ml": 4, "mg_ml": 1 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 1, "drug_volume_ml": 4, "diluent_volume_ml": 46, "final_concentration_mcg_ml": 80 },
    "default_dose": { "min": 0.38, "max": 0.42, "unit": "mcg/kg/min" },
    "warning": "CONCENTRADA 4X"
  },
  {
    "id": "noradrenalina_neo_20ml",
    "name": "NORADRENALINA (Neonatal 20ml)",
    "type": "vasopressor",
    "presentation": { "ampoule_ml": 4, "mg_ml": 1 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 1, "drug_volume_ml": 0.32, "diluent_volume_ml": 19.68, "final_concentration_mcg_ml": 16 },
    "default_dose": { "min": 0.05, "max": 1.0, "unit": "mcg/kg/min" },
    "warning": "NEONATAL"
  },
  {
    "id": "noradrenalina_neo_50ml",
    "name": "NORADRENALINA (Neonatal 50ml)",
    "type": "vasopressor",
    "presentation": { "ampoule_ml": 4, "mg_ml": 1 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 1, "drug_volume_ml": 0.8, "diluent_volume_ml": 49.2, "final_concentration_mcg_ml": 16 },
    "default_dose": { "min": 0.05, "max": 1.0, "unit": "mcg/kg/min" },
    "warning": "NEONATAL"
  },
  {
    "id": "noradrenalina_ped32_20ml",
    "name": "NORADRENALINA (Ped 32mcg 20ml)",
    "type": "vasopressor",
    "presentation": { "ampoule_ml": 4, "mg_ml": 1 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 1, "drug_volume_ml": 0.64, "diluent_volume_ml": 19.36, "final_concentration_mcg_ml": 32 },
    "default_dose": { "min": 0.05, "max": 1.0, "unit": "mcg/kg/min" },
    "warning": "PEDIÁTRICO"
  },
  {
    "id": "noradrenalina_ped32_50ml",
    "name": "NORADRENALINA (Ped 32mcg 50ml)",
    "type": "vasopressor",
    "presentation": { "ampoule_ml": 4, "mg_ml": 1 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 1, "drug_volume_ml": 1.6, "diluent_volume_ml": 48.4, "final_concentration_mcg_ml": 32 },
    "default_dose": { "min": 0.05, "max": 1.0, "unit": "mcg/kg/min" },
    "warning": "PEDIÁTRICO"
  },
  {
    "id": "noradrenalina_ped64_20ml",
    "name": "NORADRENALINA (Ped 64mcg 20ml)",
    "type": "vasopressor",
    "presentation": { "ampoule_ml": 4, "mg_ml": 1 },
    "standard_dilution": { "syringe_ml": 20, "num_ampoules": 1, "drug_volume_ml": 1.28, "diluent_volume_ml": 18.72, "final_concentration_mcg_ml": 64 },
    "default_dose": { "min": 0.05, "max": 1.0, "unit": "mcg/kg/min" },
    "warning": "PEDIÁTRICO"
  },
  {
    "id": "noradrenalina_ped64_50ml",
    "name": "NORADRENALINA (Ped 64mcg 50ml)",
    "type": "vasopressor",
    "presentation": { "ampoule_ml": 4, "mg_ml": 1 },
    "standard_dilution": { "syringe_ml": 50, "num_ampoules": 1, "drug_volume_ml": 3.2, "diluent_volume_ml": 46.8, "final_concentration_mcg_ml": 64 },
    "default_dose": { "min": 0.05, "max": 1.0, "unit": "mcg/kg/min" },
    "warning": "PEDIÁTRICO"
  }
];
