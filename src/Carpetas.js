import { useFolders } from './api'
import { Link } from 'react-router-dom'
import { useUser } from './UserContext'
import Login from './Login'
import CreateCarpeta from './createCarpeta'
import './carpeta.css';


function FicherosViewer({ id }) {
  const carpetas = useFolders()
  const me = useUser()
  if (!me) return <Login />





  if (!carpetas || carpetas.error)
   return( <CreateCarpeta />)

  return (

    <div className="carpetas">
      {carpetas.map(carpeta =>
        <>
          
          <h2>{carpeta.nombre}📁</h2>
          <ul>
          <Link to={'/ficheros/' + carpeta.id}>ver</Link>
          </ul>
         
        </>
        
      )}

                
    </div>
  )
}

export default FicherosViewer




