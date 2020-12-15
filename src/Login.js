import { useState } from 'react'
import { useSetUser } from './UserContext'
import { login } from './api'
import './Login.css';

function Login() {
  const setMe = useSetUser()

  const [email, setUsername] = useState('')
  const [pasword, setPassword] = useState('')
  const [isError, setError] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    const data = await login(email, pasword)
    if (data.token) {
      setMe(data)
    } else {
      setError(true)
    }
  }

  return (
    <div className="login">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          email:
          <input type="email" value={email} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          password:
          <input type="pasword" value={pasword} onChange={e => setPassword(e.target.value)} />
        </label>
        {isError &&
          <div className="error">
            Usuario o contraseña incorrecto
          </div>
        }
        <button>Iniciar sesión</button>
        <div className="note"></div>
      </form>
    </div>
  );
}

export default Login;
