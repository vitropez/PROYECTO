import { useState } from 'react'
import { useUser } from './UserContext'
import { createcarpeta } from './api'
import './createcarpeta.css';
import{useHistory} from 'react-router-dom'

// import './Register.css';

function CreateCarpeta() {
  const me = useUser()
  const history= useHistory()

  const [nombre, setNombre] = useState()
  const [isError, setError] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    const data = await createcarpeta(me.token,nombre)
    if (data.ok) {
      history.push("/carpetas")
      } else {
        setError(true)
      }
    }

  return (
    <div className="createcarpeta">
      <form onSubmit={handleSubmit}>
      <label>
          crea tu carpeta:
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
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