import { useState } from 'react'
import { useSetUser } from './UserContext'
import { createFichero } from './api'
import './submitfichero.css';

function CreateFichero() {
  const setMe = useSetUser()

  const [folderId, setId] = useState()
  const [nombre, setficheroname] = useState()
  const [nombreCarpeta, setCarpetaname] = useState()
  
 
  const [isError, setError] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    const imagen = e.target.imagen.files[0]
    const data = await createFichero( folderId, nombre,nombreCarpeta,imagen)
    if (data.token) {
      setMe(data)
    } else {
      setError(true)
    }
  }

  return (
    <div className="ficherosubmit">
      <form onSubmit={handleSubmit}>
       
        <label>
          IdCarpeta:
          <input type="idcarpeta" value={folderId} onChange={e => setId(e.target.value)} />
        </label>
        <label>
          nombre:
          <input type="nombre" value={nombre} onChange={e => setficheroname(e.target.value)} />
        </label>
        <label>
          nombre de la carpeta:
          <input type="nombreCarpeta" value={nombreCarpeta} onChange={e => setCarpetaname(e.target.value)} />
        </label>
        <label>
          archivo:
          <input type="file" name="imagen" />
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

export default CreateFichero;
