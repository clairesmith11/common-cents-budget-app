import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://common-cents-b3aea.firebaseio.com/budgets'
})

export default instance;