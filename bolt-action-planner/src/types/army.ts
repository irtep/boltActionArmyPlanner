export interface Unit {
  id: string;
  name: string;
  type: 'Infantry' | 'Artillery' | 'Vehicle' | 'Team';
  cost: number;
  experience: 'Regular' | 'Veteran' | 'Inexperienced';
  equipment: string[];
  specialRules: string[];
}

export interface ArmyList {
  id: string;
  name: string;
  nation: string;
  pointsLimit: number;
  units: Unit[];
  totalPoints: number;
}

export interface Nation {
  id: string;
  name: string;
  availableUnits: Unit[];
}