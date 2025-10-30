import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
  Alert
} from '@mui/material';
import type { ArmyList, Nation } from '../types/army';
import type { ArmyListWithUnits } from './ArmyBuilder';

interface ArmyManagerProps {
  username: string;
  userId: string;
  currentArmy: ArmyListWithUnits | null;
  setArmy: React.Dispatch<React.SetStateAction<ArmyListWithUnits>>
  modeOfUse: 'dev' | 'prod';
  token: string;
  selectedNation: Nation | null;
}

const ArmyManager: React.FC<ArmyManagerProps> = ({
  username,
  userId,
  token,
  currentArmy,
  setArmy,
  modeOfUse,
  selectedNation
}) => {
  const [savedArmies, setSavedArmies] = useState<ArmyList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchArmies = async (): Promise<void> => {
    if (!userId) return;

    setLoading(true);
    setError('');

    try {
      const baseUrl = modeOfUse === 'dev' ? 'http://localhost:5509' : '';

      const response = await fetch(`${baseUrl}/api/armies`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSavedArmies(data.armies || []);
      } else {
        setError('Failed to load saved armies');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Error fetching armies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadArmy = (army: ArmyListWithUnits): void => {
    setArmy(army);
  };

  const handleSaveArmy = async (action: 'saveNew' | 'update'): Promise<void> => {

    if (!currentArmy) {
      setError('Army name is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const baseUrl = modeOfUse === 'dev' ? 'http://localhost:5509' : '';

      let response: Response;

      if (action === 'update') {

        response = await fetch(`${baseUrl}/api/armies/${currentArmy.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name: currentArmy.name.trim(),
            nation: currentArmy.nation,
            pointsLimit: currentArmy.pointsLimit,
            units: currentArmy.units,
            totalPoints: currentArmy.totalPoints
          })
        });
      } else {
        // Create new army
        response = await fetch(`${baseUrl}/api/armies`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            userId: userId,
            name: currentArmy.name.trim(),
            nation: selectedNation?.name,
            pointsLimit: currentArmy.pointsLimit,
            units: currentArmy.units,
            totalPoints: currentArmy.totalPoints
          })
        });
      }

      if (response.ok) {
        fetchArmies();

        if (!currentArmy.id) {
          const result = await response.json();
          setArmy({
            ...currentArmy,
            id: result.armyId,
            name: currentArmy.name.trim()
          });
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to save army');
      }
    } catch (err) {
      setError('Error saving army');
      console.error('Error saving army:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArmy = async (armyId: string): Promise<void> => {
    if (!window.confirm('Are you sure you want to delete this army?')) {
      return;
    }

    setLoading(true);

    try {
      const baseUrl = modeOfUse === 'dev' ? 'http://localhost:5509' : '';

      const response = await fetch(`${baseUrl}/api/armies/${armyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchArmies();
        if (currentArmy?.id === armyId) {
          setArmy({} as ArmyListWithUnits);
        }
      } else {
        setError('Failed to delete army');
      }
    } catch (err) {
      setError('Error deleting army');
      console.error('Error deleting army:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchArmies();
    }
  }, [userId]);

  if (!username) {
    return null;
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Saved Armies for {username}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {currentArmy && (
          <Button
            variant="contained"
            onClick={() => {
              handleSaveArmy('saveNew');
            }}
            disabled={loading}
            sx={{ mb: 2 }}
          >
            save army
          </Button>
        )}

        {
          savedArmies.some(savedArmy => savedArmy.id === currentArmy?.id)
            ? (
              <Button
                onClick={() => {
                  handleSaveArmy('update');
                }}
                disabled={loading}
                variant="contained"
                sx={{ mb: 2 }}
              >
                {loading ? 'updating...' : 'update existing'}
              </Button>
            )
            : null
        }

        {loading ? (
          <Typography>Loading armies...</Typography>
        ) : savedArmies.length === 0 ? (
          <Typography color="text.secondary">
            No saved armies yet. Create an army and save it to see it here.
          </Typography>
        ) : (
          <List>
            {savedArmies.map((army) => (
              <ListItem
                key={army.id}
                disablePadding
                secondaryAction={
                  <Button
                    color="error"
                    size="small"
                    onClick={() => handleDeleteArmy(army.id)}
                    disabled={loading}
                  >
                    Delete
                  </Button>
                }
              >
                <ListItemButton
                  onClick={() => handleLoadArmy(army)}
                  selected={currentArmy?.id === army.id}
                >
                  <ListItemText
                    primary={army.name}
                    secondary={`${army.nation} - ${army.totalPoints}/${army.pointsLimit} pts - ${army.units.length} units`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default ArmyManager;