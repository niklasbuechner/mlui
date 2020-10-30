import * as React from 'react';
import {
    AppBar,
    Container,
    CssBaseline,
    IconButton,
    Toolbar,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 16,
        margin: 'auto',
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function App() {
    const classes = useStyles();

    return (
        <>
            <AppBar position='static'>
                <Toolbar variant='dense'>
                    <IconButton
                        edge='start'
                        className={classes.menuButton}
                        color='inherit'
                        aria-label='menu'
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' color='inherit'>
                        Overview
                    </Typography>
                </Toolbar>
            </AppBar>
            <CssBaseline />
            <Container maxWidth='lg' className={classes.container}>
                <h1>Hello World</h1>
            </Container>
        </>
    );
}

export default App;
