import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

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

  const totalAmount = cart.reduce(
    (total, item) => total + item.price,
    0
  );

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
          fontWeight: "bold",
          position: "sticky",
          top: "0",
          zIndex: "1000"
        }}
      >
        <h3>Food Delivery 🍔</h3>

        <h3
          onClick={() => setShowCart(!showCart)}
          style={{
            cursor: "pointer"
          }}
        >
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
              boxShadow: "0px 0px 10px rgba(255,255,255,0.2)"
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
                  fontWeight: "bold",
                  width: "100%"
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cart */}

      {showCart && (
        <div
          style={{
            position: "fixed",
            top: "90px",
            right: "20px",
            width: "350px",
            backgroundColor: "#1e1e1e",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0px 0px 15px rgba(255,255,255,0.3)",
            maxHeight: "80vh",
            overflowY: "auto",
            zIndex: "1000"
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px"
            }}
          >
            Your Cart 🛒
          </h2>

          {cart.length === 0 ? (
            <h3
              style={{
                textAlign: "center"
              }}
            >
              Cart is Empty 😢
            </h3>
          ) : (
            <>
              {cart.map((item, index) => (
                <div
                  key={index}
                  style={{
                    borderBottom: "1px solid gray",
                    padding: "15px 0"
                  }}
                >
                  <h3>{item.name}</h3>

                  <h4 style={{ color: "tomato" }}>
                    ₹{item.price}
                  </h4>

                  <button
                    onClick={() =>
                      removeFromCart(index)
                    }
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <h2
                style={{
                  marginTop: "20px",
                  textAlign: "center",
                  color: "tomato"
                }}
              >
                Total: ₹{totalAmount}
              </h2>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;