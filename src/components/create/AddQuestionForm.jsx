import React from "react"
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button, Table, TableRow, TableBody, TableCell } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import api from "../../api/index"


const AddQuestionForm = (id) => {
    const [answers, setAnswers] = React.useState([{index: 0, value: null, correct: false}])
    const [question, setQuestion] = React.useState(null)
    const setChecked = (answer, index) => {
        const state = answers
        const toChange = state[index]
        toChange.correct = !toChange.correct
        state[index]= toChange

        setAnswers(state)
    }

    const setValue = (value, index) => {
        const state = answers
        const toChange = state[index]
        toChange.value = value
        state[index]= toChange

        setAnswers(state)
    }

    const addEmptyAnswer = () => {
        setAnswers([ ...answers, {index: answers.length, value: null, correct: false}])
    }

    const deleteAnswer = (a, index) => {
       setAnswers(answers.filter(ans => ans.index !== a.index))
    }

    const submit = () => {
        console.log(id, question, answers)
        api.createQuestion(id.id, question, answers).then(res => {
            setAnswers([])
            setQuestion("")
        })
    }

    return (
        <div>
            <TextField 
                label="Question" 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                style={{
                    width: "100%",
                    height: "100%"
                }}/>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}>
                <div>
                <Button onClick={addEmptyAnswer}>Add new answer</Button>
                <Table>
                    <TableBody>
                    <TableRow>
                        <TableCell align="center">Answer</TableCell>
                        <TableCell align="center">is Correct</TableCell>
                        <TableCell align="center">Delete</TableCell>
                    </TableRow>
                   
            {
                answers.map((a,i) => {
                    return (
                        <TableRow key={i}>
                            <TableCell align="center">
                                <TextField 
                                    value={a.value}
                                    id="standard-basic" 
                                    label="Add Answer" 
                                    style={{
                                        fontSize: 12
                                    }}
                                    onChange={(e) => {setValue(e.target.value, i)} }/>
                            </TableCell>

                            <TableCell align="center">

                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={a.checked}
                                        onChange={() => {setChecked(a, i)}}
                                        name="checkedB"
                                        color="primary"
                                    />
                                    }
                                />
                            </TableCell>

                            <TableCell align="center">
                                <DeleteIcon onClick={() => {deleteAnswer(a, i)}}/>
                            </TableCell>
                        </TableRow>

                    )
                })
            }
             </TableBody>
                </Table>
            </div>
                <Button color="primary" variant="outlined" onClick={() => {
                    submit()
                }}>
                    Submit Question
                </Button>
            </div>
        </div>
    )
}

export default AddQuestionForm;