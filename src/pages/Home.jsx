import { useEffect, useState } from "react";
import axios from "axios";

function Home() {

  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/foods`
      );

      setFoods(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (food) => {
    setCart([...cart, food]);
  };

  return (
    <div>

      <div
        style={{
          backgroundColor: "tomato",
          padding: "20px",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "24px"
        }}
      >
        <h3>Food Delivery</h3>
        <h3>Cart ({cart.length})</h3>
      </div>

      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Food Items
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          padding: "20px"
        }}
      >

        {foods.map((food) => (

          <div
            key={food._id}
            style={{
              border: "2px solid gray",
              padding: "15px",
              textAlign: "center",
              borderRadius: "10px",
              backgroundColor: "#1e1e1e",
              color: "white"
            }}
          >

            <img
              src={food.image}
              alt={food.name}
              width="100%"
              height="200"
              style={{ objectFit: "cover" }}
            />

            <h2>{food.name}</h2>

            <p>{food.description}</p>

            <h3>₹{food.price}</h3>

            <button
              onClick={() => addToCart(food)}
              style={{
                padding: "10px 20px",
                backgroundColor: "tomato",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px"
              }}
            >
              Add To Cart
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Home;