import { useEffect, useState } from 'react'
import { getListContact, deleteContact } from '../../pages/HomeContact/services'
import Swal from 'sweetalert2'
import { ModalUpdate } from '../ModalUpdate/ModalUpdate'
export function ListContact () {
  const [contacts, setContacts] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [contactToEdit, setContactToEdit] = useState({})

  useEffect(() => {
    getListContact().then(res => {
      setContacts(res)
    })
  }, [])

  useEffect(() => {
    if (!modalIsOpen) {
      getListContact().then(res => {
        setContacts(res)
      })
    }
  }, [modalIsOpen])

  const updateList = () => {
    getListContact().then(res => {
      setContacts(res)
    })
  }

  const handleModalEdit = (contact) => {
    setContactToEdit(contact)
    setModalIsOpen(true)
  }
  const handleClickDeleteContact = ({ id }) => {
    deleteContact(id).then(res => {
      if (res.status === 200 || res.statusCode === 200) {
        Swal.fire({
          title: 'Atención!',
          text: 'Contacto Eliminado',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        updateList()
      }
    })
  }
  return (
    <>
      {/* TABLE CONTACTS */}
      <div className='flex flex-col'>
        <div className='overflow-x-auto'>
          <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200'>
            <table className='min-w-full'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Nombre
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Correo
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Teléfono
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Dirección
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Ciudad
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Pais
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {contacts.map((contact) => {
                  return (
                    <tr key={contact.id}>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <div className='ml-4'>
                            <div className='text-sm font-medium text-gray-900'>
                              {contact.name} {contact.last_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>
                          <a href='#'>{contact.email}</a>
                        </div>

                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>{contact.cellphone}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>{contact.address}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>{contact.city}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>{contact.country}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span className='isolate inline-flex rounded-md shadow-sm'>
                          <button
                            type='button'
                            onClick={() => handleClickDeleteContact({ id: contact.id })}
                            className='relative inline-flex items-center rounded-l-md border border-gray-300 bg-red-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-red-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                          >
                            Eliminar
                          </button>
                          <button
                            onClick={() => handleModalEdit(contact)}
                            type='button'
                            className='relative -ml-px inline-flex items-center border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                          >
                            Actualizar
                          </button>
                        </span>
                      </td>

                    </tr>
                  )
                })}
              </tbody>
            </table>
            {contactToEdit
              ? <ModalUpdate open={modalIsOpen} setOpen={setModalIsOpen} contact={contactToEdit} />
              : null}

          </div>
        </div>
      </div>
    </>
  )
}
