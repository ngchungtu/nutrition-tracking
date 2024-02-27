import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const loggedUserData = useContext(UserContext)
  // console.log('loggedInUserData', loggedInUserData);

  const navigate = useNavigate()

  const [userCreds, setUserCreds] = useState({
    email: "asd@gmail.com",
    password: "111111",
  })

  const [message, setMessage] = useState({
    type: "invisible-msg",
    data: "",
  })

  const handleInput = (e) => {
    setUserCreds((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    // console.log(userCreds);

    fetch('http://localhost:5500/login', {
      method: 'POST',
      body: JSON.stringify(userCreds),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.status === 404) {
        setMessage({ type: 'error', text: "Username or Email not found" });
      } else if (response.status === 403) {
        setMessage({ type: 'error', text: "Incorrect Password" });
      }
      // else if (response.status === 200) {
      //   return response.json()
      // }
      setTimeout(() => {
        setMessage({ type: 'invisible-msg', text: "" })
      }, 5000)
      return response.json()
    })
      .then((data) => {
        // console.log('datas', data)
        if (data.accessToken !== undefined) {
          localStorage.setItem("nutrify-user", JSON.stringify(data))
          loggedUserData.setLoggedUser(data)
          navigate('/track')
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <div className="form-parent">
      <form className="form" onSubmit={handleLogin}>
        <h1>Start Your Fitness</h1>
        <div className='form-content'>
          <div className='form-content_inpText'>
            <input type="email" name="email" className="inp" placeholder="Email..." onChange={handleInput} value={userCreds.email} required />
          </div>

          <div className='form-content_inpPassword'>
            <input type={showPassword ? "text" : "password"} name="password" className="inp" placeholder="Mật khẩu..." onChange={handleInput} value={userCreds.password} required maxLength={8} />
            {
              showPassword ?
                <i className="ri-eye-line" onClick={() => setShowPassword(!showPassword)}></i>
                : <i className="ri-eye-off-line" onClick={() => setShowPassword(!showPassword)}></i>
            }
          </div>

          <button className="btn">Đăng nhập</button>
          <p>Chưa có tài khoản ? <Link to="/register">Đăng kí</Link></p>
          <p className={message.type}>{message.text}</p>
        </div>
      </form>
    </div>
  )
}

export default Login