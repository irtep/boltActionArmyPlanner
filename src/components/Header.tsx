import { Alert, Container, Typography } from '@mui/material';
import NavButtons from './NavButtons';

interface LocalProps {
    username: string;
    logUserOut: any;
    message: string;
};

const Header: React.FC<LocalProps> = ({ message, username, logUserOut }): React.ReactElement => {

    return (
        <Container sx={{
            background: "rgba(80, 80, 90, 1)",
            backgroundImage: "darkBlue",
            color: "yellow",
            borderRadius: 2,
            margin: 1,
            textAlign: "center",
            width: "100vw"
        }}>
            <Typography variant="h4">
                IZ 
                <span style={{ color: "gold" }}>
                    Bolt Action General
                </span>
            </Typography>
            
            <NavButtons 
                username={username}
                logUserOut={logUserOut}
            />

            <Container>
                { // if message, show it here:
                    (message !== '')
                        ? <Alert severity="error">{message}</Alert>
                        : <></>
                }
            </Container>
        </Container>
    );
}

export default Header;