import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Home() {

    const [foods, setFoods] = useState([]);

    useEffect(() => {
        fetchFoods();
    }, []);

    const fetchFoods = async () => {

        const res = await axios.get('https://food-delivery-backend-eqch.onrender.com/api/foods');

        setFoods(res.data);
    };

    return (

        <div>

            <Navbar />

            <h1 style={{textAlign:'center'}}>Food Items</h1>

            <div style={{
                display:'grid',
                gridTemplateColumns:'repeat(3,1fr)',
                gap:'20px',
                padding:'20px'
            }}>

            {
                foods.map((food) => (

                    <div key={food._id}
                    style={{
                        border:'1px solid gray',
                        padding:'20px'
                    }}>

                        <img
                        src={food.image}
                        width="100%"
                        height="200"
                        />

                        <h2>{food.name}</h2>

                        <p>{food.description}</p>

                        <h3>₹{food.price}</h3>

                        <button>
                            Add To Cart
                        </button>

                    </div>
                ))
            }

            </div>

        </div>
    );
}

export default Home;