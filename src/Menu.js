import { Link } from 'react-router-dom'
import { useSetUser } from './UserContext'
import CreateFichero from './submitfichero'

import './Menu.css'

function Menu() {
  const folders = [] // useUserList()
  
  const setMe = useSetUser()

  if (!folders) return 'Loading ...'

  return (
    <aside className="menu">
      <h2>carpetas</h2>
      <ul>
        {folders.map(user =>
          <li key={folders.id}>
            <Link to={'/users/' + folders.id}>{folders.name}</Link>
          </li>
        )}
      </ul>
      <Link to="/carpetas">Selecciona una carpeta</Link>
      <CreateFichero />
      <button onClick={() => setMe()}>Logout</button>
    </aside>
  )
}

export default Menu
