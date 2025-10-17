export interface UnitCost {
  inexperienced?: number;
  regular: number;
  veteran: number;
}

export interface UpgradeOptions {
  desc: string;
  price: number;
  max: number;
  exprerienceLevel: 'inexperienced' | 'regular' |'veteran' | 'all';
}

export interface UnitOptions {
  optionsDescription: string[];
  options: UpgradeOptions[];
}

export interface SelectedOptions {
  additionalMen: number;
  upgrades: { [key: string]: number }; // option index -> quantity
}

export interface ArmyUnit {
  id: string;
  name: string;
  type: 'Infantry' | 'Artillery' | 'Vehicle' | 'Team' | 'Tank';
  baseCost: UnitCost;
  extraManCost: UnitCost;
  quantity: number; // also minimum quantity
  maxQuantity: number;
  weapons: string;
  specialRules: string[];
  options: UnitOptions;
  experience?: keyof UnitCost;
  selectedOptions?: SelectedOptions;
}
/*
export interface UnitUpgrade {
  id: string;
  name: string;
  cost: UnitCost;
  description: string;
}
*/
export interface ArmyList {
  id: string;
  name: string;
  nation: string;
  pointsLimit: number;
  units: ArmyUnit[];
  totalPoints: number;
}

export interface Nation {
  id: string;
  name: string;
  availableUnits: ArmyUnit[];
}