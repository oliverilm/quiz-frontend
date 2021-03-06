import { Typography, Divider, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom";
import api from "../../api";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Game from "./Game";



function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }


const QuizDetail = () => {
    let { id } = useParams();
    const [quiz, setQuiz] = useState(null)
    const [error, setError] = useState(null)
    const history = useHistory()
    const [gameStarted, setGameStarted] = useState(false)

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

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const startQuiz = () => {
        setGameStarted(true)
    }

    const stopGame = () => {
        setGameStarted(false)
    }

    const sendSession = ({ falselyAnswered, correctlyAnswered, quiz }) => {
        api.addStatistics({
            quizId: quiz.id, 
            falseGuess: falselyAnswered.map(answer => answer.id),
            correctGuess: correctlyAnswered.map(answer => answer.id) 
        }).then(res => console.log(res.data))
        // console.log(quiz, falselyAnswered, correctlyAnswered)
    }

    const renderAllQuestions = () => {
        return quiz.questions.map((q, i) => {
            return <Typography variant={"body2"} style={{ marginTop: 5, fontSize: 14 }}>{i + 1}. {q.question_value}</Typography>
        })
    }


    return (

        <div style={{ width: "100%", maxWidth: 600 }}>
            {!gameStarted ? (
                <div>
                    {quiz ? (
                        <div>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginBottom: 10,
                            }}>
                                <Typography variant="h5">{quiz.name}</Typography>
                                <MoreVertIcon onClick={handleClick} />
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>Edit quiz</MenuItem>
                                    <MenuItem onClick={() => {
                                        handleClose(); deleteQuiz()
                                    }}>Delete Quiz</MenuItem>
                                </Menu>
                            </div>
                            <Divider />
                            <Typography variant="subtitle2" style={{ marginTop: 10 }}>Contains {quiz.questions.length} questions </Typography>

                            <div style={{
                                minWidth: "100%",
                                width: "100%",
                                marginTop: 10
                            }}>
                                <Button
                                    variant={"contained"}
                                    color="primary"
                                    onClick={() => {
                                        startQuiz()
                                    }}
                                    style={{ minWidth: "100%" }}>
                                    Start the quiz
                    </Button>

                            </div>
                            <div style={{ marginTop: "1em" }}>
                                {renderAllQuestions()}
                            </div>
                        </div>

                    ) : <></>}
                </div>
            ) : (
                    <Game quiz={quiz} mixup={shuffle(quiz.questions)} stopGame={stopGame} sendSession={sendSession} />
                )}

        </div>
    )


}

export default QuizDetail