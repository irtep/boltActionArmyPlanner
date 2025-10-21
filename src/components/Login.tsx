import React, { useRef, useState } from "react";
import { Backdrop, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import type { NavigateFunction } from 'react-router-dom';

interface UserDetails {
  token: string;
  username: string;
  admin: boolean;
  testAccount: boolean;
}

interface LoginFormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
}

interface LoginFormElement extends HTMLFormElement {
  readonly elements: LoginFormElements;
}

interface LoginResponse {
  token: string;
  admin: boolean;
  testAccount: boolean;
}

interface LocalProps {
    setToken: React.Dispatch<React.SetStateAction<string>>;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    //setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
    modeOfUse: 'dev' | 'prod';
}

const Login: React.FC<LocalProps> = ({ setToken, setUsername, /*setAdmin, */ modeOfUse }): React.ReactElement => {
  const [msg, setMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();
  const formRef = useRef<LoginFormElement>(null);

  const clearMessage = (): void => {
    setTimeout(() => setMsg(''), 10000);
  };

  const handleLoginSuccess = (response: LoginResponse, username: string): void => {
    const userDetails: UserDetails = {
      token: response.token,
      username,
      admin: response.admin,
      testAccount: response.testAccount
    };

    setToken(response.token);
    setUsername(username);
    //setAdmin(response.admin);

    localStorage.setItem("uDetails", JSON.stringify(userDetails));
    navigate("/");
  };

  const handleLoginError = (status: number): void => {
    if (status === 401) {
      setMsg('Käyttäjänimi tai salasana väärin');
    } else {
      setMsg(`Tarkista, onko palvelin päällä. Virhekoodi: ${status}`);
    }
    clearMessage();
  };

  const logIn = async (e: React.FormEvent<LoginFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = formRef.current;
      if (!form) return;

      const username = form.elements.username.value.trim();
      const password = form.elements.password.value;

      if (!username || !password) {
        setMsg('Täytä molemmat kentät');
        clearMessage();
        return;
      }

      const url: string = modeOfUse === "dev" 
        ? "http://localhost:5509/api/auth/login" 
        : "/api/auth/login";

      const connection = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (connection.ok) {
        const response: LoginResponse = await connection.json();
        console.log('Login response:', response);
        handleLoginSuccess(response, username);
      } else {
        handleLoginError(connection.status);
      }
    } catch (error) {
      console.error('Login error:', error);
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
          onSubmit={logIn}
          ref={formRef}
          sx={{
            width: 300,
            backgroundColor: "#fff",
            padding: 2
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h6">Kirjaudu sisään</Typography>
            
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
            />
            
            <Button 
              type="submit" 
              variant="contained" 
              size="large"
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? 'Kirjaudutaan...' : 'Kirjaudu'}
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
                color="error" 
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

export default Login;