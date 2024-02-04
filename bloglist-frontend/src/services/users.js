import axios from 'axios'

const baseUrl = '/api/users'

const getAll = () => axios.get(baseUrl).then((response) => response.data)

export default { getAll }
