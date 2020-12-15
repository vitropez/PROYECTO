import Header from './Header';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Users from './Users';
import About from './About';
import Home from './Home';
import Carpetas from './Carpetas';
import Ficheros from './Ficheros';
import Login from './Login';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/carpetas">
          <Carpetas />
        </Route>
        <Route path="/ficheros/:id">
          <Ficheros />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
