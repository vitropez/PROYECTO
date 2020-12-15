import { useUser } from './UserContext'
import './Header.css'

function Header() {
  const me = useUser()
  if (!me) return null
  return (
    <header className="topbar">
       <h1>MI DISCO DURO PERSONAL</h1>
      <img alt={"http://localhost:3000/static/"+me.nombre+".jpg"} src={me.foto} />
           <span>
        {me.nombre}
      </span>
    </header>
  )
}

export default Header


