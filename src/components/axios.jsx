import axios from 'axios';

const instance = axios.create({
    baseURL : "https://lousy-nodejs.vercel.app/"
    // baseURL : 'http://localhost:9000'
})

export default instance;