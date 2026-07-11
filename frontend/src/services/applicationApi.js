import axios from 'axios'

const Api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/api/application',
    withCredentials: true
})

const createApplication = async (data) => {
    const response = await Api.post('/create', data)
    return response.data
}

const getApplication = async (id) => {
    const response = await Api.get(`/get/${id}`)
    return response.data
}

const getAllApplications = async () => {
    const response = await Api.get('/get-all')
    return response.data
}

const updateApplication = async (id, data) => {
    const response = await Api.put(`/update/${id}`, data)
    return response.data
}

const deleteApplication = async (id) => {
    const response = await Api.delete(`/delete/${id}`)
    return response.data
}

export { createApplication, getApplication, getAllApplications, updateApplication, deleteApplication }