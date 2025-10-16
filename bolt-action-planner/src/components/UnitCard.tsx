import React from 'react';
import type { Unit } from '../types/army';

interface UnitCardProps {
  unit: Unit;
  onAddToArmy?: (unit: Unit) => void;
}

const UnitCard: React.FC<UnitCardProps> = ({ unit, onAddToArmy }) => {
  return (
    <div className="unit-card">
      <h3>{unit.name}</h3>
      <div className="unit-details">
        <p><strong>Type:</strong> {unit.type}</p>
        <p><strong>Cost:</strong> {unit.cost}pts</p>
        <p><strong>Experience:</strong> {unit.experience}</p>
        <div className="equipment">
          <strong>Equipment:</strong>
          <ul>
            {unit.equipment.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        {unit.specialRules.length > 0 && (
          <div className="special-rules">
            <strong>Special Rules:</strong>
            <ul>
              {unit.specialRules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {onAddToArmy && (
        <button onClick={() => onAddToArmy(unit)}>
          Add to Army
        </button>
      )}
    </div>
  );
};

export default UnitCard;