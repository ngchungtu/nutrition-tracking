import { useContext, useEffect, useState } from "react"
import { UserContext } from '../contexts/UserContext'
import Header from "./Header"

const Diet = () => {

    const loggedUserData = useContext(UserContext)
    const [items, setItems] = useState([]);

    const [date, setDate] = useState(new Date())

    let [total, setTotal] = useState({
        totalCaloreis: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFats: 0,
        totalFiber: 0
    })


    useEffect(() => {

        fetch(`http://localhost:5000/track/${loggedUserData.loggedUser.id}/${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${loggedUserData.loggedUser.accessToken}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setItems(data);
            })
            .catch((err) => {
                console.log(err);
            })

    }, [date])


    useEffect(() => {
        calculateTotal();
    }, [items])


    function calculateTotal() {
        let totalCopy = {
            totalCaloreis: 0,
            totalProtein: 0,
            totalCarbs: 0,
            totalFats: 0,
            totalFiber: 0
        };

        items.forEach((item) => {
            totalCopy.totalCaloreis += item.foodId.calories;
            totalCopy.totalProtein += item.foodId.protein;
            totalCopy.totalCarbs += item.foodId.carbohydrates;
            totalCopy.totalFats += item.foodId.fat;
            totalCopy.totalFiber += item.foodId.fiber;

        })

        setTotal(totalCopy);
    }

    console.log('items', items);
    console.log('user token', loggedUserData.loggedUser.accessToken);

    return (
        <section className="container diet-container">
            <Header />
            <input type="date" onChange={(event) => {
                setDate(new Date(event.target.value));
            }} />
            {
                items.map((item) => {

                    return (
                        <div className="item" key={item._id}>

                            <h3>{item.foodId.name} ( {item.foodId.calories} Kcal for {item.quantity}g )</h3>

                            <p>Protein {item.foodId.protein}g, Carbs {item.foodId.carbohydrates}g, Fats {item.foodId.fat}g, Fiber {item.foodId.fiber}g</p>

                        </div>
                    )
                })
            }
            <div className="item">
                <h3>  {total.totalCaloreis} Kcal </h3>
                <p>Protein {total.totalProtein}g, Carbs {total.totalCarbs}g, Fats {total.totalFats}g, Fiber {total.totalFiber}g</p>
            </div>
        </section>
    )
}

export default Diet
