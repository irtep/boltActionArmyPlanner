import React, { useRef, useState } from "react";
import { Backdrop, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import type { NavigateFunction } from 'react-router-dom';

interface RegisterFormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
  password2: HTMLInputElement;
  auth: HTMLInputElement;
}

interface RegisterFormElement extends HTMLFormElement {
  readonly elements: RegisterFormElements;
}

interface RegisterRequest {
  username: string;
  password: string;
  auth: string;
}

type RegisterError = 400 | 403;

const RegisterError = {
  USERNAME_EXISTS: 400 as const,
  UNAUTHORIZED: 403 as const,
} as const;

const Register: React.FC = (): React.ReactElement => {
  const [msg, setMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const navigate: NavigateFunction = useNavigate();
  const formRef = useRef<RegisterFormElement>(null);

  const modeOfUse: 'dev'|'prod' = 'dev';

  const clearMessage = (): void => {
    setTimeout(() => setMsg(''), 10000);
  };

  const handleRegisterSuccess = (): void => {
    setMsg('Käyttäjätunnus on nyt rekisteröity, voit nyt kirjautua sisään');
    setTimeout(() => {
      setMsg('');
      navigate("/login");
    }, 5000);
  };

  const handleRegisterError = (status: number): void => {
    switch (status) {
      case RegisterError.USERNAME_EXISTS:
        setMsg('Käyttäjänimi on jo rekisteröity');
        break;
      case RegisterError.UNAUTHORIZED:
        setMsg('Ei lupaa, pyydä lupa adminilta');
        break;
      default:
        setMsg(`Rekisteröinti epäonnistui. Virhekoodi: ${status}`);
    }
    clearMessage();
  };

  const validateForm = (username: string, password: string, password2: string): boolean => {
    if (!username.trim()) {
      setMsg('Käyttäjätunnus on pakollinen');
      clearMessage();
      return false;
    }

    if (!password) {
      setMsg('Salasana on pakollinen');
      clearMessage();
      return false;
    }

    if (password !== password2) {
      setMsg('Salasanat eivät täsmää');
      clearMessage();
      return false;
    }

    if (password.length < 6) {
      setMsg('Salasanan tulee olla vähintään 6 merkkiä pitkä');
      clearMessage();
      return false;
    }

    return true;
  };

  const registerUser = async (e: React.FormEvent<RegisterFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = formRef.current;
      if (!form) return;

      const username = form.elements.username.value;
      const password = form.elements.password.value;
      const password2 = form.elements.password2.value;
      const authCode = form.elements.auth.value;

      if (!validateForm(username, password, password2)) {
        return;
      }

      const url: string = modeOfUse === "dev" 
        ? "http://localhost:5509/api/users" 
        : "/api/users";

      const requestBody: RegisterRequest = {
        username: username.trim(),
        password,
        auth: authCode
      };

      const connection: Response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (connection.status === 200) {
        handleRegisterSuccess();
      } else {
        handleRegisterError(connection.status);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMsg('Verkkovirhe. Tarkista yhteys.');
      clearMessage();
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = (): void => {
    navigate("/");
  };

  return (
    <Backdrop open={true}>
      <Paper sx={{ padding: 2 }}>
        <Box
          component="form"
          onSubmit={registerUser}
          ref={formRef}
          sx={{
            width: 300,
            backgroundColor: "#fff",
            padding: 2
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h6">Rekisteröi uusi käyttäjätunnus</Typography>
            
            <TextField
              label="Käyttäjätunnus"
              name="username"
              disabled={isLoading}
              required
              fullWidth
            />
            
            <TextField
              label="Salasana"
              name="password"
              type="password"
              disabled={isLoading}
              required
              fullWidth
              inputProps={{ minLength: 6 }}
            />
            
            <TextField
              label="Salasana uudelleen"
              name="password2"
              type="password"
              disabled={isLoading}
              required
              fullWidth
            />
            
            <TextField
              label="Lupa koodi"
              name="auth"
              disabled={isLoading}
              required
              fullWidth
            />
            
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? 'Rekisteröidään...' : 'Rekisteröidy'}
            </Button>

            <Button 
              onClick={handleBackClick}
              disabled={isLoading}
              fullWidth
            >
              Palaa takaisin
            </Button>

            {msg && (
              <Typography 
                color={msg.includes('rekisteröity') ? "success" : "error"}
                sx={{ marginTop: 2, textAlign: 'center' }}
              >
                {msg}
              </Typography>
            )}
          </Stack>
        </Box>
      </Paper>
    </Backdrop>
  );
};

export default Register;