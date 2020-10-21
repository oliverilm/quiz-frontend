import { Typography,Divider,Button } from "@material-ui/core";
import React, {useEffect, useState} from "react"
import { useParams, useHistory } from "react-router-dom";
import api from "../../api";

const QuizDetail = () => {
    let { id } = useParams();
    const [quiz, setQuiz] = useState({})
    const [error, setError] = useState(null)
    const history = useHistory()

    useEffect(() => {
        api.getQuiz(id).then(res => {
            if (res.data) {
                console.log(res.data)
                setQuiz(res.data)
            } else {
                setError(res)
            }
        })
    }, [setError, setQuiz, id])

    const deleteQuiz = () => {
        api.deleteQuiz(id).then(res => {
            // redirect to the main page
            history.push("/")
        })
    }
    
    return (

        <div style={{ width: "100%" }}>
            {quiz ? (
            <div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 10
                }}>
                <Typography variant="h5">{quiz.name}</Typography>
                <Button variant={"contained"} color="primary" size="small">Start</Button>

                </div>
                <Divider />
                <Typography variant="subtitle2">Contains questions</Typography>

                <div style={{
                    
                }}>
                    <Button variant={"contained"} color="primary" size="small">Start</Button>
                    <Button variant={"contained"} color="error" onClick={() => {
                        deleteQuiz()
                    }}>Delete</Button>
                </div>
            </div>

        ) : <></>}
        </div>
    )


}

export default QuizDetail