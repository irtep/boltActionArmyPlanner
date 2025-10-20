import type { Nation } from "../types/army";


export const armiesOfNation: Nation[] = [
    {
        id: '0',
        name: 'United States',
        availableUnits: [
            {
                id: 'us0',
                name: 'Platoon Commander',
                type: 'Infantry',
                baseCost: { inexperienced: 21, regular: 30, veteran: 39 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
                quantity: 1,
                maxQuantity: 6,
                weapons: 'Rifles',
                options:
                {
                    optionsDescription: [
                        ` The officer may be accompanied by up to 5 men with rifles at a cost of +7pts (Inexperienced), +10pts (Regular), or +13pts (Veteran) each `,
                        ` Anybody may replace their rifle with a submachine gun for +4pts each, or with a pistol for -1pt each`,
                        ` The squad may be given anti-tank grenades for +2pts per figure`,
                        `One officer in the entire force may have Intelligence training for +50pts`,
                        ` If taken as Airborne may take up to 2 additional men for the listed cost.`
                    ],
                    options: [
                        {
                            desc: 'submachine guns',
                            price: 4,
                            max: 6,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'pistol',
                            price: -1,
                            max: 6,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'Intelligence training',
                            price: 50,
                            max: 1,
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
                specialRules: ['Tank Hunters (if anti-tank grenades taken)', 'Intelligence (if taken)']
            },
            {
                id: 'us1',
                name: 'US Army Rifle Squad',
                type: 'Infantry',
                baseCost: { inexperienced: 42, regular: 60, veteran: 78 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
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
                            desc: 'submachine gun for NCO',
                            price: 4,
                            max: 1,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'Browning Automatic Rifle',
                            price: 6,
                            max: 1,
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
            },
            {
                id: 'us2',
                name: 'US Paratrooper Squad',
                type: 'Infantry',
                baseCost: { regular: 66, veteran: 84 },
                extraManCost: { regular: 11, veteran: 14 },
                quantity: 6,
                maxQuantity: 12,
                weapons: 'Rifles',
                options:
                {
                    optionsDescription: [
                        `Add up to 6 men with rifles at +11pts each (Regular), or +14pts each (Veteran)`,
                        `The NCO and up to 2 men may replace their rifle with a submachine gun for +4pts each`,
                        `Up to 1 man may replace their rifle with an automatic rifle for +6pts`,
                        `Up to 1 man may replace their rifle with a light machine gun for +15pts - another man becomes the loader`,
                        `The squad can be given anti-tank grenades for +2pts per figure`
                    ],
                    options: [
                        {
                            desc: 'submachine gun',
                            price: 4,
                            max: 3,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'Browning Automatic Rifle',
                            price: 6,
                            max: 1,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'Light machine gun',
                            price: 15,
                            max: 1,
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
                specialRules: ['Stubborn', 'Tank Hunters (if anti-tank grenades taken)']
            },
            {
                id: 'us3',
                name: 'Sniper team',
                type: 'Infantry',
                baseCost: { regular: 52, veteran: 67 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
                quantity: 2,
                maxQuantity: 2,
                weapons: 'Sniper has a rifle, spotter has a pistol',
                options:
                {
                    optionsDescription: [
                        `Any figure can have a submachine gun in addition to their weapons for +6pts each`,
                        `By Air, Land, and Sea: Airborne, Rangers, Marines`
                    ],
                    options: [
                        {
                            desc: 'additional submachine guns',
                            price: 6,
                            max: 2,
                            exprerienceLevel: 'all'
                        }
                    ]
                },
                specialRules: [
                    'Team weapon',
                    `Sniper`,
                    `Infiltrators`,
                    `By Air, Land, and Sea (if taken)`
                ]
            },
            {
                id: 'us4',
                name: 'Flamethrower team',
                type: 'Infantry',
                baseCost: { regular: 50, veteran: 65 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
                quantity: 2,
                maxQuantity: 2,
                weapons: '1 infantry flamethrower',
                options:
                {
                    optionsDescription: [
                        `By Air, Land, and Sea: Airborne, Rangers, Marines`
                    ],
                    options: [

                    ]
                },
                specialRules: [
                    'Team weapon',
                    `Flamethrower`,
                    `By Air, Land, and Sea (if taken)`
                ]
            },
            {
                id: 'us5',
                name: 'Light mortar team',
                type: 'Infantry',
                baseCost: { inexperienced: 25, regular: 35, veteran: 46 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
                quantity: 3,
                maxQuantity: 3,
                weapons: '1 Light mortar',
                options:
                {
                    optionsDescription: [
                        `By Air, Land, and Sea: Airborne, Rangers, Marines`
                    ],
                    options: [

                    ]
                },
                specialRules: [
                    'Team weapon',
                    `By Air, Land, and Sea (if taken)`
                ]
            },
            {
                id: 'us6',
                name: 'M4A3 Sherman 75MM',
                type: 'Tank',
                baseCost: { inexperienced: 164, regular: 205, veteran: 246 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
                quantity: 1,
                maxQuantity: 1,
                weapons: '1 Turret-mounted medium anti-tank gun with co-axial MMG and 1 forward-facing hull-mounted MMG',
                options:
                {
                    optionsDescription: [
                        `Add a pintle-mounted MMG on the turret for +15pts`,
                        `Upgrade the pintle-mounted MMG to a pintle-mounted HMG for +10pts`,
                        `Cancel the ‘Easily Catches Fire’ rule for +5pts`,
                    ],
                    options: [
                        {
                            desc: 'Pintle MMG for turret',
                            price: 15,
                            max: 1,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'Pintle MMG => HMG',
                            price: 10,
                            max: 1,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'Cancel catch fire easily',
                            price: 5,
                            max: 1,
                            exprerienceLevel: 'all'
                        }
                    ]
                },
                specialRules: [
                    `Easily Catches Fire: If a roll on the vehicle damage table results in the vehicle catching fire, add D3 pin markers rather than just
1 before taking the morale check.`,
                    `Improved HE: instead of HE (1”) the medium anti-tank gun has HE (2”).`,
                    `Gyro-Stabilisers (if taken as Veteran)`
                ]
            },
            {
                id: 'us7',
                name: 'M4A3E8 Sherman 76MM',
                type: 'Tank',
                baseCost: { inexperienced: 180, regular: 225, veteran: 270 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
                quantity: 1,
                maxQuantity: 1,
                weapons: '1 Turret-mounted heavy anti-tank gun with co-axial MMG and 1 forward-facing hull-mounted MMG',
                options:
                {
                    optionsDescription: [
                        `Add a pintle-mounted MMG on the turret for +15pts`,
                        `Upgrade the pintle-mounted MMG to a pintle-mounted HMG for +10pts`,
                        `Add a Culin hedgerow cutter for +5pts`,
                    ],
                    options: [
                        {
                            desc: 'Pintle MMG for turret',
                            price: 15,
                            max: 1,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'Pintle MMG => HMG',
                            price: 10,
                            max: 1,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'Culin hedgerow cutter',
                            price: 5,
                            max: 1,
                            exprerienceLevel: 'all'
                        }
                    ]
                },
                specialRules: [
                    `Gyro-Stabilisers (if taken as Veteran)`
                ]
            },
            {
                id: 'us8',
                name: 'M8 Greyhound',
                type: 'Vehicle',
                baseCost: { inexperienced: 84, regular: 105, veteran: 126 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
                quantity: 1,
                maxQuantity: 1,
                weapons: '1 Turret-mounted light anti-tank gun with coaxial MMG',
                options:
                {
                    optionsDescription: [
                        `May add a pintle-mounted HMG with a 360-degree arc of fire for +25pts`
                    ],
                    options: [
                        {
                            desc: 'Pintle HMG',
                            price: 25,
                            max: 1,
                            exprerienceLevel: 'all'
                        }
                    ]
                },
                specialRules: [
                    `Recce`,
                    `Open-topped`
                ]
            },
            {
                id: 'us9',
                name: 'M20 Scout car',
                type: 'Vehicle',
                baseCost: { inexperienced: 60, regular: 75, veteran: 90 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
                quantity: 1,
                maxQuantity: 1,
                weapons: '1 Pintle-mounted HMG with a 360-degree arc of fire',
                options:
                {
                    optionsDescription: [
                        `May be upgraded to Command Vehicle for +10pts`
                    ],
                    options: [
                        {
                            desc: 'Command vehicle',
                            price: 10,
                            max: 1,
                            exprerienceLevel: 'all'
                        }
                    ]
                },
                specialRules: [
                    `Recce`,
                    `Open-topped`,
                    `Command Vehicle (if option is taken)`
                ]
            },
            {
                id: 'us10',
                name: 'Reconnaisance Jeep',
                type: 'Vehicle',
                baseCost: { inexperienced: 36, regular: 45, veteran: 54 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
                quantity: 1,
                maxQuantity: 1,
                weapons: '1 pintle-mounted MMG with a 360-degree arc of fire',
                options:
                {
                    optionsDescription: [

                    ],
                    options: [

                    ]
                },
                specialRules: [
                    `Recce`
                ]
            },
            {
                id: 'us11',
                name: 'M3 Half-track',
                type: 'Vehicle',
                baseCost: { inexperienced: 62, regular: 77, veteran: 92 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
                quantity: 1,
                maxQuantity: 1,
                weapons: '1 Pintle mounted HMG with a 360-degree arc of fire',
                options:
                {
                    optionsDescription: [
                        `May add up to three additional pintle-mounted MMGs (one covering the left arc, one covering the right arc and one covering
the rear arc) for +15pts each`,
                        `Transports 12 men`
                    ],
                    options: [
                        {
                            desc: '3 additional pintle MMG (left, right, back)',
                            price: 15,
                            max: 3,
                            exprerienceLevel: 'all'
                        }
                    ]
                },
                specialRules: [
                    `Open-topped`
                ]
            },
            {
                id: 'us12',
                name: 'Jeep',
                type: 'Vehicle',
                baseCost: { inexperienced: 14, regular: 18, veteran: 22 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
                quantity: 1,
                maxQuantity: 1,
                weapons: 'No weapons, can transport 3 men and tow some guns',
                options:
                {
                    optionsDescription: [

                    ],
                    options: [

                    ]
                },
                specialRules: [

                ]
            },
        ]
    },
    /**
     * 
     * 
     *    GERMANY
     * 
     */
    {
        id: '1',
        name: 'Germany',
        availableUnits: [
            {
                id: 'ger0',
                name: 'Platoon Commander',
                type: 'Infantry',
                baseCost: { inexperienced: 21, regular: 30, veteran: 39 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
                quantity: 1,
                maxQuantity: 6,
                weapons: 'Rifles',
                options:
                {
                    optionsDescription: [
                        ` The officer may be accompanied by up to 5 men with rifles at a cost of +7pts (Inexperienced), +10pts (Regular), or +13pts (Veteran) each `,
                        ` Anybody may replace their rifle with a submachine gun for +4pts each, or with a pistol for -1pt each`,
                        ` Up to 1 man may replace their rifle for an assault rifle for +6pts`,
                        `Intelligence training +50 points`,
                        `If taken as Fallschirmjäger, may take +1 additional man (on top of the additional men already listed in the entry) for the listed cost`,
                        `If taken as Waffen-SS, 1 additional man may replace their rifle for an assault rifle for +6pts`
                    ],
                    options: [
                        {
                            desc: 'submachine guns',
                            price: 4,
                            max: 6,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'pistol',
                            price: -1,
                            max: 6,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'Intelligence training',
                            price: 50,
                            max: 1,
                            exprerienceLevel: 'all'
                        }
                    ]
                },
                specialRules: ['Intelligence (if taken)']
            },
            {
                id: 'ger1',
                name: 'Heer Grenadier squad',
                type: 'Infantry',
                baseCost: { regular: 50 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
                quantity: 5,
                maxQuantity: 10,
                weapons: 'Rifles',
                options:
                {
                    optionsDescription: [
                        `The NCO and up to 1 man may replace their rifles with submachine guns for +4pts each`,
                        `The NCO and up to 2 men may replace their rifles with assault rifles for +6pts each`,
                        `Up to 1 man may replace their rifle with a light machine gun for +15pts - another man becomes the loader`,
                        `Up to 4 men may have a panzerfaust in addition to other weapons for +15pts each`,
                        `The squad can be given anti-tank grenades for +2pts per figure`
                    ],
                    options: [
                        {
                            desc: 'submachine gun for NCO',
                            price: 4,
                            max: 3,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'Assault Rifle',
                            price: 6,
                            max: 3,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'LMG',
                            price: 15,
                            max: 1,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'Panzerfaust',
                            price: 15,
                            max: 4,
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
            },
            {
                id: 'ger1v',
                name: 'Heer Veteran Grenadier squad',
                type: 'Infantry',
                baseCost: { regular: 65 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
                quantity: 5,
                maxQuantity: 10,
                weapons: 'Rifles',
                options:
                {
                    optionsDescription: [
                        `The NCO and up to 6 men may replace their rifles with submachine guns for +4pts each`,
                        `Anybody may replace their rifles with assault rifles for +6pts each`,
                        `Up to 2 man may replace their rifle with a light machine gun for +15pts - another man becomes the loader`,
                        `Up to 4 men may have a panzerfaust in addition to other weapons for +15pts each`,
                        `The squad can be given anti-tank grenades for +2pts per figure`
                    ],
                    options: [
                        {
                            desc: 'submachine gun for NCO',
                            price: 4,
                            max: 7,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'Assault Rifle',
                            price: 6,
                            max: 10,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'LMG',
                            price: 15,
                            max: 2,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'Panzerfaust',
                            price: 15,
                            max: 4,
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
            },
            {
                id: 'ger2',
                name: 'Waffen SS Squad',
                type: 'Infantry',
                baseCost: { inexperienced: 45, regular: 60, veteran: 75 },
                extraManCost: { inexperienced: 9, regular: 12, veteran: 15 },
                quantity: 5,
                maxQuantity: 12,
                weapons: 'Rifles',
                options:
                {
                    optionsDescription: [
                        `Anybody may replace their rifle with a submachine gun for +4pts each`,
                        `Anybody may replace their rifle with an assault rifle for +6pts each`,
                        `Up to 2 men may replace their rifle with a light machine gun for +15pts each - for each light machine gun included another man becomes the loader.`,
                        `Up to 4 men may have a panzerfaust in addition to other weapons for +15pts each`,
                        `The squad can be given anti-tank grenades for +2pts per figure`
                    ],
                    options: [
                        {
                            desc: 'submachine gun',
                            price: 4,
                            max: 12,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'Assault Rifle',
                            price: 6,
                            max: 12,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'Light machine gun',
                            price: 15,
                            max: 2,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'Panzerfaust',
                            price: 15,
                            max: 4,
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
                specialRules: ['Fanatics', `Mixed Quality (if inexperience)`, 'Tank Hunters (if anti-tank grenades taken)']
            },
            {
                id: 'ger2paras',
                name: 'Fallschirmjäger Squad',
                type: 'Infantry',
                baseCost: { veteran: 70 },
                extraManCost: { veteran: 14 },
                quantity: 5,
                maxQuantity: 10,
                weapons: 'Rifles',
                options:
                {
                    optionsDescription: [
                        `The NCO and up to 6 men may replace their rifles with submachine guns for +4pts each`,
                        `The NCO and up to 6 men may replace their rifles with assault rifles for +6pts each`,
                        `Up to 2 men may replace their rifle with a light machine gun for +15pts each - for each light machine gun included another man becomes the loader.`,
                        `Up to 4 men may have a panzerfaust in addition to other weapons for +15pts each`
                    ],
                    options: [
                        {
                            desc: 'submachine gun',
                            price: 4,
                            max: 7,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'Assault Rifle',
                            price: 6,
                            max: 7,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'Light machine gun',
                            price: 15,
                            max: 2,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'Panzerfaust',
                            price: 15,
                            max: 4,
                            exprerienceLevel: 'all'
                        }
                    ]
                },
                specialRules: ['Stubborn']
            },
            {
                id: 'ger3x',
                name: 'Panzerschreck',
                type: 'Infantry',
                baseCost: { inexperienced: 56, regular: 80, veteran: 104 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
                quantity: 2,
                maxQuantity: 2,
                weapons: '1 panzerschreck',
                options:
                {
                    optionsDescription: [
                        `Defend the fatherland!`
                    ],
                    options: [

                    ]
                },
                specialRules: [
                    'Team weapon',
                    `Shaped Charge`,
                    `Defend the fatherland (if taken)`
                ]
            },
            {
                id: 'ger3',
                name: 'Sniper team',
                type: 'Infantry',
                baseCost: { regular: 52, veteran: 67 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
                quantity: 2,
                maxQuantity: 2,
                weapons: 'Pistols and rifles',
                options:
                {
                    optionsDescription: [
                    ],
                    options: [
                    ]
                },
                specialRules: [
                    'Team weapon',
                    `Sniper`,
                    `Infiltrators`,
                    `Defend the fatherland (if taken)`
                ]
            },
            {
                id: 'ger4',
                name: 'Flamethrower team',
                type: 'Infantry',
                baseCost: { regular: 50, veteran: 65 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
                quantity: 2,
                maxQuantity: 2,
                weapons: '1 infantry flamethrower or 2 x one shot infantry flamethrowers',
                options:
                {
                    optionsDescription: [
                    ],
                    options: [

                    ]
                },
                specialRules: [
                    'Team weapon',
                    `Flamethrower`,
                ]
            },
            {
                id: 'ger5',
                name: 'medium mortar team',
                type: 'Infantry',
                baseCost: { inexperienced: 32, regular: 45, veteran: 59 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
                quantity: 3,
                maxQuantity: 3,
                weapons: '1 Medium mortar',
                options:
                {
                    optionsDescription: [
                        `Spotter for 10pts`
                    ],
                    options: [

                    ]
                },
                specialRules: [
                    'Team weapon',
                    `Fixed`
                ]
            },
            {
                id: 'ger6',
                name: 'Panzer III, Ausf N',
                type: 'Tank',
                baseCost: { regular: 175, veteran: 210 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
                quantity: 1,
                maxQuantity: 1,
                weapons: '1 turret-mounted light howitzer with co-axial MMG and 1 forward-facing hull-mounted MMG',
                options:
                {
                    optionsDescription: [
                    ],
                    options: [
                    ]
                },
                specialRules: [
                    `9+ medium tank`
                ]
            },
            {
                id: 'ger7',
                name: 'Panzer IV Ausf H',
                type: 'Tank',
                baseCost: { inexperienced: 180, regular: 225, veteran: 270 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
                quantity: 1,
                maxQuantity: 1,
                weapons: '1 turret-mounted heavy anti-tank gun with co-axial MMG and 1 forward-facing hull-mounted MMG',
                options:
                {
                    optionsDescription: [
                        `Schürzen`,
                    ],
                    options: [
                        {
                            desc: 'Schürzen',
                            price: 10,
                            max: 1,
                            exprerienceLevel: 'all'
                        }
                    ]
                },
                specialRules: [
                    `Panzer Ace`
                ]
            },
            {
                id: 'ger8',
                name: 'Panzer V Panther',
                type: 'Vehicle',
                baseCost: { inexperienced: 238, regular: 298, veteran: 358 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
                quantity: 1,
                maxQuantity: 1,
                weapons: '1 Turret-mounted light anti-tank gun with coaxial MMG',
                options:
                {
                    optionsDescription: [
                        `May add 1 pintle-mounted MMG for +15pts`
                    ],
                    options: [
                        {
                            desc: 'Pintle MMG',
                            price: 15,
                            max: 1,
                            exprerienceLevel: 'all'
                        }
                    ]
                },
                specialRules: [
                    `Reinforced Front Armour`,
                    `Panzer Ace`
                ]
            },
            {
                id: 'ger9',
                name: 'Panzer VI Tiger',
                type: 'Vehicle',
                baseCost: { regular: 330, veteran: 396 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
                quantity: 1,
                maxQuantity: 1,
                weapons: '1 turret-mounted super-heavy anti-tank gun withco-axial MMG and 1 forward-facing hull-mounted MMG',
                options:
                {
                    optionsDescription: [
                        `May add 1 pintle-mounted MMG for +15pts`
                    ],
                    options: [
                        {
                            desc: 'Pintle MMG',
                            price: 15,
                            max: 1,
                            exprerienceLevel: 'all'
                        }
                    ]
                },
                specialRules: [
                    `Panzer Ace`
                ]
            },
            {
                id: 'ger10',
                name: 'Stug III',
                type: 'Vehicle',
                baseCost: { inexperienced: 172, regular: 215, veteran: 258 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
                quantity: 1,
                maxQuantity: 1,
                weapons: '1 casement-mounted forward-facing heavy anti-tank gun and 1 forward-facing MMG',
                options:
                {
                    optionsDescription: [
                        `May upgrade the forward-facing MMG to a MMG with 360-degree arc of fire for +5pts`,
                        `May add a co-axial MMG to the main gun for +5pts`,
                        `Schürzen armour skirts for +10pts`
                    ],
                    options: [
                        {
                            desc: 'forward-facing MMG to a MMG with 360-degree arc of fire',
                            price: 5,
                            max: 1,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'co-axial MMG to the main gun',
                            price: 5,
                            max: 1,
                            exprerienceLevel: 'all'
                        },
                        {
                            desc: 'Schürzen',
                            price: 10,
                            max: 1,
                            exprerienceLevel: 'all'
                        }
                    ]
                },
                specialRules: [
                    `Panzer Ace`
                ]
            },
            {
                id: 'ger11',
                name: 'SD.KFZ 251/1 ',
                type: 'Vehicle',
                baseCost: { inexperienced: 50, regular: 62, veteran: 74 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
                quantity: 1,
                maxQuantity: 1,
                weapons: '1 pintle-mounted MMG covering the forward arc',
                options:
                {
                    optionsDescription: [
                        `May add 1 pintle-mounted MMG covering for rear`,
                        `Transports 12 men`
                    ],
                    options: [
                        {
                            desc: '1 pintle-mounted MMG covering for rear',
                            price: 10,
                            max: 3,
                            exprerienceLevel: 'all'
                        }
                    ]
                },
                specialRules: [
                    `Open-topped`
                ]
            },
            {
                id: 'ger12',
                name: 'Opel Blitz / Maultier half-track',
                type: 'Vehicle',
                baseCost: { inexperienced: 22, regular: 27, veteran: 32 },
                extraManCost: { inexperienced: 7, regular: 10, veteran: 13 },
                quantity: 1,
                maxQuantity: 1,
                weapons: 'No weapons, can transport 3 men and tow some guns',
                options:
                {
                    optionsDescription: [
                        'pintle MMG for front arc'
                    ],
                    options: [
                        {
                            desc: '1 pintle-mounted MMG covering forward',
                            price: 15,
                            max: 3,
                            exprerienceLevel: 'all'
                        }
                    ]
                },
                specialRules: [

                ]
            },
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