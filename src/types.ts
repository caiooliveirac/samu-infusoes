export interface DrugPresentation {
  ampoule_ml: number;
  mg_ml: number;
}

export interface StandardDilution {
  syringe_ml: number;
  num_ampoules?: number;
  drug_volume_ml: number;
  diluent_volume_ml: number;
  final_concentration_mcg_ml: number;
}

export interface DefaultDose {
  min: number | null;
  max: number | null;
  unit: string;
}

export interface Drug {
  id: string;
  name: string;
  type: 'vasopressor' | 'inotropos' | 'sedativo' | 'vasodilatador' | 'antiarritmico' | 'outros';
  presentation: DrugPresentation;
  standard_dilution: StandardDilution;
  default_dose: DefaultDose;
  warning?: string;
}
