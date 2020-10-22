import React, { useState, useEffect } from 'react';
import api from "../../api/index"
import QuizListCard from './QuizListCard';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';


const Home = () => {
    const [quizes, setQuizes] = useState([])

    useEffect(() => {
        api.getQuizes().then(res => setQuizes(res.data))
    }, [setQuizes])


    return (
        <div>
            {/* <div style={{ width: "100%", margin: "auto" }}>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <AccountCircle />
                    </Grid>
                    <Grid item>
                        <TextField id="input-with-icon-grid" label="With a grid" />
                    </Grid>
                </Grid>
            </div> */}
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
            }}>
                {quizes.map(q => <QuizListCard key={q.id} name={q.name} id={q.id} />)}
            </div>
        </div>
    )
}

export default Home