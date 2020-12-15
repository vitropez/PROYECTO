import { useState } from 'react'
import { useSetUser } from './UserContext'

import './submitcarpeta.css';

function CreateCarpeta() {
  const setMe = useSetUser()

  
  const [nombre, setcarpetaname] = useState()
  const [carpetaId, setCarpeta] = useState()
  
 
  const [isError, setError] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    const data = await CreateCarpeta(  nombre,carpetaId)
    if (data.token) {
      setMe(data)
    } else {
      setError(true)
    }
  }

  return (
    <div className="carpetasubmit">
      <form onSubmit={handleSubmit}>
       
        
        <label>
          nombre:
          <input type="nombre" value={nombre} onChange={e => setcarpetaname(e.target.value)} />
        </label>
        <label>
          numero de la carpeta:
          <input type="carpetaId" value={carpetaId} onChange={e => setCarpeta(e.target.value)} />
        </label>
        {isError &&
          <div className="error">
            Error de registro
          </div>
        }
        <button>Registrar</button>
      </form>
    </div>
  );
}

export default CreateCarpeta;
