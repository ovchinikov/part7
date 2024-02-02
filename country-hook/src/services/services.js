import axios from 'axios'

// countries api

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

export const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

export const getOne = async (name) => {
  const request = axios.get(
    `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`,
  )
  const response = await request
  console.log(response.data)
  return response.data
}
