import React, { useState, useEffect } from 'react';
import api from "../../api/index"
import QuizListCard from './QuizListCard';


const Home = () => {
    const [quizes, setQuizes] = useState([])

    useEffect(() => {
        api.getQuizes().then(res => setQuizes(res.data))
    }, [setQuizes])


    return (
        <div style={{
            display: "flex", 
            flexDirection: "row",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
        }}>
            {quizes.map(q => <QuizListCard key={q.id} name={q.name} id={q.id} />)}
        </div>
    )
}

export default Home