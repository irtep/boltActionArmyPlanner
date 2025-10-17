import type { Nation } from "../types/army";

// Sample data
export const sampleNations: Nation[] = [
        {
        id: '0',
        name: 'United States',
        availableUnits: [
            {
                id: 'us2',
                name: 'Platoon Commander',
                type: 'Infantry',
                cost: { inexperienced: 21, regular: 30, veteran: 39 },
                quantity: 1,
                maxQuantity: 6,
                weapons: 'Rifles',
                options:
                {
                    optionsDescription: [
                        ` The officer may be accompanied by up to 5 men with rifles at a cost of +7pts (Inexperienced), +10pts (Regular), or +13pts
(Veteran) each `,
                        ` Anybody may replace their rifle with a submachine gun for +4pts each, or with a pistol for -1pt each`,
                        ` The squad may be given anti-tank grenades for +2pts per figure`,
                        `One officer in the entire force may have Intelligence training for +50pts`,
                        ` If taken as Airborne may take up to 2 additional men for the listed cost.`
                    ],
                    options: [
                        {
                            desc: 'submachien gun',
                            price: 4,
                            max: 1,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'Browning Automatic Rifle',
                            price: 6,
                            max: 2,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'anti-tank grenades',
                            price: 2,
                            max: 12,
                            exprerienceLevel: 'all'
                        }
                    ]
                },
                specialRules: ['Tank Hunters (if anti-tank grenades taken)']
            }
        ]
    },
    {
        id: '1',
        name: 'United States',
        availableUnits: [
            {
                id: 'us1',
                name: 'US Army Rifle Squad',
                type: 'Infantry',
                cost: { inexperienced: 42, regular: 60, veteran: 78 },
                quantity: 6,
                maxQuantity: 12,
                weapons: 'Rifles',
                options:
                {
                    optionsDescription: [
                        `Add up to 6 men with rifles at +7pts each (Inexperienced), +10pts each (Regular), or +13pts each (Veteran)`,
                        `The NCO may replace their rifle with a submachine gun for +4pts`,
                        `Up to 1 man may replace their rifle with an automatic rifle for +6pts`,
                        `The squad can be given anti-tank grenades for +2pts per figure`
                    ],
                    options: [
                        {
                            desc: 'submachien gun for NCO',
                            price: 4,
                            max: 1,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'Browning Automatic Rifle',
                            price: 6,
                            max: 2,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'anti-tank grenades',
                            price: 2,
                            max: 12,
                            exprerienceLevel: 'all'
                        }
                    ]
                },
                specialRules: ['Tank Hunters (if anti-tank grenades taken)']
            }
        ]
    }
];

/*
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

export interface ArmyUnit {
  id: string;
  name: string;
  type: 'Infantry' | 'Artillery' | 'Vehicle' | 'Team' | 'Tank';
  cost: UnitCost;
  quantity: number; // also minimum quantity
  maxQuantity: number;
  weapons: string;
  specialRules: string[];
  options: UnitOptions[];
  experience?: keyof UnitCost;
}
*/