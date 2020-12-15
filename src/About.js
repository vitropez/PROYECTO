import { useHistory } from 'react-router-dom'

function About() {
  const history = useHistory()

  const handleClick = () => history.push('/users/3') // Navegación programática

  return (
    <div className="page about">
      Acerca de ...
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
}

export default About;
