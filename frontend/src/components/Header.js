import React, { useContext, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import './header.css'
import { LoginContext } from './contexProvider/context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const { logindata, setLoginData } = useContext(LoginContext);

  const history = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //user logout function
  const logoutuser = async () => {

    //getting value of token
    let token = localStorage.getItem("userdatatoken");

    //calling API
    const res = await fetch("/logout", {
      method: "GET",
      headers:
      {
        "Content-Type": "application/json",
        "Authorization": token,
        Accept: "application/json"
      },
      credentials: "include"
    });

    const data = await res.json("");

    if (data.status !== 201) {
      //delete token form local storage.
      console.log("user Logout")
      localStorage.removeItem("userdatatoken");
      setLoginData(false);
      history("/");
    } else {
      console.log("Error");
    }
  }


  const goDash = () => {
    history("/dash");
  }

  const Createpost = () => {
    history("/createpost");
  }

  const goError = () => {
    history("*");
  }

  return (
    <div>
      <header>
        <nav>

          <NavLink to="/login"><h1>Infinity Link</h1></NavLink>
          <div className='avtar'>
            {
              logindata?.ValidUserOne ? <Avatar style={{ background: "salmon", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick}>{logindata?.ValidUserOne.fname[0].toUpperCase()}</Avatar> :
                <Avatar style={{ background: "blue" }} onClick={handleClick} />
            }

          </div>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {logindata?.ValidUserOne ? (
              <div>
                <MenuItem onClick={() => {
                  goDash();
                  handleClose();
                }}>Profile</MenuItem>
                <MenuItem onClick={() => {
                  Createpost();
                  handleClose();
                }}>Create</MenuItem>
                <MenuItem onClick={() => {
                  logoutuser();
                  handleClose();
                }}>Logout</MenuItem>
              </div>
            ) : (
              <div>
                <MenuItem onClick={() => {
                  goError();
                  handleClose();
                }}>Profile</MenuItem>
              </div>
            )}
          </Menu>
        </nav>
      </header>
    </div>
  )
}

export default Header