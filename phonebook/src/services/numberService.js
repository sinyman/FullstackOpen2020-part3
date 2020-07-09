import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => {
    return response.data
  })
}

const deletePerson = idToBeDeleted => {
  const deleteURL = baseUrl+'/'+idToBeDeleted
  const request = axios.delete(deleteURL)
  return request.then(response => {
    return response.data
  })
  .catch(error => {
    return null
  })
}

const update = (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject)
  return req.then(response => {
    return response.data
  })
  .catch(error => {
    return null
  })
}


export default { getAll, create, deletePerson, update }
