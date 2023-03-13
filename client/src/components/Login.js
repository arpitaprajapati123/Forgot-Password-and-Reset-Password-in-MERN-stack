import React, { useState } from 'react'
import "./mix.css"
import { NavLink, useNavigate } from 'react-router-dom';


const Login = () => {
    const [passShow, setPassShow] = useState(false);

    const [inpval, setInpval] = useState({        
        email: "",
        password: "",
    });

    const history = useNavigate();

    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const loginuser = async(e) => {
        e.preventDefault();

        const { email, password } = inpval;
         if (email === "") {
            alert("email is required!", {
                
            });
        } else if (!email.includes("@")) {
            alert("includes @ in your email!", {
                
            });
        } else if (password === "") {
            alert("password is required!", {
                
            });
        } else if (password.length < 6) {
            alert("password must be 6 char!", {
                
            });
        } 
         else {
            //console.log("user Logged In succesfully done");               
            const data = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                     email, password
                })
            });
            const res = await data.json();
             //console.log(res);
             if (res.status === 201) {
                //alert("Registration Successfully done 😃!",)
                localStorage.setItem("usersdatatoken",res.result.token);
                history("/dash")
                setInpval({ ...inpval,  email: "", password:""});   
            }
        }
    }
  return (
    <>
        <section>
            <div className="form_data">
                <div className="form_heading">
                    <h1>Welcome back, Log In</h1>
                    <p>Hey! We are glad you are back. Please Login.</p>
                </div>

                <form>
                    <div className="form_input">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={inpval.email} onChange={setVal} id="email" placeholder='Enter Your Email Address' />
                    </div>
                    <div className="form_input">
                        <label htmlFor="password">Password</label>
                        <div className='two'>
                            <input type={!passShow ? "password" : "text"} name="password" value={inpval.password} onChange={setVal} id="password" placeholder='Enter Your Password' />
                            <div className="showpass" onClick={()=>setPassShow(!passShow)}>
                                {!passShow ? "Show" : "Hide"}
                            </div>
                        </div>                        
                    </div>
                    <button className="btn" onClick={loginuser}>Login</button>
                    <p>Don't have an account? <NavLink to="/register">Sign Up</NavLink></p>
                    <p style={{color:"black",fontWeight:"bold"}}>Forgot Password  <NavLink to="/password-reset">Click Here</NavLink> </p>
                </form>
            </div>
        </section>
    </>
  )
}

export default Login