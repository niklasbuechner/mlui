import * as React from 'react';
import {
    AppBar,
    Button,
    Container,
    CssBaseline,
    Grid,
    IconButton,
    Paper,
    Toolbar,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 16 * 4,
        margin: 'auto',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        fontSize: 72,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
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
                <h1>Available Screens</h1>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Button>
                            <Paper className={classes.paper}>Box visualisation</Paper>
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default App;
