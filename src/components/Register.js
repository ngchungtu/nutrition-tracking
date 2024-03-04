import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [userDetails, setrUserDetails] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
    })

    const [message, setMessage] = useState({
        type: "invisible-msg",
        data: "",
    })

    const handleInput = (e) => {
        setrUserDetails((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        // console.log(userDetails);

        // fetch('https://nutrition-tracker-api.vercel.app/register', {
        //     method: 'POST',
        //     body: JSON.stringify(userDetails),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        await axios.post(`${process.env.REACT_APP_BASE_URL_API}/register`, userDetails)
            .then((data) => {
                // console.log(data)
                setMessage({ type: 'success', text: data.message });
                setrUserDetails({
                    name: "",
                    email: "",
                    password: "",
                    age: "",
                })
                setLoading(false)

                setTimeout(() => {
                    setMessage({ type: 'invisible-msg', text: "" })
                }, 5000)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }

    return (
        <section className="form-parent">
            <form className="form" onSubmit={handleRegister}>
                <h1>Start Your Firness</h1>
                <input type="text" className="inp" name="name" placeholder="Tên người dùng..." onChange={handleInput} value={userDetails.name} required />
                <input type="email" className="inp" name="email" placeholder="Email..." onChange={handleInput} value={userDetails.email} required />
                <input type="password" className="inp" name="password" placeholder="Password..." onChange={handleInput} value={userDetails.password} required maxLength={8} />
                <input type="number" className="inp" name="age" placeholder="Độ tuổi..." onChange={handleInput} value={userDetails.age} max={100} min={12} />
                {
                    loading
                        ? <div className="loader"></div>
                        : <button className="btn">Đăng kí</button>
                }
                <p><Link to="/login"><i className="ri-arrow-left-circle-line"></i> Đăng Nhập</Link> nếu đã có tài khoản ? </p>
                <p className={message.type}>{message.text}</p>
            </form>
        </section>
    )
}

export default Register