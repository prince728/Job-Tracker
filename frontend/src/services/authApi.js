import axios from 'axios'

const Api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/api/auth',
    withCredentials: true
})

export const login = async (email, password) => {
    const response = await Api.post('/login', { email, password })
    return response.data
}

export const signup = async (name, email, password) => {
    const response = await Api.post('/signup', { name, email, password })
    return response.data
}

export const logout = async() => {
    await Api.post('/logout')
}

export const getme  =async() =>{
    const response =await Api.get('/me');
    return response.data
}