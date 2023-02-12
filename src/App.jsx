
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { Layout } from './Layout/Layout'
import { RoutesList } from './Routes'

function App () {
  return (
    <BrowserRouter>
      <Layout>
        <RoutesList />
      </Layout>
    </BrowserRouter>
  )
}

export default App
