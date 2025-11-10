import React, { useEffect, useState } from 'react';
import { TextField, Box, Typography } from '@mui/material';
import type { ArmyList, ArmyUnit, Nation, SelectedOptions, UnitCost } from '../types/army';
import UnitCard from './UnitCard';
import ArmyManager from './ArmyManager';
import ShowArmyList from './ShowArmyList';
import { Collapse, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

interface ArmyBuilderProps {
  username: string;
  userId: string;
  modeOfUse: 'dev' | 'prod';
  nations: Nation[];
  selectedNation: Nation | null;
  setSelectedNation: React.Dispatch<React.SetStateAction<Nation | null>>;
  army: ArmyListWithUnits;
  setArmy: React.Dispatch<React.SetStateAction<ArmyListWithUnits>>;
  token: string;
}

// Define a type for experience levels
export type ExperienceLevel = keyof UnitCost;

// Extended Unit type that includes experience
export interface ArmyUnitExtended extends ArmyUnit {
  experience: ExperienceLevel;
  uniqueId: string;
  selectedOptions: SelectedOptions;
}

export interface ArmyListWithUnits extends Omit<ArmyList, 'units'> {
  units: ArmyUnitExtended[];
}

const ArmyBuilder: React.FC<ArmyBuilderProps> = ({
  username,
  userId,
  modeOfUse,
  nations,
  selectedNation,
  setSelectedNation,
  army,
  setArmy,
  token
}) => {

  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());

  const toggleUnit = (unitId: string) => {
    setExpandedUnits(prev => {
      const newSet = new Set(prev);
      if (newSet.has(unitId)) {
        newSet.delete(unitId);
      } else {
        newSet.add(unitId);
      }
      return newSet;
    });
  };

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

    // Calculate additional men cost.
    const costPerMan: Record<ExperienceLevel, number> = {
      inexperienced: unit.extraManCost.inexperienced? unit.extraManCost.inexperienced : 0,
      regular: unit.extraManCost.regular? unit.extraManCost.regular : 0,
      veteran: unit.extraManCost.veteran? unit.extraManCost.veteran : 0,
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

  const handleArmyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArmy(prev => ({
      ...prev,
      name: event.target.value
    }));
  };

  const handlePointsLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(event.target.value) || 0;
    setArmy(prev => ({
      ...prev,
      pointsLimit: newLimit
    }));
  };

  useEffect(() => {
    console.log('army: ', army);
  }, [army]);

  return (
    <div className="army-builder">

      <ArmyManager
        username={username}
        userId={userId}
        currentArmy={army}
        setArmy={setArmy}
        modeOfUse={modeOfUse}
        token={token}
        selectedNation={selectedNation}
      />

      {/* Army Name and Points Limit Inputs */}
      <Box sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
        <TextField
          label="Army Name"
          value={army.name}
          onChange={handleArmyNameChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Points Limit"
          type="number"
          value={army.pointsLimit}
          onChange={handlePointsLimitChange}
          fullWidth
          margin="normal"
          variant="outlined"
          inputProps={{ min: 0 }}
        />
        <Box sx={{ mt: 1 }}>
          <strong>Current Points: {army.totalPoints}/{army.pointsLimit}</strong>
        </Box>
      </Box>

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

      <h3>Available Units</h3>
      {selectedNation ? (
        <div className="builder-layout">
          <div className="unit-categories">
            {Object.entries(
              selectedNation.availableUnits.reduce((acc, unit) => {
                if (!acc[unit.type]) {
                  acc[unit.type] = [];
                }
                acc[unit.type].push(unit);
                return acc;
              }, {} as Record<string, typeof selectedNation.availableUnits>)
            ).map(([type, units]) => (
              <div key={type} className="unit-category">
                <h4 className="category-header">{type}</h4>
                <div className="unit-list">
                  {units.map((unit: any, i: number) => (
                    <div key={`${unit.name} ${i}`} className="unit-item">
                      <div className="unit-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
                        <Typography>{unit.name}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => toggleUnit(unit.id)}
                        >
                          {expandedUnits.has(unit.id) ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                      </div>
                      <Collapse in={expandedUnits.has(unit.id)}>
                        <UnitCard
                          key={unit.id}
                          unit={unit}
                          onAddToArmy={addUnitToArmy}
                        />
                      </Collapse>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <ShowArmyList
            setArmy={setArmy}
            army={army}
          />
        </div>
      ) : (
        <p>Please select a nation first</p>
      )}

    </div>
  );
};

export default ArmyBuilder;