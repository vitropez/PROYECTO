import { Link, useParams } from 'react-router-dom';
import {useFolderFiles } from './api';

function Fichero() {
  const { id } = useParams()
  const ficheros = useFolderFiles(id)
  if (!ficheros) return 'Loading'

  return (
     
    <div className="fichero">
    {ficheros.map(fichero=>
      <>
      <h2>{fichero.nombre}</h2>
        <ul>
          <li>ID_FICHEROS: {fichero.id}</li>
          <li>NOMBRE: {fichero.nombre}</li>
          <Link to={"/ficheros/"+fichero.ruta}>ver</Link>
        </ul>
      </>
    )}
    
    
  </div>
)
}




export default Fichero;
