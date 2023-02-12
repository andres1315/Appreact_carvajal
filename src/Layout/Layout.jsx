import { useLocation } from 'react-router-dom'

function Private ({ children }) {
  return (
    <>
      {children}
    </>
  )
}

export function Layout ({ children }) {
  const location = useLocation()
  const { pathname } = location
  return pathname === '/contact'
    ? <Private>{children}</Private>
    : children
}
