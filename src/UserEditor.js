import { useState } from 'react'
import { edit } from './api'
import { useUser } from './UserContext'
import './UserEditor.css'

function UserEditor({ user }) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)

  const me = useUser()

  const handleSubmit = async e => {
    e.preventDefault()
    await edit(me.token, user.id, { name, email })
  }

  return (
    <div className="user-editor">
      <h3>Edit user:</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <button>Guardar</button>
      </form>
    </div>
  );
}

export default UserEditor;
