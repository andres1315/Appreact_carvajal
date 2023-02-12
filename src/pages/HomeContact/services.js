import axios from 'axios'
import Swal from 'sweetalert2'

export const getListContact = () => {
  const { token } = JSON.parse(window.localStorage.getItem('userLogin')) || {}

  return axios.get(`${import.meta.env.VITE_URL_API}/contacts`,
    {
      headers: { authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.status === 200) {
        return res.data
      }
    })
    .catch(err => {
      if (err.response.status === 401) {
        return Swal.fire(
          'Atención!',
          err.response.data.message,
          'error'
        )
      } else {
        return Swal.fire(
          'Atención!',
          err.response.data.message,
          'error'
        )
      }
    })
}

export const deleteContact = (id) => {
  const { token } = JSON.parse(window.localStorage.getItem('userLogin')) || {}

  return axios.delete(`${import.meta.env.VITE_URL_API}/contacts/${id}`,
    {
      headers: { authorization: `Bearer ${token}` }
    })
    .then(res => {
      return res
    })
    .catch(err => {
      if (err.response.status === 401) {
        return Swal.fire(
          'Atención!',
          err.response.data.message,
          'error'
        )
      } else {
        return Swal.fire(
          'Atención!',
          err.response.data.message,
          'error'
        )
      }
    })
}
