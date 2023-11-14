import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './contexProvider/context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Dashboard = () => {

    const { logindata, setLoginData } = useContext(LoginContext);

    const [data, setData] = useState(false);

    const history = useNavigate();

    const DashboardValid = async () => {

        //getting value of token
        let token = localStorage.getItem("usersdatatoken");
        //console.log("Token:", token);

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

        //console.log(`check, ${data}`);

        if (data.status === 401 || !data) {
            history("*");
        } else {
            setLoginData(data);
            history("/dash");
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setData(true);
            DashboardValid();
        }, 2000);
    }, []);

    return (
        <>
            {
                data ?
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <img src="https://images.vexels.com/content/78703/preview/man-and-woman-shaking-hands-72d900.png" style={{ width: "200px", marginTop: 20 }} alt="user" />
                        <h1>Welcome To Infinity {logindata ? logindata.ValidUserOne.fname : ""}</h1>
                    </div> : <Box sx={{ display: 'flex', margin:"45%", justifycontent: "center", alignItems: "center", height: "100vh" }}>
                        Loading... &nbsp;
                        <CircularProgress />
                    </Box>
            }
        </>
    )
}

export default Dashboard;