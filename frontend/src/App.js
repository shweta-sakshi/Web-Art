import Header from './components/Header.js';
import Login from './components/Login.js';
import Register from "./components/register.js";
import Dashboard from "./components/Dashboard.js";
import Post from "./components/Post.js";
import Error from "./components/error.js";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from 'react';
import { LoginContext } from './components/contexProvider/context.js';

function App() {

  const [data, setData] = useState(false);

  const { logindata, setLoginData } = useContext(LoginContext);

  const history = useNavigate();

  const DashboardValid = async () => {
    //getting value of token
    let token = localStorage.getItem("userdatatoken");

    //calling API
    const res = await fetch("/validuser", {
      method: "GET",
      headers:
      {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await res.json();

    if (data.status === 401 || !data) {
      console.log("User not valid");
    } else {
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
              <Route path='/dash' element={<Dashboard />} />
              <Route path='/createpost' element={<Post />} />
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
