import React from "react"
import {Button, Divider, Paper, Table, TableBody, TableCell, TableRow, Typography} from "@material-ui/core"
import "./style.css"


const Game = ({quiz, stopGame}) => {
    const {name, questions} = quiz
    const [questionsAnswered, setQuestionsAnswered] = React.useState([questions[0]])
    const [currentQuestion, setCurrentQuestion] = React.useState(questions[0])
    const [correctlyAnswered, setCorrectlyAnswered] = React.useState([])
    const [falselyAnswered, setFalselyAnswered] = React.useState([])

    const getQuestion = () => {
        return questions[questionsAnswered.length] || false
    }

    const submitAnswer = (answer) => {
        if (answer.correct) {
            setCorrectlyAnswered([...correctlyAnswered, answer])
        } else {
            setFalselyAnswered([...falselyAnswered, answer])
        }
        const qa = questionsAnswered
        qa.push(answer)
        setQuestionsAnswered(qa)

        setCurrentQuestion(getQuestion())
    }

    return (
        <div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <Typography variant={"h5"}>{name}</Typography>
                <Button onClick={stopGame}>Stop quiz</Button>
            </div>
            <Divider/>
            <QuestionWithAnswers 
                onAnswer={(data) => {
                    submitAnswer(data)
                }}
                question={currentQuestion}
                />
            <Divider style={{ marginTop: 10}}/>
            <Table style={{maxWidth: 200, margin:"auto"}}>
                <TableBody>
                    <TableRow>
                        <TableCell align="center">Correct</TableCell>
                        <TableCell align="center">False</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell 
                            align="center" 
                            style={{color: "#4caf50"}}>
                                {correctlyAnswered.length}
                        </TableCell>
                        <TableCell 
                            align="center" 
                            style={{color: "#f44336"}}>
                            {falselyAnswered.length}

                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

const QuestionWithAnswers = ({onAnswer, question}) => {
    const [revealed, setRevealed] = React.useState(false)
    const renderAnswers = () => {
        return question.answers.map(ans => {
            return (
            <Paper key={ans.value}
                className={`answer`}
                style={{
                    cursor: "pointer",
                    padding: "5px",
                    marginTop: "1em",
                    backgroundColor: revealed && ans.correct ? "#66bb6a" : revealed && !ans.correct ? "#ef5350" : "#ffffff", 

                }}
                onClick={() => {
                    setRevealed(true)
                    setTimeout(() => {
                        setRevealed(false)
                        onAnswer(ans)                        
                    }, 500)
                }}>
                {ans.value}
            </Paper>)
        })
    }

    return (
        <div style={{marginTop: "2em"}} className={"q-a"}>
            {question === false ? (
                <Typography variant="h6">Well done, you answered all questions!</Typography>
            ) : (
                <>
                    <Typography 
                        variant="h6"
                        style={{minHeight: 70}}>{question.question_value}</Typography>
                    <div>
                        {renderAnswers()}
                    </div>
                </>    
            )}
            
        </div>
    )
}

export default Game