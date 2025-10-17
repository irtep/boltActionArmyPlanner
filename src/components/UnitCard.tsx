import React, { useState } from 'react';
import type { ArmyUnit, UnitCost, UpgradeOptions } from '../types/army';

// Define a type for experience levels
type ExperienceLevel = keyof UnitCost;

interface UnitCardProps {
  unit: ArmyUnit;
  onAddToArmy?: (unit: ArmyUnit, experience: ExperienceLevel, selectedOptions: SelectedOptions) => void;
}

interface SelectedOptions {
  additionalMen: number;
  upgrades: { [key: string]: number }; // option index -> quantity
}

const UnitCard: React.FC<UnitCardProps> = ({ unit, onAddToArmy }) => {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceLevel>('regular');
  const [additionalMen, setAdditionalMen] = useState(0);
  const [selectedUpgrades, setSelectedUpgrades] = useState<{ [key: string]: number }>({});

  const getAvailableExperiences = (): ExperienceLevel[] => {
    const experiences: ExperienceLevel[] = [];
    if (unit.cost.inexperienced !== undefined) experiences.push('inexperienced');
    experiences.push('regular');
    experiences.push('veteran');
    return experiences;
  };

  const getCostString = (cost: ArmyUnit['cost']) => {
    const parts = [];
    if (cost.inexperienced) parts.push(`Inexp: ${cost.inexperienced}pts`);
    parts.push(`Reg: ${cost.regular}pts`);
    parts.push(`Vet: ${cost.veteran}pts`);
    return parts.join(' | ');
  };

  const getBaseCost = () => {
    return unit.cost[selectedExperience] || 0;
  };

  const getAdditionalMenCost = () => {
    // Calculate cost per additional man based on experience
    const costPerMan: Record<ExperienceLevel, number> = {
      inexperienced: 7,
      regular: 10,
      veteran: 13
    };
    return additionalMen * costPerMan[selectedExperience];
  };

  const getUpgradesCost = () => {
    let total = 0;
    Object.entries(selectedUpgrades).forEach(([optionIndex, quantity]) => {
      if (quantity > 0) {
        const option = unit.options.options[parseInt(optionIndex)];
        total += option.price * quantity;
      }
    });
    return total;
  };

  const getCurrentCost = () => {
    return getBaseCost() + getAdditionalMenCost() + getUpgradesCost();
  };

  const handleUpgradeChange = (optionIndex: number, quantity: number) => {
    setSelectedUpgrades(prev => ({
      ...prev,
      [optionIndex]: quantity
    }));
  };

  const isOptionAvailable = (option: UpgradeOptions): boolean => {
    if (option.exprerienceLevel === 'all') return true;
    return option.exprerienceLevel === selectedExperience;
  };

  const getMaxForOption = (option: UpgradeOptions): number => {
    if (option.desc.includes('Browning Automatic Rifle')) {
      return Math.min(option.max, unit.quantity + additionalMen);
    }
    if (option.desc.includes('anti-tank grenades')) {
      return unit.quantity + additionalMen;
    }
    if (option.desc.includes('submachine gun')) {
      return option.max; // Always 1 for NCO
    }
    return option.max;
  };

  const availableExperiences = getAvailableExperiences();
  const maxAdditionalMen = unit.maxQuantity - unit.quantity;

  const handleAddToArmy = () => {
    if (onAddToArmy) {
      onAddToArmy(unit, selectedExperience, {
        additionalMen,
        upgrades: selectedUpgrades
      });
    }
  };

  return (
    <div className="unit-card">
      <h3>{unit.name}</h3>
      <div className="unit-details">
        <p><strong>Type:</strong> {unit.type}</p>
        <p><strong>Base Cost:</strong> {getCostString(unit.cost)}</p>
        <p><strong>Base Quantity:</strong> {unit.quantity} men</p>
        <p><strong>Max Quantity:</strong> {unit.maxQuantity} men</p>
        <p><strong>Weapons:</strong> {unit.weapons}</p>

        <div className="experience-selector">
          <label htmlFor={`experience-${unit.id}`}>
            <strong>Experience:</strong>
          </label>
          <select
            id={`experience-${unit.id}`}
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value as ExperienceLevel)}
          >
            {availableExperiences.map(exp => (
              <option key={exp} value={exp}>
                {exp.charAt(0).toUpperCase() + exp.slice(1)} ({unit.cost[exp]}pts)
              </option>
            ))}
          </select>
        </div>

        {/* Additional Men Selection */}
        {maxAdditionalMen > 0 && (
          <div className="option-selector">
            <label htmlFor={`additional-men-${unit.id}`}>
              <strong>Additional Men:</strong> (+{selectedExperience === 'inexperienced' ? 7 : selectedExperience === 'regular' ? 10 : 13}pts each)
            </label>
            <select
              id={`additional-men-${unit.id}`}
              value={additionalMen}
              onChange={(e) => setAdditionalMen(parseInt(e.target.value))}
            >
              {Array.from({ length: maxAdditionalMen + 1 }, (_, i) => (
                <option key={i} value={i}>
                  {i} additional men (+{i * (selectedExperience === 'inexperienced' ? 7 : selectedExperience === 'regular' ? 10 : 13)}pts)
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Upgrade Options */}
        {unit.options.options.length > 0 && (
          <div className="upgrade-options">
            <strong>Upgrades:</strong>
            {unit.options.options.map((option, index) => (
              isOptionAvailable(option) && (
                <div key={index} className="upgrade-option">
                  <label htmlFor={`upgrade-${unit.id}-${index}`}>
                    {option.desc} (+{option.price}pts each)
                  </label>
                  <select
                    id={`upgrade-${unit.id}-${index}`}
                    value={selectedUpgrades[index] || 0}
                    onChange={(e) => handleUpgradeChange(index, parseInt(e.target.value))}
                  >
                    {Array.from({ length: getMaxForOption(option) + 1 }, (_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>
              )
            ))}
          </div>
        )}

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

        {unit.options.optionsDescription.length > 0 && (
          <div className="option-descriptions">
            <strong>Options:</strong>
            <ul>
              {unit.options.optionsDescription.map((option: string, index: number) => (
                <li key={`${option}-${index}`}>{option}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="unit-total">
        <strong>Total Cost: {getCurrentCost()}pts</strong>
      </div>

      {onAddToArmy && (
        <button onClick={handleAddToArmy}>
          Add to Army - {getCurrentCost()}pts
        </button>
      )}
    </div>
  );
};

export default UnitCard;