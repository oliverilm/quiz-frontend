import React, { useState, useEffect } from 'react';
import api from "../../api/index"
import QuizListCard from './QuizListCard';
import { Grid } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
        overflowY: "hidden"
    },
});
const Home = () => {
    const classes = useStyles();

    const [quizes, setQuizes] = useState([])

    useEffect(() => {
        api.getQuizes().then(res => setQuizes(res.data))
    }, [setQuizes])


    return (
        <div style={{
            display: "flex", 
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            margin: "auto"
        }}>
            {quizes.map(q => <QuizListCard key={q.id} name={q.name} id={q.id} />)}
        </div>
    )
}

export default Home