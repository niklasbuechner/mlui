import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
    AppBar,
    CssBaseline,
    IconButton,
    Toolbar,
    Typography,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import StartScreen from '../start-screen/StartScreen';
import BoxValidation from '../box-validation/BoxValidation';

const AppMenuButton = styled(IconButton)({
    menuButton: {
        marginRight: 8 * 2,
    },
});

function App() {
    return (
        <>
            <AppBar position='static'>
                <Toolbar variant='dense'>
                    <AppMenuButton
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                    >
                        <MenuIcon />
                    </AppMenuButton>
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
