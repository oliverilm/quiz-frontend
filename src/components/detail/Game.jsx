import React from "react"
import { Button, Divider, Paper, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core"
import "./style.css"
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';



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


const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

const Game = ({ quiz, stopGame, sendSession, mixup }) => {
    const { name } = quiz
    const [questionsAnswered, setQuestionsAnswered] = React.useState([])
    const [currentQuestion, setCurrentQuestion] = React.useState(mixup[0])
    const [correctlyAnswered, setCorrectlyAnswered] = React.useState([])
    const [falselyAnswered, setFalselyAnswered] = React.useState([])
    

    const getQuestion = () => {
        if (mixup[questionsAnswered.length]) {
            return mixup[questionsAnswered.length]
        } else {
            return false
        }
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

    const renderWrongAnswers = () => {
        return falselyAnswered.map(ans => {
            const myAnswer = ans.value
            const question = quiz.questions.find(q => q.id === ans.question)
            const correct = question.answers.find(e => e.correct === true)
            return (
                <tr>
                    <td>{question.question_value}</td>
                    <td style={{ color: "#ef5350" }}>{myAnswer}</td>
                    <td style={{ color: "#66bb6a" }}>{correct.value}</td>
                </tr>
            )
        })
    }

    return (
        <div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <Typography variant={"h5"}>{name}</Typography>
                <Button onClick={() => {
                    
                    sendSession({
                        falselyAnswered, correctlyAnswered, quiz
                    })
                    stopGame()
                }}>Stop quiz</Button>
            </div>
            <Divider />
            <QuestionWithAnswers
                quiz={quiz}
                falselyAnswered={falselyAnswered}
                sendSession={sendSession}
                correctlyAnswered={correctlyAnswered}
                onAnswer={(data) => {
                    submitAnswer(data)
                }}
                question={currentQuestion}
            />
            <Divider style={{ marginTop: 10 }} />
            <Table style={{ maxWidth: 200, margin: "auto" }}>
                <TableBody>
                    <TableRow>
                        <TableCell align="center">Correct</TableCell>
                        <TableCell align="center">False</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell
                            align="center"
                            style={{ color: "#4caf50" }}>
                            {correctlyAnswered.length}
                        </TableCell>
                        <TableCell
                            align="center"
                            style={{ color: "#f44336" }}>

                            <HtmlTooltip
                                title={
                                    <>
                                        <table >
                                            <tbody>
                                                <tr>
                                                    <td >Question</td>
                                                    <td >My answer</td>
                                                    <td >Correct answer</td>
                                                </tr>
                                                {renderWrongAnswers()}
                                            </tbody>
                                        </table>
                                    </>
                                }
                            >
                                <div>{falselyAnswered.length}</div>
                            </HtmlTooltip>


                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div >
    )
}


const QuestionWithAnswers = ({ onAnswer, question, quiz, falselyAnswered ,correctlyAnswered, sendSession}) => {
    const [revealed, setRevealed] = React.useState(false)

    const renderWrongAnswers = () => {

        return falselyAnswered.map(ans => {
            const myAnswer = ans.value
            const question = quiz.questions.find(q => q.id === ans.question)
            const correct = question.answers.find(e => e.correct === true)
            return (
                <tr>
                    <td>{question.question_value}</td>
                    <td style={{ color: "#ef5350" }}>{myAnswer}</td>
                    <td style={{ color: "#66bb6a" }}>{correct.value}</td>
                </tr>
            )
        })
    }
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
        <div style={{ marginTop: "2em" }} className={"q-a"}>
            {question === false ? (
                <div>
                    <Typography variant="h6">Well done, you answered all questions!</Typography>
                    <table >
                        <tbody>
                            <tr>
                                <td >Question</td>
                                <td >My answer</td>
                                <td >Correct answer</td>
                            </tr>
                            {renderWrongAnswers()}
                        </tbody>
                    </table>
                </div>
            ) : (
                    <>
                        <Typography
                            variant="h6"
                            style={{ minHeight: 70 }}>{question.question_value}</Typography>
                        <div>
                            {renderAnswers()}
                        </div>
                    </>
                )}

        </div>
    )
}

export default Game