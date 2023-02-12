import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'
export function FormLogin ({ register, handleSubmit, onSubmit, errors }) {
  const navigate = useNavigate()
  const handleClickCreateUser = () => {
    navigate('/register')
  }
  return (
    <form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
      <input type='hidden' name='remember' defaultValue='true' />
      <div className='-space-y-px rounded-md shadow-sm'>
        <div>
          <label htmlFor='email' className='sr-only'>
            Correo
          </label>
          <input
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            required
            className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
            placeholder='Correo'
            {...register('email', {
              required: 'Ingrese un correo'
            })}
          />
          {errors.email && <p className='text-xs font-medium text-red-500'>{errors.email.message}</p>}

        </div>
        <div>
          <label htmlFor='password' className='sr-only'>
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            autoComplete='current-password'
            required
            className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
            placeholder='Contraseña'
            {...register('password', {
              required: 'Ingrese una contraseña'
            })}
          />
          {errors.password && <p className='text-xs font-medium text-red-500'>{errors.password.message}</p>}
        </div>
      </div>

      <div className='flex items-center justify-between'>

        <div className='text-sm'>
          <p href='#' className='font-medium text-indigo-600 hover:text-indigo-500' onClick={() => handleClickCreateUser()}>
            Registrarse
          </p>
        </div>
      </div>
      <div>
        <button
          type='submit'
          className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
            <LockClosedIcon className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400' aria-hidden='true' />
          </span>
          Ingresar
        </button>
      </div>
    </form>
  )
}
