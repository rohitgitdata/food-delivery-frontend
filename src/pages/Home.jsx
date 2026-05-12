import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Home() {

  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoods();
  }, []);

  // FETCH FOODS

  const fetchFoods = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/foods`
      );

      setFoods(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  // ADD TO CART

  const addToCart = (food) => {

    toast.success(`${food.name} Added 🍔`);

    const itemExists = cart.find(
      (item) => item._id === food._id
    );

    if (itemExists) {

      const updatedCart = cart.map((item) =>

        item._id === food._id

          ? {
              ...item,
              quantity: item.quantity + 1
            }

          : item
      );

      setCart(updatedCart);

    } else {

      setCart([
        ...cart,
        {
          ...food,
          quantity: 1
        }
      ]);

    }

  };

  // REMOVE FROM CART

  const removeFromCart = (id) => {

    toast.error("Item Removed ❌");

    const updatedCart = cart
      .map((item) => {

        if (item._id === id) {

          return {
            ...item,
            quantity: item.quantity - 1
          };

        }

        return item;

      })
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);

  };

  // TOTAL PRICE

  const totalAmount = cart.reduce(

    (total, item) =>

      total + item.price * item.quantity,

    0
  );

  // TOTAL ITEMS

  const totalItems = cart.reduce(

    (total, item) =>

      total + item.quantity,

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

      {/* NAVBAR */}

      <div
        style={{
          background: "tomato",
          padding: "15px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: "0",
          zIndex: "1000",
          flexWrap: "wrap"
        }}
      >

        <h2
          style={{
            fontSize:
              window.innerWidth < 600
                ? "20px"
                : "28px"
          }}
        >
          Food Delivery 🍔
        </h2>

        <h3
          onClick={() => setShowCart(!showCart)}
          style={{
            cursor: "pointer",
            marginTop:
              window.innerWidth < 600
                ? "10px"
                : "0"
          }}
        >
          Cart 🛒 ({totalItems})
        </h3>

      </div>

      {/* HEADING */}

      <h1
        style={{
          textAlign: "center",
          paddingTop: "20px",
          fontSize:
            window.innerWidth < 600
              ? "35px"
              : "50px"
        }}
      >
        Food Items 🍕
      </h1>

      {/* LOADING */}

      {loading ? (

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
            fontSize: "35px",
            color: "tomato",
            fontWeight: "bold"
          }}
        >
          Loading Foods 🍕...
        </div>

      ) : (

        <>
        
          {/* FOOD GRID */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(250px,1fr))",
              gap: "25px",
              padding: "20px"
            }}
          >

            {foods.map((food) => (

              <div
                key={food._id}
                style={{
                  backgroundColor: "#1e1e1e",
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow:
                    "0px 0px 10px rgba(255,255,255,0.2)"
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

                  <h2
                    style={{
                      color: "tomato"
                    }}
                  >
                    ₹{food.price}
                  </h2>

                  {/* QUANTITY */}

                  {cart.find(
                    (item) =>
                      item._id === food._id
                  ) ? (

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "tomato",
                        borderRadius: "10px",
                        padding: "10px",
                        marginTop: "10px"
                      }}
                    >

                      <button
                        onClick={() =>
                          removeFromCart(food._id)
                        }
                        style={btnStyle}
                      >
                        -
                      </button>

                      <h3>
                        {
                          cart.find(
                            (item) =>
                              item._id === food._id
                          ).quantity
                        }
                      </h3>

                      <button
                        onClick={() =>
                          addToCart(food)
                        }
                        style={btnStyle}
                      >
                        +
                      </button>

                    </div>

                  ) : (

                    <button
                      onClick={() =>
                        addToCart(food)
                      }
                      style={{
                        padding: "12px",
                        backgroundColor: "tomato",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        marginTop: "10px",
                        width: "100%",
                        fontWeight: "bold"
                      }}
                    >
                      Add To Cart
                    </button>

                  )}

                </div>

              </div>

            ))}

          </div>

        </>

      )}

      {/* FLOATING CART */}

      {showCart && (

        <div
          style={{
            position: "fixed",
            top: "90px",
            right:
              window.innerWidth < 600
                ? "5%"
                : "20px",
            width:
              window.innerWidth < 600
                ? "90%"
                : "350px",
            backgroundColor: "#1e1e1e",
            padding: "20px",
            borderRadius: "15px",
            boxShadow:
              "0px 0px 15px rgba(255,255,255,0.3)",
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

            <div
              style={{
                textAlign: "center",
                padding: "40px 20px"
              }}
            >

              <div
                style={{
                  fontSize: "60px"
                }}
              >
                🛒
              </div>

              <h2
                style={{
                  color: "tomato",
                  marginTop: "10px"
                }}
              >
               Your Cart is Empty 
              </h2>
                
              <p
                style={{
                  color: "#f7f7f7",
                  marginTop: "10px"
                }}
              >
                 Add delicious food 🍕
              </p>

            </div>

          ) : (

            <>

              {cart.map((item) => (

                <div
                  key={item._id}
                  style={{
                    borderBottom:
                      "1px solid gray",
                    padding: "15px 0"
                  }}
                >

                  <h3>
                    {item.name} × {item.quantity}
                  </h3>

                  <h4
                    style={{
                      color: "tomato"
                    }}
                  >
                    ₹
                    {item.price *
                      item.quantity}
                  </h4>

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

const btnStyle = {

  background: "white",
  color: "tomato",
  border: "none",
  padding: "5px 12px",
  fontSize: "20px",
  borderRadius: "5px",
  cursor: "pointer"

};

export default Home;