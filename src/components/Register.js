// import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {

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
        console.log(userDetails);

        fetch('https://nutrition-tracker-api.vercel.app/register', {
            method: 'POST',
            body: JSON.stringify(userDetails),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json())
            .then((data) => {
                console.log(data)
                setMessage({ type: 'success', text: data.message });
                setrUserDetails({
                    name: "",
                    email: "",
                    password: "",
                    age: "",
                })

                setTimeout(() => {
                    setMessage({ type: 'invisible-msg', text: "" })
                }, 5000)
            })
            .catch((err) => console.log(err))

        // await axios.post('http://localhost:5500/register', userDetails)
        //     .then((response) => response.json())
        //     .then((data) => console.log(data))
        //     .catch((err) => console.log(err))
    }

    return (
        <section className="form-parent">
            <form className="form" onSubmit={handleRegister}>
                <h1>Start Your Firness</h1>
                <input type="text" className="inp" name="name" placeholder="Enter Your Name..." onChange={handleInput} value={userDetails.name} required />
                <input type="email" className="inp" name="email" placeholder="Enter Your Email..." onChange={handleInput} value={userDetails.email} required />
                <input type="password" className="inp" name="password" placeholder="Enter Your Password..." onChange={handleInput} value={userDetails.password} required maxLength={8} />
                <input type="number" className="number" name="age" placeholder="Enter Your Age..." onChange={handleInput} value={userDetails.age} max={100} min={12} />
                <button className="btn">Join</button>
                <p>Already Registered ? <Link to="/login">Login</Link></p>
                <p className={message.type}>{message.text}</p>
            </form>
        </section>
    )
}

export default Register