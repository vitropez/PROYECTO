import { useFolders } from './api'
import { Link } from 'react-router-dom'
import { useUser } from './UserContext'
import Login from './Login'




function FicherosViewer({ id }) {
  const carpetas = useFolders()
  const me = useUser()
  if (!me) return <Login />





  if (!carpetas || carpetas.error) return 'Loading ...'

  return (

    <div className="carpetas">
      {carpetas.map(carpeta =>
        <>
          
          <h2>{carpeta.nombre}</h2>
          <ul>
            <li>ID_CARPETA: {carpeta.id}</li>
            <li>NOMBRE: {carpeta.nombre}</li>
            <Link to={'/ficheros/' + carpeta.id}>{carpetas.name}ver</Link>
          </ul>
         
        </>
      )}


    </div>
  )
}

export default FicherosViewer




