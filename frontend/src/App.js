import Header from './components/Header.js';
import Login from './components/Login.js';
import Register from "./components/register.js";
import Dashboard from "./components/Dashboard.js";
import Post from "./components/Post.js";
import Article from "./components/Article.js";
import User from "./components/Profile.js";
import Error from "./components/error.js";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from 'react';
import { LoginContext } from './components/contexProvider/Context.js';

function App() {

  const [data, setData] = useState(false);

  const { logindata, setLoginData } = useContext(LoginContext);

  const history = useNavigate();

  const DashboardValid = async () => {
    //getting value of token
    let token = localStorage.getItem("usersdatatoken");

    //calling validate API
    const res = await fetch("/validuser", {
      method: "GET",
      headers:
      {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await res.json();

    if (data.status == 401 || !data) {
      console.log("User not loggedIn");
    } else {
      console.log("user verify");
      setLoginData(data);
      history("/dash");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 2000)
  }, []);

  return (
    <>
      {
        data ? (
          <>
            <Header />

            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/article' element={<Article />} />
              <Route path='/dash' element={<Dashboard />} />
              <Route path='/createpost' element={<Post />} />
              <Route path='/profile' element={<User />} />
              <Route path='*' element={<Error />} />
            </Routes>
          </>
        ) : <Box sx={{ display: 'flex', margin: "45%", justifycontent: "center", alignItems: "center", height: "100vh" }}>
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      }
    </>
  );
}

export default App;
