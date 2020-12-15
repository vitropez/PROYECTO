import { Link } from 'react-router-dom';

function Ficherodata({ data }) {
  return (
    <Link to={'/carpeta/' + data.id} className="fichero">
      <h3>{data.name}</h3>
    </Link>
  );
}

export default Ficherodata;
