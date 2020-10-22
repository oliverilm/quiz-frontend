import { Typography,Divider,Button } from "@material-ui/core";
import React, {useEffect, useState} from "react"
import { useParams, useHistory } from "react-router-dom";
import api from "../../api";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Game from "./Game";

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
  
    
    return (

        <div style={{ width: "100%", maxWidth: 600}}>
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
                <MoreVertIcon  onClick={handleClick}/>
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
            <Typography variant="subtitle2">Contains {quiz.questions.length} questions </Typography>

                <div style={{
                    minWidth: "100%",
                    width: "100%"
                }}>
                     <Button 
                        variant={"contained"} 
                        color="primary" 
                        onClick={() => {
                            startQuiz()
                        }}>
                        Start the quiz
                    </Button>
                   
                </div>
                
            </div>

        ) : <></>}
                </div>
            ) : (
                <Game quiz={quiz} stopGame={stopGame} />
            )}
            
        </div>
    )


}

export default QuizDetail