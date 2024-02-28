import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import '../styles/food-list.css'

const FoodList = () => {
  const loggedUserData = useContext(UserContext)
  const [foodList, setFoodList] = useState([])

  const handleFetchFoods = () => {
    fetch(`http://localhost:5000/foods`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${loggedUserData.loggedUser.accessToken}`
      }
    }).then((response) => response.json())
      .then((data) => {
        setFoodList(data)
        // console.log('data', data);
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    handleFetchFoods()
  }, [])

  return (
    <div className='foodList-container'>
      {
        foodList.map((food) => {
          return (
            <div key={food._id} className='foodList-item'>
              {/* <div className='foodList-item-img'>
                <img src={food.imgUrl} alt={food.name} />
              </div> */}
              <div className='foodList-item-content'>
                <h3 className='foodList-title'>{food.name}</h3>
                <div className='foodList-nutrition'>
                  <span>Lượng dinh dưỡng: </span>
                  <p className='foodList-calo'>Calories: <span>{food.calories}</span></p>
                  <p className='foodList-fat'>Fat: <span>{food.fat}</span></p>
                  <p className='foodList-carbo'>Carbohydrates: <span>{food.carbonhydrates}</span></p>
                  <p className='foodList-protein'>Protein: <span>{food.protein}</span></p>
                  <p className='foodList-fiber'>Fiber: <span>{food.fiber}</span></p>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default FoodList