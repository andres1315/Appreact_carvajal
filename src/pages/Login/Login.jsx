import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { FormLogin } from '../../components/FormLogin/FormLogin'
import axios from 'axios'
import Swal from 'sweetalert2'

export function Login () {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  useEffect(() => {
    const { token } = JSON.parse(window.localStorage.getItem('userLogin')) || {}
    if (token) navigate('/contact')
  }, [])

  const onSubmit = async (data) => {
    axios
      .post(`${import.meta.env.VITE_URL_API}/users/login`, {
        email: data.email,
        password: data.password
      })
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data
          window.localStorage.setItem('userLogin', JSON.stringify({ name: data.name, token: data.token, id: data.id }))
          navigate('/contact')
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          Swal.fire({
            title: 'Atención!',
            text: 'Datos Incorrectos',
            icon: 'warning',
            confirmButtonText: 'Ok'
          })
        } else {
          Swal.fire({
            title: 'Atención!',
            text: 'Error en el servidor',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }
      })
  }

  return (
    <>
      <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-screen bg-gray-400'>
        <div className='w-full max-w-md space-y-8'>
          <div>
            <img
              className='mx-auto h-12 w-auto'
              src='https://www.carvajal.com/wp-content/uploads/2021/10/Logo-1.svg'
              alt='Your Company'
            />
            <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-indigo-700'>
              Acceda a su cuenta
            </h2>

          </div>
          <FormLogin register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} />
        </div>
      </div>
    </>
  )
}
