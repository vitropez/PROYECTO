import useFetch from './useFetch'



export const useFolders = () => useFetch('http://localhost:3000/api/folders')
export const useFolderFiles = (id) => useFetch('http://localhost:3000/api/ficheros/' + id)

export const login = async (email, pasword) => {
  const ret = await fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, pasword })
  })
  const data = await ret.json()
  return data
}
export const createcarpeta= async (token,id,nombre,folderId) => {
  const ret = await fetch('http://localhost:3000/api/folders/'+id , {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({nombre,folderId})
  })
const data = await ret.json()
return data
}

export const register = async ( email, pasword,nombre,foto) => {
  const dataSend = new FormData();
  dataSend.append('email', email);
  dataSend.append('pasword', pasword);
  dataSend.append('nombre', nombre);
  dataSend.append('foto', foto);
  const ret = await fetch('http://localhost:3000/api/users', {

    method: 'POST',
    
    body: dataSend
  })
  const data = await ret.json()
  return data
}

export const edit = async (token, id, newUser) => {
  const ret = await fetch('http://hab.trek-quest.com/users/' + id, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })
  const data = await ret.json()
  return data
}
export const createFichero  = async (folderId,nombre,nombreCarpeta,imagen) => {
  const dataSend = new FormData();
  dataSend.append('folderId', folderId);
  dataSend.append('nombre', nombre);
  dataSend.append('nombreCarpeta',nombreCarpeta);
  dataSend.append('imagen', imagen);
  const ret = await fetch('http://localhost:3000/api/ficheros', {
    method: 'POST',
    
    body:dataSend
  })
  const data = await ret.json()
  return data
}

