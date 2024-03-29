import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import { LoginContext } from './ContextProvider/Context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "./header.css"
import { useNavigate, NavLink } from 'react-router-dom';

const Header = () => {

   const {logindata,setLoginData}=useContext(LoginContext);
   //console.log(logindata)

   const history = useNavigate();

   const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutuser = async()=>{
      let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json"
              },
              credentials: "include"
        });
        const data = await res.json();
        console.log(data)

        if (data.status == 201) {
          console.log("user logged out");
          localStorage.removeItem("usersdatatoken");
          setLoginData(false)
          history("/");
      } else {
          console.log("error");
      }
  }

    const goDash = () => {
      history("/dash")
    }

    const goError = () => {
      history("*")
    }

  return (
    <>
        <header>
            <nav>
            <NavLink to="/"><h2>Tech<span style={{color:"#008ae6"}}>D</span>o<span style={{color:"#008ae6"}}>M</span></h2></NavLink>
                 <div className='avtar'>
                 {
                  logindata.ValidUserOne ? <Avatar style={{background:"#008ae6", fontWeight:"bold", textTransform:"ca"}} onClick={handleClick}>{logindata.ValidUserOne.fname[0].toUpperCase()}</Avatar>:
                  <Avatar style={{background:"#008ae6"}} onClick={handleClick}/>
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
                        {
                            logindata.ValidUserOne ? (
                                <>
                                    <MenuItem onClick={() => {
                                         goDash()
                                         handleClose()
                                    }}>Profile</MenuItem>
                                    <MenuItem onClick={() => {
                                         logoutuser()
                                         handleClose()
                                    }}>Logout</MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem onClick={() => {
                                        goError()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                </>
                            )
                        }

                    </Menu>
            </nav>
        </header>
    </>
  )
}

export default Header