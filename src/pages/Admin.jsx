import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {

  const [foods, setFoods] = useState([]);

  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: ""
  });

  useEffect(() => {
    fetchFoods();
  }, []);

  // FETCH ALL FOODS

  const fetchFoods = async () => {

    try {

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/foods`
      );

      if (Array.isArray(response.data)) {

        setFoods(response.data);

      } else if (
        Array.isArray(response.data.foods)
      ) {

        setFoods(response.data.foods);

      } else {

        setFoods([]);

      }

    } catch (error) {

      console.log(error);

    }

  };

  // HANDLE INPUT CHANGE

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // ADD FOOD

  const addFood = async () => {

    try {

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/foods`,
        formData
      );

      alert("Food Added Successfully 🍔");

      resetForm();

      fetchFoods();

    } catch (error) {

      console.log(error);

    }

  };

  // DELETE FOOD

  const deleteFood = async (id) => {

    try {

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/foods/${id}`
      );

      alert("Food Deleted 🗑️");

      fetchFoods();

    } catch (error) {

      console.log(error);

    }

  };

  // EDIT FOOD

  const editFood = (food) => {

    setEditId(food._id);

    setFormData({
      name: food.name,
      price: food.price,
      image: food.image,
      description: food.description
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };

  // UPDATE FOOD

  const updateFood = async () => {

    try {

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/foods/${editId}`,
        formData
      );

      alert("Food Updated ✨");

      resetForm();

      fetchFoods();

    } catch (error) {

      console.log(error);

    }

  };

  // RESET FORM

  const resetForm = () => {

    setEditId(null);

    setFormData({
      name: "",
      price: "",
      image: "",
      description: ""
    });

  };

  return (

    <div
      style={{
        backgroundColor: "#111",
        minHeight: "100vh",
        color: "white",
        padding: "30px",
        fontFamily: "Arial"
      }}
    >

      {/* HEADING */}

      <h1
        style={{
          textAlign: "center",
          color: "tomato",
          marginBottom: "30px",
          fontSize: "45px"
        }}
      >
        Admin Panel ⚙️
      </h1>

      {/* FORM */}

      <div
        style={{
          maxWidth: "500px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          backgroundColor: "#1e1e1e",
          padding: "25px",
          borderRadius: "15px",
          boxShadow:
            "0px 0px 15px rgba(255,255,255,0.2)"
        }}
      >

        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          style={{
            ...inputStyle,
            height: "100px"
          }}
        />

        <button
          onClick={
            editId ? updateFood : addFood
          }
          style={{
            padding: "15px",
            backgroundColor:
              editId ? "orange" : "tomato",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold"
          }}
        >
          {editId
            ? "Update Food ✨"
            : "Add Food 🍕"}
        </button>

      </div>

      {/* FOOD LIST */}

      <h2
        style={{
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "20px",
          fontSize: "35px"
        }}
      >
        All Foods 🍔
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px"
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
                height: "200px",
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

              <h3
                style={{
                  color: "tomato"
                }}
              >
                ₹{food.price}
              </h3>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px"
                }}
              >

                <button
                  onClick={() =>
                    editFood(food)
                  }
                  style={{
                    flex: 1,
                    backgroundColor: "orange",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteFood(food._id)
                  }
                  style={{
                    flex: 1,
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

// INPUT STYLE

const inputStyle = {

  padding: "15px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  fontSize: "16px"

};

export default Admin;