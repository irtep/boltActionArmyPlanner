import React, { useState } from 'react';
import type { ArmyList, Unit, Nation } from '../types/army';
import UnitCard from './UnitCard';

interface ArmyBuilderProps {
  nations: Nation[];
}

const ArmyBuilder: React.FC<ArmyBuilderProps> = ({ nations }) => {
  const [selectedNation, setSelectedNation] = useState<Nation | null>(null);
  const [army, setArmy] = useState<ArmyList>({
    id: '1',
    name: 'My Army',
    nation: '',
    pointsLimit: 1000,
    units: [],
    totalPoints: 0
  });

  const addUnitToArmy = (unit: Unit) => {
    const newTotalPoints = army.totalPoints + unit.cost;
    
    if (newTotalPoints <= army.pointsLimit) {
      setArmy(prev => ({
        ...prev,
        units: [...prev.units, unit],
        totalPoints: newTotalPoints
      }));
    } else {
      alert('Not enough points remaining!');
    }
  };

  const removeUnitFromArmy = (unitId: string) => {
    const unit = army.units.find(u => u.id === unitId);
    if (unit) {
      setArmy(prev => ({
        ...prev,
        units: prev.units.filter(u => u.id !== unitId),
        totalPoints: prev.totalPoints - unit.cost
      }));
    }
  };

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
            {army.units.map(unit => (
              <div key={unit.id} className="army-unit">
                <span>{unit.name} - {unit.cost}pts</span>
                <button onClick={() => removeUnitFromArmy(unit.id)}>Remove</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArmyBuilder;