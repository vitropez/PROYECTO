import { useState } from 'react'
import { useSetUser } from './UserContext'
import { createFichero } from './api'
// import './Register.css';

function CreateFichero() {
  const setMe = useSetUser()

  const [folderId, setFolder] = useState('')
  const [nombre, setNombre] = useState('')
  const [nombreCarpeta, setnombreCarpeta] = useState('')
  const [imagen, setImagen] = useState('')
  const [isError, setError] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    const data = await createFichero( folderId,nombre,nombreCarpeta,imagen)
    if (data.token) {
      setMe(data)
    } else {
      setError(true)
    }
  }

  return (
    <div className="crearfichero">
      <form onSubmit={handleSubmit}>
       
        <label>
          id:
          <input type="folderId" value={folderId} onChange={e => setFolder(e.target.value)} />
        </label>
        <label>
          nombre:
          <input type="nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        </label>
        <label>
          nombreCarpeta:
          <input type="nombreCarpeta" value={nombreCarpeta} onChange={e => setnombreCarpeta(e.target.value)} />
        </label>
        <label>
          imagen:
          <input type="imagen" value={imagen} onChange={e => setImagen(e.target.value)} />
        </label>
        {isError &&
          <div className="error">
            Error de registro
          </div>
        }
        <button>Enviar</button>
      </form>
    </div>
  );
}

export default CreateFichero;