import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import axios from 'axios'

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const loggedUserData = useContext(UserContext)
  const [loading, setLoading] = useState(false);

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

  const handleLogin = async (e) => {
    e.preventDefault()
    // console.log(userCreds);

    // fetch('http://localhost:5500/login', {
    //   method: 'POST',
    //   withCredentials: true,
    //   crossorigin: true,
    //   mode: 'no-cors',
    //   body: JSON.stringify(userCreds),
    //   headers: {
    //     "Content-Type": "application/json",
    //     'Access-Control-Allow-Origin': '*'
    //   }
    // })
    setLoading(true)
    await axios.post(`${process.env.REACT_APP_BASE_URL_API}/login`, userCreds)
      .then((response) => {
        if (response.status === 404) {
          setMessage({ type: 'error', text: "Username or Email not found" });
          setLoading(false)
        } else if (response.status === 403) {
          setMessage({ type: 'error', text: "Incorrect Password" });
          setLoading(false)
        }
        else if (response.status === 200) {
          setLoading(true)
          console.log('response', response);
          if (response.data.accessToken !== undefined) {
            setLoading(false)
            localStorage.setItem("nutrify-user", JSON.stringify(response.data))
            loggedUserData.setLoggedUser(response.data)
            navigate('/track')
          } else {
            setMessage({ type: 'error', text: "Cannot Login" });
            setLoading(false)
          }
          return response
        }
        setTimeout(() => {
          setMessage({ type: 'invisible-msg', text: "" })
        }, 5000)
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

          {
            loading
              ? <div className="loader"></div>
              : <button className="btn">Đăng nhập</button>
          }
          <p>Chưa có tài khoản ? <Link to="/register">Đăng kí <i className="ri-arrow-right-circle-line"></i></Link></p>
          <p className={message.type}>{message.text}</p>
        </div>
      </form>
    </div>
  )
}

export default Login
