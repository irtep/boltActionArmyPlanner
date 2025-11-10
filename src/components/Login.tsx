import React, { useRef, useState } from "react";
import { Backdrop, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import type { NavigateFunction } from 'react-router-dom';

interface UserDetails {
  id: string;
  token: string;
  username: string
}

interface LoginFormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
}

interface LoginFormElement extends HTMLFormElement {
  readonly elements: LoginFormElements;
}

interface UserResponse {
  id: number;
  username: string;
  created_at: string;
};

interface LoginResponse {
  token: string;
  user: UserResponse;
}

interface LocalProps {
    setUserId: React.Dispatch<React.SetStateAction<string>>;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    modeOfUse: 'dev' | 'prod';
}

const Login: React.FC<LocalProps> = ({ setUserId, setToken, setUsername, modeOfUse }): React.ReactElement => {
  const [msg, setMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();
  const formRef = useRef<LoginFormElement>(null);

  const clearMessage = (): void => {
    setTimeout(() => setMsg(''), 10000);
  };

  const handleLoginSuccess = (response: LoginResponse): void => {
    const userDetails: UserDetails = {
      id: String(response.user.id),
      token: response.token,
      username: response.user.username
    };
    //console.log('handling: ', response.user.id, response.token);
    setUserId(String(response.user.id));
    setToken(response.token);
    setUsername(response.user.username);

    localStorage.setItem("uDetails", JSON.stringify(userDetails));
    navigate("/");
  };

  const handleLoginError = (status: number): void => {
    if (status === 401) {
      setMsg('Incorrect username or password.');
    } else {
      setMsg(`Check if the server is online. Error code: ${status}`);
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
        setMsg('fill both fields');
        clearMessage();
        return;
      }

      const url: string = modeOfUse === "dev" 
        ? "https://localhost:5509/api/auth/login" 
        : "https://193.28.89.151:5509/api/auth/login";

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
        handleLoginSuccess(response);
      } else {
        handleLoginError(connection.status);
      }
    } catch (error) {
      console.error('Login error:', error);
      setMsg('Network error. Check connection.');
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
            <Typography variant="h6">Log in</Typography>
            
            <TextField 
              label="Username" 
              name="username"
              disabled={isLoading}
              required
              fullWidth
            />
            
            <TextField 
              label="Password"
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
              {isLoading ? 'logging in...' : 'Log in'}
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