import './App.css';
import Navbar from "./navigation_bar/Navbas";
import Post from "./post/Post"
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Home from "./home/Home"
import User from "./userprofile/user"

function App() {
  return (
    <div className="App">
      <div className="nav">
        <Navbar/>
      </div>
    </div>
  );
}

export default App;
