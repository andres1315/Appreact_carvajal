import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import axios from 'axios'
export function ModalUpdate ({ open, setOpen, contact }) {
  const cancelButtonRef = useRef(null)
  const { token } = JSON.parse(window.localStorage.getItem('userLogin')) || {}
  const nameRf = useRef(contact.name)
  const lnameRf = useRef(contact.last_name)
  const emailRf = useRef(contact.email)
  const cellRf = useRef(contact.cellphone)
  const cityRf = useRef(contact.city)
  const countryRf = useRef(contact.country)
  const addressRf = useRef(contact.address)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = (data) => {
    const dataUpdate = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== ''))
    axios
      .patch(`${import.meta.env.VITE_URL_API}/contacts/${contact.id}`, {
        ...dataUpdate,
        userId: JSON.parse(window.localStorage.getItem('userLogin')).id
      },
      {
        headers: { authorization: `Bearer ${token}` }
      })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          reset()
          Swal.fire({
            title: 'Atención!',
            text: 'Contacto Actualizado',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          setOpen(false)
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
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
                <div>
                  <div className='mt-3 text-center sm:mt-5'>
                    <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                      Editar Contacto
                    </Dialog.Title>
                    <div className='mt-2'>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='overflow-hidden  sm:rounded-md'>
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
                                  ref={nameRf}
                                  autoComplete='given-name'
                                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                                  {...register('name', { required: false })}
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
                                  ref={lnameRf}
                                  id='last_name'
                                  autoComplete='family-name'
                                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                                  {...register('last_name', { required: false })}
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
                                  ref={emailRf}
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
                                  ref={cellRf}
                                  autoComplete='cellphone'
                                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                                  {...register('cellphone', { required: false })}
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
                                  ref={cityRf}
                                  autoComplete='city'
                                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                                  {...register('city', { required: false })}
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
                                  ref={countryRf}
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
                                  ref={addressRf}
                                  onKeyUp={(e) => e.target.value}
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
                              Actualizar
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className='mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-1 sm:gap-3'>

                  <button
                    type='button'
                    className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm'
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
