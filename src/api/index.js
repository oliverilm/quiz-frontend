import axios from "axios"

const apiUrl = "http://localhost:8000/api/"

const getRequest = (path) => {
    return axios.get(`${apiUrl}${path}`)
}


const postRequest = (path, content) => {
    return axios.post(`${apiUrl}${path}`, content)
}


export default {
    getQuizes: () => getRequest("quiz-list-create"),
    createQuiz: (name) => postRequest("quiz-list-create", { name }),
    deleteQuiz: (id) => postRequest("delete-quiz", { id }),

    getQuiz: (pk) => getRequest(`quiz-detail/${pk}`),
    createQuestion: (id, question, answers) => postRequest(`add-answer`, { quizId: id, value: question, answers }),
    addAnsweredQuestion: (quizId, answers) => postRequest("add-stat", {quizId, answers})
}