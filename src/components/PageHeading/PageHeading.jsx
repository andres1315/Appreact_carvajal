export function PageHeading ({ title, bgColor } = {}) {
  return (
    <div className='md:flex md:items-center md:justify-between  bg-gray-900 md:p-8 rounded-t-lg md:mt-11'>
      <div className='min-w-0 flex-1'>
        <h2 className='text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight'>
          {title}
        </h2>
        <p className='mt-1 max-w-2xl text-base text-gray-300'>
          Los campos marcados con (*) son requeridos
        </p>
      </div>

    </div>
  )
}
