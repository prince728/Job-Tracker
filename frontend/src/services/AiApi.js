import axios from "axios"

const Api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/api/ai',
    withCredentials: true
})



const matchScore = async (resumeText, jobDescription) => {
    const response = await Api.post('/match-score', {resumeText, jobDescription})
    return response.data
}


const interviewPrepHelp = async (companyName, roleTitle) => {
    const response = await Api.post('/interview-prep', {companyName, roleTitle})
    return response.data
}

export { matchScore, interviewPrepHelp}