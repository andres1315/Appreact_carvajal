import { Navbar } from '../../components/Navbar/Navbar'
import { useEffect, useState } from 'react'
import { ListContact } from '../../components/ListContact/ListContact'
import { navigation } from '../../components/Navbar/index'

import { useNavigate } from 'react-router-dom'
export function HomeContact () {
  const [menuShow, setMenuShow] = useState(<ListContact />)
  const navigate = useNavigate()
  const handleMenu = ({ nameComponent, ComponentMenu }) => {
    setMenuShow(<ComponentMenu />)
    navigation.forEach((item) => {
      (item.component === nameComponent)
        ? item.current = true
        : item.current = false
    })
  }

  useEffect(() => {
    const { token } = JSON.parse(window.localStorage.getItem('userLogin')) || {}
    if (!token) navigate('/login')
  }, [])

  return (
    <>
      <Navbar handleMenu={handleMenu} />
      <main className='grid grid-col-12'>
        <section className='col-span-12'>{menuShow}</section>
      </main>
    </>
  )
}
