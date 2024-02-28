import React, { useContext, useState } from 'react'
import "../styles/add-food.css"
import { UserContext } from '../contexts/UserContext'
import Swal from 'sweetalert2'

const AddFood = () => {

    const [name, setName] = useState("")
    const [calories, setCalories] = useState("")
    const [protein, setProtein] = useState("")
    const [carbonhydrates, setCarbonhydrates] = useState("")
    const [fat, setFat] = useState("")
    const [fiber, setFiber] = useState("")
    // const [imgUrl, setImgUrl] = useState("")

    const loggedUserData = useContext(UserContext)

    const handleSubmit = (e) => {
        e && e.preventDefault()
        const data = {
            name,
            calories,
            protein,
            carbonhydrates,
            fat,
            fiber,
            // imgUrl: imgUrl ? "" : "https://semantic-ui.com/images/wireframe/image.png",
        }
        console.log('data', data)

        try {
            fetch('http://localhost:5000/foods', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Authorization": `Bearer ${loggedUserData.loggedUser.accessToken}`,
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then((data) => {
                    if (data) {
                        // console.log('success', data)
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Tạo thành công",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        setTimeout(() => {
                            setName("")
                            setCalories("")
                            setProtein("")
                            setCarbonhydrates("")
                            setFat("")
                            setFiber("")
                        }, 1500)
                    }
                }).catch((err) => {
                    console.log(err);
                    Swal.fire({
                        position: "top-end",
                        icon: "warning",
                        title: "Lỗi khởi tạo, vui lòng thử lại sau",
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='form-container'>
            <form className='form-add-food'>
                <label htmlFor='foodName'>Tên món</label>
                <input id='foodName' type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <label htmlFor='foodCalo'>Calories</label>
                <input id='foodCalo' type="number" value={calories} onChange={(e) => setCalories(e.target.value)} />

                <label htmlFor='foodProtein'>Protein</label>
                <input id='foodProtein' type="number" value={protein} onChange={(e) => setProtein(e.target.value)} />

                <label htmlFor='foodCarbon'>Carbonhydrates</label>
                <input id='foodCarbon' type="number" value={carbonhydrates} onChange={(e) => setCarbonhydrates(e.target.value)} />

                <label className='foodFat'>Fat</label>
                <input id='foodFat' type="number" value={fat} onChange={(e) => setFat(e.target.value)} />

                <label htmlFor='foodFiber'>Fiber</label>
                <input id='foodFiber' type="number" value={fiber} onChange={(e) => setFiber(e.target.value)} />
            </form>
            <div className='form-submit'>
                <button onClick={() => handleSubmit()}>Tạo</button>
            </div>
        </div>
    )
}

export default AddFood
