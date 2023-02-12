import { PageHeading } from '../../components/PageHeading/PageHeading'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
export function Register () {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const handleClickCancel = () => {
    navigate(-1)
  }

  const onSubmit = async (data) => {
    await axios.post(`${import.meta.env.VITE_URL_API}/users`, data)
      .then(res => {
        if (res.status === 201) {
          reset()
          navigate('/login')
          return Swal.fire(
            'Atención!',
            'Usuario Creado',
            'success'
          )
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

  useEffect(() => {
    const { token } = JSON.parse(window.localStorage.getItem('userLogin')) || {}
    if (token) navigate('/contact')
  }, [])

  return (
    <div className='grid grid-cols-6 mx-2'>
      <div className='col-span-6 md:col-start-2 m md:col-span-4'>
        <PageHeading title='Crear Usuario' />
      </div>
      <form className='space-y-8 divide-y divide-gray-200 col-span-6 md:col-start-2 md:col-span-4' onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
          <div className='space-y-6 pt-8 sm:space-y-5 sm:pt-10'>
            <div>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>Informacion Personal</h3>
              <p className='mt-1 max-w-2xl text-sm text-gray-500'>Utilice una dirección permanente en la que pueda recibir correo.
              </p>
            </div>
            <div className='space-y-6 sm:space-y-5'>
              <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                <label htmlFor='name' className='block text-sm font-bold text-indigo-600 sm:mt-px sm:pt-2'>
                  Nombre(*)
                </label>
                <div className='mt-1 sm:col-span-2 sm:mt-0'>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    required
                    autoComplete='given-name'
                    className='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm'
                    {...register('name', { required: 'Ingrese el nombre' })}
                  />
                </div>
              </div>

              <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                <label htmlFor='lastName' className='block text-sm font-bold text-indigo-600 sm:mt-px sm:pt-2'>
                  Apellido
                </label>
                <div className='mt-1 sm:col-span-2 sm:mt-0'>
                  <input
                    type='text'
                    name='lastName'
                    id='lastName'
                    autoComplete='family-name'
                    className='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm'
                    {...register('lastName', { required: false })}

                  />
                </div>
              </div>

              <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                <label htmlFor='email' className='block text-sm font-bold text-indigo-600 sm:mt-px sm:pt-2'>
                  Correo(*)
                </label>
                <div className='mt-1 sm:col-span-2 sm:mt-0'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    required
                    autoComplete='email'
                    className='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs  sm:text-sm'
                    {...register('email', { required: 'Ingrese el correo', pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
                  />
                  {errors.email && <p>{errors.message}</p>}
                </div>
              </div>

              <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                <label htmlFor='password' className='block text-sm font-bold text-indigo-600 sm:mt-px sm:pt-2'>
                  Contraseña(*)
                </label>
                <div className='mt-1 sm:col-span-2 sm:mt-0'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    required
                    autoComplete='password'
                    className='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm sm:max-w-xs '
                    {...register('password', { required: 'Ingrese la contraseña' })}
                  />
                </div>
              </div>

            </div>
          </div>

        </div>

        <div className='pt-5'>
          <div className='flex justify-end'>
            <button
              type='button'
              className='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              onClick={() => handleClickCancel()}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              Save

            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
