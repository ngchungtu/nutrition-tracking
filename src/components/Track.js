import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import Food from './Food'

const Track = () => {
    const [foodItems, setFoodItems] = useState([])
    const loggedUserData = useContext(UserContext)
    const [food, setFood] = useState(null)
    const [showChose, setShowChose] = useState(false)

    // useEffect(() => {
    //     console.log(food);
    // }, [food])

    const searchFood = (e) => {
        if (e.target.value.length !== 0) {
            fetch(`http://localhost:5000/foods/${e.target.value}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${loggedUserData.loggedUser.accessToken}`
                }
            }).then((response) => response.json())
                .then((data) => {
                    // console.log('data-foods', data)
                    setFoodItems(data.food)
                    if (data.message === "Food found") {
                        setFoodItems(data.food)
                        // console.log('data food', data.food);
                    } else {
                        setFoodItems([])
                    }
                })
                .catch((error) => console.log(error))
        } else {
            setFoodItems([])
        }
    }

    const handleChoseFood = (food) => {
        setFood(food)
        setShowChose(true)
    }

    return (
        <>
            <section className="container track-container">
                <div className="search">
                    <input onChange={searchFood} className='search-inp' type='search' placeholder='Tìm kiếm thực phẩm...' />

                    {
                        foodItems.length !== 0 && !showChose ? (
                            <div className="search-results">
                                {
                                    foodItems.map((foodItem) => {
                                        return (
                                            <p className="item" onClick={() => handleChoseFood(foodItem)} key={foodItem._id}>{foodItem.name}</p>
                                        )
                                    })
                                }
                            </div>
                        ) : null
                    }
                </div>

                {
                    food !== null
                        ? (<Food item={food} />)
                        : null
                }
            </section>
        </>
    )
}

export default Track