import { useState } from 'react'
import { useSetUser } from './UserContext'
import { createcarpeta } from './api'
import './createcarpeta.css';
// import './Register.css';

function CreateCarpeta() {
  const setMe = useSetUser()
  
  const [folderId, setFolder] = useState('')
  const [nombre, setNombre] = useState('')
  const [isError, setError] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    const data = await createcarpeta(nombre,folderId)
    if (data.token) {
        setMe(data)
      } else {
        setError(true)
      }
    }

  return (
    <div className="createcarpeta">
      <form onSubmit={handleSubmit}>
      <label>
          nombre:
          <input type="nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        </label>
       
        
      <label>
          carpetaid:
          <input type="folderId" value={folderId} onChange={e => setFolder(e.target.value)} />
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


export default CreateCarpeta;