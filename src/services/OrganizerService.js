import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
export default {
  getOrganizers(perPage, page) {
    return apiClient.get('/organizer?_limit=' + perPage + '&_page=' + page)
  },
  saveOrganizer(organizer) {
    return apiClient.post('/organizer', organizer)
  },
  getOrganizer(id) {
    return apiClient.get('/organizer/' + id)
  },
  uploadFile(file) {
    let formData = new FormData()
    formData.append('file', file)
    return apiClient.post('/uploadFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
