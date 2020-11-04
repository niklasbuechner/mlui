import React, { Component } from 'react';
import { Container, Grid, Paper } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const StartScreenContainer = styled(Container)({
    marginTop: 8 * 8,
    margin: 'auto',
});
const StartScreenPaper = styled(Paper)({
    padding: 8 * 2,
    textAlign: 'center',
});

class StartScreen extends Component<{}, {}> {
    render () {
        return (
            <StartScreenContainer maxWidth='lg'>
                <h1>Available Screens</h1>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Link to='/box-validation'>
                            <StartScreenPaper>
                                Box visualisation
                            </StartScreenPaper>
                        </Link>
                    </Grid>
                </Grid>
            </StartScreenContainer>
        );
    }
}

export default StartScreen;
