import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const loggedUserData = useContext(UserContext)
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("nutrify-user")
        loggedUserData.setLoggedUser(null)
        navigate("/login")
    }
    return (
        <div className='navbar'>
            <ul>
                <Link to='/'>Home</Link>
                <Link to='/track'>Track</Link>
                <Link to='/diet'>Diet</Link>
                <li onClick={logout}>Logout</li>
            </ul>
        </div>
    )
}

export default Header