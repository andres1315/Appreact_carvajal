import { useForm } from 'react-hook-form'
import axios from 'axios'
import Swal from 'sweetalert2'
export function CreateContact () {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const { token } = JSON.parse(window.localStorage.getItem('userLogin')) || {}
  const onSubmit = async (data) => {
    axios
      .post(`${import.meta.env.VITE_URL_API}/contacts`, {
        ...data,
        userId: JSON.parse(window.localStorage.getItem('userLogin')).id
      },
      {
        headers: { authorization: `Bearer ${token}` }
      })
      .then((res) => {
        if (res.status === 201) {
          reset()
          Swal.fire({
            title: 'Atención!',
            text: 'Contacto Creado',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          Swal.fire({
            title: 'Atención!',
            text: err.response.data.message,
            icon: 'warning',
            confirmButtonText: 'Ok'
          })
        } else {
          Swal.fire({
            title: 'Atención!',
            text: err.response.data.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }
      })
  }

  return (
    <>

      <div className='mt-10 sm:mt-0'>
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1 '>
            <div className='px-4 sm:px-0'>
              <h3 className='text-lg font-medium leading-6 text-gray-900 md:my-auto'>Informacion Contacto</h3>
              <p className='mt-1 text-sm text-gray-600' />
            </div>
          </div>
          <div className='mt-5 md:col-span-2 md:mt-0'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='overflow-hidden shadow sm:rounded-md'>
                <div className='bg-white px-4 py-5 sm:p-6'>
                  <div className='grid grid-cols-6 gap-6'>
                    <div className='col-span-6 sm:col-span-3'>
                      <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                        Nombre
                      </label>
                      <input
                        type='text'
                        name='name'
                        id='name'
                        autoComplete='given-name'
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        {...register('name', { required: 'Ingrese el nombre' })}
                      />
                      {errors.name && <p className='text-xs font-medium text-red-700'>{errors.name.message}</p>}
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label htmlFor='last_name' className='block text-sm font-medium text-gray-700'>
                        Apellido
                      </label>
                      <input
                        type='text'
                        name='last_name'
                        id='last_name'
                        autoComplete='family-name'
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        {...register('last_name', { required: 'Ingrese el apellido' })}
                      />
                      {errors.last_name && <p className='text-xs font-medium text-red-700'>{errors.last_name.message}</p>}

                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                        Correo
                      </label>
                      <input
                        type='text'
                        name='email'
                        id='email'
                        autoComplete='email'
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        {...register('email', { required: false })}
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label htmlFor='cellphone' className='block text-sm font-medium text-gray-700'>
                        Celular
                      </label>
                      <input
                        type='number'
                        name='cellphone'
                        id='cellphone'
                        autoComplete='cellphone'
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        {...register('cellphone', { required: true })}
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label htmlFor='city' className='block text-sm font-medium text-gray-700'>
                        Ciudad
                      </label>
                      <input
                        type='text'
                        name='city'
                        id='city'
                        autoComplete='city'
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        {...register('city', { required: true })}
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label htmlFor='country' className='block text-sm font-medium text-gray-700'>
                        Pais
                      </label>
                      <input
                        type='text'
                        name='country'
                        id='country'
                        autoComplete='country'
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        {...register('country', { required: false })}
                      />
                    </div>

                    <div className='col-span-6'>
                      <label htmlFor='address' className='block text-sm font-medium text-gray-700'>
                        Direccion
                      </label>
                      <input
                        type='text'
                        name='address'
                        id='address'
                        autoComplete='address'
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        {...register('address', { required: false })}
                      />
                    </div>

                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                  <button
                    type='submit'
                    className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  >
                    Crear
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className='hidden sm:block' aria-hidden='true'>
        <div className='py-5'>
          <div className='border-t border-gray-200' />
        </div>
      </div>

    </>
  )
}
