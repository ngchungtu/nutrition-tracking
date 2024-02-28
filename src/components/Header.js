import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const loggedUserData = useContext(UserContext)
    const navigate = useNavigate()

    const userNameLogin = loggedUserData.loggedUser.name

    const logout = () => {
        localStorage.removeItem("nutrify-user")
        loggedUserData.setLoggedUser(null)
        navigate("/login")
    }
    return (
        <div className='navbar'>
            <ul className='navbar_list'>
                <div className='navbar-item'>
                    {/* <Link to='/'>Home</Link> */}
                    <Link to='/track'><i className="ri-presentation-line"></i> Điều lượng</Link>
                    {/* <Link to='/diet'><i className="ri-scales-line"></i> Nhật kí dinh dưỡng</Link> */}
                    <Link to='/food-list'><i className="ri-file-list-3-line"></i> Danh sách món</Link>
                    <Link to='/add-food'><i className="ri-add-circle-line"></i> Thêm món</Link>
                </div>

                <div className='navbar-name'>
                    <h5>Xin chào: <span>{userNameLogin}</span></h5>
                    <button onClick={logout}>Đăng xuất</button>
                </div>
            </ul>
        </div>
    )
}

export default Header