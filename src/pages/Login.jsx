import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] =
    useState(true);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: ""
    });

  // HANDLE INPUT CHANGE

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // SUBMIT FORM

  const handleSubmit = async () => {

    try {

      // LOGIN

      if (isLogin) {

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/login`,
          {
            email: formData.email,
            password: formData.password
          }
        );

        // SAVE USER

        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

        alert(response.data.message);

        navigate("/");

      }

      // REGISTER

      else {

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/register`,
          formData
        );

        alert(response.data.message);

        setIsLogin(true);

        setFormData({
          name: "",
          email: "",
          password: ""
        });

      }

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Something Went Wrong"
      );

    }

  };

  return (

    <div
      style={{
        backgroundColor: "#111",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "Arial"
      }}
    >

      <div
        style={{
          width: "350px",
          backgroundColor: "#1e1e1e",
          padding: "30px",
          borderRadius: "15px",
          boxShadow:
            "0px 0px 10px rgba(255,255,255,0.2)"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            color: "tomato",
            marginBottom: "20px"
          }}
        >
          {isLogin
            ? "Login 🔐"
            : "Register 📝"}
        </h1>

        {!isLogin && (

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />

        )}

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "tomato",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "15px",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          {isLogin
            ? "Login"
            : "Register"}
        </button>

        <p
          onClick={() =>
            setIsLogin(!isLogin)
          }
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "tomato",
            cursor: "pointer"
          }}
        >
          {isLogin
            ? "Create New Account"
            : "Already Have Account?"}
        </p>

      </div>

    </div>

  );

}

// INPUT STYLE

const inputStyle = {

  width: "100%",
  padding: "12px",
  marginTop: "15px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  fontSize: "15px"

};

export default Login;