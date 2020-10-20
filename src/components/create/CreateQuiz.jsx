import { Divider, Typography, FormControl, Input, InputLabel, FormHelperText, Button } from "@material-ui/core";
import React, { useState } from "react";
import api from "../../api/index"
const CreateQuiz = () => {
    const [name, setName] = useState(null)
    const [success, setSuccess] = useState(false)
    const [createdQuiz, setCreatedQuiz] = useState(null)

    const create = () => {
        api.createQuiz(name).then(res => {
            if (res.data.id !== null) {
                setSuccess(true)
                setCreatedQuiz(res.data)
            }
        })
    }

    return (
        <div>
            <Typography variant="h4">Create a new quiz</Typography>
            <Divider />


            <FormControl style={{
                marginTop: "1em",
                padding: 4,
                width: "90%"
            }}>
                <InputLabel htmlFor="my-input">Quiz Name</InputLabel>

                <Input
                    id="my-input"
                    aria-describedby="my-helper-text"
                    onChange={(e) => { setName(e.target.value) }} />
                <FormHelperText id="my-helper-text">Name for your new quiz</FormHelperText>
            </FormControl>
            {name !== null && name.length !== 0 && success === false && createdQuiz === null ? (
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => { create() }}>Create</Button>
                </div>
            ) : <></>}

            {createdQuiz !== null && success === true ? (
                <div>
                    success
                </div>
            ) : <></>}
        </div>
    )
}

export default CreateQuiz