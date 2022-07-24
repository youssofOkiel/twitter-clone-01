import React from 'react'
import {NavLink} from 'react-router-dom'
import './SidebarOption.css'

const SidebarOptions = ({active, text, Icon, onClick}) => {

    const isHome = text === 'Home' 

    return (
        <NavLink to={`/`} exact={isHome} className='sidebarOption' activeClassName='sidebar__active' onClick={onClick} >
           <Icon />
           <h2>{text}</h2>
        </NavLink>
    )
}

export default SidebarOptions