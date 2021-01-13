import {  useParams } from 'react-router-dom';
import { useFolderFiles } from './api';
import CreateFichero from './submitfichero'
import './ficheros.css';
import {deleteNote} from './api';
import { useUser } from './UserContext'


function Fichero() {
  const me = useUser()
  const {id} = useParams()
  const ficheros = useFolderFiles(id)
  const handleRemove= async(id)=>{
    await deleteNote (me.token,id)
    window.location.reload()
  }
    
  if (!ficheros) return <CreateFichero carpeta={id} />

  return (
    
    <div className="fichero">
    {ficheros.map(fichero=>
      <>
      <h2>{fichero.nombre} 📇 </h2>
       <ul>
         <button>
          <a href={fichero.ruta} >ver</a>
          </button>
          <button>
          <a href={fichero.ruta + '?download=1'}>descargar</a>
          </button>
          <button onClick={()=> handleRemove(fichero.id)}>Borrar</button>
         
        </ul> 
      </>
     
    )}
   <CreateFichero carpeta={id} />
    </div>
  
  
)}



export default Fichero;

