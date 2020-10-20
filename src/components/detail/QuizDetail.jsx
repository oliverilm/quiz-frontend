import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

const QuizDetail = () => {
    let { id } = useParams();



    return (
        <div>{id}</div>
    )
}

export default QuizDetail