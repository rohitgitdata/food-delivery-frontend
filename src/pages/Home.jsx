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

  const removeFromCart = (index) => {
    const updatedCart = cart.filter(
      (_, i) => i !== index
    );

    setCart(updatedCart);
  };

  return (
    <div
      style={{
        backgroundColor: "#111",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial"
      }}
    >
      {/* Navbar */}

      <div
        style={{
          background: "tomato",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "24px",
          fontWeight: "bold"
        }}
      >
        <h3>Food Delivery</h3>

        <h3>
          Cart 🛒 ({cart.length})
        </h3>
      </div>

      {/* Heading */}

      <h1
        style={{
          textAlign: "center",
          paddingTop: "20px",
          fontSize: "50px"
        }}
      >
        Food Items 🍕
      </h1>

      {/* Food Grid */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "25px",
          padding: "30px"
        }}
      >
        {foods.map((food) => (
          <div
            key={food._id}
            style={{
              backgroundColor: "#1e1e1e",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0px 0px 10px rgba(255,255,255,0.2)",
              transition: "0.3s"
            }}
          >
            <img
              src={food.image}
              alt={food.name}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover"
              }}
            />

            <div style={{ padding: "15px" }}>
              <h2>{food.name}</h2>

              <p
                style={{
                  color: "#ccc",
                  minHeight: "50px"
                }}
              >
                {food.description}
              </p>

              <h2 style={{ color: "tomato" }}>
                ₹{food.price}
              </h2>

              <button
                onClick={() => addToCart(food)}
                style={{
                  padding: "12px 20px",
                  backgroundColor: "tomato",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  marginTop: "10px",
                  fontWeight: "bold"
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Section */}

      <h1
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "45px"
        }}
      >
        Cart Items 🛒
      </h1>

      <div
        style={{
          padding: "20px"
        }}
      >
        {cart.length === 0 ? (
          <h2 style={{ textAlign: "center" }}>
            Cart is Empty 😢
          </h2>
        ) : (
          cart.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#1e1e1e",
                margin: "15px auto",
                padding: "20px",
                borderRadius: "10px",
                maxWidth: "600px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <h2>{item.name}</h2>

                <h3 style={{ color: "tomato" }}>
                  ₹{item.price}
                </h3>
              </div>

              <button
                onClick={() =>
                  removeFromCart(index)
                }
                style={{
                  padding: "10px 15px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;