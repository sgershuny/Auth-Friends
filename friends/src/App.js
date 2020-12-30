
import './App.css';
import Login from './components/Login';
import { Link, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import FriendsList from './components/FriendsList';
 
function App() {

  return (
    <div className="App">
      <ul>
        <li>
          <Link to = "/login"> Login </Link>
        </li>
        <li>
          <Link to = "/protected-friends"> Protected Friends </Link> 
        </li>
        <li>
          <button onClick ={() => localStorage.clear()}>Log Out</button>
        </li>
      </ul>
      <Route path = "/login" component = {Login} />
      <PrivateRoute exact path = "/protected-friends" component = {FriendsList} />
    </div>
  );
}

export default App;
