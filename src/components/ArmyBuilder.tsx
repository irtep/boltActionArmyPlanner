import React, { useEffect, useState } from 'react';
import type { ArmyList, ArmyUnit, Nation, SelectedOptions, UnitCost } from '../types/army';
import UnitCard from './UnitCard';

interface ArmyBuilderProps {
  nations: Nation[];
}

// Define a type for experience levels
type ExperienceLevel = keyof UnitCost;

// Extended Unit type that includes experience
interface ArmyUnitExtended extends ArmyUnit {
  experience: ExperienceLevel;
  uniqueId: string;
  selectedOptions: SelectedOptions;
}

interface ArmyListWithUnits extends Omit<ArmyList, 'units'> {
  units: ArmyUnitExtended[];
}

const ArmyBuilder: React.FC<ArmyBuilderProps> = ({ nations }) => {
  const [selectedNation, setSelectedNation] = useState<Nation | null>(null);
  const [army, setArmy] = useState<ArmyListWithUnits>({
    id: '1',
    name: 'My Army',
    nation: '',
    pointsLimit: 1000,
    units: [],
    totalPoints: 0
  });

  const generateId = (): string => {
    return `unit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  // Helper function to calculate total cost of a unit
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

  const addUnitToArmy = (unit: ArmyUnit, experience: ExperienceLevel, selectedOptions: SelectedOptions) => {
    const totalCost = calculateUnitTotalCost({
      ...unit,
      experience,
      uniqueId: '', // temporary, will be set properly below
      selectedOptions
    });
    
    const newTotalPoints = army.totalPoints + totalCost;
    
    if (newTotalPoints <= army.pointsLimit) {
      const unitWithExperience: ArmyUnitExtended = {
        ...unit,
        uniqueId: generateId(),
        experience: experience,
        selectedOptions: selectedOptions
      };
      
      setArmy(prev => ({
        ...prev,
        units: [...prev.units, unitWithExperience],
        totalPoints: newTotalPoints
      }));
    } else {
      alert('Not enough points remaining!');
    }
  };

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

  useEffect(() => {
    console.log('army: ', army);
  }, [army]);

  return (
    <div className="army-builder">
      <div className="nation-selector">
        <h2>Select Nation</h2>
        <select
          value={selectedNation?.id || ''}
          onChange={(e) => setSelectedNation(nations.find(n => n.id === e.target.value) || null)}
        >
          <option value="">Choose a nation</option>
          {nations.map(nation => (
            <option key={nation.id} value={nation.id}>
              {nation.name}
            </option>
          ))}
        </select>
      </div>

      <div className="builder-layout">
        <div className="unit-selection">
          <h3>Available Units</h3>
          {selectedNation ? (
            <div className="unit-grid">
              {selectedNation.availableUnits.map(unit => (
                <UnitCard
                  key={unit.id}
                  unit={unit}
                  onAddToArmy={addUnitToArmy}
                />
              ))}
            </div>
          ) : (
            <p>Please select a nation first</p>
          )}
        </div>

        <div className="army-list">
          <h3>My Army ({army.totalPoints}/{army.pointsLimit} points)</h3>
          <div className="army-units">
            {army.units.map((unit: ArmyUnitExtended) => {
              const totalCost = calculateUnitTotalCost(unit);
              return (
                <div key={unit.uniqueId} className="army-unit">
                  <span>
                    {unit.name} ({unit.experience}) - {totalCost}pts
                    {unit.selectedOptions.additionalMen > 0 && ` +${unit.selectedOptions.additionalMen} men`}
                    {Object.values(unit.selectedOptions.upgrades).some(qty => qty > 0) && ` +upgrades`}
                  </span>
                  <button onClick={() => removeUnitFromArmy(unit.uniqueId)}>Remove</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArmyBuilder;