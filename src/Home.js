import { Link } from 'react-router-dom';
import CreateCarpeta from './createCarpeta'

import './Home.css'
function Home() {
  return (
    <div className="pagehome">
      <h1>Portada...</h1>
      <ul>
        <li><Link to="/users">Usuarios</Link></li>
        <li><Link to="/carpetas">carpetas</Link></li>
        <li><Link to="/updateusuario">actualizar datos</Link></li>
        <li><Link to="/about">Acerca de</Link></li>
      </ul>
      
<CreateCarpeta />
    </div>
  );
}

export default Home;
