import React, { Fragment, useState } from 'react'
import "./Header.css";

import DashboardIcon from "@material-ui/icons/Dashboard"

import PersonIcon  from "@material-ui/icons/Person"

import ListAltIcon  from "@material-ui/icons/ListAlt"


import ExitToAppIcon  from "@material-ui/icons/ExitToApp"

import { useHistory } from 'react-router-dom';

import {useAlert} from "react-alert"

import { logout } from '../../../actions/userActions';

import { useDispatch } from 'react-redux';

import { Backdrop } from '@material-ui/core';



import {SpeedDial,SpeedDialAction} from "@material-ui/lab"
import zIndex from '@material-ui/core/styles/zIndex';
// the user is coming from app.js
const UserOptions = ({user}) => {
    
    const dispatch =useDispatch()

    const alert= useAlert()

    const history=useHistory()

    const [open,setOpen]=useState(false)

    const options=[
        {icon:<ListAltIcon/>,name:"Orders",func:orders},
        {icon:<PersonIcon/>,name:"Profile",func:account},
        {icon:<ExitToAppIcon/>,name:"Logout ",func:logoutUser}
    ]

    // dashboard will appear only when the role will be admin
    if(user.role==="admin")
    {
        options.unshift({icon:<DashboardIcon/>,name:"Dashboard",func:dashboard},)
    }

    function dashboard()
    {
        history.push("/dashboard")
    }

    function orders()
    {
        history.push("/orders")
    }

    function account()
    {
        history.push("/account")
    }


    function logoutUser()
    {
        dispatch(logout())
        alert.success("Logout Successfully")
    }


    return (
    <Fragment>

        <Backdrop open={open} style={{zIndex:"10"}}/>

        <SpeedDial
        ariaLabel='SpeedDial tooltip example'
        onClose={()=> setOpen(false)}
        onOpen={()=>setOpen(true)}
        open={open}
        className='speedDial'
        style={{zIndex:"11"}}
        icon={<img
        className='speedDialIcon'
        src={user.avatar.url? user.avatar.url : "/profile.png"}
        alt='Profile'/>}
        direction='down'>


            {options.map((item)=>(
                <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func}/>
            ))}
        
        </SpeedDial>
    </Fragment>    
  )
}

export default UserOptions
