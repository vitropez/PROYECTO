import useFetch from './useFetch'



export const useFolders = () => useFetch('http://localhost:3000/api/folders')
export const useFolderFiles = (id) => useFetch('http://localhost:3000/api/ficheros/'+id)

export const login = async (email, password) => {
 try{
  const ret = await fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  const data = await ret.json()
  return data
 }
 catch (error){
   console.log(error)
 }
}
export const createcarpeta= async (token,nombre) => {
 try{
  const ret = await fetch('http://localhost:3000/api/folders' , {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({nombre})
  })
const data = await ret.json()
return data
 } catch (error){
  console.log(error)
}
}

export const register = async ( email, password,nombre,foto) => {
  const dataSend = new FormData();
  dataSend.append('email', email);
  dataSend.append('password', password);
  dataSend.append('nombre', nombre);
  dataSend.append('foto', foto);
  const ret = await fetch('http://localhost:3000/api/users', {

    method: 'POST',
    
    body: dataSend
  })
  const data = await ret.json()
  return data
}

export const update = async (token,email,nombre,foto) => {
  const dataSend = new FormData();
  dataSend.append('email', email);
   dataSend.append('nombre', nombre);
  dataSend.append('foto', foto);
  const ret = await fetch('http://localhost:3000/api/users', {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
     
    },
    body: dataSend 
  })
  const data = await ret.json()
  return data
}
export const createFichero  = async (token,carpeta,nombre,imagen) => {
    const dataSend = new FormData();
  dataSend.append('nombre', nombre);
  dataSend.append('carpeta',carpeta);
  dataSend.append('imagen', imagen);
  const ret = await fetch('http://localhost:3000/api/ficheros', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      
    },
    body:dataSend
  })
  const data = await ret.json()
  return data
}


export const deleteNote = async ( token,id ) => 
{ const ret = await fetch('http://localhost:3000/api/ficheros/'+id ,{
 method: 'DELETE',
  headers: {
'Authorization': 'Bearer ' + token,
 'Content-Type': 'application/json' },
  body: JSON.stringify({token,id}) })
   const data = await ret.json()
    return data
   }


