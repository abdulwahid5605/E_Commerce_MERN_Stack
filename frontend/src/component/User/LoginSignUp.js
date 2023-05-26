import React, { Fragment ,useRef , useState, useEffect} from 'react'
import "./LoginSignUp.css"
import Loader from '../layout/Loader/Loader'
import {Link} from "react-router-dom"
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import LockOpenIcon from "@material-ui/icons/LockOpen"
import FaceIcon from "@material-ui/icons/Face"
import {useSelector,useDispatch} from "react-redux"
import {clearErrors, login,register} from "../../actions/userActions"
import {useAlert} from "react-alert"



// switchertab is a react hook 
const LoginSignUp = ({history}) => {

    const dispatch= useDispatch()

    const alert=useAlert()

    const {error,loading,isAuthenticated}=useSelector(state=>state.user)

    const loginTab=useRef(null)
    const registerTab=useRef(null)
    const switcherTab=useRef(null)

    const [loginEmail,setLoginEmail]=useState("")
    const [loginPassword,setLoginPassword]=useState("")

    const [user,setUser]=useState({
        name:"",
        email:"",
        password:""
    })

    const {name,email,password}=user

    const [avatar,setAvatar]=useState()
    const[avatarPreview,setAvatarPreview]=useState("/profile.png")


    const loginSubmit=(e)=>
    {
        // console.log("form submitted")
        e.preventDefault()
        dispatch(login(loginEmail,loginPassword))
    }

    const registerSubmit=(e)=>{
        e.preventDefault()

        const myForm=new FormData() //we will send data of form

        myForm.set("name",name)
        myForm.set("email",email)
        myForm.set("password",password)
        myForm.set("avatar",avatar)
        dispatch(register(myForm))

    }

    const registerDataChange=(e)=>{
        if(e.target.name==="avatar")
        {
            // to read a new file
            const reader=new FileReader()

            // there are three stages of onload
            // 0->initial
            // 1->processing
            // 2->done

            reader.onload=()=>
            {
                if(reader.readyState===2)
                {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])
        }
        else 
        {
            setUser({...user,[e.target.name]:e.target.value})
            // giving user the value and name i.e email,name,password are names and thing that we are writing in it is value
        }
    }


    useEffect(()=>{
        if(error)
        {
            alert.error(error)
            dispatch(clearErrors())
        }

        if(isAuthenticated)
        {
            history.push("/account")
        }
    },[dispatch,error,alert,history,isAuthenticated])

    const switchTabs=(e,tab)=>{
        if(tab==="login")
        {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }

        if(tab==="register")
        {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralFrom");
            loginTab.current.classList.add("shiftToLeft");
        }
    }





  return (
    <Fragment>
      
        <div className='LoginSignUpContainer'>
            <div className='LoginSignUpBox'>
                <div>
                    <div className="login_signUp_toggle">
                        <p onClick={(e)=>switchTabs(e,"login")}>LOGIN</p>
                        <p onClick={(e)=>switchTabs(e,"register")}>REGISTER</p>
                    </div>
                    <button ref={switcherTab}></button>
                </div>

                <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                    <div className='loginEmail'>
                        <MailOutlineIcon/>
                        <input type="email"
                        placeholder='Email'
                        required
                        value={loginEmail}
                        onChange={(e)=>setLoginEmail(e.target.value)} />
                    </div>

                    <div className='loginPassword'>
                        <LockOpenIcon/>
                        <input type="password"
                        placeholder='Password'
                        required
                        value={loginPassword}
                        onChange={(e)=>setLoginPassword(e.target.value)}  />
                    </div>
                    <Link to="/password/forgot">Forget Password ?</Link>
                    <input type="submit" value="Login" className='loginBtn' />
                </form>

                <form className='signUpForm'
                ref={registerTab}
                encType='multipart/form-data'  //enc->encryption type-> we are not giving string only but also image
                onSubmit={registerSubmit}>

                    <div className='signUpName' >
                        <FaceIcon/>
                        <input type="text"
                        placeholder='Name'
                        required
                        name="name"
                        value={name}
                        onChange={registerDataChange} />
                    </div>

                    <div className='signUpEmail'>
                        <MailOutlineIcon/>
                        <input type="email"
                        placeholder='Email'
                        required
                        name='email'
                        value={email}
                        onChange={registerDataChange} />
                    </div>

                    <div className='signUpPassword'>
                        <LockOpenIcon/>
                        <input 
                        type="password"
                        placeholder='Password'
                        name='password'
                        required
                        value={password}
                        onChange={registerDataChange}  />
                    </div>

                    <div id='registerImage'>
                        <img src={avatarPreview} alt="Avatar Preview" />

                        <input type="file"
                        name='avatar'
                        accept='image/*'
                        onChange={registerDataChange} />
                    </div>

                    <input
                    type="submit"
                    value="Register"
                    className='signUpBtn'
                     />
                </form>
            </div>
        </div>

    </Fragment>

    
  )
}

export default LoginSignUp
