import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LocalProps {
    username: string;
    logUserOut: any;
};

const NavButtons: React.FC<LocalProps> = ({ username, logUserOut }): React.ReactElement => {

    const navigate = useNavigate();

    return (
        <Container
            sx={{
                margin: 2
            }}
        >
            {/* Buttons, while not logged in: */}

            {(username === '')
                ? <>
                    <Button
                        sx={{
                            margin: 1,
                            background: "rgb(0,0,80)",
                            color: "white",
                            border: "1px solid white"
                        }}
                        onClick={() => {
                            navigate('/login');
                        }}>
                        Kirjaudu sisään
                    </Button>
                    <Button
                        sx={{
                            background: "darkgreen",
                            color: "white"
                        }}
                        onClick={() => {
                            navigate('/register');
                        }}>
                        Rekisteröidy
                    </Button>
                </>
                : <>

                    {/* Buttons, while logged in */}
                    <Typography>{`Kirjautunut: ${username} `}</Typography>

                    <Button
                        sx={{
                            margin: 1,
                            background: "rgb(0,0,80)",
                            color: "white",
                            border: "1px solid white"
                        }}
                        size="small"
                        onClick={() => {
                            logUserOut()
                        }}>
                        Kirjaudu ulos
                    </Button>

                </>
            }
        </Container>
    );
}

export default NavButtons;