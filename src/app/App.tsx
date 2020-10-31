import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
    AppBar,
    CssBaseline,
    IconButton,
    Toolbar,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import StartScreen from '../start-screen/StartScreen';
import BoxValidation from '../box-validation/BoxValidation';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
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
            <Router>
                <Switch>
                    <Route path='/box-validation'>
                        <BoxValidation></BoxValidation>
                    </Route>
                    <Route path='/'>
                        <StartScreen></StartScreen>
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
