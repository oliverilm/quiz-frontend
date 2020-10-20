import axios from "axios"

const apiUrl = "http://localhost:8000/api/"

const getRequest = (path) => {
    return axios.get(`${apiUrl}${path}`)
}


const postRequest = (path, content) => {
    return axios.post(`${apiUrl}${path}`, content)
}


export default {
    getQuizes : () => getRequest("quiz-list-create"),
    createQuiz : (name) => postRequest("quiz-list-create", {name}),

    getQuiz : (pk) => getRequest(`quiz-detail/${pk}`),
    createQuestion: (pk, question, answers) => postRequest(`quiz-detail/${pk}`, { value: question, answers })
}