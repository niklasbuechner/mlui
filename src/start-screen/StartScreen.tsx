import * as React from 'react';
import { Button, Container, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 16 * 4,
        margin: 'auto',
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

function StartScreen() {
    const classes = useStyles();

    return (
        <Container maxWidth='lg' className={classes.container}>
            <h1>Available Screens</h1>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <Link to='/box-validation'>
                        <Paper className={classes.paper}>
                            Box visualisation
                        </Paper>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
}

export default StartScreen;
