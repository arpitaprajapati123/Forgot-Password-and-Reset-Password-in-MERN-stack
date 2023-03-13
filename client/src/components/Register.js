import React, { useState } from 'react'
import "./mix.css"
import { NavLink } from 'react-router-dom';

const Register = () => {
    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: ""
    });
     
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

    const addUserdata = async (e) => {
        e.preventDefault();

        const { fname, email, password, cpassword } = inpval;

        if (fname === "") {
            alert("fname is required!", {               
            });
        } else if (email === "") {
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
        } else if (cpassword === "") {
            alert("cpassword is required!", {
                
            });
        }
        else if (cpassword.length < 6) {
            alert("confirm password must be 6 char!", {
               
            });
        } else if (password !== cpassword) {
            alert("pass and Cpass are not matching!", {
               
            });
        } else {
            // console.log("user registration succesfully done");   
            const data = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, password, cpassword
                })
            });
            const res = await data.json();
             //console.log(res.status);
             if (res.status === 201) {
                alert("Registration Successfully done 😃!",)
                setInpval({ ...inpval, fname: "", email: "", password: "", cpassword: "" });   
            }
        }
    }


  return (
    <>
        <section>
            <div className="form_data">
                <div className="form_heading">
                    <h1>Sign Up</h1>
                    <p style={{textAlign:"center"}}>We are glad that you will be using project cloud to manage<br/> your tasks! We hope that you will get like it.</p>
                </div>

                <form>
                <div className="form_input">
                        <label htmlFor="fname">Name</label>
                        <input type="text" name="fname" onChange={setVal} value={inpval.fname} id="fname" placeholder='Enter Your Name' />
                    </div>
                    <div className="form_input">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" onChange={setVal} value={inpval.email} id="email" placeholder='Enter Your Email Address' />
                    </div>
                    <div className="form_input">
                        <label htmlFor="password">Password</label>
                        <div className='two'>
                            <input type={!passShow ? "password" : "text"} name="password" onChange={setVal} value={inpval.password} id="password" placeholder='Enter Your Password' />
                            <div className="showpass" onClick={()=>setPassShow(!passShow)}>
                                {!passShow ? "Show" : "Hide"}
                            </div>
                        </div>                        
                    </div>
                    <div className="form_input">
                        <label htmlFor="password">Confirm Password</label>
                        <div className='two'>
                            <input type={!cpassShow ? "password" : "text"} name="cpassword" onChange={setVal} value={inpval.cpassword} id="cpassword" placeholder='Confirm Password' />
                            <div className="showpass" onClick={()=>setCPassShow(!cpassShow)}>
                                {!cpassShow ? "Show" : "Hide"}
                            </div>
                        </div>                        
                    </div>
                    <button className="btn" onClick={addUserdata}>Sign Up</button>
                    <p>Already have an account? <NavLink to="/">Login</NavLink> </p>
                </form>
            </div>
        </section>
    </>
  )
}

export default Register