import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './contexProvider/context';
import CircularProgress from '@mui/material/CircularProgress';
import "./Dashboard.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
        if (data.status === 401 || data === null) {
            history("");
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
                    <div className="post-container">
                        <div className="user-info">
                            <img src="https://cdn-icons-png.flaticon.com/128/7009/7009609.png?ga=GA1.1.2046960427.1678348423&track=ais"
                                alt="User Profile" className="user-profile-picture" />
                            <div className="user-username">{logindata ? logindata.ValidUserOne.fname : ""}</div>
                        </div>
                        <div className="post-content">
                            {/* <input type="text" placeholder='Something in mind... Share it' /> */}
                            {/* <TextField id="standard-basic" label="Something in mind... Share it" variant="standard" /> */}
                        </div>
                        <div className="post-interactions">
                            <div className="interaction-option">Like</div>
                            <div className="interaction-option">Comment</div>
                            <div className="interaction-option">Share</div>
                        </div>
                    </div> : <Box sx={{ display: 'flex', margin: "45%", justifycontent: "center", alignItems: "center", height: "100vh" }}>
                        Loading... &nbsp;
                        <CircularProgress />
                    </Box>
            }
        </>
    )
}

export default Dashboard;