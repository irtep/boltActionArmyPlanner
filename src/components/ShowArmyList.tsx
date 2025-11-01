import { Container } from '@mui/material';
import React from 'react';
import type { ArmyListWithUnits, ArmyUnitExtended, ExperienceLevel } from './ArmyBuilder';

interface LocalProps {
    setArmy: React.Dispatch<React.SetStateAction<ArmyListWithUnits>>;
    army: ArmyListWithUnits;
};

const ShowArmyList: React.FC<LocalProps> = ({ army, setArmy }): React.ReactElement => {

    const removeUnitFromArmy = (unitId: string) => {
        const unit = army.units.find(u => u.uniqueId === unitId);
        if (unit) {
            const unitTotalCost = calculateUnitTotalCost(unit);
            setArmy(prev => ({
                ...prev,
                units: prev.units.filter(u => u.uniqueId !== unitId),
                totalPoints: prev.totalPoints - unitTotalCost
            }));
        }
    };

    const calculateUnitTotalCost = (unit: ArmyUnitExtended): number => {
        const baseCost = unit.baseCost[unit.experience];

        if (baseCost === undefined) {
            return 0;
        }

        let totalCost = baseCost;

        // Calculate additional men cost
        const costPerMan: Record<ExperienceLevel, number> = {
            inexperienced: 7,
            regular: 10,
            veteran: 13
        };
        totalCost += (unit.selectedOptions?.additionalMen || 0) * costPerMan[unit.experience];

        // Calculate upgrades cost
        Object.entries(unit.selectedOptions?.upgrades || {}).forEach(([optionIndex, quantity]) => {
            if (quantity > 0) {
                const option = unit.options.options[parseInt(optionIndex)];
                totalCost += option.price * quantity;
            }
        });

        return totalCost;
    };

    return (
        <Container>
            <div className="army-list">
                <h3>My Army ({army.totalPoints}/{army.pointsLimit} points)</h3>
                <div className="army-units">
                    {army.units.map((unit: ArmyUnitExtended) => {
                        const totalCost = calculateUnitTotalCost(unit);

                        // Get upgrade details
                        const upgradeDetails = Object.entries(unit.selectedOptions.upgrades || {})
                            .filter(([_, quantity]) => quantity > 0)
                            .map(([optionIndex, quantity]) => {
                                const option = unit.options.options[parseInt(optionIndex)];
                                return `${option.desc} (x${quantity})`;
                            })
                            .join(', ');

                        return (
                            <div key={unit.uniqueId} className="army-unit">
                                <div>
                                    <strong>{unit.name} ({unit.experience}) - {totalCost}pts</strong>
                                    {unit.selectedOptions.additionalMen > 0 && (
                                        <div>+{unit.selectedOptions.additionalMen} additional men</div>
                                    )}
                                    {upgradeDetails && (
                                        <div>Upgrades: {upgradeDetails}</div>
                                    )}
                                </div>
                                <button onClick={() => removeUnitFromArmy(unit.uniqueId)}>Remove</button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Container>
    );
}

export default ShowArmyList;