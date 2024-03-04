import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Food = ({ item }) => {

    const [food, setFood] = useState({})
    const [eatenQuantity, setEatenQuantity] = useState();
    const [foodInitial, setFoodInitial] = useState({})
    const [loading, setLoading] = useState(false);

    const loggedUserData = useContext(UserContext)

    // console.log('loggedUserData', loggedUserData);
    // console.log('food', item);
    const navigate = useNavigate()

    useEffect(() => {
        setFood(item)
        setFoodInitial(item)
    }, [item])

    const calcMacros = (e) => {
        if (e.target.value.length !== 0) {

            let quantity = Number(e.target.value)
            setEatenQuantity(quantity)

            let copyFood = { ...food }
            // console.log(copyFood);

            copyFood.protein = (foodInitial.protein * quantity) / 100;
            copyFood.calories = (foodInitial.calories * quantity) / 100;
            copyFood.fat = (foodInitial.fat * quantity) / 100;
            copyFood.fiber = (foodInitial.fiber * quantity) / 100;
            copyFood.calories = (foodInitial.calories * quantity) / 100;

            setFood(copyFood)
        }
    }

    const trackFood = async () => {
        setLoading(true)
        const track = {
            userId: loggedUserData.loggedUser.id,
            foodId: food._id,
            details: {
                protein: food.protein,
                calories: food.calories,
                fat: food.fat,
                fiber: food.fiber,
                carbohydrates: food.carbonhydrates
            },
            quantity: eatenQuantity,
        }

        console.log('trackFood', track);
        // console.log('user token', loggedUserData.loggedUser.id);

        await fetch(`${process.env.REACT_APP_BASE_URL_API}/track`, {
            method: 'POST',
            body: JSON.stringify(track),
            headers: {
                "Authorization": `Bearer ${loggedUserData.loggedUser.accessToken}`,
                "Content-Type": "application/json"
            }
        })
            // await axios.post(`${process.env.REACT_APP_BASE_URL_API}/track`, JSON.stringify(track), {
            //     headers: {
            //         "Authorization": `Bearer ${loggedUserData.loggedUser.accessToken}`,
            //         "Content-Type": "application/json"
            //     }
            // })
            .then((response) => {
                console.log(response);
                setLoading(false)
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)
            })
    }

    return (
        <>
            <div className="food">
                <div className="food-img">
                    <img src={food.imgUrl} alt={food.name} />
                </div>
                <h3><span>{food.name}</span> ({food.calories} Calo trong {eatenQuantity} gr)</h3>

                <div className='nutrient-content'>
                    <div className="nutrient">
                        <p className="n-title">Protein (Chất đạm)</p>
                        <p className="n-value">{food.protein} gr</p>
                    </div>

                    <div className="nutrient">
                        <p className="n-title">Carbonhydate</p>
                        <p className="n-value">{food.carbonhydrates} gr</p>
                    </div>

                    <div className="nutrient">
                        <p className="n-title">Fat (Chất béo)</p>
                        <p className="n-value">{food.fat} gr</p>
                    </div>

                    <div className="nutrient">
                        <p className="n-title">Fiber (Chất xơ)</p>
                        <p className="n-value">{food.fiber} gr</p>
                    </div>
                </div>

                <div className='track-control'>
                    <h3>Lượng dinh dưỡng theo số lượng thực phẩm</h3>
                    <input type='number' onChange={calcMacros} className="inp" placeholder="Số lượng tính bằng Gram" />

                    {
                        loading
                            ? <div className="loader"></div>
                            : <button className='btn' onClick={() => trackFood()}>Lưu thông tin lượng dinh dưỡng</button>
                    }
                </div>
            </div>
        </>
    )
}

export default Food