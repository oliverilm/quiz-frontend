import React, { useState, useEffect } from 'react';
import api from "../../api/index"
import QuizListCard from './QuizListCard';
import { Grid } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
const useStyles = makeStyles({
    root: {
    },
});
const Home = () => {
    const classes = useStyles();

    const [quizes, setQuizes] = useState([])

    useEffect(() => {
        api.getQuizes().then(res => setQuizes(res.data))
    }, [api, setQuizes])


    return (
        <Grid
            className={classes.root}
            container
            direction="row">
            {quizes.map(q => <QuizListCard key={q.id} name={q.name} id={q.id} />)}
        </Grid >
    )
}

export default Home