import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Typography,
  Paper,
  Alert
} from '@mui/material';
import type { ArmyList } from '../types/army'; // Import from shared types
import type { ArmyListWithUnits } from './ArmyBuilder';

interface ArmyManagerProps {
  username: string;
  userId: string;
  currentArmy: ArmyListWithUnits | null;
  setArmy: React.Dispatch<React.SetStateAction<ArmyListWithUnits>>
  modeOfUse: 'dev' | 'prod';
}

const ArmyManager: React.FC<ArmyManagerProps> = ({ 
  username, 
  userId, 
  currentArmy, 
  setArmy, 
  modeOfUse 
}) => {
  const [savedArmies, setSavedArmies] = useState<ArmyList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [saveDialogOpen, setSaveDialogOpen] = useState<boolean>(false);
  const [armyName, setArmyName] = useState<string>('');

  // Fetch armies on component mount and when userId changes
  useEffect(() => {
    if (userId) {
      fetchArmies();
    }
  }, [userId]);

  const fetchArmies = async (): Promise<void> => {
    if (!userId) return;
    
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
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

  const handleSaveClick = (): void => {
    setArmyName(currentArmy?.name || '');
    setSaveDialogOpen(true);
  };

  const handleSaveArmy = async (): Promise<void> => {
    if (!currentArmy || !armyName.trim()) {
      setError('Army name is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const baseUrl = modeOfUse === 'dev' ? 'http://localhost:5509' : '';
      
      let response: Response;
      
      if (currentArmy.id) {
        // Update existing army
        response = await fetch(`${baseUrl}/api/armies/${currentArmy.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name: armyName.trim(),
            nation: currentArmy.nation,
            pointsLimit: currentArmy.pointsLimit,
            units: currentArmy.units, // Direct usage - types match!
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
            name: armyName.trim(),
            nation: currentArmy.nation,
            pointsLimit: currentArmy.pointsLimit,
            units: currentArmy.units, // Direct usage - types match!
            totalPoints: currentArmy.totalPoints
          })
        });
      }

      if (response.ok) {
        setSaveDialogOpen(false);
        setArmyName('');
        fetchArmies();
        
        // If it was a new army, update the current army with the ID from response
        if (!currentArmy.id) {
          const result = await response.json();
          setArmy({ 
            ...currentArmy, 
            id: result.armyId,
            name: armyName.trim()
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
      const token = localStorage.getItem('token');
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
            onClick={handleSaveClick}
            disabled={loading}
            sx={{ mb: 2 }}
          >
            {currentArmy.id ? 'Update Army' : 'Save Army'}
          </Button>
        )}

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

      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)}>
        <DialogTitle>
          {currentArmy?.id ? 'Update Army' : 'Save Army'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Army Name"
            type="text"
            fullWidth
            variant="outlined"
            value={armyName}
            onChange={(e) => setArmyName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSaveArmy();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveArmy} 
            disabled={!armyName.trim() || loading}
            variant="contained"
          >
            {loading ? 'Saving...' : (currentArmy?.id ? 'Update' : 'Save')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ArmyManager;