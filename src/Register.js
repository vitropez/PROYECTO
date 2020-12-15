import { useState } from 'react'
import { useSetUser } from './UserContext'
import { register } from './api'
// import './Register.css';

function Register() {
  const setMe = useSetUser()

  const [email, setEmail] = useState()
  const [pasword, setPassword] = useState('')
  const [nombre, setUsername] = useState()
  const [isError, setError] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    const foto = e.target.foto.files[0]
    const data = await register( email, pasword,nombre,foto)
    if (data.token) {
      setMe(data)
    } else {
      setError(true)
    }
  }

  return (
    <div className="login register">
      <form onSubmit={handleSubmit}>
       
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
         password : 
          <input type="pasword" value={pasword} onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
          nombre:
          <input type="nombre" value={nombre} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Foto:
          <input type="file" name="foto" />
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

export default Register;
